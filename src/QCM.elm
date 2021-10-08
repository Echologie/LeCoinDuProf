module QCM exposing (..)

import Browser
import Parser as P exposing (Parser, (|.), (|=), succeed, symbol, float, spaces)
import List as L
import ParserMaths as PM
import String as S
import Fractions as F exposing (Frac)
import Html exposing (Html, Attribute, button, div, input, text, p)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput, onClick)

{-
        ███    ███  █████  ██ ███    ██ 
        ████  ████ ██   ██ ██ ████   ██ 
        ██ ████ ██ ███████ ██ ██ ██  ██ 
        ██  ██  ██ ██   ██ ██ ██  ██ ██ 
        ██      ██ ██   ██ ██ ██   ████ 
-}

main =
  Browser.sandbox { init = init, update = update, view = view }


{-
        ███    ███  ██████  ██████  ███████ ██      
        ████  ████ ██    ██ ██   ██ ██      ██      
        ██ ████ ██ ██    ██ ██   ██ █████   ██      
        ██  ██  ██ ██    ██ ██   ██ ██      ██      
        ██      ██  ██████  ██████  ███████ ███████ 
-}

type alias Model =
  { question : String
  , questions : List String
  }


init : Model
init =
  { question = ""
  , questions = [ "" ]
  }


{-
        ██    ██ ██████  ██████   █████  ████████ ███████ 
        ██    ██ ██   ██ ██   ██ ██   ██    ██    ██      
        ██    ██ ██████  ██   ██ ███████    ██    █████   
        ██    ██ ██      ██   ██ ██   ██    ██    ██      
         ██████  ██      ██████  ██   ██    ██    ███████ 
-}

type Msg
  = Question String
  | GenererQuestion

update : Msg -> Model -> Model
update msg model =
  case msg of
    Question nouvelleQuestion ->
      { model | question = nouvelleQuestion }
    GenererQuestion ->
      { model | questions = [
        case P.run questions model.question of
          Ok macro -> voirMacro macro
          Err _ -> "Y a un truc qui cloche !"
      ] }


{-

        ██    ██ ██ ███████ ██     ██ 
        ██    ██ ██ ██      ██     ██ 
        ██    ██ ██ █████   ██  █  ██ 
         ██  ██  ██ ██      ██ ███ ██ 
          ████   ██ ███████  ███ ███  
-}

