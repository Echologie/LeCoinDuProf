module ParserMathsPratt exposing
    ( Expr(..)
    , evaluer
    , evaluerBis
    , expr
    , montrerErreurs
    , parseMaths
    , resultatFractionnaire
    )

import Fraction
import Maybe as M
import Parser exposing (..)
import Pratt exposing (constant, infixLeft, infixRight, literal, postfix, prefix)
import Set


type Expr
    = Entier Int
    | Decimal Float
    | Oppose Expr
    | Somme Expr Expr
    | Difference Expr Expr
    | Produit Expr Expr
    | Quotient Expr Expr
    | Reste Expr Expr
    | Exp Expr Expr
    | Cos Expr
    | Sin Expr
    | Tan Expr
    | ArcCos Expr
    | ArcSin Expr
    | ArcTan Expr
    | Log Expr
    | Ln Expr
    | Factorielle Expr
    | Degre Expr
    | Poly (List Expr) String
    | E
    | Pi


parseMaths : String -> Result (List DeadEnd) Expr
parseMaths source =
    run expr source


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


evaluerBis : Expr -> Fraction.Fraction
evaluerBis expression =
    case resultatFractionnaire expression of
        Err _ ->
            { numerateur = 666, denominateur = 1 }

        Ok a ->
            a


evaluer =
    resultatFractionnaire


resultatFractionnaire : Expr -> Fraction.Resultat
resultatFractionnaire expression =
    let
        f opperation a b =
            Fraction.map2 opperation (resultatFractionnaire a) (resultatFractionnaire b)
    in
    case expression of
        Somme a b ->
            f Fraction.somme a b

        Difference a b ->
            f Fraction.difference a b

        Produit a b ->
            f Fraction.produit a b

        Quotient a b ->
            f Fraction.quotient a b

        Exp a b ->
            f Fraction.exp a b

        Oppose a ->
            Result.map Fraction.oppose (resultatFractionnaire a)

        Entier n ->
            Fraction.fraction n 1

        Poly a_i x ->
            Err "Les polynômes ne sont pas encore pris en charge."

        _ ->
            Err "BOOM"


expr : Parser Expr
expr =
    succeed identity
        |= mathExpression


mathExpression : Parser Expr
mathExpression =
    Pratt.expression
        { oneOf =
            [ constant (keyword "E") E
            , constant (keyword "Pi") Pi
            , literal (map Entier int)
            , prefix 3 (symbol "-") Oppose
            , expressionEntreParentheses
            , prefix 3 (symbol "+") identity
            , prefix 5 (keyword "Cos") Cos
            , prefix 5 (keyword "Sin") Sin
            , prefix 5 (keyword "Tan") Tan
            , prefix 5 (keyword "ArcCos") ArcCos
            , prefix 5 (keyword "ArcSin") ArcSin
            , prefix 5 (keyword "ArcTan") ArcTan
            , prefix 5 (keyword "Log") Log
            , prefix 5 (keyword "Ln") Ln
            ]
        , andThenOneOf =
            [ infixLeft 1 (symbol "+") Somme
            , infixLeft 1 (symbol "-") Difference
            , infixLeft 2 (symbol "*") Produit
            , infixLeft 2 (symbol "%") Reste
            , infixLeft 2 (symbol "/") Quotient
            , infixRight 4 (symbol "^") Exp
            , postfix 6 (symbol "!") Factorielle
            , postfix 6 (symbol "°") Degre
            ]
        , spaces = espaces
        }


espaces =
    Parser.chompWhile <| (==) ' '


expressionEntreParentheses : Pratt.Config Expr -> Parser Expr
expressionEntreParentheses config =
    succeed identity
        |. symbol "("
        |= Pratt.subExpression 0 config
        |. symbol ")"


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
            , item = lazy (\_ -> mathExpression)
            , trailing = Forbidden
            }
        |. spaces
        |= variable
            { start = \_ -> True
            , inner = \_ -> False
            , reserved = Set.fromList []
            }
