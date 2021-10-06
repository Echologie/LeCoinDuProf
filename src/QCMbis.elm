module QCMbis exposing (..)

-- Press buttons to increment and decrement a counter.
--
-- Read how it works:
--   https://guide.elm-lang.org/architecture/buttons.html
--


import Browser
import Html exposing (Html, button, div, text, p)
import Html.Events exposing (onClick)



-- MAIN


main =
  Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model = Int


init : Model
init =
  0



-- UPDATE


type Msg
  = Increment
  | Decrement


update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1



-- VIEW


view : Model -> Html Msg
view model =
  div [] ( List.concat
    [
    {--
    , [ dl10 [0, 4, 2] 5 ]
    , [ text ( poly [0, 0, 7, -3, 0 , 2, 1 , -1 , 3 , 1, 1, 1, 5] ) ]
    , [ primitPoly02 [2,-5,1,7] ]
    , [ primitLn02 [-5,-6] ]
    , [ equaDiff04 -5 ]
    , [ equaDiff05 [4, -5] ]
    , [ equaDiff06 [4, -5] ]
    , [ derivPoly03 [4, -5, 3, 5, 13] ]
    , [ derivPoly04 [-3, -4, 2, 7, -13] ]
    , [ dl06 [-5, -2, 2, -1] ]
    , [ dl07 [-5, 0, -2, -1] ]
    , [ dl08 [0, -8, 0, 7] ]
    , [ dl09 [-1, 2, 0, -3] ]
    --}
      List.map equaDiff04 <| List.range -9 -2 -- 98 possibilités
    , List.map equaDiff05 ( mix [ [3,5,7], [-2,-4,-7,-8] ] )  -- 99 possibilités
    , List.map equaDiff06 ( mix [ [3,5,7], [-2,-4,-7,-8] ] )  -- 99 possibilités
    , List.map derivPoly03 ( mix [ [4,6], List.range -7 -6, List.range 2 3, List.range 11 12 ] )  -- 576 possibilités
    , List.map derivPoly04 ( mix [ [-5,-3], [-4,-2], [2,6], List.range -14 -13 ] )  -- 256 possibilités
    , List.map primitLn02 ( mix [ List.range -3 -2 ++ List.range 2 3, List.range -5 -4 ++ List.range 5 6 ] )  -- 256 possibilités
    , List.map primitPoly02 ( mix [ List.range -3 -2 , List.range 2 3, List.range -5 -4 , List.range 6 7 ] )  -- 256 possibilités
    , List.map dl06 ( mix [ [-3,5], [-2,6], [2,3], [-2,3] ] )  -- 648 possibilités
    , List.map dl07 ( mix [ [-5,-2,2], [0], [-3,-4], [-2,3] ] )  -- 300 possibilités
    , List.map dl08 ( mix [ [0], [-3,-2,2,3], [0], [2,3,4,5] ] )  -- 162 possibilités
    , List.map dl09 ( mix [ [-5,3,5], [-6,4], [0], [-5,-3] ] )  --324 possibilités
    , List.concat <| List.map ( mapTwist [3,5,9] ) ( List.map dl10 ( mix [ [0], [2,4], [7,8] ] ) )  -- 192 possibilités
    , d3 -- 729 possibilités
    ] 
  )

{--
type Fonction num
  = Const num
  | X
  | Poly List num
  | Exp Fonction
  | Ln Fonction
  | Sin Fonction
  | Cos Fonction
--}


mathTeX a = "$" ++ a ++ "$"

fonction a = "x\\mapsto " ++ a

