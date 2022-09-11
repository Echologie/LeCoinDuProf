module GenerateurH5P exposing (..)

import Array as A
import Browser exposing (Document)
import Debug
import Dict
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import Element.Input as Input
import File.Download
import Html exposing (Attribute, Html, button, div, iframe, input, p, section, textarea)
import Json.Decode as D
import Json.Encode as E
import List as L
import Parser.Advanced as P exposing (..)
import Random as R
import Random.Extra as REx
import Random.List
import Set
import String as S
import Style exposing (..)
import Tuple
import UUID exposing (UUID)


titre =
    "Générateur d'archives H5P"


todo =
    Debug.todo "Cette fonctionnalité est en cours de développement"



{-
   ███    ███  ██████  ██████  ███████ ██
   ████  ████ ██    ██ ██   ██ ██      ██
   ██ ████ ██ ██    ██ ██   ██ █████   ██
   ██  ██  ██ ██    ██ ██   ██ ██      ██
   ██      ██  ██████  ██████  ███████ ███████
-}


type alias Model =
    { source : String
    , generatedContent : String
    }


init : Model
init =
    { source = ""
    , generatedContent =
        "Copiez-Collez votre contenu à gauche pour voir apparaître le contenu du fichier content.json"
    }



{-
   ██    ██ ██████  ██████   █████  ████████ ███████
   ██    ██ ██   ██ ██   ██ ██   ██    ██    ██
   ██    ██ ██████  ██   ██ ███████    ██    █████
   ██    ██ ██      ██   ██ ██   ██    ██    ██
    ██████  ██      ██████  ██   ██    ██    ███████
-}


