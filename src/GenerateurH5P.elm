module GenerateurH5P exposing (..)

import Browser exposing (Document)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import Element.Input as Input
import File.Download
import Fraction as F exposing (Fraction)
import Html exposing (Attribute, Html, button, div, iframe, input, p, section, textarea)
import List as L
import Parser as P exposing (..)
import ParserExpressionMathematique as Pem
import Random
import Random.Extra
import Random.List
import Set
import String as S
import Style exposing (..)


titre =
    "Générateur d'archives H5P"



{-
   ███    ███  ██████  ██████  ███████ ██
   ████  ████ ██    ██ ██   ██ ██      ██
   ██ ████ ██ ██    ██ ██   ██ █████   ██
   ██  ██  ██ ██    ██ ██   ██ ██      ██
   ██      ██  ██████  ██████  ███████ ███████
-}


type alias Model =
    { structureDuContenu : String
    , contenuGenere : String
    }


init : Model
init =
    { structureDuContenu = ""
    , contenuGenere = ""
    }



{-
   ██    ██ ██████  ██████   █████  ████████ ███████
   ██    ██ ██   ██ ██   ██ ██   ██    ██    ██
   ██    ██ ██████  ██   ██ ███████    ██    █████
   ██    ██ ██      ██   ██ ██   ██    ██    ██
    ██████  ██      ██████  ██   ██    ██    ███████
-}


type Msg
    = StructureDuContenu String
    | GenererContenu
    | TelechargerContenu


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        StructureDuContenu nouvelleStructure ->
            ( { model | structureDuContenu = nouvelleStructure }
            , Cmd.none
            )

        GenererContenu ->
            let
                f strCtn =
                    case P.run (withIndent -1 contenu) strCtn of
                        Ok ctn ->
                            voirBlocs ctn

                        Err erreurs ->
                            deadEndsToStringBis erreurs
            in
            ( { model | contenuGenere = f model.structureDuContenu }
            , Cmd.none
            )

        TelechargerContenu ->
            ( model
            , File.Download.string "content.json" "text/json" model.contenuGenere
            )



-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none



{-

   ██    ██ ██ ███████ ██     ██
   ██    ██ ██ ██      ██     ██
   ██    ██ ██ █████   ██  █  ██
    ██  ██  ██ ██      ██ ███ ██
     ████   ██ ███████  ███ ███
-}


view : Model -> Element Msg
view model =
    row
        [ spacing grandEspacement
        , padding tresGrandEspacement
        , height fill
        , width fill
        , scrollbars
        ]
        [ Input.multiline
            [ height fill
            , width fill
            , clip
            , scrollbars
            , Background.color <| couleurUI <| couleurArrierePlan
            , Border.rounded 8
            , Border.innerShadow
                { blur = 10
                , color = rgb255 10 10 10
                , offset = ( 0.3, 0.4 )
                , size = 2
                }
            ]
            { onChange = StructureDuContenu
            , label = Input.labelHidden "chose"
            , placeholder =
                Just <|
                    Input.placeholder [] <|
                        text "Structure du contenu"
            , text = model.structureDuContenu
            , spellcheck = True
            }
        , column [ spacing petitEspacement, height fill, width fill, scrollbars ]
            -- L'attibut scrollbars présent dans la liste ci-dessus  ^^^^^^^^^^
            -- est nécessaire pour que l'élément ci-dessous ne s'étende pas !
            [ row
                [ width fill
                , padding petitEspacement
                , spacing tresGrandEspacement
                ]
                [ bouton GenererContenu "Générer le contenu"
                , bouton TelechargerContenu "Télécharger"
                ]
            , el
                --^^ Cet élément ci
                [ height fill
                , width fill
                , clip
                , scrollbars

                --^^^^^^^^^^ Cet attribut ne suffit pas
                , padding petitEspacement
                , Background.color <| couleurUI <| couleurArrierePlan
                , Border.rounded 8
                , Border.innerShadow
                    { blur = 10
                    , color = rgb255 10 10 10
                    , offset = ( 0.3, 0.4 )
                    , size = 2
                    }
                ]
              <|
                text model.contenuGenere
            ]
        ]



{-
   '########:::::'###::::'########:::'######::'########:'########::
      ##.... ##:::'## ##::: ##.... ##:'##... ##: ##.....:: ##.... ##:
      ##:::: ##::'##:. ##:: ##:::: ##: ##:::..:: ##::::::: ##:::: ##:
      ########::'##:::. ##: ########::. ######:: ######::: ########::
      ##.....::: #########: ##.. ##::::..... ##: ##...:::: ##.. ##:::
      ##:::::::: ##.... ##: ##::. ##::'##::: ##: ##::::::: ##::. ##::
      ##:::::::: ##:::: ##: ##:::. ##:. ######:: ########: ##:::. ##:
     ..:::::::::..:::::..::..:::::..:::......:::........::..:::::..::
-}


type alias Blocs =
    List Bloc


type Bloc
    = Contenu Blocs


voirBlocs blocsPotentiel =
    ""



{- voirBlocs blocsPotentiel =
   case P.run (withIndent -1 blocs) blocsPotentiel of
       Ok sjt ->
           Random.map quizScanVoirBlocs <| blocsAleatoires sjt

       Err erreurs ->
           Random.constant <| deadEndsToStringBis erreurs
-}


deadEndsToStringBis errs =
    errs
        |> List.map voirErreur
        |> String.concat
        |> (++) "Il y a des problèmes aux endroits suivants :\n"


voirErreur err =
    "Ligne : "
        ++ String.fromInt err.row
        ++ " | Colonne : "
        ++ String.fromInt err.col


contenu : Parser Blocs
contenu =
    succeed (L.singleton << Contenu)
        |= blocs


blocs : Parser Blocs
blocs =
    succeed []