affineExp a b c
  = if (a,b) == (0,0) then "0"
    else if (a,c) == (0,1) then String.fromInt b ++ "e^x"
    else if a == 0 then String.fromInt b ++ "e^{" ++ (String.fromInt c) ++ "x}"
    else if (a,b,c) == (1,0,1) then "xe^x"
    else if (b,c) == (0,1) then (String.fromInt a) ++ "x" ++ "e^x"
    else if b == 0 then (String.fromInt a) ++ "x" ++ "e^{" ++ (String.fromInt c) ++ "x}"
    else if c == 1 then "\\left(" ++ (String.fromInt a) ++ "x+" ++ (String.fromInt b) ++ "\\right)e^x"
    else "\\left(" ++ (String.fromInt a) ++ "x+" ++ (String.fromInt b) ++ "\\right)e^{" ++ (String.fromInt c) ++ "x}"

derivExp02 a b c =
  let
    f aa bb cc = mathTeX ( fonction ( affineExp aa bb cc ) )
    vr aa bb cc = p [] [ text ( "+" ++ ( f aa bb cc) ) ]
    fx aa bb cc = p [] [ text ( "-" ++ ( f aa bb cc) ) ]
  in
  div []
    [ p [] [ text ("Donner la dérivée de la fonction " ++ f a b c) ]
    , vr (a*c) (a+b*c) c
    , fx (a+b) a c
    , fx (a+b) a c
    , fx (a+b*c) (a*c) c
    , fx (a-b*c) (a*c) c
    , fx (a-b*c) (a*c) c
    , fx a 0 c
    , fx (a*c) 0 c
    , fx a 0 1
    , fx (a*c) 0 1
    {--
    , p [] [ text ("----") ]
    , p [] [ text ("Avant toute chose, il faut bien voir que $\\left(" ++ (String.fromInt a) ++ "x+" ++ (String.fromInt b) ++ "\\right)e^{" ++ (String.fromInt c) ++ "x}$ est de la forme $uv$ avec $u=ax+b$ et $v=e^{cx}$.") ],
    , p [] [ text ("Ensuite, il faut savoir que la dérivée de $uv$ est donnée par $u'v+uv'$, et que la dérivée de $e^{u}$ est donnée par $e^{u}\\cdot u'$, ce qui dans notre cas nous donne que la dérivée de $e^{" ++ (String.fromInt c) ++ "x}$ est donnée par $" ++ (String.fromInt c) ++ "e^{" ++ (String.fromInt c) ++ "x}$.") ]
    , p [] [ text ("Nous avons donc que la dérivée de la fonction est :") ]
    , p [] [ text ("$\\begin{array}{rl} x\\mapsto & " ++ (String.fromInt (a)) ++ "e^{" ++ (String.fromInt c) ++ "x}+\\left(" ++ (String.fromInt (a)) ++ "x+" ++ (String.fromInt (b)) ++ "\\right)ce^{" ++ (String.fromInt (c)) ++ "x}\\\\& =" ++ (String.fromInt (a)) ++ "e^{" ++ (String.fromInt (c)) ++ "x}+\\left(" ++ (String.fromInt (a*c)) ++ "x+" ++ (String.fromInt (b*c)) ++ "\\right)e^{" ++ (String.fromInt (c)) ++ "x}\\\\ & =\\left(" ++ (String.fromInt (a)) ++ "+" ++ (String.fromInt (a*c)) ++ "x+" ++ (String.fromInt (b*c)) ++ "\\right)e^{" ++ (String.fromInt (c)) ++ "x}\\\\ & =\\left(" ++ (String.fromInt (a+b*c)) ++ "+" ++ (String.fromInt (a*c)) ++ "x\\right)e^{" ++ (String.fromInt (c)) ++ "x} \\end{array}$") ]
    --}
    , p [] [ text ("==== Dérivées, Exponentielle, derivExp02") ]
    ]



-- Des DL

monome a n =
  if a == 0 then ""
  else if n == 0 then ( String.fromInt a )
  else if (n,a) == (1,1) then "x"
  else if (n,a) == (1,-1) then "-x"
  else if n == 1 then ( String.fromInt a ) ++ "x"
  else if a == 1 then "x^{" ++ ( String.fromInt n ) ++ "}"
  else if a == -1 then "-x^{" ++ ( String.fromInt n ) ++ "}"
  else ( String.fromInt a ) ++ "x^{" ++ ( String.fromInt n ) ++ "}"