type Msg
    = NewContent ( String, String )
    | Generate String
    | Download


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        NewContent ( source, generatedContent ) ->
            ( { model | source = source, generatedContent = generatedContent }
            , Cmd.none
            )

        Generate source ->
            let
                h5pGenerator =
                    case P.run parser source of
                        Ok gen ->
                            REx.sequence gen
                                |> R.map toJson

                        Err erreurs ->
                            deadEndsToStringBis erreurs
                                |> R.constant

                toJson =
                    -- TODO Remplacer par 0 quand projet terminé
                    S.join "\n\n" << L.map (h5pEncode 2)

                generator =
                    R.map (Tuple.pair source) h5pGenerator
            in
            ( model
            , R.generate NewContent generator
            )

        Download ->
            ( model
            , File.Download.string "content.json" "text/json" model.generatedContent
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
            { onChange = Generate
            , label = Input.labelHidden "Structure du contenu"
            , placeholder =
                Just <|
                    Input.placeholder [] <|
                        text "Structure du contenu"
            , text = model.source
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
                [ bouton Download "Télécharger"
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
                text model.generatedContent
            ]
        ]



{-
    .--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--.
   / .. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \
   \ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/ /
    \/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /
    / /\/ /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /\/ /\
   / /\ \/`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'\ \/\ \
   \ \/\ \                                                                                    /\ \/ /
    \/ /\ \                              ██╗  ██╗███████╗██████╗                             / /\/ /
    / /\/ /                              ██║  ██║██╔════╝██╔══██╗                            \ \/ /\
   / /\ \/                               ███████║███████╗██████╔╝                             \ \/\ \
   \ \/\ \                               ██╔══██║╚════██║██╔═══╝                              /\ \/ /
    \/ /\ \                              ██║  ██║███████║██║                                 / /\/ /
    / /\/ /                              ╚═╝  ╚═╝╚══════╝╚═╝                                 \ \/ /\
   / /\ \/                                                                                    \ \/\ \
   \ \/\ \.--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--./\ \/ /
    \/ /\/ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ /\/ /
    / /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\
   / /\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \
   \ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `' /
    `--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'
-}


type H5p
    = BranchingScenarioH5P BranchingScenario
    | CoursePresentationH5P CoursePresentation
    | TrueFalseH5P TrueFalse


h5pEncode indent content =
    E.encode indent <|
        case content of
            BranchingScenarioH5P branchingScenario ->
                encodedBranchingScenario branchingScenario

            CoursePresentationH5P coursePresentation ->
                encodedCoursePresentation coursePresentation

            TrueFalseH5P trueFalse ->
                encodedTrueFalse trueFalse



{-
   ██████  ██████   █████  ███    ██  ██████ ██   ██ ██ ███    ██  ██████
   ██   ██ ██   ██ ██   ██ ████   ██ ██      ██   ██ ██ ████   ██ ██
   ██████  ██████  ███████ ██ ██  ██ ██      ███████ ██ ██ ██  ██ ██   ███
   ██   ██ ██   ██ ██   ██ ██  ██ ██ ██      ██   ██ ██ ██  ██ ██ ██    ██
   ██████  ██   ██ ██   ██ ██   ████  ██████ ██   ██ ██ ██   ████  ██████

   ███████  ██████ ███████ ███    ██  █████  ██████  ██  ██████
   ██      ██      ██      ████   ██ ██   ██ ██   ██ ██ ██    ██
   ███████ ██      █████   ██ ██  ██ ███████ ██████  ██ ██    ██
        ██ ██      ██      ██  ██ ██ ██   ██ ██   ██ ██ ██    ██
   ███████  ██████ ███████ ██   ████ ██   ██ ██   ██ ██  ██████
-}


type alias BranchingScenario =
    { behaviour : BranchingScenarioBehaviour
    , endScreens : List BranchingScenarioEndScreensObject
    , l10n : BranchingScenarioL10n
    , scoringOptionGroup : BranchingScenarioScoringOptionGroup
    , startScreen : BranchingScenarioStartScreen
    , content : List BranchingScenarioContent
    }


type alias BranchingScenarioBehaviour =
    { enableBackwardsNavigation : Bool
    , forceContentFinished : Bool
    }


type alias BranchingScenarioEndScreensObject =
    { contentId : Int
    , endScreenScore : Int
    , endScreenSubtitle : String
    , endScreenTitle : String
    }


type alias BranchingScenarioL10n =
    { backButtonText : String
    , disableProceedButtonText : String
    , endScreenButtonText : String
    , fullscreenAria : String
    , proceedButtonText : String
    , replayButtonText : String
    , scoreText : String
    , startScreenButtonText : String
    }


type alias BranchingScenarioScoringOptionGroup =
    { includeInteractionsScores : Bool
    , scoringOption : String
    }


type alias BranchingScenarioStartScreen =
    { startScreenSubtitle : String
    , startScreenTitle : String
    }


type alias BranchingScenarioContent =
    { contentBehaviour : String
    , feedback : BranchingScenarioContentFeedback
    , forceContentFinished : String
    , showContentTitle : Bool
    , type_ : BranchingScenarioContentType
    }


type alias BranchingScenarioContentFeedback =
    { subtitle : String
    }


type alias BranchingScenarioContentType =
    { library : String
    , metadata : BranchingScenarioContentTypeMetadata
    , params : BranchingScenarioContentTypeParams
    , subContentId : String
    }


type alias BranchingScenarioContentTypeMetadata =
    { contentType : String
    , license : String
    , title : String
    }


type BranchingScenarioContentTypeParams
    = UnknownBranchingScenarioContentTypeParams
    | CoursePresentationBranchingScenarioContentTypeParams CoursePresentation
    | BranchingQuestionBranchingScenarioContentTypeParams BranchingQuestion


branchingScenarioDecoder : D.Decoder BranchingScenario
branchingScenarioDecoder =
    D.map6 BranchingScenario
        (D.field "behaviour" branchingScenarioBehaviourDecoder)
        (D.field "endScreens" <| D.list branchingScenarioEndScreensObjectDecoder)
        (D.field "l10n" branchingScenarioL10nDecoder)
        (D.field "scoringOptionGroup" branchingScenarioScoringOptionGroupDecoder)
        (D.field "startScreen" branchingScenarioStartScreenDecoder)
        (D.field "content" <| D.list branchingScenarioContentDecoder)


branchingScenarioBehaviourDecoder : D.Decoder BranchingScenarioBehaviour
branchingScenarioBehaviourDecoder =
    D.map2 BranchingScenarioBehaviour
        (D.field "enableBackwardsNavigation" D.bool)
        (D.field "forceContentFinished" D.bool)


branchingScenarioEndScreensObjectDecoder : D.Decoder BranchingScenarioEndScreensObject
branchingScenarioEndScreensObjectDecoder =
    D.map4 BranchingScenarioEndScreensObject
        (D.field "contentId" D.int)
        (D.field "endScreenScore" D.int)
        (D.field "endScreenSubtitle" D.string)
        (D.field "endScreenTitle" D.string)


branchingScenarioL10nDecoder : D.Decoder BranchingScenarioL10n
branchingScenarioL10nDecoder =
    D.map8 BranchingScenarioL10n
        (D.field "backButtonText" D.string)
        (D.field "disableProceedButtonText" D.string)
        (D.field "endScreenButtonText" D.string)
        (D.field "fullscreenAria" D.string)
        (D.field "proceedButtonText" D.string)
        (D.field "replayButtonText" D.string)
        (D.field "scoreText" D.string)
        (D.field "startScreenButtonText" D.string)


branchingScenarioScoringOptionGroupDecoder : D.Decoder BranchingScenarioScoringOptionGroup
branchingScenarioScoringOptionGroupDecoder =
    D.map2 BranchingScenarioScoringOptionGroup
        (D.field "includeInteractionsScores" D.bool)
        (D.field "scoringOption" D.string)


branchingScenarioStartScreenDecoder : D.Decoder BranchingScenarioStartScreen
branchingScenarioStartScreenDecoder =
    D.map2 BranchingScenarioStartScreen
        (D.field "startScreenSubtitle" D.string)
        (D.field "startScreenTitle" D.string)


branchingScenarioContentDecoder : D.Decoder BranchingScenarioContent
branchingScenarioContentDecoder =
    D.map5 BranchingScenarioContent
        (D.field "contentBehaviour" D.string)
        (D.field "feedback" branchingScenarioContentFeedbackDecoder)
        (D.field "forceContentFinished" D.string)
        (D.field "showContentTitle" D.bool)
        (D.field "type" branchingScenarioContentTypeDecoder)


branchingScenarioContentFeedbackDecoder : D.Decoder BranchingScenarioContentFeedback
branchingScenarioContentFeedbackDecoder =
    D.map BranchingScenarioContentFeedback
        (D.field "subtitle" D.string)


branchingScenarioContentTypeDecoder : D.Decoder BranchingScenarioContentType
branchingScenarioContentTypeDecoder =
    D.map4 BranchingScenarioContentType
        (D.field "library" D.string)
        (D.field "metadata" branchingScenarioContentTypeMetadataDecoder)
        (D.field "params" branchingScenarioContentTypeParamsDecoder)
        (D.field "subContentId" D.string)


branchingScenarioContentTypeMetadataDecoder : D.Decoder BranchingScenarioContentTypeMetadata
branchingScenarioContentTypeMetadataDecoder =
    D.map3 BranchingScenarioContentTypeMetadata
        (D.field "contentType" D.string)
        (D.field "license" D.string)
        (D.field "title" D.string)


branchingScenarioContentTypeParamsDecoder : D.Decoder BranchingScenarioContentTypeParams
branchingScenarioContentTypeParamsDecoder =
    D.succeed todo


encodedBranchingScenario : BranchingScenario -> E.Value
encodedBranchingScenario branchingScenario =
    E.object
        [ ( "branchingScenario"
          , E.object
                [ ( "behaviour", encodedBranchingScenarioBehaviour branchingScenario.behaviour )
                , ( "endScreens", E.list encodedBranchingScenarioEndScreensObject branchingScenario.endScreens )
                , ( "l10n", encodedBranchingScenarioL10n branchingScenario.l10n )
                , ( "scoringOptionGroup", encodedBranchingScenarioScoringOptionGroup branchingScenario.scoringOptionGroup )
                , ( "startScreen", encodedBranchingScenarioStartScreen branchingScenario.startScreen )
                , ( "content", E.list encodedBranchingScenarioContent branchingScenario.content )
                ]
          )
        ]


encodedBranchingScenarioBehaviour : BranchingScenarioBehaviour -> E.Value
encodedBranchingScenarioBehaviour branchingScenarioBehaviour =
    E.object
        [ ( "enableBackwardsNavigation", E.bool branchingScenarioBehaviour.enableBackwardsNavigation )
        , ( "forceContentFinished", E.bool branchingScenarioBehaviour.forceContentFinished )
        ]


encodedBranchingScenarioEndScreensObject : BranchingScenarioEndScreensObject -> E.Value
encodedBranchingScenarioEndScreensObject branchingScenarioEndScreensObject =
    E.object
        [ ( "contentId", E.int branchingScenarioEndScreensObject.contentId )
        , ( "endScreenScore", E.int branchingScenarioEndScreensObject.endScreenScore )
        , ( "endScreenSubtitle", E.string branchingScenarioEndScreensObject.endScreenSubtitle )
        , ( "endScreenTitle", E.string branchingScenarioEndScreensObject.endScreenTitle )
        ]


encodedBranchingScenarioL10n : BranchingScenarioL10n -> E.Value
encodedBranchingScenarioL10n branchingScenarioL10n =
    E.object
        [ ( "backButtonText", E.string branchingScenarioL10n.backButtonText )
        , ( "disableProceedButtonText", E.string branchingScenarioL10n.disableProceedButtonText )
        , ( "endScreenButtonText", E.string branchingScenarioL10n.endScreenButtonText )
        , ( "fullscreenAria", E.string branchingScenarioL10n.fullscreenAria )
        , ( "proceedButtonText", E.string branchingScenarioL10n.proceedButtonText )
        , ( "replayButtonText", E.string branchingScenarioL10n.replayButtonText )
        , ( "scoreText", E.string branchingScenarioL10n.scoreText )
        , ( "startScreenButtonText", E.string branchingScenarioL10n.startScreenButtonText )
        ]


encodedBranchingScenarioScoringOptionGroup : BranchingScenarioScoringOptionGroup -> E.Value
encodedBranchingScenarioScoringOptionGroup branchingScenarioScoringOptionGroup =
    E.object
        [ ( "includeInteractionsScores", E.bool branchingScenarioScoringOptionGroup.includeInteractionsScores )
        , ( "scoringOption", E.string branchingScenarioScoringOptionGroup.scoringOption )
        ]


encodedBranchingScenarioStartScreen : BranchingScenarioStartScreen -> E.Value
encodedBranchingScenarioStartScreen branchingScenarioStartScreen =
    E.object
        [ ( "startScreenSubtitle", E.string branchingScenarioStartScreen.startScreenSubtitle )
        , ( "startScreenTitle", E.string branchingScenarioStartScreen.startScreenTitle )
        ]


encodedBranchingScenarioContent : BranchingScenarioContent -> E.Value
encodedBranchingScenarioContent branchingScenarioContent =
    E.object
        [ ( "contentBehaviour", E.string branchingScenarioContent.contentBehaviour )
        , ( "feedback", encodedBranchingScenarioContentFeedback branchingScenarioContent.feedback )
        , ( "forceContentFinished", E.string branchingScenarioContent.forceContentFinished )
        , ( "showContentTitle", E.bool branchingScenarioContent.showContentTitle )
        , ( "type", encodedBranchingScenarioContentType branchingScenarioContent.type_ )
        ]


encodedBranchingScenarioContentFeedback : BranchingScenarioContentFeedback -> E.Value
encodedBranchingScenarioContentFeedback branchingScenarioContentFeedback =
    E.object
        [ ( "subtitle", E.string branchingScenarioContentFeedback.subtitle )
        ]


encodedBranchingScenarioContentType : BranchingScenarioContentType -> E.Value
encodedBranchingScenarioContentType branchingScenarioContentType =
    E.object
        [ ( "library", E.string branchingScenarioContentType.library )
        , ( "metadata", encodedBranchingScenarioContentTypeMetadata branchingScenarioContentType.metadata )
        , ( "params", encodedBranchingScenarioContentTypeParams branchingScenarioContentType.params )
        , ( "subContentId", E.string branchingScenarioContentType.subContentId )
        ]


encodedBranchingScenarioContentTypeMetadata : BranchingScenarioContentTypeMetadata -> E.Value
encodedBranchingScenarioContentTypeMetadata branchingScenarioContentTypeMetadata =
    E.object
        [ ( "contentType", E.string branchingScenarioContentTypeMetadata.contentType )
        , ( "license", E.string branchingScenarioContentTypeMetadata.license )
        , ( "title", E.string branchingScenarioContentTypeMetadata.title )
        ]


encodedBranchingScenarioContentTypeParams : BranchingScenarioContentTypeParams -> E.Value
encodedBranchingScenarioContentTypeParams branchingScenarioContentTypeParams =
    case branchingScenarioContentTypeParams of
        CoursePresentationBranchingScenarioContentTypeParams p ->
            encodedCoursePresentation p

        BranchingQuestionBranchingScenarioContentTypeParams q ->
            encodedBranchingQuestion q

        UnknownBranchingScenarioContentTypeParams ->
            todo



{-
   ██████╗ ██████╗  █████╗ ███╗   ██╗ ██████╗██╗  ██╗██╗███╗   ██╗ ██████╗
   ██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔════╝██║  ██║██║████╗  ██║██╔════╝
   ██████╔╝██████╔╝███████║██╔██╗ ██║██║     ███████║██║██╔██╗ ██║██║  ███╗
   ██╔══██╗██╔══██╗██╔══██║██║╚██╗██║██║     ██╔══██║██║██║╚██╗██║██║   ██║
   ██████╔╝██║  ██║██║  ██║██║ ╚████║╚██████╗██║  ██║██║██║ ╚████║╚██████╔╝
   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝

    ██████╗ ██╗   ██╗███████╗███████╗████████╗██╗ ██████╗ ███╗   ██╗
   ██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
   ██║   ██║██║   ██║█████╗  ███████╗   ██║   ██║██║   ██║██╔██╗ ██║
   ██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║   ██║██║   ██║██║╚██╗██║
   ╚██████╔╝╚██████╔╝███████╗███████║   ██║   ██║╚██████╔╝██║ ╚████║
    ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
-}


type alias BranchingQuestion =
    { alternatives : List BranchingQuestionAlternativesObject
    , question : String
    }


type alias BranchingQuestionAlternativesObject =
    { feedback : BranchingQuestionAlternativesObjectFeedback
    , nextContentId : Int
    , text : String
    }


type alias BranchingQuestionAlternativesObjectFeedback =
    { subtitle : String
    , title : String
    }


branchingQuestionDecoder : D.Decoder BranchingQuestion
branchingQuestionDecoder =
    D.map identity
        (D.field "branchingQuestion" branchingQuestionDecoderHelp)


branchingQuestionDecoderHelp =
    D.map2 BranchingQuestion
        (D.field "alternatives" <| D.list branchingQuestionAlternativesObjectDecoder)
        (D.field "question" D.string)


branchingQuestionAlternativesObjectDecoder : D.Decoder BranchingQuestionAlternativesObject
branchingQuestionAlternativesObjectDecoder =
    D.map3 BranchingQuestionAlternativesObject
        (D.field "feedback" branchingQuestionAlternativesObjectFeedbackDecoder)
        (D.field "nextContentId" D.int)
        (D.field "text" D.string)


branchingQuestionAlternativesObjectFeedbackDecoder : D.Decoder BranchingQuestionAlternativesObjectFeedback
branchingQuestionAlternativesObjectFeedbackDecoder =
    D.map2 BranchingQuestionAlternativesObjectFeedback
        (D.field "subtitle" D.string)
        (D.field "title" D.string)


encodedBranchingQuestion : BranchingQuestion -> E.Value
encodedBranchingQuestion branchingQuestion =
    E.object
        [ ( "branchingQuestion", encodedBranchingQuestionHelp branchingQuestion )
        ]


encodedBranchingQuestionHelp : BranchingQuestion -> E.Value
encodedBranchingQuestionHelp branchingQuestion =
    E.object
        [ ( "alternatives", E.list encodedBranchingQuestionAlternativesObject branchingQuestion.alternatives )
        , ( "question", E.string branchingQuestion.question )
        ]


encodedBranchingQuestionAlternativesObject : BranchingQuestionAlternativesObject -> E.Value
encodedBranchingQuestionAlternativesObject branchingQuestionAlternativesObject =
    E.object
        [ ( "feedback", encodedBranchingQuestionAlternativesObjectFeedback branchingQuestionAlternativesObject.feedback )
        , ( "nextContentId", E.int branchingQuestionAlternativesObject.nextContentId )
        , ( "text", E.string branchingQuestionAlternativesObject.text )
        ]


encodedBranchingQuestionAlternativesObjectFeedback : BranchingQuestionAlternativesObjectFeedback -> E.Value
encodedBranchingQuestionAlternativesObjectFeedback branchingQuestionAlternativesObjectFeedback =
    E.object
        [ ( "subtitle", E.string branchingQuestionAlternativesObjectFeedback.subtitle )
        , ( "title", E.string branchingQuestionAlternativesObjectFeedback.title )
        ]



{-
    ██████  ██████  ██    ██ ██████  ███████ ███████
   ██      ██    ██ ██    ██ ██   ██ ██      ██
   ██      ██    ██ ██    ██ ██████  ███████ █████
   ██      ██    ██ ██    ██ ██   ██      ██ ██
    ██████  ██████   ██████  ██   ██ ███████ ███████

   ██████  ██████  ███████ ███████ ███████ ███    ██ ████████  █████  ████████ ██  ██████  ███    ██
   ██   ██ ██   ██ ██      ██      ██      ████   ██    ██    ██   ██    ██    ██ ██    ██ ████   ██
   ██████  ██████  █████   ███████ █████   ██ ██  ██    ██    ███████    ██    ██ ██    ██ ██ ██  ██
   ██      ██   ██ ██           ██ ██      ██  ██ ██    ██    ██   ██    ██    ██ ██    ██ ██  ██ ██
   ██      ██   ██ ███████ ███████ ███████ ██   ████    ██    ██   ██    ██    ██  ██████  ██   ████
-}


type alias CoursePresentation =
    { l10n : CoursePresentationL10n
    , override : CoursePresentationOverride
    , presentation : CoursePresentationPresentation
    }


type alias CoursePresentationL10n =
    { accessibilityCanvasLabel : String
    , accessibilityEnteredFullscreen : String
    , accessibilityExitedFullscreen : String
    , accessibilitySlideNavigationExplanation : String
    , accessibilityTotalScore : String
    , confirmDialogConfirmText : String
    , confirmDialogHeader : String
    , confirmDialogText : String
    , containsCompleted : String
    , containsIncorrectAnswers : String
    , containsNotCompleted : String
    , containsOnlyCorrect : String
    , currentSlide : String
    , exitFullscreen : String
    , exportAnswers : String
    , fullscreen : String
    , hideKeywords : String
    , lastSlide : String
    , maxScore : String
    , nextSlide : String
    , noTitle : String
    , prevSlide : String
    , printAllSlides : String
    , printCurrentSlide : String
    , printIngress : String
    , printTitle : String
    , retry : String
    , score : String
    , scoreMessage : String
    , shareFacebook : String
    , shareGoogle : String
    , shareResult : String
    , shareTwitter : String
    , showKeywords : String
    , showSolutions : String
    , slide : String
    , slideCount : String
    , solutionModeText : String
    , solutionModeTitle : String
    , solutionsButtonTitle : String
    , summary : String
    , summaryMultipleTaskText : String
    , total : String
    , totalScore : String
    , yourScore : String
    }


type alias CoursePresentationOverride =
    { activeSurface : Bool
    , enablePrintButton : Bool
    , hideSummarySlide : Bool
    , social : CoursePresentationOverrideSocial
    , summarySlideRetryButton : Bool
    , summarySlideSolutionButton : Bool
    }


type alias CoursePresentationOverrideSocial =
    { facebookShare : CoursePresentationOverrideSocialFacebookShare
    , googleShareUrl : String
    , showFacebookShare : Bool
    , showGoogleShare : Bool
    , showTwitterShare : Bool
    , twitterShare : CoursePresentationOverrideSocialTwitterShare
    }


type alias CoursePresentationOverrideSocialFacebookShare =
    { quote : String
    , url : String
    }


type alias CoursePresentationOverrideSocialTwitterShare =
    { hashtags : String
    , statement : String
    , url : String
    }


type alias CoursePresentationPresentation =
    { globalBackgroundSelector : CoursePresentationPresentationGlobalBackgroundSelector
    , keywordListAlwaysShow : Bool
    , keywordListAutoHide : Bool
    , keywordListEnabled : Bool
    , keywordListOpacity : Int
    , slides : List CoursePresentationPresentationSlides
    }


type alias CoursePresentationPresentationGlobalBackgroundSelector =
    { fillGlobalBackground : String
    }


type alias CoursePresentationPresentationSlides =
    { elements : List CoursePresentationPresentationSlidesElements
    , slideBackgroundSelector : CoursePresentationPresentationSlidesSlideBackgroundSelector
    }


type alias CoursePresentationPresentationSlidesElements =
    { action : CoursePresentationPresentationSlidesElementsAction
    , alwaysDisplayComments : Bool
    , backgroundOpacity : Int
    , buttonSize : String
    , displayAsButton : Bool
    , goToSlideType : String
    , height : Int
    , invisible : Bool
    , solution : String
    , width : Int
    , x : Int
    , y : Int
    }


type alias CoursePresentationPresentationSlidesElementsAction =
    { library : String
    , metadata : CoursePresentationPresentationSlidesElementsActionMetadata
    , params : CoursePresentationPresentationSlidesElementsActionParams
    , subContentId : String
    }


type alias CoursePresentationPresentationSlidesElementsActionMetadata =
    { contentType : String
    , license : String
    , title : String
    }


type alias CoursePresentationPresentationSlidesElementsActionParams =
    H5p


type alias CoursePresentationPresentationSlidesSlideBackgroundSelector =
    { fillSlideBackground : String
    }


coursePresentationDecoder : D.Decoder CoursePresentation
coursePresentationDecoder =
    D.map3 CoursePresentation
        (D.field "l10n" coursePresentationL10nDecoder)
        (D.field "override" coursePresentationOverrideDecoder)
        (D.field "presentation" coursePresentationPresentationDecoder)


coursePresentationL10nDecoder : D.Decoder CoursePresentationL10n
coursePresentationL10nDecoder =
    let
        fieldSet0 =
            D.map8 CoursePresentationL10n
                (D.field "accessibilityCanvasLabel" D.string)
                (D.field "accessibilityEnteredFullscreen" D.string)
                (D.field "accessibilityExitedFullscreen" D.string)
                (D.field "accessibilitySlideNavigationExplanation" D.string)
                (D.field "accessibilityTotalScore" D.string)
                (D.field "confirmDialogConfirmText" D.string)
                (D.field "confirmDialogHeader" D.string)
                (D.field "confirmDialogText" D.string)

        fieldSet1 =
            D.map8 (<|)
                fieldSet0
                (D.field "containsCompleted" D.string)
                (D.field "containsIncorrectAnswers" D.string)
                (D.field "containsNotCompleted" D.string)
                (D.field "containsOnlyCorrect" D.string)
                (D.field "currentSlide" D.string)
                (D.field "exitFullscreen" D.string)
                (D.field "exportAnswers" D.string)

        fieldSet2 =
            D.map8 (<|)
                fieldSet1
                (D.field "fullscreen" D.string)
                (D.field "hideKeywords" D.string)
                (D.field "lastSlide" D.string)
                (D.field "maxScore" D.string)
                (D.field "nextSlide" D.string)
                (D.field "noTitle" D.string)
                (D.field "prevSlide" D.string)

        fieldSet3 =
            D.map8 (<|)
                fieldSet2
                (D.field "printAllSlides" D.string)
                (D.field "printCurrentSlide" D.string)
                (D.field "printIngress" D.string)
                (D.field "printTitle" D.string)
                (D.field "retry" D.string)
                (D.field "score" D.string)
                (D.field "scoreMessage" D.string)

        fieldSet4 =
            D.map8 (<|)
                fieldSet3
                (D.field "shareFacebook" D.string)
                (D.field "shareGoogle" D.string)
                (D.field "shareResult" D.string)
                (D.field "shareTwitter" D.string)
                (D.field "showKeywords" D.string)
                (D.field "showSolutions" D.string)
                (D.field "slide" D.string)

        fieldSet5 =
            D.map8 (<|)
                fieldSet4
                (D.field "slideCount" D.string)
                (D.field "solutionModeText" D.string)
                (D.field "solutionModeTitle" D.string)
                (D.field "solutionsButtonTitle" D.string)
                (D.field "summary" D.string)
                (D.field "summaryMultipleTaskText" D.string)
                (D.field "total" D.string)
    in
    D.map3 (<|)
        fieldSet5
        (D.field "totalScore" D.string)
        (D.field "yourScore" D.string)


coursePresentationOverrideDecoder : D.Decoder CoursePresentationOverride
coursePresentationOverrideDecoder =
    D.map6 CoursePresentationOverride
        (D.field "activeSurface" D.bool)
        (D.field "enablePrintButton" D.bool)
        (D.field "hideSummarySlide" D.bool)
        (D.field "social" coursePresentationOverrideSocialDecoder)
        (D.field "summarySlideRetryButton" D.bool)
        (D.field "summarySlideSolutionButton" D.bool)


coursePresentationOverrideSocialDecoder : D.Decoder CoursePresentationOverrideSocial
coursePresentationOverrideSocialDecoder =
    D.map6 CoursePresentationOverrideSocial
        (D.field "facebookShare" coursePresentationOverrideSocialFacebookShareDecoder)
        (D.field "googleShareUrl" D.string)
        (D.field "showFacebookShare" D.bool)
        (D.field "showGoogleShare" D.bool)
        (D.field "showTwitterShare" D.bool)
        (D.field "twitterShare" coursePresentationOverrideSocialTwitterShareDecoder)


coursePresentationOverrideSocialFacebookShareDecoder : D.Decoder CoursePresentationOverrideSocialFacebookShare
coursePresentationOverrideSocialFacebookShareDecoder =
    D.map2 CoursePresentationOverrideSocialFacebookShare
        (D.field "quote" D.string)
        (D.field "url" D.string)


coursePresentationOverrideSocialTwitterShareDecoder : D.Decoder CoursePresentationOverrideSocialTwitterShare
coursePresentationOverrideSocialTwitterShareDecoder =
    D.map3 CoursePresentationOverrideSocialTwitterShare
        (D.field "hashtags" D.string)
        (D.field "statement" D.string)
        (D.field "url" D.string)


coursePresentationPresentationDecoder : D.Decoder CoursePresentationPresentation
coursePresentationPresentationDecoder =
    D.map6 CoursePresentationPresentation
        (D.field "globalBackgroundSelector" coursePresentationPresentationGlobalBackgroundSelectorDecoder)
        (D.field "keywordListAlwaysShow" D.bool)
        (D.field "keywordListAutoHide" D.bool)
        (D.field "keywordListEnabled" D.bool)
        (D.field "keywordListOpacity" D.int)
        (D.field "slides" <| D.list coursePresentationPresentationSlidesDecoder)


coursePresentationPresentationGlobalBackgroundSelectorDecoder : D.Decoder CoursePresentationPresentationGlobalBackgroundSelector
coursePresentationPresentationGlobalBackgroundSelectorDecoder =
    D.map CoursePresentationPresentationGlobalBackgroundSelector
        (D.field "fillGlobalBackground" D.string)


coursePresentationPresentationSlidesDecoder : D.Decoder CoursePresentationPresentationSlides
coursePresentationPresentationSlidesDecoder =
    D.map2 CoursePresentationPresentationSlides
        -- TODO avec un <| D.list <| h5pDecoder
        (D.field "elements" <| D.succeed [])
        (D.field "slideBackgroundSelector" coursePresentationPresentationSlidesSlideBackgroundSelectorDecoder)


coursePresentationPresentationSlidesSlideBackgroundSelectorDecoder : D.Decoder CoursePresentationPresentationSlidesSlideBackgroundSelector
coursePresentationPresentationSlidesSlideBackgroundSelectorDecoder =
    D.map CoursePresentationPresentationSlidesSlideBackgroundSelector
        (D.field "fillSlideBackground" D.string)


encodedCoursePresentation : CoursePresentation -> E.Value
encodedCoursePresentation coursePresentation =
    E.object
        [ ( "l10n", encodedCoursePresentationL10n coursePresentation.l10n )
        , ( "override", encodedCoursePresentationOverride coursePresentation.override )
        , ( "presentation", encodedCoursePresentationPresentation coursePresentation.presentation )
        ]


encodedCoursePresentationL10n : CoursePresentationL10n -> E.Value
encodedCoursePresentationL10n coursePresentationL10n =
    E.object
        [ ( "accessibilityCanvasLabel", E.string coursePresentationL10n.accessibilityCanvasLabel )
        , ( "accessibilityEnteredFullscreen", E.string coursePresentationL10n.accessibilityEnteredFullscreen )
        , ( "accessibilityExitedFullscreen", E.string coursePresentationL10n.accessibilityExitedFullscreen )
        , ( "accessibilitySlideNavigationExplanation", E.string coursePresentationL10n.accessibilitySlideNavigationExplanation )
        , ( "accessibilityTotalScore", E.string coursePresentationL10n.accessibilityTotalScore )
        , ( "confirmDialogConfirmText", E.string coursePresentationL10n.confirmDialogConfirmText )
        , ( "confirmDialogHeader", E.string coursePresentationL10n.confirmDialogHeader )
        , ( "confirmDialogText", E.string coursePresentationL10n.confirmDialogText )
        , ( "containsCompleted", E.string coursePresentationL10n.containsCompleted )
        , ( "containsIncorrectAnswers", E.string coursePresentationL10n.containsIncorrectAnswers )
        , ( "containsNotCompleted", E.string coursePresentationL10n.containsNotCompleted )
        , ( "containsOnlyCorrect", E.string coursePresentationL10n.containsOnlyCorrect )
        , ( "currentSlide", E.string coursePresentationL10n.currentSlide )
        , ( "exitFullscreen", E.string coursePresentationL10n.exitFullscreen )
        , ( "exportAnswers", E.string coursePresentationL10n.exportAnswers )
        , ( "fullscreen", E.string coursePresentationL10n.fullscreen )
        , ( "hideKeywords", E.string coursePresentationL10n.hideKeywords )
        , ( "lastSlide", E.string coursePresentationL10n.lastSlide )
        , ( "maxScore", E.string coursePresentationL10n.maxScore )
        , ( "nextSlide", E.string coursePresentationL10n.nextSlide )
        , ( "noTitle", E.string coursePresentationL10n.noTitle )
        , ( "prevSlide", E.string coursePresentationL10n.prevSlide )
        , ( "printAllSlides", E.string coursePresentationL10n.printAllSlides )
        , ( "printCurrentSlide", E.string coursePresentationL10n.printCurrentSlide )
        , ( "printIngress", E.string coursePresentationL10n.printIngress )
        , ( "printTitle", E.string coursePresentationL10n.printTitle )
        , ( "retry", E.string coursePresentationL10n.retry )
        , ( "score", E.string coursePresentationL10n.score )
        , ( "scoreMessage", E.string coursePresentationL10n.scoreMessage )
        , ( "shareFacebook", E.string coursePresentationL10n.shareFacebook )
        , ( "shareGoogle", E.string coursePresentationL10n.shareGoogle )
        , ( "shareResult", E.string coursePresentationL10n.shareResult )
        , ( "shareTwitter", E.string coursePresentationL10n.shareTwitter )
        , ( "showKeywords", E.string coursePresentationL10n.showKeywords )
        , ( "showSolutions", E.string coursePresentationL10n.showSolutions )
        , ( "slide", E.string coursePresentationL10n.slide )
        , ( "slideCount", E.string coursePresentationL10n.slideCount )
        , ( "solutionModeText", E.string coursePresentationL10n.solutionModeText )
        , ( "solutionModeTitle", E.string coursePresentationL10n.solutionModeTitle )
        , ( "solutionsButtonTitle", E.string coursePresentationL10n.solutionsButtonTitle )
        , ( "summary", E.string coursePresentationL10n.summary )
        , ( "summaryMultipleTaskText", E.string coursePresentationL10n.summaryMultipleTaskText )
        , ( "total", E.string coursePresentationL10n.total )
        , ( "totalScore", E.string coursePresentationL10n.totalScore )
        , ( "yourScore", E.string coursePresentationL10n.yourScore )
        ]


encodedCoursePresentationOverride : CoursePresentationOverride -> E.Value
encodedCoursePresentationOverride coursePresentationOverride =
    E.object
        [ ( "activeSurface", E.bool coursePresentationOverride.activeSurface )
        , ( "enablePrintButton", E.bool coursePresentationOverride.enablePrintButton )
        , ( "hideSummarySlide", E.bool coursePresentationOverride.hideSummarySlide )
        , ( "social", encodedCoursePresentationOverrideSocial coursePresentationOverride.social )
        , ( "summarySlideRetryButton", E.bool coursePresentationOverride.summarySlideRetryButton )
        , ( "summarySlideSolutionButton", E.bool coursePresentationOverride.summarySlideSolutionButton )
        ]


encodedCoursePresentationOverrideSocial : CoursePresentationOverrideSocial -> E.Value
encodedCoursePresentationOverrideSocial coursePresentationOverrideSocial =
    E.object
        [ ( "facebookShare", encodedCoursePresentationOverrideSocialFacebookShare coursePresentationOverrideSocial.facebookShare )
        , ( "googleShareUrl", E.string coursePresentationOverrideSocial.googleShareUrl )
        , ( "showFacebookShare", E.bool coursePresentationOverrideSocial.showFacebookShare )
        , ( "showGoogleShare", E.bool coursePresentationOverrideSocial.showGoogleShare )
        , ( "showTwitterShare", E.bool coursePresentationOverrideSocial.showTwitterShare )
        , ( "twitterShare", encodedCoursePresentationOverrideSocialTwitterShare coursePresentationOverrideSocial.twitterShare )
        ]


encodedCoursePresentationOverrideSocialFacebookShare : CoursePresentationOverrideSocialFacebookShare -> E.Value
encodedCoursePresentationOverrideSocialFacebookShare coursePresentationOverrideSocialFacebookShare =
    E.object
        [ ( "quote", E.string coursePresentationOverrideSocialFacebookShare.quote )
        , ( "url", E.string coursePresentationOverrideSocialFacebookShare.url )
        ]


encodedCoursePresentationOverrideSocialTwitterShare : CoursePresentationOverrideSocialTwitterShare -> E.Value
encodedCoursePresentationOverrideSocialTwitterShare coursePresentationOverrideSocialTwitterShare =
    E.object
        [ ( "hashtags", E.string coursePresentationOverrideSocialTwitterShare.hashtags )
        , ( "statement", E.string coursePresentationOverrideSocialTwitterShare.statement )
        , ( "url", E.string coursePresentationOverrideSocialTwitterShare.url )
        ]


encodedCoursePresentationPresentation : CoursePresentationPresentation -> E.Value
encodedCoursePresentationPresentation coursePresentationPresentation =
    E.object
        [ ( "globalBackgroundSelector", encodedCoursePresentationPresentationGlobalBackgroundSelector coursePresentationPresentation.globalBackgroundSelector )
        , ( "keywordListAlwaysShow", E.bool coursePresentationPresentation.keywordListAlwaysShow )
        , ( "keywordListAutoHide", E.bool coursePresentationPresentation.keywordListAutoHide )
        , ( "keywordListEnabled", E.bool coursePresentationPresentation.keywordListEnabled )
        , ( "keywordListOpacity", E.int coursePresentationPresentation.keywordListOpacity )
        , ( "slides", E.list encodedCoursePresentationPresentationSlides coursePresentationPresentation.slides )
        ]


encodedCoursePresentationPresentationGlobalBackgroundSelector : CoursePresentationPresentationGlobalBackgroundSelector -> E.Value
encodedCoursePresentationPresentationGlobalBackgroundSelector coursePresentationPresentationGlobalBackgroundSelector =
    E.object
        [ ( "fillGlobalBackground", E.string coursePresentationPresentationGlobalBackgroundSelector.fillGlobalBackground )
        ]


encodedCoursePresentationPresentationSlides : CoursePresentationPresentationSlides -> E.Value
encodedCoursePresentationPresentationSlides coursePresentationPresentationSlides =
    E.object
        [ ( "elements", E.list (\_ -> E.null) coursePresentationPresentationSlides.elements )
        , ( "slideBackgroundSelector", encodedCoursePresentationPresentationSlidesSlideBackgroundSelector coursePresentationPresentationSlides.slideBackgroundSelector )
        ]


encodedCoursePresentationPresentationSlidesSlideBackgroundSelector : CoursePresentationPresentationSlidesSlideBackgroundSelector -> E.Value
encodedCoursePresentationPresentationSlidesSlideBackgroundSelector coursePresentationPresentationSlidesSlideBackgroundSelector =
    E.object
        [ ( "fillSlideBackground", E.string coursePresentationPresentationSlidesSlideBackgroundSelector.fillSlideBackground )
        ]


nouveauCoursePresentation =
    { l10n =
        { accessibilityCanvasLabel = "Le champs de présentation. Utilisez les fleches gauche et droite pour naviguer entre les diapositives."
        , accessibilityEnteredFullscreen = "Mode plein-écran activé"
        , accessibilityExitedFullscreen = "Mode plein-écran désactivé"
        , accessibilitySlideNavigationExplanation = "Utilisez les fleches gauche et droite pour pour naviguer entre les diapositives"
        , accessibilityTotalScore = "Vous avez obtenu @score sur @maxScore points au total"
        , confirmDialogConfirmText = "Envoyer et voir les résultats"
        , confirmDialogHeader = "Envoyer vos réponses"
        , confirmDialogText = "Cette action va envoyer vos réponses, voulez-vous continuer?"
        , containsCompleted = "@slideName contient des interactions complètes"
        , containsIncorrectAnswers = "@slideName contient des réponses incorrectes"
        , containsNotCompleted = "@slideName contient des interactions incomplètes"
        , containsOnlyCorrect = "toutes les réponses sont bonnes sur @slideName"
        , currentSlide = "Diapositive courante"
        , exitFullscreen = "Quitter le plein écran"
        , exportAnswers = "Exporter"
        , fullscreen = "Plein écran"
        , hideKeywords = "Cacher la liste des mots-clés"
        , lastSlide = "Dernière diapositive"
        , maxScore = "Score maximum"
        , nextSlide = "Diapositive suivante"
        , noTitle = "Sans intitulé"
        , prevSlide = "Diapositive précédente"
        , printAllSlides = "Imprimer toutes les diapositives"
        , printCurrentSlide = "Imprimer la diapositive courante"
        , printIngress = "Comment souhaitez-vous imprimer cette présentation ?"
        , printTitle = "Imprimer"
        , retry = "Recommencer"
        , score = "Score"
        , scoreMessage = "Votre score :"
        , shareFacebook = "Partager sur Facebook"
        , shareGoogle = "Partager sur Google+"
        , shareResult = "Partager le résultat"
        , shareTwitter = "Partager sur Twitter"
        , showKeywords = "Afficher la liste des mots-clés"
        , showSolutions = "Voir la correction"
        , slide = "Diapositive"
        , slideCount = "Diapositive a @index de @total"
        , solutionModeText = "Passer en mode &quot;Correction&quot;"
        , solutionModeTitle = "Sortir du mode &quot;Correction&quot;"
        , solutionsButtonTitle = "Afficher les commentaires"
        , summary = "Résumé"
        , summaryMultipleTaskText = "Activités multiples"
        , total = "Total"
        , totalScore = "Score total"
        , yourScore = "Votre score"
        }
    , override =
        { activeSurface = False
        , enablePrintButton = False
        , hideSummarySlide = False
        , social =
            { facebookShare =
                { quote = "I scored @score out of @maxScore on a task at @currentpageurl."
                , url = "@currentpageurl"
                }
            , googleShareUrl = "@currentpageurl"
            , showFacebookShare = False
            , showGoogleShare = False
            , showTwitterShare = False
            , twitterShare =
                { hashtags = "h5p, course"
                , statement = "I scored @score out of @maxScore on a task at @currentpageurl."
                , url = "@currentpageurl"
                }
            }
        , summarySlideRetryButton = True
        , summarySlideSolutionButton = True
        }
    , presentation =
        { globalBackgroundSelector = { fillGlobalBackground = "" }
        , keywordListAlwaysShow = False
        , keywordListAutoHide = False
        , keywordListEnabled = True
        , keywordListOpacity = 90
        , slides =
            [ { elements = []
              , slideBackgroundSelector = { fillSlideBackground = "" }
              }
            ]
        }
    }



{-
   ████████ ██████  ██    ██ ███████     ██ ███████  █████  ██      ███████ ███████
      ██    ██   ██ ██    ██ ██         ██  ██      ██   ██ ██      ██      ██
      ██    ██████  ██    ██ █████     ██   █████   ███████ ██      ███████ █████
      ██    ██   ██ ██    ██ ██       ██    ██      ██   ██ ██           ██ ██
      ██    ██   ██  ██████  ███████ ██     ██      ██   ██ ███████ ███████ ███████

    ██████  ██    ██ ███████ ███████ ████████ ██  ██████  ███    ██
   ██    ██ ██    ██ ██      ██         ██    ██ ██    ██ ████   ██
   ██    ██ ██    ██ █████   ███████    ██    ██ ██    ██ ██ ██  ██
   ██ ▄▄ ██ ██    ██ ██           ██    ██    ██ ██    ██ ██  ██ ██
    ██████   ██████  ███████ ███████    ██    ██  ██████  ██   ████
       ▀▀
-}


type alias TrueFalse =
    { behaviour : TrueFalseBehaviour
    , confirmCheck : TrueFalseConfirmCheck
    , confirmRetry : TrueFalseConfirmRetry
    , correct : String
    , l10n : TrueFalseL10n
    , media : TrueFalseMedia
    , question : String
    }


type alias TrueFalseBehaviour =
    { autoCheck : Bool
    , confirmCheckDialog : Bool
    , confirmRetryDialog : Bool
    , enableCheckButton : Bool
    , enableRetry : Bool
    , enableSolutionsButton : Bool
    , feedbackOnCorrect : Maybe String
    , feedbackOnWrong : Maybe String
    }


type alias TrueFalseConfirmCheck =
    { body : String
    , cancelLabel : String
    , confirmLabel : String
    , header : String
    }


type alias TrueFalseConfirmRetry =
    { body : String
    , cancelLabel : String
    , confirmLabel : String
    , header : String
    }


type alias TrueFalseL10n =
    { a11yCheck : String
    , a11yRetry : String
    , a11yShowSolution : String
    , checkAnswer : String
    , correctAnswerMessage : String
    , falseText : String
    , score : String
    , scoreBarLabel : String
    , showSolutionButton : String
    , submitAnswer : String
    , trueText : String
    , tryAgain : String
    , wrongAnswerMessage : String
    }


type alias TrueFalseMedia =
    { disableImageZooming : Bool
    }


trueFalseDecoder : D.Decoder TrueFalse
trueFalseDecoder =
    D.map7 TrueFalse
        (D.field "behaviour" trueFalseBehaviourDecoder)
        (D.field "confirmCheck" trueFalseConfirmCheckDecoder)
        (D.field "confirmRetry" trueFalseConfirmRetryDecoder)
        (D.field "correct" D.string)
        (D.field "l10n" trueFalseL10nDecoder)
        (D.field "media" trueFalseMediaDecoder)
        (D.field "question" D.string)


trueFalseBehaviourDecoder : D.Decoder TrueFalseBehaviour
trueFalseBehaviourDecoder =
    D.map8 TrueFalseBehaviour
        (D.field "autoCheck" D.bool)
        (D.field "confirmCheckDialog" D.bool)
        (D.field "confirmRetryDialog" D.bool)
        (D.field "enableCheckButton" D.bool)
        (D.field "enableRetry" D.bool)
        (D.field "enableSolutionsButton" D.bool)
        (D.maybe <| D.field "feedbackOnCorrect" D.string)
        (D.maybe <| D.field "feedbackOnWrong" D.string)


trueFalseConfirmCheckDecoder : D.Decoder TrueFalseConfirmCheck
trueFalseConfirmCheckDecoder =
    D.map4 TrueFalseConfirmCheck
        (D.field "body" D.string)
        (D.field "cancelLabel" D.string)
        (D.field "confirmLabel" D.string)
        (D.field "header" D.string)


trueFalseConfirmRetryDecoder : D.Decoder TrueFalseConfirmRetry
trueFalseConfirmRetryDecoder =
    D.map4 TrueFalseConfirmRetry
        (D.field "body" D.string)
        (D.field "cancelLabel" D.string)
        (D.field "confirmLabel" D.string)
        (D.field "header" D.string)


trueFalseL10nDecoder : D.Decoder TrueFalseL10n
trueFalseL10nDecoder =
    let
        fieldSet0 =
            D.map8 TrueFalseL10n
                (D.field "a11yCheck" D.string)
                (D.field "a11yRetry" D.string)
                (D.field "a11yShowSolution" D.string)
                (D.field "checkAnswer" D.string)
                (D.field "correctAnswerMessage" D.string)
                (D.field "falseText" D.string)
                (D.field "score" D.string)
                (D.field "scoreBarLabel" D.string)
    in
    D.map6 (<|)
        fieldSet0
        (D.field "showSolutionButton" D.string)
        (D.field "submitAnswer" D.string)
        (D.field "trueText" D.string)
        (D.field "tryAgain" D.string)
        (D.field "wrongAnswerMessage" D.string)


trueFalseMediaDecoder : D.Decoder TrueFalseMedia
trueFalseMediaDecoder =
    D.map TrueFalseMedia
        (D.field "disableImageZooming" D.bool)


encodedTrueFalse : TrueFalse -> E.Value
encodedTrueFalse trueFalse =
    E.object
        [ ( "behaviour", encodedTrueFalseBehaviour trueFalse.behaviour )
        , ( "confirmCheck", encodedTrueFalseConfirmCheck trueFalse.confirmCheck )
        , ( "confirmRetry", encodedTrueFalseConfirmRetry trueFalse.confirmRetry )
        , ( "correct", E.string trueFalse.correct )
        , ( "l10n", encodedTrueFalseL10n trueFalse.l10n )
        , ( "media", encodedTrueFalseMedia trueFalse.media )
        , ( "question", E.string trueFalse.question )
        ]


encodedTrueFalseBehaviour : TrueFalseBehaviour -> E.Value
encodedTrueFalseBehaviour trueFalseBehaviour =
    E.object <|
        [ ( "autoCheck", E.bool trueFalseBehaviour.autoCheck )
        , ( "confirmCheckDialog", E.bool trueFalseBehaviour.confirmCheckDialog )
        , ( "confirmRetryDialog", E.bool trueFalseBehaviour.confirmRetryDialog )
        , ( "enableCheckButton", E.bool trueFalseBehaviour.enableCheckButton )
        , ( "enableRetry", E.bool trueFalseBehaviour.enableRetry )
        , ( "enableSolutionsButton", E.bool trueFalseBehaviour.enableSolutionsButton )
        ]
            ++ (case trueFalseBehaviour.feedbackOnCorrect of
                    Just value ->
                        [ ( "feedbackOnCorrect", E.string value ) ]

                    Nothing ->
                        []
               )
            ++ (case trueFalseBehaviour.feedbackOnWrong of
                    Just value ->
                        [ ( "feedbackOnWrong", E.string value ) ]

                    Nothing ->
                        []
               )


encodedTrueFalseConfirmCheck : TrueFalseConfirmCheck -> E.Value
encodedTrueFalseConfirmCheck trueFalseConfirmCheck =
    E.object
        [ ( "body", E.string trueFalseConfirmCheck.body )
        , ( "cancelLabel", E.string trueFalseConfirmCheck.cancelLabel )
        , ( "confirmLabel", E.string trueFalseConfirmCheck.confirmLabel )
        , ( "header", E.string trueFalseConfirmCheck.header )
        ]


encodedTrueFalseConfirmRetry : TrueFalseConfirmRetry -> E.Value
encodedTrueFalseConfirmRetry trueFalseConfirmRetry =
    E.object
        [ ( "body", E.string trueFalseConfirmRetry.body )
        , ( "cancelLabel", E.string trueFalseConfirmRetry.cancelLabel )
        , ( "confirmLabel", E.string trueFalseConfirmRetry.confirmLabel )
        , ( "header", E.string trueFalseConfirmRetry.header )
        ]


encodedTrueFalseL10n : TrueFalseL10n -> E.Value
encodedTrueFalseL10n trueFalseL10n =
    E.object
        [ ( "a11yCheck", E.string trueFalseL10n.a11yCheck )
        , ( "a11yRetry", E.string trueFalseL10n.a11yRetry )
        , ( "a11yShowSolution", E.string trueFalseL10n.a11yShowSolution )
        , ( "checkAnswer", E.string trueFalseL10n.checkAnswer )
        , ( "correctAnswerMessage", E.string trueFalseL10n.correctAnswerMessage )
        , ( "falseText", E.string trueFalseL10n.falseText )
        , ( "score", E.string trueFalseL10n.score )
        , ( "scoreBarLabel", E.string trueFalseL10n.scoreBarLabel )
        , ( "showSolutionButton", E.string trueFalseL10n.showSolutionButton )
        , ( "submitAnswer", E.string trueFalseL10n.submitAnswer )
        , ( "trueText", E.string trueFalseL10n.trueText )
        , ( "tryAgain", E.string trueFalseL10n.tryAgain )
        , ( "wrongAnswerMessage", E.string trueFalseL10n.wrongAnswerMessage )
        ]


encodedTrueFalseMedia : TrueFalseMedia -> E.Value
encodedTrueFalseMedia trueFalseMedia =
    E.object
        [ ( "disableImageZooming", E.bool trueFalseMedia.disableImageZooming )
        ]


nouveauTrueFalse =
    { behaviour =
        { autoCheck = True
        , confirmCheckDialog = False
        , confirmRetryDialog = False
        , enableCheckButton = True
        , enableRetry = True
        , enableSolutionsButton = True
        , feedbackOnCorrect = Just "C&#039;est la base !\n"
        , feedbackOnWrong = Nothing
        }
    , confirmCheck =
        { body = "Êtes-vous sûr de vouloir terminer ?"
        , cancelLabel = "Annuler"
        , confirmLabel = "Confirmer"
        , header = "Terminer ?"
        }
    , confirmRetry =
        { body = "Êtes-vous sûr de vouloir recommencer ?"
        , cancelLabel = "Annuler"
        , confirmLabel = "Confirmer"
        , header = "Recommencer ?"
        }
    , correct = "true"
    , l10n =
        { a11yCheck = "Check the answers. The responses will be marked as correct, incorrect, or unanswered."
        , a11yRetry = "Retry the task. Reset all responses and start the task over again."
        , a11yShowSolution = "Show the solution. The task will be marked with its correct solution."
        , checkAnswer = "Vérifier"
        , correctAnswerMessage = "Bonne réponse"
        , falseText = "Faux"
        , score = "Vous avez obtenu @score points sur un total de @total"
        , scoreBarLabel = "Vous avez obtenu @score points sur un total de @total"
        , showSolutionButton = "Voir la solution"
        , submitAnswer = "Vérifier"
        , trueText = "Vrai"
        , tryAgain = "Recommencer"
        , wrongAnswerMessage = "Réponse incorrecte"
        }
    , media = { disableImageZooming = False }
    , question = ""
    }



{-
    .--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--.
   / .. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \
   \ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/ /
    \/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /
    / /\/ /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /\/ /\
   / /\ \/`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'\ \/\ \
   \ \/\ \                                                                                    /\ \/ /
    \/ /\ \                 ██████╗  █████╗ ██████╗ ███████╗███████╗██████╗                  / /\/ /
    / /\/ /                 ██╔══██╗██╔══██╗██╔══██╗██╔════╝██╔════╝██╔══██╗                 \ \/ /\
   / /\ \/                  ██████╔╝███████║██████╔╝███████╗█████╗  ██████╔╝                  \ \/\ \
   \ \/\ \                  ██╔═══╝ ██╔══██║██╔══██╗╚════██║██╔══╝  ██╔══██╗                  /\ \/ /
    \/ /\ \                 ██║     ██║  ██║██║  ██║███████║███████╗██║  ██║                 / /\/ /
    / /\/ /                 ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚══════╝╚═╝  ╚═╝                 \ \/ /\
   / /\ \/                                                                                    \ \/\ \
   \ \/\ \.--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--./\ \/ /
    \/ /\/ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ /\/ /
    / /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\
   / /\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \
   \ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `' /
    `--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'
-}


type Context
    = PreambleContext
    | RootContext
    | BranchingScenarioContext
    | BranchingQuestionContext
    | BranchingQuestionAlternativeContext
    | CoursePresentationContext
    | TrueFalseContext


parser =
    succeed (L.map fromH5pTree)
        |. preambleParser
        |= inContext RootContext (contentsParser RootContext 1)
        |. end EndOfFile


preambleParser =
    inContext PreambleContext <|
        -- Plus compliqué que nécessaire, en vue d'amélioration
        succeed identity
            |. whileNoStarOnFirstColumnOrEndOfFile


contentsParser context depth =
    sequence
        { start = Token "" GenericProblem
        , separator = Token "" GenericProblem
        , end = Token "" GenericProblem
        , spaces = succeed ()
        , item = contentParser context depth
        , trailing = Optional
        }


contentParser context depth =
    succeed Tuple.pair
        |. stars depth
        |= star
        |. mySpaces
        |= getChompedString
            (chompWhile
                (\c ->
                    c
                        /= ' '
                        && c
                        /= '\n'
                        && c
                        /= '\u{000D}'
                        && c
                        /= '\u{000D}'
                )
            )
        |> andThen
            (\( maybeStar, maybeContentType ) ->
                if maybeStar then
                    problem InconsistantStructure

                else
                    case ( maybeContentType, context ) of
                        ( "BranchingScenario", RootContext ) ->
                            contentParserHelp BranchingScenarioContext depth ""

                        ( "BranchingScenario", _ ) ->
                            problem (Problem "Un BranchingScenario doit se trouver à la racine")

                        ( "CoursePresentation", RootContext ) ->
                            contentParserHelp CoursePresentationContext depth ""

                        ( "CoursePresentation", BranchingScenarioContext ) ->
                            contentParserHelp CoursePresentationContext depth ""

                        ( "CoursePresentation", BranchingQuestionAlternativeContext ) ->
                            contentParserHelp CoursePresentationContext depth ""

                        ( "CoursePresentation", _ ) ->
                            problem (Problem "Un CoursePresentation doit se trouver à la racine, sous un BranchingScenario ou dans une alternative de BranchingQuestion")

                        ( "TrueFalse", RootContext ) ->
                            contentParserHelp TrueFalseContext depth ""

                        ( "TrueFalse", CoursePresentationContext ) ->
                            contentParserHelp TrueFalseContext depth ""

                        ( "TrueFalse", _ ) ->
                            problem (Problem "Un TrueFalse doit se trouver à la racine ou dans un CoursePresentation")

                        ( "", _ ) ->
                            problem NoContent

                        -- Dans les trois cas ci-dessous, le maybeContentType ne désigne
                        -- pas un contentType, c'est une astuce pour récupérer le texte avaler.
                        -- (cf. bit dans la définition de contentParserHelp)
                        ( _, BranchingScenarioContext ) ->
                            contentParserHelp BranchingQuestionContext depth maybeContentType

                        ( _, BranchingQuestionAlternativeContext ) ->
                            contentParserHelp BranchingQuestionContext depth maybeContentType

                        ( _, BranchingQuestionContext ) ->
                            contentParserHelp BranchingQuestionAlternativeContext depth maybeContentType

                        _ ->
                            problem <| UnknownContentType maybeContentType
            )


contentParserHelp context depth bit =
    let
        f endOfLine contentList =
            H5pTree context (bit ++ endOfLine) contentList
    in
    inContext context <|
        succeed f
            |= tillEndOfLine
            |. whileNoStarOnFirstColumnOrEndOfFile
            |= contentsParser context (depth + 1)


whileNoStarOnFirstColumnOrEndOfFile =
    succeed identity
        |. chompWhile ((/=) '*')
        |= getCol
        |> andThen
            (\col ->
                if col > 1 then
                    oneOf
                        [ end EndOfFile
                        , succeed ()
                            |. token (Token "*" EndOfFile)
                            |. whileNoStarOnFirstColumnOrEndOfFile
                        ]

                else
                    succeed ()
            )


stars depth =
    symbol (Token (S.repeat depth "*") GenericProblem)


star =
    succeed
        (\x ->
            if S.length x == 0 then
                False

            else
                True
        )
        |= getChompedString (chompWhile ((==) '*'))


tillEndOfLine =
    getChompedString <| chompWhile ((/=) '\n')


mySpaces =
    chompWhile <| \x -> x == ' ' || x == '\t'



{-
   ██████  ██████   █████  ███    ██  ██████ ██   ██ ██ ███    ██  ██████
   ██   ██ ██   ██ ██   ██ ████   ██ ██      ██   ██ ██ ████   ██ ██
   ██████  ██████  ███████ ██ ██  ██ ██      ███████ ██ ██ ██  ██ ██   ███
   ██   ██ ██   ██ ██   ██ ██  ██ ██ ██      ██   ██ ██ ██  ██ ██ ██    ██
   ██████  ██   ██ ██   ██ ██   ████  ██████ ██   ██ ██ ██   ████  ██████

   ███████  ██████ ███████ ███    ██  █████  ██████  ██  ██████
   ██      ██      ██      ████   ██ ██   ██ ██   ██ ██ ██    ██
   ███████ ██      █████   ██ ██  ██ ███████ ██████  ██ ██    ██
        ██ ██      ██      ██  ██ ██ ██   ██ ██   ██ ██ ██    ██
   ███████  ██████ ███████ ██   ████ ██   ██ ██   ██ ██  ██████
-}
{-

   branchingScenarioParser depth =
       let
           f title contentList =
               BranchingScenarioH5P
                   { nouveauBranchingScenario
                       | startScreen =
                           nouveauBranchingScenario.startScreen
                               |> withStartScreenSubtitle title
                       , content = [] -- TODO
                   }
       in
       succeed f
           |= titleParser
           |. blankLines
           |= loop [] (contentsParser (depth + 1) BranchingScenarioContext)

-}
--|= loop ( [], 0 ) (branchingScenarioParserHelp (depth + 1))
--|. blankLines
{- Dans une configuration de la forme :

       *BranchingScenario Titre du cours
       ** BranchingQuestion Cxu ?
           ...
       ** CoursePresentation
           ...

   Récupère tout ce qui se trouve au niveau ** sous la forme d'une liste
-}
{-
   branchingScenarioParserHelp depth ( contentList, contentId ) =
       oneOf
           [ let
               f ( contents, id ) =
                   Loop ( contentList ++ contents, id + 1 )
             in
             succeed f
               |= contentParser depth contentId
               |. blankLines
           , succeed (Done contentList)
           ]
-}
{-

   contentParserBis depth contentId =
       oneOf
           [ backtrackable <| branchingQuestionParser depth contentId
           , succeed (\x -> ( [ x ], contentId + 1 ))
               |= oneOf
                   [ backtrackable <| coursePresentationParser depth
                   , trueFalseParser depth
                   ]

           --, problemBis "Oups"
           ]

-}
{-
   ██████╗ ██████╗  █████╗ ███╗   ██╗ ██████╗██╗  ██╗██╗███╗   ██╗ ██████╗
   ██╔══██╗██╔══██╗██╔══██╗████╗  ██║██╔════╝██║  ██║██║████╗  ██║██╔════╝
   ██████╔╝██████╔╝███████║██╔██╗ ██║██║     ███████║██║██╔██╗ ██║██║  ███╗
   ██╔══██╗██╔══██╗██╔══██║██║╚██╗██║██║     ██╔══██║██║██║╚██╗██║██║   ██║
   ██████╔╝██║  ██║██║  ██║██║ ╚████║╚██████╗██║  ██║██║██║ ╚████║╚██████╔╝
   ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═╝  ╚═══╝ ╚═════╝

    ██████╗ ██╗   ██╗███████╗███████╗████████╗██╗ ██████╗ ███╗   ██╗
   ██╔═══██╗██║   ██║██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║
   ██║   ██║██║   ██║█████╗  ███████╗   ██║   ██║██║   ██║██╔██╗ ██║
   ██║▄▄ ██║██║   ██║██╔══╝  ╚════██║   ██║   ██║██║   ██║██║╚██╗██║
   ╚██████╔╝╚██████╔╝███████╗███████║   ██║   ██║╚██████╔╝██║ ╚████║
    ╚══▀▀═╝  ╚═════╝ ╚══════╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
-}
{-
   {-| Ici branchList est un enregistrement forçant la liste à avoir au moins deux éléments
   -}
   branchingQuestionParser depth contentId =
       let
           f question ( branchList, id ) =
               ( branchList.first :: branchList.second :: branchList.others
               , contentId + L.length branchList.others + 2
               )
       in
       succeed f
           |. stars depth
           |. keywordBis "BranchingQuestion"
           |. mySpaces
           |= questionParser
           |. blankLines
           -- Je dirais qu'il faut un contentId + 1 ici
           |= loop ( [], contentId ) (branchingQuestionAlternativeParser (depth + 1))


   {-| Ici branchList est une liste
   -}
   branchingQuestionAlternativeParser depth ( branchList, contentId ) =
       oneOf
           [ let
               f alternative ( alternativeList, id ) =
                   case branchList of
                       [] ->
                           -- TODO
                           Loop ( alternativeList, id )

                       _ ->
                           -- TODO
                           Loop ( alternativeList, id )
             in
             succeed f
               |. stars depth
               |= alternativeAnswerParser
               |= loop ( [], contentId ) (branchingQuestionAlternativeParserHelp (depth + 1))
           , (succeed ()
               |> P.map (\_ -> List.concat branchList)
             )
               |> andThen
                   (\xx ->
                       case xx of
                           [] ->
                               problemBis "Un embranchement doit avoir des branches !"

                           x :: [] ->
                               problemBis "Un embranchement doit avoir au moins deux branches !"

                           x :: y :: zz ->
                               succeed ()
                                   |> P.map (\_ -> Done ( { first = x, second = y, others = zz }, contentId ))
                   )
           ]


   {-| Tout le travail reste à faire !
   -}
   branchingQuestionAlternativeParserHelp depth ( branchList, contentId ) =
       oneOf
           [ succeed
               (Done
                   ( [ [ CoursePresentationH5P nouveauCoursePresentation ]
                     , [ TrueFalseH5P nouveauTrueFalse ]
                     ]
                   , contentId
                   )
               )
           ]

-}
{-
    ██████╗ ███████╗███████╗████████╗██╗ ██████╗ ███╗   ██╗    ██████╗ ███████╗███████╗
   ██╔════╝ ██╔════╝██╔════╝╚══██╔══╝██║██╔═══██╗████╗  ██║    ██╔══██╗██╔════╝██╔════╝
   ██║  ███╗█████╗  ███████╗   ██║   ██║██║   ██║██╔██╗ ██║    ██║  ██║█████╗  ███████╗
   ██║   ██║██╔══╝  ╚════██║   ██║   ██║██║   ██║██║╚██╗██║    ██║  ██║██╔══╝  ╚════██║
   ╚██████╔╝███████╗███████║   ██║   ██║╚██████╔╝██║ ╚████║    ██████╔╝███████╗███████║
    ╚═════╝ ╚══════╝╚══════╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝    ╚═════╝ ╚══════╝╚══════╝
   ███████╗██████╗ ██████╗ ███████╗██╗   ██╗██████╗ ███████╗
   ██╔════╝██╔══██╗██╔══██╗██╔════╝██║   ██║██╔══██╗██╔════╝
   █████╗  ██████╔╝██████╔╝█████╗  ██║   ██║██████╔╝███████╗
   ██╔══╝  ██╔══██╗██╔══██╗██╔══╝  ██║   ██║██╔══██╗╚════██║
   ███████╗██║  ██║██║  ██║███████╗╚██████╔╝██║  ██║███████║
   ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝
-}


type Problem
    = --TODO
      NoContent
    | BadKeyword String
    | Problem String
    | GenericProblem
    | EndOfFile
    | ExpectingContentType
    | UnknownContentType String
    | InconsistantStructure


deadEndsToStringBis errs =
    errs
        |> L.map voirErreur
        |> S.join "\n\n"
        |> (++) "J'ai rencontré les problèmes suivants :\n\n"


voirErreur err =
    "Ligne "
        ++ String.fromInt err.row
        ++ ", Colonne "
        ++ String.fromInt err.col
        ++ " : "
        ++ showProblem err.problem
        ++ showContext (L.map .context err.contextStack)
        ++ "\n\n---------------------------------------------------------\n"


showProblem prob =
    case prob of
        Problem p ->
            p ++ "\n"

        NoContent ->
            "Je ne peux pas produire de contenu à partir de rien !\n"

        EndOfFile ->
            "Fin de fichier\n"

        ExpectingContentType ->
            """Je m'attends à trouver l'un des mots clefs suivants :
    BranchingScenario
    CoursePresentation
    TrueFalse
"""

        UnknownContentType x ->
            "Contenu H5P inconnu : " ++ x ++ "\n"

        InconsistantStructure ->
            "La structure du document n'est pas consistante !\n"

        _ ->
            "Problème inconnu\n"


showContext contextStack =
    case contextStack of
        [] ->
            ""

        _ ->
            "\nDans le contexte suivant :\n" ++ showContextHelp 0 (L.reverse contextStack)


showContextHelp depth ccc =
    case ccc of
        [] ->
            ""

        c :: cc ->
            let
                f x =
                    S.repeat depth "*"
                        ++ x
                        ++ showContextHelp (depth + 1) cc
            in
            case c of
                PreambleContext ->
                    "Préambule"

                RootContext ->
                    if cc == [] then
                        "Root"

                    else
                        showContextHelp 1 cc

                BranchingScenarioContext ->
                    f "BranchingScenario\n"

                BranchingQuestionContext ->
                    f "BranchingQuestion\n"

                BranchingQuestionAlternativeContext ->
                    f "Alternative\n"

                CoursePresentationContext ->
                    f "CoursePresentation\n"

                TrueFalseContext ->
                    f "TrueFalse\n"



{-
    .--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--.
   / .. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \
   \ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/ /
    \/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /
    / /\/ /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /\/ /\
   / /\ \/`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'\ \/\ \
   \ \/\ \                                                                                    /\ \/ /
    \/ /\ \               ██████╗ ██╗   ██╗██╗██╗     ██████╗ ███████╗██████╗                / /\/ /
    / /\/ /               ██╔══██╗██║   ██║██║██║     ██╔══██╗██╔════╝██╔══██╗               \ \/ /\
   / /\ \/                ██████╔╝██║   ██║██║██║     ██║  ██║█████╗  ██████╔╝                \ \/\ \
   \ \/\ \                ██╔══██╗██║   ██║██║██║     ██║  ██║██╔══╝  ██╔══██╗                /\ \/ /
    \/ /\ \               ██████╔╝╚██████╔╝██║███████╗██████╔╝███████╗██║  ██║               / /\/ /
    / /\/ /               ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝               \ \/ /\
   / /\ \/                                                                                    \ \/\ \
   \ \/\ \.--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--./\ \/ /
    \/ /\/ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ /\/ /
    / /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\
   / /\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \
   \ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `' /
    `--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'
-}


type H5pTree
    = H5pTree Context String (List H5pTree)


fromH5pTree tree =
    case tree of
        H5pTree BranchingScenarioContext title subTrees ->
            let
                build content =
                    new branchingScenarioField
                        |> with2 startScreenField startScreenSubtitleField title
                        |> with contentField content
                        |> BranchingScenarioH5P
            in
            todo

        {- Méditer la valeur à donner
           fromBranchingScenarioSubTrees 0 subTrees
               |> R.map build
        -}
        H5pTree CoursePresentationContext title subTrees ->
            R.constant <| CoursePresentationH5P nouveauCoursePresentation

        H5pTree TrueFalseContext title subTrees ->
            R.constant <| TrueFalseH5P nouveauTrueFalse

        _ ->
            R.constant <| todo



{- fromBranchingScenarioSubTrees state trees =
   case trees of
       [] ->
           R.constant []

       (H5pTree BranchingQuestionContext question subTrees) :: treesTail ->
           let
               build =
                   R.map f UUID.generator

               --TODO avec nextContentId ...
               alternatives =
                   new alternativesField
                       |> with questionField question
                       -- À revoir, je n'ai pas besoin de toute l'info !
                       |> with alternativesField (todo)

               f uuid =
                   new contentField
                       |> with4 typeField paramsField branchingQuestionField questionField question
                       |> with3 typeField metadataField contentTypeField "Branching Question"
                       |> with2 typeField libraryField "H5P.BranchingQuestion 1.0"
                       |> with4 typeField paramsField branchingQuestionField alternativesField alternatives
                       |> with2 typeField subContentIdField (UUID.toString uuid)
           in
           todo

       s :: ss ->
           -- R.map2 (::) (fromBranchingScenarioSubTree s) (fromBranchingScenarioSubTrees ss)
           todo
-}


type alias BranchingScenarioState =
    { content : List H5p
    , currentId : Maybe Int
    }


fromBranchingScenario state trees =
    case trees of
        [] ->
            state.content

        tree :: treesTail ->
            let
                newState =
                    case tree of
                        H5pTree BranchingQuestionContext question subTrees ->
                            todo

                        H5pTree context title subTrees ->
                            todo
            in
            fromBranchingScenario newState treesTail


type alias BranchingQuestionState =
    { nextContentIds : List Int
    , content : List H5p
    , currentId : Maybe Int
    }


fromBranchingQuestion state trees =
    case trees of
        -- Il va falloir reprendre le code plus haut et l'améliorer
        (H5pTree BranchingQuestionAlternativeContext alternative subTrees) :: treesTail ->
            todo

        _ ->
            let
                branchingQuestion =
                    todo
            in
            todo



{-
   fromBranchingScenarioSubTree subTree nextContentId =
       let
           build title contentType library =
               R.map2 (buildHelp title contentType library) (fromH5pTree subTree) UUID.generator

           buildHelp title contentType library params uuid =
               new contentField
                   |> with3 typeField metadataField titleField title
                   |> with3 typeField metadataField contentTypeField contentType
                   |> with2 typeField libraryField library
                   |> with2 typeField paramsField params
                   |> with2 typeField subContentIdField (UUID.toString uuid)
                   |> with nextContentIdField nextContentId
       in
       case subTree of
           H5pTree CoursePresentationContext title _ ->
               build
                   title
                   "Course Presentation"
                   "H5P.CoursePresentation 1.24"

           H5pTree BranchingQuestionContext question subTrees ->
               todo

           H5pTree context title subTrees ->
               todo
-}
{-
   ███████ ██ ███████ ██      ██████  ███████
   ██      ██ ██      ██      ██   ██ ██
   █████   ██ █████   ██      ██   ██ ███████
   ██      ██ ██      ██      ██   ██      ██
   ██      ██ ███████ ███████ ██████  ███████
-}


new field =
    field.default


map field =
    field.accessor


with field =
    field.with


with2 field subField value record =
    let
        subRecord =
            map field record
                |> with subField value
    in
    record
        |> with field subRecord


with3 field subField subSubField value record =
    let
        subRecord =
            map field record
                |> with2 subField subSubField value
    in
    record
        |> with field subRecord


with4 field subField subSubField subSubSubField value record =
    let
        subRecord =
            map field record
                |> with3 subField subSubField subSubSubField value
    in
    record
        |> with field subRecord


fieldConstructor nameField =
    nameField
        ++ "Field={with=\\value record->{record|"
        ++ nameField
        ++ "=value},\naccessor=."
        ++ nameField
        ++ "}"


fieldsConstructor fields =
    L.map fieldConstructor fields
        |> S.join "\n"


startScreenField =
    { with = \value record -> { record | startScreen = value }
    , accessor = .startScreen
    }


startScreenSubtitleField =
    { with = \value record -> { record | startScreenSubtitle = value }
    , accessor = .startScreenSubtitle
    }


contentField =
    { with = \value record -> { record | content = value }
    , accessor = .content
    , default =
        { contentBehaviour = "useBehavioural"
        , feedback = { subtitle = "" }
        , forceContentFinished = "useBehavioural"
        , showContentTitle = False
        , nextContentId = ""
        , type_ =
            { library = ""
            , params = UnknownBranchingScenarioContentTypeParams
            , subContentId = ""
            , metadata =
                { license = "U"
                , title = ""
                , subTitle = ""
                , contentType = ""
                }
            }
        }
    }


typeField =
    { with = \value record -> { record | type_ = value }
    , accessor = .type_
    }


libraryField =
    { with = \value record -> { record | library = value }, accessor = .library }


metadataField =
    { with = \value record -> { record | metadata = value }
    , accessor = .metadata
    }


contentTypeField =
    { with = \value record -> { record | contentType = value }
    , accessor = .contentType
    }


titleField =
    { with = \value record -> { record | title = value }
    , accessor = .title
    }


paramsField =
    { with = \value record -> { record | params = value }
    , accessor = .params
    }


branchingQuestionField =
    { with = \value record -> { record | branchingQuestion = value }
    , accessor = .branchingQuestion
    }


subContentIdField =
    { with = \value record -> { record | subContentId = value }
    , accessor = .subContentId
    }


nextContentIdField =
    { with = \value record -> { record | nextContentId = value }
    , accessor = .nextContentId
    }


questionField =
    { with = \value record -> { record | question = value }
    , accessor = .question
    }


alternativesField =
    { with = \value record -> { record | alternatives = value }
    , accessor = .alternatives
    , default =
        { question = ""
        , alternatives = []
        }
    }


branchingScenarioField =
    { default =
        { endScreens =
            [ { endScreenTitle = "Fin du parcours personnalisé"
              , endScreenSubtitle = "Fin du parcours personnalisé"
              , contentId = -1
              , endScreenScore = 0
              }
            ]
        , scoringOptionGroup =
            { scoringOption = "no-score"
            , includeInteractionsScores = True
            }
        , startScreen =
            { startScreenTitle = "<p>Parcours personnalisé</p>\n"
            , startScreenSubtitle = "<p>Préparez bien vos méninges !</p>\n"
            }
        , behaviour =
            { enableBackwardsNavigation = True
            , forceContentFinished = False
            }
        , l10n =
            { startScreenButtonText = "Commencer le parcours"
            , endScreenButtonText = "Recommencer le parcours"
            , backButtonText = "Revenir en arrière"
            , proceedButtonText = "Continuer"
            , disableProceedButtonText = "Jouer la vidéo de nouveau"
            , replayButtonText = "Votre note :"
            , scoreText = "Votre note :"
            , fullscreenAria = "Plein écran"
            }
        , content = []
        }
    }


branchingQuestionAlternativesField =
    { default =
        { feedback =
            { title = ""
            , subtitle = ""
            }
        }
    }
