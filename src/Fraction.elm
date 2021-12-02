module Fraction exposing
  ( Fraction
  , Resultat
  , Erreur
  , frac
  , num
  , den
  , estEntier
  , opp
  , add
  , neg
  , sub
  , mul
  , inv
  , div
  , exp
  , teX
  , raw
  )

import Arithmetic exposing (gcd)



type alias Fraction = { num : Int, den : Int }

type alias Resultat = Result Erreur Fraction
type alias Erreur = String

frac : Int -> Int -> Resultat
frac a b =
  let
    min = 1 - 2^31
    max = 2^31 - 1
  in
  case b of
    0 -> Err "Division par zéro."
    _ ->
      if a > max || b > max || a < min || b < min then
        Err "Certains calculs font intervenir des valeurs trop grandes pour être prises en charge."
      else
        Ok <| simplifier <| Fraction a b

simplifier : Fraction -> Fraction
simplifier a =
  let
    pgcd = gcd a.num a.den
    sgnDuDen =
      if a.den < 0 then -1 else 1
  in
  { a
  | num = sgnDuDen*(a.num // pgcd)
  , den = sgnDuDen*(a.den // pgcd)
  }

num a = a.num

den a = a.den

estEntier a = a.den == 1

opp : (Fraction -> Fraction -> Resultat) -> Resultat -> Resultat -> Resultat
opp operation resultat1 resultat2 =
  case (resultat1, resultat2) of
    (Ok fraction1, Ok fraction2) -> operation fraction1 fraction2
    (Err erreur, _) -> Err erreur
    (_, Err erreur) -> Err erreur

add : Fraction -> Fraction -> Resultat
add a b =
  let
    pgcd = gcd a.den b.den
    aDenBis = a.den // pgcd
    bDenBis = b.den // pgcd
  in
  frac (a.num*bDenBis + b.num*aDenBis) (a.den*bDenBis)

neg : Fraction -> Fraction
neg a = Fraction (-a.num) a.den

sub : Fraction -> Fraction -> Resultat
sub a b = add a (neg b)

mul : Fraction -> Fraction -> Resultat
mul a b =
  let
    pgcd = gcd a.num b.den
    pgcdBis = gcd b.num a.den
    aNum = a.num // pgcd
    aDen = a.den // pgcdBis
    bNum = b.num // pgcdBis
    bDen = b.den // pgcd
  in
  frac (aNum*bNum) (aDen*bDen)

inv : Fraction -> Resultat
inv a =
  case a.num of
    0 -> Err "Division par zéro"
    _ -> Ok <| Fraction a.den a.num

div : Fraction -> Fraction -> Resultat
div a b = Result.andThen (mul a) <| inv b

exp : Fraction -> Fraction -> Resultat
exp a b =
  let
    sgnDeA =
      if a.num < 0 then -1 else 1
    sgnDeB =
      if b.num < 0 then -1 else 1
  in
  if b.den == 1 && b.num < 0 then
    frac ((sgnDeA*a.den)^(sgnDeB*b.num)) ((sgnDeA*a.num)^(sgnDeB*b.num))
  else if b.den == 1 then
    frac (a.num^b.num) (a.den^b.num)
  else
    Err "Extraction de racine impossible"


teX a
  = case a.den of
    1 -> String.fromInt a.num
    _ ->
      if a.num < 0 then
        "-\\frac{" ++ String.fromInt (-a.num) ++ "}{" ++ String.fromInt a.den ++ "}"
      else
        "\\frac{" ++ String.fromInt a.num ++ "}{" ++ String.fromInt a.den ++ "}"

raw a = "(" ++ String.fromInt a.num ++ "/" ++ String.fromInt a.den ++ ")"