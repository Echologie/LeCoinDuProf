module ParserTest exposing (..)

import Parser as P exposing (..)
import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Maybe exposing (Maybe)
import Result exposing (Result)
import String as S
import List as L
import ParserMaths as PM
import Fractions as F exposing (Frac)



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
  div [] [ text unTexte ]

{-
  Sans le withIndent -1, les arbres sous-indentés sautes
-}
unTexte = voirArbresParses <| run (withIndent -1 arbres)
{--}
  """
  macro
   hh
  
jj
  """
--}
{--
  """
  *
    *
    #1+3#
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
      *
  *
  *
  *
  """
--}

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

type Arbre = Arbre String (List Arbre)

voirArbre arbr =
  Debug.log "voirArbre " <|
  case arbr of
    Arbre chn arbrs -> chn ++ "\n  [" ++ String.concat (List.map voirArbre arbrs) ++ "]"

voirArbres =
  List.map voirArbre >> String.concat

{-| Ce parser change l'indentation courante, cré un arbre puis
  y intègre ses branches grâce à une boucle
-}
arbre : Parser Arbre
arbre =
  let
    suite =
      Debug.log "? :" <|
      flip withIndent
        <| succeed Arbre
          |= chaine
          |= arbres
  in
  getCol
  |> andThen suite
  |> Debug.log "Arbre : "

flip f a b = f b a

arbres =
  let
    sousArbres arbrs =
      let
        boucle =
          succeed ( \arbr -> Loop (arbr :: arbrs) )
            |= arbre -- lazy (\_ -> arbre) semble inutile malgrè l'appel récursif...
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
  |> Debug.log "Début de la boucle arbres "


{-
██████   █████  ██████  ███████ ███████ ██████      ███    ███  █████   ██████ ██████   ██████  
██   ██ ██   ██ ██   ██ ██      ██      ██   ██     ████  ████ ██   ██ ██      ██   ██ ██    ██ 
██████  ███████ ██████  ███████ █████   ██████      ██ ████ ██ ███████ ██      ██████  ██    ██ 
██      ██   ██ ██   ██      ██ ██      ██   ██     ██  ██  ██ ██   ██ ██      ██   ██ ██    ██ 
██      ██   ██ ██   ██ ███████ ███████ ██   ██     ██      ██ ██   ██  ██████ ██   ██  ██████  
-}

chaine : Parser String
chaine =
  let
    suite txt =
      P.oneOf
        [ succeed (\x -> P.Loop (txt ++ x))
            |= texte
            {--
            |= P.oneOf
              [ texte
              , retourAlaLigne
              ]
            --}
        , succeed ()
            --|. token "\n"
            |> P.map (\_ -> P.Done [txt])
        ]
    tete ls =
      case ls of
        [] -> ""
        l :: lss -> l
  in
  succeed tete
  |= P.loop "" suite
  |> Debug.log "macro "

texte : Parser String
texte =
  P.getChompedString
  <| succeed ()
    |. P.chompIf ( (/=) '\n' )
    |. P.chompWhile ( (/=) '\n' )

retourAlaLigne : Parser String
retourAlaLigne =
  let
    suite ind =
      succeed "\n"
        |. token "\n"
        |. token (S.repeat ind " ")
  in
  getIndent
  |> andThen suite