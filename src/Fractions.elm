module Fractions exposing (..)

import Arithmetic exposing (gcd)

type alias Frac = { num : Int, den : Int }

simplifier a =
  let
    pgcd = gcd a.num a.den
    sgnDuDen =
      if a.den < 0 then -1 else 1
  in
  Frac (sgnDuDen*a.num // pgcd) (sgnDuDen*a.den // pgcd)
  --{ a | num = a.num // pgcd, den = a.den // pgcd }

estEntier a = .den (simplifier a) == 1

add a b =
  simplifier <| Frac (a.num*b.den + a.den*b.num) (a.den*b.den)

neg a = simplifier <| Frac (-a.num) a.den

sub a b = simplifier <| add a (neg b)

mul a b = simplifier <| Frac (a.num*b.num) (a.den*b.den)

inv a = simplifier <| Frac a.den a.num

div a b = simplifier <| mul a (inv b)

exp : Frac -> Frac -> Maybe Frac
exp a b =
  let
    aa = simplifier a
    bb = simplifier b
    sgnDeA =
      if aa.num < 0 then -1 else 1
    sgnDeB =
      if bb.num < 0 then -1 else 1
  in
  if bb.den == 1 && bb.num < 0 then
    Just <| Frac ((sgnDeA*aa.den)^(sgnDeB*bb.num)) ((sgnDeA*aa.num)^(sgnDeB*bb.num))
  else if bb.den == 1 then
    Just <| Frac (aa.num^bb.num) (aa.den^bb.num)
  else
    Nothing

-- À utiliser sur une fraction simplifier !
teX a
  = case a.den of
    1 -> String.fromInt a.num
    _ ->
      if a.num < 0 then
        "-\\frac{" ++ String.fromInt (-a.num) ++ "}{" ++ String.fromInt a.den ++ "}"
      else
        "\\frac{" ++ String.fromInt a.num ++ "}{" ++ String.fromInt a.den ++ "}"

raw a = "(" ++ String.fromInt a.num ++ "/" ++ String.fromInt a.den ++ ")"