module Fraction exposing
    ( Erreur
    , Fraction
    , Resultat
    , asciiMath
    , denominateur
    , difference
    , estEntier
    , exp
    , fraction
    , inverse
    , map2
    , numerateur
    , oppose
    , produit
    , quotient
    , somme
    , teX
    )

import Arithmetic exposing (gcd)


type alias Fraction =
    { numerateur : Int, denominateur : Int }


type alias Resultat =
    Result Erreur Fraction


type alias Erreur =
    String


fraction : Int -> Int -> Resultat
fraction a b =
    let
        min =
            1 - 2 ^ 31

        max =
            2 ^ 31 - 1
    in
    case b of
        0 ->
            Err "Division par zéro."

        _ ->
            if a > max || b > max || a < min || b < min then
                Err "Certains calculs font intervenir des valeurs trop grandes pour être prises en charge."

            else
                Ok <| simplifier <| Fraction a b


simplifier : Fraction -> Fraction
simplifier a =
    let
        pgcd =
            gcd a.numerateur a.denominateur

        sgnDuDen =
            if a.denominateur < 0 then
                -1

            else
                1
    in
    { a
        | numerateur = sgnDuDen * (a.numerateur // pgcd)
        , denominateur = sgnDuDen * (a.denominateur // pgcd)
    }


numerateur a =
    a.numerateur


denominateur a =
    a.denominateur


estEntier a =
    a.denominateur == 1


map2 : (Fraction -> Fraction -> Resultat) -> Resultat -> Resultat -> Resultat
map2 operation resultat1 resultat2 =
    case ( resultat1, resultat2 ) of
        ( Ok fractiontion1, Ok fractiontion2 ) ->
            operation fractiontion1 fractiontion2

        ( Err erreur, _ ) ->
            Err erreur

        ( _, Err erreur ) ->
            Err erreur


somme : Fraction -> Fraction -> Resultat
somme a b =
    let
        pgcd =
            gcd a.denominateur b.denominateur

        aDenBis =
            a.denominateur // pgcd

        bDenBis =
            b.denominateur // pgcd
    in
    fraction (a.numerateur * bDenBis + b.numerateur * aDenBis) (a.denominateur * bDenBis)


oppose : Fraction -> Fraction
oppose a =
    Fraction -a.numerateur a.denominateur


difference : Fraction -> Fraction -> Resultat
difference a b =
    somme a (oppose b)


produit : Fraction -> Fraction -> Resultat
produit a b =
    let
        pgcd =
            gcd a.numerateur b.denominateur

        pgcdBis =
            gcd b.numerateur a.denominateur

        aNum =
            a.numerateur // pgcd

        aDen =
            a.denominateur // pgcdBis

        bNum =
            b.numerateur // pgcdBis

        bDen =
            b.denominateur // pgcd
    in
    fraction (aNum * bNum) (aDen * bDen)


inverse : Fraction -> Resultat
inverse a =
    case a.numerateur of
        0 ->
            Err "Division par zéro"

        _ ->
            Ok <| Fraction a.denominateur a.numerateur


quotient : Fraction -> Fraction -> Resultat
quotient a b =
    Result.andThen (produit a) <| inverse b


exp : Fraction -> Fraction -> Resultat
exp a b =
    let
        sgnDeA =
            if a.numerateur < 0 then
                -1

            else
                1

        sgnDeB =
            if b.numerateur < 0 then
                -1

            else
                1
    in
    if b.denominateur == 1 && b.numerateur < 0 then
        fraction ((sgnDeA * a.denominateur) ^ (sgnDeB * b.numerateur)) ((sgnDeA * a.numerateur) ^ (sgnDeB * b.numerateur))

    else if b.denominateur == 1 then
        fraction (a.numerateur ^ b.numerateur) (a.denominateur ^ b.numerateur)

    else
        Err "L'extraction de racine n'est pas disponible pour les nombres écrits sous forme fractiontionnaire."


teX a =
    case a.denominateur of
        1 ->
            String.fromInt a.numerateur

        _ ->
            if a.numerateur < 0 then
                "-\\fraction{" ++ String.fromInt -a.numerateur ++ "}{" ++ String.fromInt a.denominateur ++ "}"

            else
                "\\fraction{" ++ String.fromInt a.numerateur ++ "}{" ++ String.fromInt a.denominateur ++ "}"


asciiMath a =
    "(" ++ String.fromInt a.numerateur ++ "/" ++ String.fromInt a.denominateur ++ ")"
