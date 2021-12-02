module ParserMaths exposing (parseMaths, evaluer, evaluerBis, montrerErreurs, expr)

import Fraction as F exposing (Fraction, Resultat, frac, opp)
import Maybe as M
import Set
import Parser exposing (..)


montrerErreurs : String -> List DeadEnd -> String
montrerErreurs source errs =
    case List.head errs of
        Nothing ->
            ""
        Just firstErr ->
            source
                ++ "\n"
                ++ String.repeat (firstErr.col - 1) " "
                ++ "^"
                ++ "\nL'algorithme attendait :"
                ++ String.join
                    " ou "
                    (List.map montrerAttendu errs)


montrerAttendu : DeadEnd -> String
montrerAttendu err =
    case err.problem of
        ExpectingNumber ->
            "un nombre entier"
        ExpectingSymbol s ->
            "un \"" ++ s ++ "\""
        _ ->
            "une expression"

evaluerBis : Expr -> Fraction
evaluerBis expression =
    case evaluer expression of
        Err _ -> { num = 666, den = 1 }
        Ok a -> a

evaluer : Expr -> Resultat
evaluer expression =
    case expression of
        Add a b ->
            opp F.add (evaluer a) (evaluer b)

        Sub a b ->
            opp F.sub (evaluer a) (evaluer b)

        Mul a b ->
            opp F.mul (evaluer a) (evaluer b)

        Div a b ->
            opp F.div (evaluer a) (evaluer b)

        Exp a b ->
            opp F.exp (evaluer a) (evaluer b)

        Neg a ->
            Result.map F.neg (evaluer a)

        Grouping l ->
            evaluer l

        Entier n ->
            F.frac n 1

        Poly a_i x ->
            Err "Les polynômes ne sont pas encore pris en charge."

{--
appliquerAuResultat f a b =
    case (a,b) of
        (Ok aa, Ok bb) -> Ok <| f aa bb
        (Err aa, _) -> Err aa
--}

{--
type Expr
  = Const Fraction
  | Var String
  | Poly (List Fraction) String
  | Exp Expr
  | Ln Expr
  | Sin Expr
  | Cos Expr
  | Prod Expr Expr
  | Div Expr Expr
  | Sum Expr Expr
  | Dif Expr Expr
  | Exp Expr Frac
  | Opp Expr
--}

type Expr
    = Add Expr Expr
    | Sub Expr Expr
    | Mul Expr Expr
    | Div Expr Expr
    | Exp Expr Expr
    | Neg Expr
    | Entier Int
    | Grouping Expr
    | Poly (List Expr) String


parseMaths : String -> Result (List DeadEnd) Expr
parseMaths source =
    run expr source


expr : Parser Expr
expr =
    add


type Operator
    = MulOp
    | DivOp
    | AddOp
    | SubOp
    | ExpOp


type Operand
    = NoOperand
    | Operand Operator Expr


{-
  En quelque sorte, décurryfie une expression binaire
    binary e_1 (Operand MulOp e_2) == Mul e_1 e_2
-}
binary : Expr -> Operand -> Expr
binary a b =
    case b of
        NoOperand ->
            a

        Operand op e ->
            case op of
                MulOp ->
                    Mul a e

                DivOp ->
                    Div a e

                AddOp ->
                    Add a e

                SubOp ->
                    Sub a e

                ExpOp ->
                    Exp a e


add : Parser Expr
add =
    succeed
        foldBinary
        |= mul
        |. spaces
        |= loop [] addHelper


-- 
foldBinary : Expr -> List Operand -> Expr
foldBinary left operands =
    List.foldr
    (\operand expression -> binary expression operand)
    left
    operands


addHelper : List Operand -> Parser (Step (List Operand) (List Operand))
addHelper operands =
    oneOf
        [ succeed (\right -> Loop (Operand AddOp right :: operands))
            |. symbol "+"
            |. spaces
            |= lazy (\_ -> mul)
        , succeed (\right -> Loop (Operand SubOp right :: operands))
            |. symbol "-"
            |. spaces
            |= lazy (\_ -> mul)
        , succeed ()
            |> map (\_ -> Done operands)
        ]


mul : Parser Expr
mul =
    succeed
        foldBinary
        |= exp
        |. spaces
        |= loop [] mulHelper


mulHelper : List Operand -> Parser (Step (List Operand) (List Operand))
mulHelper operands =
    oneOf
        [ succeed (\right -> Loop (Operand MulOp right :: operands))
            |. symbol "*"
            |. spaces
            |= lazy (\_ -> exp)
        , succeed (\right -> Loop (Operand DivOp right :: operands))
            |. symbol "/"
            |. spaces
            |= lazy (\_ -> exp)
        , succeed ()
            |> map (\_ -> Done operands)
        ]


exp : Parser Expr
exp =
    succeed
        binary
        |= primary
        |. spaces
        |= oneOf
            [ succeed (Operand ExpOp)
                |. symbol "^"
                |. spaces
                |= lazy (\_ -> exp)
            , succeed NoOperand
            ]


primary : Parser Expr
primary =
    succeed (\op literal ->
            case op of
                Nothing ->
                    literal

                Just _ ->
                    Neg literal
        )
    |= oneOf
        [ succeed Just
            |= symbol "-"
        , succeed Nothing
        ]
    |= oneOf
        [ grouping
        , poly
        , nombre
        ]


nombre : Parser Expr
nombre =
    succeed Entier
        |= number
            { int = Just identity
            , hex = Nothing
            , octal = Nothing
            , binary = Nothing
            , float = Nothing
            }

poly : Parser Expr
poly =
    succeed Poly
        |. keyword "Poly"
        |. spaces
        |= sequence
            { start = "["
            , separator = ","
            , end = "]"
            , spaces = spaces
            , item = lazy (\_ -> expr)
            , trailing = Forbidden
            }
        |. spaces
        |= variable
            { start = \_ -> True
            , inner = \_ -> False
            , reserved = Set.fromList []
            }


grouping : Parser Expr
grouping =
    succeed Grouping
        |. symbol "("
        |. spaces
        |= lazy (\_ -> expr)
        |. spaces
        |. symbol ")"