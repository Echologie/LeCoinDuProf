module ParserExpressionMathematique exposing
    ( ExpressionMathematique(..)
    , evaluerUnsafe
    , expressionMathematique
    , parserExpressionMathematique
    , resultatFractionnaire
    )

import Fraction
import Maybe as M
import Parser exposing (..)
import Pratt exposing (constant, infixLeft, infixRight, literal, postfix, prefix)
import Set


type ExpressionMathematique
    = Entier Int
    | Decimal Float
    | Oppose ExpressionMathematique
    | Somme ExpressionMathematique ExpressionMathematique
    | Difference ExpressionMathematique ExpressionMathematique
    | Produit ExpressionMathematique ExpressionMathematique
    | Quotient ExpressionMathematique ExpressionMathematique
    | Reste ExpressionMathematique ExpressionMathematique
    | Exp ExpressionMathematique ExpressionMathematique
    | Cos ExpressionMathematique
    | Sin ExpressionMathematique
    | Tan ExpressionMathematique
    | ArcCos ExpressionMathematique
    | ArcSin ExpressionMathematique
    | ArcTan ExpressionMathematique
    | Log ExpressionMathematique
    | Ln ExpressionMathematique
    | Factorielle ExpressionMathematique
    | Degre ExpressionMathematique
    | Poly (List ExpressionMathematique) String
    | E
    | Pi


parserExpressionMathematique : String -> Result (List DeadEnd) ExpressionMathematique
parserExpressionMathematique source =
    run expressionMathematique source


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


evaluerUnsafe : ExpressionMathematique -> Fraction.Fraction
evaluerUnsafe expression =
    case resultatFractionnaire expression of
        Err _ ->
            { numerateur = 666, denominateur = 1 }

        Ok a ->
            a


resultatFractionnaire : ExpressionMathematique -> Fraction.Resultat
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


expressionMathematique : Parser ExpressionMathematique
expressionMathematique =
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
        , spaces = Parser.spaces
        }


expressionEntreParentheses : Pratt.Config ExpressionMathematique -> Parser ExpressionMathematique
expressionEntreParentheses config =
    succeed identity
        |. symbol "("
        |= Pratt.subExpression 0 config
        |. symbol ")"


polynome : Parser ExpressionMathematique
polynome =
    succeed Poly
        |. keyword "Poly"
        |. spaces
        |= sequence
            { start = "["
            , separator = ","
            , end = "]"
            , spaces = spaces
            , item = lazy (\_ -> expressionMathematique)
            , trailing = Forbidden
            }
        |. spaces
        |= variable
            { start = \_ -> True
            , inner = \_ -> False
            , reserved = Set.fromList []
            }