view : Model -> Html Msg
view model =
  div []
    <| input [ placeholder "Format de la question", value model.question, onInput Question ] []
    :: button [ onClick GenererQuestion ] [ text "Générer les questions" ]
    :: ( p [] <| L.map text model.questions )
    :: [ text
      (
        let expressionParseePotentielle = PM.parseMaths "3+(2/3)^-2/3"
        in
        case expressionParseePotentielle of
          Err erreur -> "L'expression est mal formée."
          Ok expressionParsee ->
            case Maybe.map F.teX <| PM.evaluer <| expressionParsee of
              Just a -> a
              Nothing -> "Les puissances non-entières ne sont pas acceptées."
      ) ]

    {-
    , [ dl05 [0, 4, 2] 5 ]
    , [ text ( poly [0, 0, 7, -3, 0 , 2, 1 , -1 , 3 , 1, 1, 1, 5] ) ]
    , [ primitLn01 [-5,-6] ]
    , [ primitPoly01 [2,-5,1,7] ] -- J'ai oublié de les générer !!!!!!!
    , [ equaDiff01 -5 ]
    , [ equaDiff02 [4, -5] ]
    , [ equaDiff03 [4, -5] ]
    , [ derivPoly01 [4, -5, 3, 5, 13] ]
    , [ derivPoly02 [-3, -4, 2, 7, -13] ]
    , [ dl01 [-5, -2, 2, -1] ]
    , [ dl02 [-5, 0, -2, -1] ]
    , [ dl03 [0, -8, 0, 7] ]
    , [ dl04 [-1, 2, 0, -3] ]
    , List.map equaDiff01 <| List.range -99 -2 -- 98 possibilités OK
    , List.map equaDiff02 ( mix [ [3,5,9,11,13,17,27,15,25,27], [-2,-4,-7,-8,-14,-16,-19,-23,-28,-29] ] )  -- 100 possibilités OK
    , List.map equaDiff03 ( mix [ [3,5,9,11,13,17,27,15,25,27], [-2,-4,-7,-8,-14,-16,-19,-23,-28,-29] ] )  -- 100 possibilités OK
      -- Pourries par un List.range -2 1 ++ List.range 1 2 qui passe à 900 et 768 possibilités dans evalbox, dont répétitions
    , List.map derivPoly01 ( mix [ [2,4,6], List.range -6 -2, List.range 2 6, List.range -2 -1 ++ List.range 1 2, List.range 11 12 ] )  -- 600 possibilités
    , List.map derivPoly02 ( mix [ [-9,-7,-5,-3], [-8,-6,-4,-2], [2,4,6,8], List.range -2 -1 ++ List.range 1 2, List.range -12 -11 ] )  -- 512 possibilités
    , List.map primitLn01 ( mix [ List.range -9 -2 ++ List.range 2 9, List.range -9 -2 ++ List.range 2 9 ] )  -- 256 possibilités OK
    , List.map dl01 ( mix [ [-5,-3,-1,1,3,5], [-6,-4,-2,2,4,6], [1,2,3], [-3,-2,-1,1,2,3] ] )  -- 648 possibilités OK
    , List.map dl02 ( mix [ [-5,-4,-3,-2,-1,1,2,3,4,5], [0], [-1,-2,-3,-4,-5], [-3,-2,-1,1,2,3] ] )  -- 300 possibilités (toutes les questions en double because import pourri)
    , List.map dl03 ( mix [ [0], [-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9], [0], [1,2,3,4,5,6,7,8,9] ] )  -- 162 possibilités OK
    , List.map dl04 ( mix [ [-5,-3,-1,1,3,5], [-6,-4,-2,2,4,6], [0], [-9,-8,-7,-6,-5,-4,-3,-2,-1] ] )  --324 possibilités Ok
    , List.concat <| List.map ( mapTwist [3,5,9] ) ( List.map dl05 ( mix [ [0], [2,4,7,8,11,13,16,17], [2,4,7,8,11,13,16,17] ] ) )  -- 192 possibilités OK
    , d3 -- 512 possibilités OK
    :: ( List.map primitPoly01 <| mix [ List.range -3 -2 ++ List.range 2 3, List.range -3 -2 ++ List.range 2 3, List.range -3 -2 ++ List.range 2 3, List.range -3 -2 ++ List.range 2 3 ] ) -- 256 possibilités OK
    -}


{-
        ██████   █████  ██████  ███████ ███████ ██████  
        ██   ██ ██   ██ ██   ██ ██      ██      ██   ██ 
        ██████  ███████ ██████  ███████ █████   ██████  
        ██      ██   ██ ██   ██      ██ ██      ██   ██ 
        ██      ██   ██ ██   ██ ███████ ███████ ██   ██ 
-}

type TexteVariable
  = Texte String
  | Variable String

type alias Macro
  = List TexteVariable

voirMacro macro
  = S.concat <| L.map voirTexteVariable macro

voirTexteVariable txtvar
  = case txtvar of
    Texte txt -> txt
    Variable var -> var

texteSansVariables : Parser TexteVariable
texteSansVariables
  = succeed Texte
  |= P.getChompedString (
    succeed ()
    |. P.chompIf ( (/=) '#' )
    |. P.chompWhile ( (/=) '#' )
  )

expressionVariable : Parser TexteVariable
expressionVariable
  = succeed Variable
  |. symbol "#"
  |= P.getChompedString ( P.chompUntil "#" )
  |. symbol "#"

questions : Parser Macro
questions =
  P.loop [] questionsBis

