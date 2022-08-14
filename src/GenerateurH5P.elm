module GenerateurH5P exposing (..)

import Browser exposing (Document)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import Element.Input as Input
import ElmCodeGenerator
import File.Download
import Fraction as F exposing (Fraction)
import Html exposing (Attribute, Html, button, div, iframe, input, p, section, textarea)
import Json.Decode
import Json.Encode
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
   ██╗  ██╗███████╗██████╗
   ██║  ██║██╔════╝██╔══██╗
   ███████║███████╗██████╔╝
   ██╔══██║╚════██║██╔═══╝
   ██║  ██║███████║██║
   ╚═╝  ╚═╝╚══════╝╚═╝
-}


type H5P branchingScenarioComposable
    = BranchingScenario
        { endScreens :
            List
                { endScreenTitle : String
                , endScreenSubtitle : String
                , contentId : Int
                , endScreenScore : Int
                }
        , scoringOptionGroup :
            { scoringOption : ScoringOption
            , includeInteractionsScores : Bool
            }
        , startScreen :
            { startScreenTitle : String
            , startScreenSubtitle : String
            }
        , behaviour :
            { enableBackwardsNavigation : Bool
            , forceContentFinished : Bool
            }
        , l10n :
            { startScreenButtonText : String
            , endScreenButtonText : String
            , backButtonText : String
            , proceedButtonText : String
            , disableProceedButtonText : String
            , replayButtonText : String
            , scoreText : String
            , fullscreenAria : String
            }
        , content : List (H5P BranchingScenarioComposable)
        }


nouveauBranchingScenario =
    BranchingScenario
        { endScreens =
            [ { endScreenTitle = "Fin du parcours personnalisé"
              , endScreenSubtitle = "Fin du parcours personnalisé"
              , contentId = -1
              , endScreenScore = 0
              }
            ]
        , scoringOptionGroup =
            { scoringOption = NoScore
            , includeInteractionsScores = True
            }
        , startScreen =
            { startScreenTitle = "<p>Préliminaires</p>\n"
            , startScreenSubtitle = "<p>Le langage et les règles du jeux mathématiques</p>\n"
            }
        , behaviour =
            { enableBackwardsNavigation = True
            , forceContentFinished = False
            }
        , l10n =
            { startScreenButtonText = "Commencer le cours"
            , endScreenButtonText = "Recommencer le cours"
            , backButtonText = "Revenir en arrière"
            , proceedButtonText = "Continuer"
            , disableProceedButtonText = "Jouer la vidéo de nouveau"
            , replayButtonText = "Votre note:"
            , scoreText = "Votre note:"
            , fullscreenAria = "Plein écran"
            }
        , content = []
        }


test =
    ElmCodeGenerator.fromJsonSample
        { rootTypeName = "Test"
        , decodeImport = { importAlias = "Json.Decode", exposingSpec = ElmCodeGenerator.ExposingNone }
        , encodeImport = { importAlias = "Json.Encode", exposingSpec = ElmCodeGenerator.ExposingNone }
        , decoderStyle = ElmCodeGenerator.PlainDecoders
        , namingStyle = ElmCodeGenerator.NounNaming
        }
        """{"a": 1, "b": "str"}"""


testOutput =
    { decoders = [ """testDecoder : Json.Decode.Decoder Test
testDecoder = 
    Json.Decode.map2 Test
        (Json.Decode.field "a" Json.Decode.int)
        (Json.Decode.field "b" Json.Decode.string)
    """ ]
    , encoders =
        [ """
    encodedTest : Test -> Json.Encode.Value
encodedTest test = 
    Json.Encode.object
        [ ( "a", Json.Encode.int test.a )
        , ( "b", Json.Encode.string test.b )
        ]
    """
        ]
    , imports = [ "import Json.Decode", "import Json.Encode", "\n", "-- Required packages:", "-- * elm/json" ]
    , types =
        [ """
    type alias Test =
    { a : Int
    , b : String
    }
    """
        ]
    }


type ScoringOption
    = NoScore


type BranchingScenarioComposable
    = BranchingScenarioComposable



{-
   ██████╗  █████╗ ██████╗ ███████╗███████╗██████╗
   ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗
   ██████╔╝███████║██████╔╝███████╗█████╗  ██████╔╝
   ██╔═══╝ ██╔══██║██╔══██╗╚════██║██╔══╝  ██╔══██╗
   ██║     ██║  ██║██║  ██║███████║███████╗██║  ██║
   ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝
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
