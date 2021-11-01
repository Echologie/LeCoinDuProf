module ParserTest exposing (..)

import Parser exposing (..)
import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Maybe exposing (Maybe)
import Result exposing (Result)



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
  div [] [ text texte ]


texte = voirArbresParses <| run (withIndent -1 arbres) -- permet d'avoir...
  """
  *
    *
    *
      *
      *
      *
        *
        *
      *
        *
      *
*                  <- cet arbre
      *
      *
      *
"""

unArbre =
  Arbre
    [ Arbre []
    , Arbre
      [ Arbre []
      ]
    ]

voirArbresParses arbresParsesPotentiels =
  case arbresParsesPotentiels of
    Err erreurs -> deadEndsToStringBis erreurs
    Ok arbresParses -> voirArbres arbresParses

deadEndsToStringBis errs =
  errs
  |> List.map voirErreur
  |> String.concat
  |> (++) "Il y a des problèmes aux endroits suivants :\n"

voirErreur err =
  "Ligne : " ++ String.fromInt err.row
  ++ " | Colonne : " ++ String.fromInt err.col

type Arbre = Arbre (List Arbre)

voirArbre arbr =
  case arbr of
    Arbre [] -> "[]"
    Arbre arbrs -> "[" ++ String.concat (List.map voirArbre arbrs) ++ "]"

voirArbres =
  List.map voirArbre >> String.concat

{-| Ce parser change l'indentation courante, cré un arbre puis
  y intègre ses branches grâce à une boucle
-}
arbre : Parser Arbre
arbre =
  let
    suite =
      flip withIndent
        <| succeed Arbre
          |. symbol "*"
          |= arbres
  in
  getCol
  |> andThen suite

flip f a b = f b a

arbres =
  let
    sousArbres arbrs =
      let
        boucle =
          succeed ( \arbr -> Loop (arbr :: arbrs) )
            |= lazy (\_ -> arbre)
        fin =
          map (\_ -> Done (List.reverse arbrs))
        suite col_ind =
          oneOf
            [ succeed ()
                |. end
              |> fin
            , if Tuple.first col_ind > Tuple.second col_ind then -- if col > ind
                boucle
              else
                succeed ()
                |> fin
             ]
      in
      succeed Tuple.pair
      |. spaces
      |= getCol
      |= getIndent
      |> andThen suite
  in
  loop [] sousArbres