questionsBis : Macro -> Parser (P.Step Macro Macro)
questionsBis ls =
  P.oneOf
    [ succeed (\l -> P.Loop (l :: ls))
        |= P.oneOf [ expressionVariable , texteSansVariables ]
    , succeed ()
        |> P.map (\_ -> P.Done (List.reverse ls))
    ]

{-
        ███    ███ ██ ██   ██ ███████ ██    ██ ██████  
        ████  ████ ██  ██ ██  ██      ██    ██ ██   ██ 
        ██ ████ ██ ██   ███   █████   ██    ██ ██████  
        ██  ██  ██ ██  ██ ██  ██      ██    ██ ██   ██ 
        ██      ██ ██ ██   ██ ███████  ██████  ██   ██ 
-}

-- mix [ [1,2] , [3,4] , [5,6] ] == [ [1,3,5] , [1,3,6] , [1,4,5] , [1,4,6] , [2,3,5] , ... ]
mix lls =
  case lls of
    [] -> []
    [] :: llss -> []
    l :: [] -> List.map List.singleton l
    (a :: ls) :: llss -> ( List.map ( (::) a ) ( mix llss ) ) ++ mix ( ls :: llss )




{-

        ███████ ██   ██ ██████  ██████  ███████ ███████ ███████ ██  ██████  ███    ██ ███████ 
        ██       ██ ██  ██   ██ ██   ██ ██      ██      ██      ██ ██    ██ ████   ██ ██      
        █████     ███   ██████  ██████  █████   ███████ ███████ ██ ██    ██ ██ ██  ██ ███████ 
        ██       ██ ██  ██      ██   ██ ██           ██      ██ ██ ██    ██ ██  ██ ██      ██ 
        ███████ ██   ██ ██      ██   ██ ███████ ███████ ███████ ██  ██████  ██   ████ ███████ 
                                                                                              
                                                                                              

-}

type Expr num
  = Const num
  | Var String
  | Poly ( List num )
  | Exp ( Expr num )
  | Ln ( Expr num )
  | Sin ( Expr num )
  | Cos ( Expr num )
  | Prod ( Expr num ) ( Expr num )
  | Quot ( Expr num ) ( Expr num )
  | Sum ( Expr num ) ( Expr num )
  | Diff ( Expr num ) ( Expr num )
  | Power ( Expr num ) num

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

polyD a_ks = polyDbis a_ks ( List.length a_ks - 1 )

polyDbis a_ks n =
  case a_ks of
    [] -> []
    a_0 :: [] -> []
    a_k :: a_kss -> ( n*a_k ) :: polyDbis a_kss ( n - 1 )

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


{-

         ██████   ██████ ███    ███ 
        ██    ██ ██      ████  ████ 
        ██    ██ ██      ██ ████ ██ 
        ██ ▄▄ ██ ██      ██  ██  ██ 
         ██████   ██████ ██      ██ 
            ▀▀                      
                                    

-}



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

derivExp01 a b c =
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
    , p [] [ text ("==== Dérivées, Exponentielle, derivExp01") ]
    ]



-- Des DL



dl01 a_k =
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
    , p [] [ text ("==== Développements limités, Tangentes, dl01") ]
    ]


dl02 a_k =
  let
    vr texte = p [] [ text ( "+" ++ texte ) ]
    fx texte = p [] [ text ( "-" ++ texte ) ]
  in
  div []
    [ p [] [ text ( "On considère une fonction $f$ dont le développement limité à l'ordre 3 au voisinage de $0$ est " ++ mathTeX ( dl a_k ) ++ "." ) ]
    , p [] [ text ( "On note $C$ la courbe représentative de $f$ et $T_0$ sa tangente en son point d'abscisse $0$." ) ]
    , p [] [ text ( "Cocher la ou les réponses correctes." ) ]
    , vr <| "L'équation de $T_0$ est $y=" ++ poly ( List.reverse <| List.take 2 a_k ) ++"$"
    , fx <| "L'équation de $T_0$ est $y=" ++ poly ( List.reverse <| List.take 3 a_k ) ++"$"
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
    , p [] [ text ("==== Développements limités, Tangentes, dl02") ]
    ]