poly a_ks =
  if a_ks == [] then "0"
  else polyBis a_ks ( List.length a_ks - 1 )

polyBis a_ks n =
  case a_ks of
    [] -> ""
    a_n :: a_kss ->
      if a_n == 0 then polyBis a_kss ( n - 1 )
      else ( monome a_n n ) ++ ( polyGen a_kss ( n - 1 ) )

polyGen a_ks n =
  case a_ks of
    [] -> ""
    a_i :: a_is ->
      if a_i <= 0 then ( monome a_i n ) ++ ( polyGen a_is ( n - 1 ) )
      else "+" ++ ( monome a_i n ) ++ ( polyGen a_is ( n - 1 ) )

dl a_ks =
  if a_ks == [] then "0"
  else dlBis a_ks 0

dlBis a_ks n =
  case a_ks of
    [] -> ""
    premierCoef :: suite ->
      if premierCoef == 0 then dlBis suite ( n + 1 )
      else ( monome premierCoef n ) ++ ( dlGen suite ( n + 1 ) )

dlGen a_ks n =
  case a_ks of
    [] -> ""
    a_i :: a_is ->
      if a_i <= 0 then ( monome a_i n ) ++ ( dlGen a_is ( n + 1 ) )
      else "+" ++ ( monome a_i n ) ++ ( dlGen a_is ( n + 1 ) )