dl03 a_k =
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
    , p [] [ text ("==== Développements limités, Tangentes, dl03") ]
    ]


dl04 a_k =
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
    , p [] [ text ("==== Développements limités, Tangentes, dl04") ]
    ]


dl05 a_k k = -- À n'utiliser qu'avec a_0 = 0 !!!
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
    , p [] [ text ("==== Développements limités, Tangentes, dl05") ]
    ]


mapTwist a b = List.map b a

entiers = List.range 2 9

d1 = List.map derivExp01 entiers

d2 = List.concat ( List.map (mapTwist entiers) d1 )

d3 = List.concat ( List.map (mapTwist entiers) d2 )

derivPoly01 param = -- on donne a pair et positif, les deux racines x_1 < x_2, d, et m > x_2
  case param of
    [] -> div [] []
    a :: [] -> div [] []
    a :: b :: [] -> div [] []
    a :: b :: c :: [] -> div [] []
    a :: b :: c :: d :: [] -> div [] []
    a :: b :: c :: d :: e :: a_ks -> derivPoly01Bis a b c d e

derivPoly01Bis a x_1 x_2 d m =
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
    , p [] [ text ("==== Dérivée, Polynômes, derivPoly01") ]
    ]

derivPoly02 param = -- on donne a impair et négatif, les deux racines x_1 < x_2 pairs distincs, d, et m < x_1
  case param of
    [] -> div [] []
    a :: [] -> div [] []
    a :: b :: [] -> div [] []
    a :: b :: c :: [] -> div [] []
    a :: b :: c :: d :: [] -> div [] []
    a :: b :: c :: d :: e :: a_ks -> derivPoly02Bis a b c d e

derivPoly02Bis a x_1 x_2 d m =
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
    , p [] [ text ("==== Dérivée, Polynômes, derivPoly02") ]
    ]


equaDiff01 a = -- a négatif
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
    , p [] [ text ("==== Équations différentielles, equaDiff01") ]
    ]

equaDiff02 param =
  case param of
    [] -> div [] []
    a :: [] -> div [] []
    a :: b :: c -> equaDiff02Bis a b

equaDiff02Bis a b = -- a positif, b négatif, pas de simplification
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
    , p [] [ text ("==== Équations différentielles, equaDiff02") ]
    ]

equaDiff03 param =
  case param of
    [] -> div [] []
    a :: [] -> div [] []
    a :: b :: c -> equaDiff03Bis a b

equaDiff03Bis a b = -- a positif, b négatif, pas de simplification
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
    , p [] [ text ("==== Équations différentielles, equaDiff03") ]
    ]

primitLn01 a_k =
  case a_k of
    [] -> div [] []
    a :: [] -> div [] []
    a :: b :: c -> primitLn01Bis a b

primitLn01Bis a b =
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
    , fx <| "\\frac{" ++ String.fromInt (0 - a*a) ++ "}{" ++ axpb ++ "}+" ++ String.fromInt ( b + 30 )
    , fx <| "\\frac{" ++ String.fromInt (0 - a*a) ++ "}{" ++ axpb ++ "}" ++ String.fromInt ( a - 20)
    , fx <| "\\frac{" ++ poly [a*a, a*b+a*a] ++ "}{\\left(" ++ axpb ++ "\\right)^2}"
    , fx <| "\\frac{" ++ poly [a*a, a*b-a*a] ++ "}{\\left(" ++ axpb ++ "\\right)^2}"
    {--
    , p [] [ text ("----") ]
    --}
    , p [] [ text ("==== Primitives, Logarithme, primitLn01") ]
    ]

primitPoly01 a_k =
  case a_k of
    [] -> div [] []
    a :: [] -> div [] []
    a :: b :: [] -> div [] []
    a :: b :: c :: [] -> div [] []
    a :: b :: c :: d :: e -> primitPoly01Bis a b c d

primitPoly01Bis a b c d =
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
    , p [] [ text ("==== Primitives, Polynômes, primitPoly01") ]
    ]