dl06 a_k =
  let
    vr texte = p [] [ text ( "+" ++ texte ) ]
    fx texte = p [] [ text ( "-" ++ texte ) ]
  in
  div []
    [ p [] [ text ( "On considère une fonction $f$ dont le développement limité à l'ordre 3 au voisinage de $0$ est " ++ mathTeX ( dl a_k ) ++ "." ) ]
    , p [] [ text ( "On note $C$ la courbe représentative de $f$ et $T_0$ sa tangente en son point d'abscisse $0$." ) ]
    , p [] [ text ( "Cocher la ou les réponses correctes." ) ]
    , vr <| "L'équation de $T_0$ est $y=" ++ poly ( List.reverse <| List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $y=" ++ poly ( List.take 2 a_k ) ++"$" -- ATTENTION à éviter les cas où a_0 = a_1
    , fx <| "L'équation de $T_0$ est $" ++ poly ( List.reverse <| List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $f\\left(x\\right)\\approx" ++ poly ( List.reverse <| List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $f\\left(x\\right)\\approx" ++ poly ( List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $" ++ poly ( List.take 2 a_k ) ++"$"
    , vr "$C$ est au-dessus de $T_0$."
    , fx "$C$ est au-dessous de $T_0$."
    , fx "$C$ est au-dessous puis au-dessus de $T_0$."
    , fx "$C$ est au-dessus puis au-dessous de $T_0$."
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Développements limités, Tangentes, dl06") ]
    ]


dl07 a_k =
  let
    vr texte = p [] [ text ( "+" ++ texte ) ]
    fx texte = p [] [ text ( "-" ++ texte ) ]
  in
  div []
    [ p [] [ text ( "On considère une fonction $f$ dont le développement limité à l'ordre 3 au voisinage de $0$ est " ++ mathTeX ( dl a_k ) ++ "." ) ]
    , p [] [ text ( "On note $C$ la courbe représentative de $f$ et $T_0$ sa tangente en son point d'abscisse $0$." ) ]
    , p [] [ text ( "Cocher la ou les réponses correctes." ) ]
    , vr <| "L'équation de $T_0$ est $y=" ++ poly ( List.reverse <| List.take 2 a_k ) ++"$"
    , vr <| "L'équation de $T_0$ est $y=" ++ poly ( List.reverse <| List.take 3 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $y=" ++ poly ( List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $" ++ poly ( List.reverse <| List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $f\\left(x\\right)\\approx" ++ poly ( List.reverse <| List.take 3 a_k ) ++"x$"
    , fx <| "L'équation de $T_0$ est $f\\left(x\\right)\\approx" ++ poly ( List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $" ++ poly ( List.take 2 a_k ) ++"$"
    , fx "$C$ est au-dessus de $T_0$."
    , vr "$C$ est au-dessous de $T_0$."
    , fx "$C$ est au-dessous puis au-dessus de $T_0$."
    , fx "$C$ est au-dessus puis au-dessous de $T_0$."
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Développements limités, Tangentes, dl07") ]
    ]


dl08 a_k =
  let
    vr texte = p [] [ text ( "+" ++ texte ) ]
    fx texte = p [] [ text ( "-" ++ texte ) ]
  in
  div []
    [ p [] [ text ( "On considère une fonction $f$ dont le développement limité à l'ordre 3 au voisinage de $0$ est " ++ mathTeX ( dl a_k ) ++ "." ) ]
    , p [] [ text ( "On note $C$ la courbe représentative de $f$ et $T_0$ sa tangente en son point d'abscisse $0$." ) ]
    , p [] [ text ( "Cocher la ou les réponses correctes." ) ]
    , vr <| "L'équation de $T_0$ est $y=" ++ poly ( List.reverse <| List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $y=" ++ poly ( List.take 2 a_k ) ++"$" -- ATTENTION à éviter les cas où a_0 = a_1
    , fx <| "L'équation de $T_0$ est $" ++ poly ( List.reverse <| List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $f\\left(x\\right)\\approx" ++ poly ( List.reverse <| List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $f\\left(x\\right)\\approx" ++ poly ( List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $" ++ poly ( List.take 2 a_k ) ++"$"
    , fx "$C$ est au-dessus de $T_0$."
    , fx "$C$ est au-dessous de $T_0$."
    , vr "$C$ est au-dessous puis au-dessus de $T_0$."
    , fx "$C$ est au-dessus puis au-dessous de $T_0$."
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Développements limités, Tangentes, dl08") ]
    ]


dl09 a_k =
  let
    vr texte = p [] [ text ( "+" ++ texte ) ]
    fx texte = p [] [ text ( "-" ++ texte ) ]
  in
  div []
    [ p [] [ text ( "On considère une fonction $f$ dont le développement limité à l'ordre 3 au voisinage de $0$ est " ++ mathTeX ( dl a_k ) ++ "." ) ]
    , p [] [ text ( "On note $C$ la courbe représentative de $f$ et $T_0$ sa tangente en son point d'abscisse $0$." ) ]
    , p [] [ text ( "Cocher la ou les réponses correctes." ) ]
    , vr <| "L'équation de $T_0$ est $y=" ++ poly ( List.reverse <| List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $y=" ++ poly ( List.take 2 a_k ) ++"$" -- ATTENTION à éviter les cas où a_0 = a_1
    , fx <| "L'équation de $T_0$ est $" ++ poly ( List.reverse <| List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $f\\left(x\\right)\\approx" ++ poly ( List.reverse <| List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $f\\left(x\\right)\\approx" ++ poly ( List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $" ++ poly ( List.take 2 a_k ) ++"$"
    , fx "$C$ est au-dessus de $T_0$."
    , fx "$C$ est au-dessous de $T_0$."
    , fx "$C$ est au-dessous puis au-dessus de $T_0$."
    , vr "$C$ est au-dessus puis au-dessous de $T_0$."
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Développements limités, Tangentes, dl09") ]
    ]


dl10 a_k k = -- À n'utiliser qu'avec a_0 = 0 !!!
  let
    coefLin =
      case a_k of
        [] -> 0
        a_0 :: [] -> 0
        a_0 :: a_1 :: a_ks -> a_1
    coefQuad =
      case a_k of
        [] -> 0
        a_0 :: [] -> 0
        a_0 :: a_1 :: [] -> 0
        a_0 :: a_1 :: a_2 :: a_ks -> a_2
    vr a b = p [] [ text <| "+$\\frac{" ++ String.fromInt a ++ "}{" ++ String.fromInt b ++ "}$" ]
    ffx a b = p [] [ text <| "-$\\frac{" ++ String.fromInt a ++ "}{" ++ String.fromInt b ++ "}$" ]
    fx a = p [] [ text <| "-$" ++ String.fromInt a ++ "$" ]
  in
  div []
    [ p [] [ text ( "On considère une fonction $f$ dont le développement limité à l'ordre 2 au voisinage de $0$ est " ++ mathTeX ( dl a_k ) ++ "." ) ]
    , p [] [ text <| "Que vaut $\\lim\\limits_{x\\to0}\\frac{f\\left(x\\right)}{" ++ (String.fromInt k) ++ "x}$" ]
    , vr coefLin k
    , ffx 1 coefLin
    , ffx 1 coefQuad
    , ffx 1 k
    , ffx coefQuad k
    , ffx k coefQuad
    , fx coefLin
    , fx coefQuad
    , fx k
    , fx 1
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Développements limités, Tangentes, dl10") ]
    ]


mapTwist a b = List.map b a

entiers = List.range 2 4

d1 = List.map derivExp02 entiers

d2 = List.concat ( List.map (mapTwist entiers) d1 )

d3 = List.concat ( List.map (mapTwist entiers) d2 )

mix lls =
  case lls of
    [] -> []
    [] :: llss -> []
    l :: [] -> List.map List.singleton l
    (a :: ls) :: llss -> ( List.map ( (::) a ) ( mix llss ) ) ++ mix ( ls :: llss )

derivPoly03 param = -- on donne a pair et positif, les deux racines x_1 < x_2, d, et m > x_2
  case param of
    [] -> div [] []
    a :: [] -> div [] []
    a :: b :: [] -> div [] []
    a :: b :: c :: [] -> div [] []
    a :: b :: c :: d :: [] -> div [] []
    a :: b :: c :: d :: e :: a_ks -> derivPoly03Bis a b c d e

derivPoly03Bis a x_1 x_2 d m =
  let
    b = 0 - 3*a*(x_1 + x_2)//2
    c = 3*a*x_1*x_2
    a_k = [a,b,c,d]
    vr texte = p [] [ text ( "+" ++ texte ) ]
    fx texte = p [] [ text ( "-" ++ texte ) ]
  in
  div []
    [ p [] [ text ( "On considère la fonction $f:x\\mapsto " ++ ( poly a_k ) ++ "$." ) ]
    , p [] [ text ( "Cocher la ou les réponses correctes." ) ]
    , vr <| "La dérivée de $f$ est la fonction $f\\prime:x\\mapsto " ++ ( poly <| polyD a_k ) ++ "$."
    , fx <| "La dérivée de $f$ est la fonction $f\\prime:x\\mapsto " ++ ( poly [3*a, 2*b, c + d] ) ++ "$."
    , fx <| "la fonction $f$ est croissante sur l'intervalle $\\left[" ++ String.fromInt x_1 ++ ";" ++ String.fromInt x_2 ++ "\\right]$"
    , vr <| "la fonction $f$ est décroissante sur l'intervalle $\\left[" ++ String.fromInt x_1 ++ ";" ++ String.fromInt x_2 ++ "\\right]$"
    , fx <| "la fonction $f$ est décroissante sur l'intervalle $\\left[" ++ String.fromInt m ++ ";+\\infty\\right[$"
    , vr <| "la fonction $f$ est croissante sur l'intervalle $\\left[" ++ String.fromInt m ++ ";+\\infty\\right[$"
    , fx <| "la fonction $f$ est croissante sur l'intervalle $\\left[" ++ String.fromInt x_1 ++ ";+\\infty\\right[$"
    , fx <| "la fonction $f$ est décroissante sur l'intervalle $\\left[" ++ String.fromInt x_1 ++ ";+\\infty\\right[$"
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Dérivée, Polynômes, derivPoly03") ]
    ]

derivPoly04 param = -- on donne a impair et négatif, les deux racines x_1 < x_2 pairs distincs, d, et m < x_1
  case param of
    [] -> div [] []
    a :: [] -> div [] []
    a :: b :: [] -> div [] []
    a :: b :: c :: [] -> div [] []
    a :: b :: c :: d :: [] -> div [] []
    a :: b :: c :: d :: e :: a_ks -> derivPoly04Bis a b c d e

derivPoly04Bis a x_1 x_2 d m =
  let
    b = 0 - 3*a*(x_1 + x_2)//2
    c = 3*a*x_1*x_2
    a_k = [a,b,c,d]
    vr texte = p [] [ text ( "+" ++ texte ) ]
    fx texte = p [] [ text ( "-" ++ texte ) ]
  in
  div []
    [ p [] [ text ( "On considère la fonction $f:x\\mapsto " ++ ( poly a_k ) ++ "$." ) ]
    , p [] [ text ( "Cocher la ou les réponses correctes." ) ]
    , vr <| "La dérivée de $f$ est la fonction $f\\prime:x\\mapsto " ++ ( poly <| polyD a_k ) ++ "$."
    , fx <| "La dérivée de $f$ est la fonction $f\\prime:x\\mapsto " ++ ( poly [3*a, 2*b, c + d] ) ++ "$."
    , vr <| "la fonction $f$ est croissante sur l'intervalle $\\left[" ++ String.fromInt x_1 ++ ";" ++ String.fromInt x_2 ++ "\\right]$"
    , fx <| "la fonction $f$ est décroissante sur l'intervalle $\\left[" ++ String.fromInt x_1 ++ ";" ++ String.fromInt x_2 ++ "\\right]$"
    , vr <| "la fonction $f$ est décroissante sur l'intervalle $\\left]-\\infty;" ++ String.fromInt m ++ "\\right]$"
    , fx <| "la fonction $f$ est croissante sur l'intervalle $\\left]-\\infty;" ++ String.fromInt m ++ "\\right[$"
    , fx <| "la fonction $f$ est croissante sur l'intervalle $\\left[" ++ String.fromInt x_1 ++ ";+\\infty\\right[$"
    , fx <| "la fonction $f$ est décroissante sur l'intervalle $\\left[" ++ String.fromInt x_1 ++ ";+\\infty\\right[$"
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Dérivée, Polynômes, derivPoly04") ]
    ]

polyD a_ks = polyDbis a_ks ( List.length a_ks - 1 )

polyDbis a_ks n =
  case a_ks of
    [] -> []
    a_0 :: [] -> []
    a_k :: a_kss -> ( n*a_k ) :: polyDbis a_kss ( n - 1 ) 

equaDiff04 a = -- a négatif
  let
    f aa = mathTeX ( fonction ( aa ) )
    vr aa = p [] [ text ( "+" ++ ( f aa ) ) ]
    fx aa = p [] [ text ( "-" ++ ( f aa ) ) ]
  in
  div []
    [ p [] [ text <| "Parmi les fonctions ci-dessous, lesquelles sont des solutions de l'équation différentielle $y'=" ++ String.fromInt a ++ "y$ ?" ]
    , vr <| String.fromInt ( a - 1 ) ++ "e^{" ++ String.fromInt a ++ "x}"
    , vr <| String.fromInt ( a + 4 ) ++ "e^{" ++ String.fromInt a ++ "x}"
    , vr <| String.fromInt a ++ "e^{" ++ String.fromInt a ++ "x}"
    , fx <| String.fromInt a ++ "e^{" ++ String.fromInt (a-1) ++ "x}"
    , fx <| String.fromInt ( a - 3 ) ++ "e^x"
    , fx <| String.fromInt ( a + 7 ) ++ "e^x" ++ String.fromInt a
    , fx <| String.fromInt a ++ "e^x"
    , fx <| String.fromInt a ++ "e^x+" ++ String.fromInt ( a + 100)
    , fx <| String.fromInt ( a - 1 ) ++ "e^x+" ++ String.fromInt ( a + 100)
    , fx <| String.fromInt ( a - 8 ) ++ "e^{" ++ String.fromInt (a-1) ++ "x}" ++ String.fromInt a
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Équations différentielles, equaDiff04") ]
    ]

equaDiff05 param =
  case param of
    [] -> div [] []
    a :: [] -> div [] []
    a :: b :: c -> equaDiff05Bis a b

equaDiff05Bis a b = -- a positif, b négatif, pas de simplification
  let
    f aa = mathTeX ( fonction ( aa ) )
    vr aa = p [] [ text ( "+" ++ ( f aa ) ) ]
    fx aa = p [] [ text ( "-" ++ ( f aa ) ) ]
  in
  div []
    [ p [] [ text <| "Parmi les fonctions ci-dessous, lesquelles sont des solutions de l'équation différentielle $" ++ String.fromInt a ++"y'=" ++ String.fromInt b ++ "y$ ?" ]
    , vr <| String.fromInt ( a - 17 ) ++ "e^{-\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}x}"
    , vr <| String.fromInt ( a + 23 ) ++ "e^{-\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}x}"
    , fx <| String.fromInt ( a + 3 ) ++ "e^{\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}x}"
    , fx <| String.fromInt ( a - 17 ) ++ "e^{\\frac{" ++ String.fromInt a ++ "}{" ++ String.fromInt (0 - b) ++ "}x}"
    , fx <| String.fromInt ( a + 23 ) ++ "e^{-\\frac{" ++ String.fromInt a ++ "}{" ++ String.fromInt (0 - b) ++ "}x}"
    , fx <| String.fromInt a ++ "e^{" ++ String.fromInt b ++ "x}-\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}"
    , fx <| String.fromInt a ++ "e^{" ++ String.fromInt b ++ "x}+\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}"
    , fx <| String.fromInt b ++ "e^{" ++ String.fromInt b ++ "x}-\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}"
    , fx <| String.fromInt b ++ "e^{" ++ String.fromInt b ++ "x}+\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}"
    , fx <| "e^x+\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}"
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Équations différentielles, equaDiff05") ]
    ]

equaDiff06 param =
  case param of
    [] -> div [] []
    a :: [] -> div [] []
    a :: b :: c -> equaDiff06Bis a b

equaDiff06Bis a b = -- a positif, b négatif, pas de simplification
  let
    f aa = mathTeX ( fonction ( aa ) )
    vr aa = p [] [ text ( "+" ++ ( f aa ) ) ]
    fx aa = p [] [ text ( "-" ++ ( f aa ) ) ]
  in
  div []
    [ p [] [ text <| "Parmi les fonctions ci-dessous, lesquelles sont des solutions de l'équation différentielle $y'=" ++ String.fromInt a ++ "y" ++ String.fromInt b ++"$ ?" ]
    , fx <| String.fromInt ( a - 17 ) ++ "e^{-\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}x}"
    , fx <| String.fromInt ( a + 23 ) ++ "e^{-\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}x}"
    , fx <| String.fromInt ( a + 3 ) ++ "e^{\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}x}"
    , fx <| String.fromInt ( a - 17 ) ++ "e^{\\frac{" ++ String.fromInt a ++ "}{" ++ String.fromInt (0 - b) ++ "}x}"
    , fx <| String.fromInt ( a + 23 ) ++ "e^{-\\frac{" ++ String.fromInt a ++ "}{" ++ String.fromInt (0 - b) ++ "}x}"
    , fx <| String.fromInt a ++ "e^{" ++ String.fromInt a ++ "x}-\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}"
    , vr <| String.fromInt a ++ "e^{" ++ String.fromInt a ++ "x}+\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}"
    , fx <| String.fromInt b ++ "e^{" ++ String.fromInt a ++ "x}-\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}"
    , vr <| String.fromInt b ++ "e^{" ++ String.fromInt a ++ "x}+\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}"
    , fx <| "e^x+\\frac{" ++ String.fromInt (0 - b) ++ "}{" ++ String.fromInt a ++ "}"
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Équations différentielles, equaDiff06") ]
    ]

primitLn02 a_k =
  case a_k of
    [] -> div [] []
    a :: [] -> div [] []
    a :: b :: c -> primitLn02Bis a b

primitLn02Bis a b =
  let
    f aa = mathTeX ( fonction ( aa ) )
    vr aa = p [] [ text ( "+" ++ ( f aa ) ) ]
    fx aa = p [] [ text ( "-" ++ ( f aa ) ) ]
    axpb = poly [a,b]
  in
  div []
    [ p [] [ text <| "Parmi les fonctions ci-dessous, lesquelles sont des primitives de la fonction " ++ ( f <| "\\frac{" ++ String.fromInt a ++ "}{" ++ axpb ++ "}" ) ++ " ?" ]
    , vr <| "\\ln\\left(" ++ axpb ++ "\\right)"
    , vr <| "\\ln\\left(" ++ axpb ++ "\\right)+" ++ String.fromInt ( b + 30 )
    , vr <| "\\ln\\left(" ++ axpb ++ "\\right)" ++ String.fromInt ( a - 20)
    , fx <| "\\frac{" ++ String.fromInt (a*a) ++ "}{\\left(" ++ axpb ++ "\\right)^2}"
    , fx <| "\\frac{" ++ String.fromInt (a*a) ++ "}{" ++ axpb ++ "}" ++ String.fromInt ( b + 30 )
    , fx <| "\\frac{" ++ String.fromInt (0 - a*a) ++ "}{\\left(" ++ axpb ++ "\\right)^2}"
    , fx <| "\\frac{" ++ String.fromInt (0 - a*a) ++ "}{" ++ axpb ++ "}" ++ String.fromInt ( b + 30 )
    , fx <| "\\frac{" ++ String.fromInt (0 - a*a) ++ "}{" ++ axpb ++ "}" ++ String.fromInt ( a - 20)
    , fx <| "\\frac{" ++ poly [a*a, a*b+a*a] ++ "}{\\left(" ++ axpb ++ "\\right)^2}"
    , fx <| "\\frac{" ++ poly [a*a, a*b-a*a] ++ "}{\\left(" ++ axpb ++ "\\right)^2}"
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Primitives, Logarithme, primitLn02") ]
    ]

primitPoly02 a_k =
  case a_k of
    [] -> div [] []
    a :: [] -> div [] []
    a :: b :: [] -> div [] []
    a :: b :: c :: [] -> div [] []
    a :: b :: c :: d :: e -> primitPoly02Bis a b c d

primitPoly02Bis a b c d =
  let
    pol = [a,b,c,d,0]
    polD = polyD pol
    polDD = polyD polD
    f a_k = mathTeX ( fonction ( poly a_k ) )
    vr a_k = p [] [ text ( "+" ++ ( f a_k ) ) ]
    fx a_k = p [] [ text ( "-" ++ ( f a_k ) ) ]
  in
  div []
    [ p [] [ text <| "Parmi les fonctions ci-dessous, lesquelles sont des primitives de la fonction " ++ ( f polD ) ++ " ?" ]
    , vr <| List.map2 (+) pol [0,0,0,0,5]
    , vr <| List.map2 (+) pol [0,0,0,0,-8]
    , vr <| List.map2 (+) pol [0,0,0,0,8]
    , fx <| List.map2 (+) polD [0,0,0,8]
    , fx <| List.map2 (+) polD [0,0,0,-5]
    , fx <| List.map2 (+) polD [0,0,0,-8]
    , fx <| List.map2 (+) polDD [0,0,8]
    , fx <| List.map2 (+) polDD [0,0,-5]
    , fx <| List.map2 (+) polDD [0,0,-8]
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Primitives, Polynômes, primitPoly02") ]
    ]




