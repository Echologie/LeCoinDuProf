module GenerateurH5P exposing (..)

import Browser exposing (Document)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import Element.Input as Input
import File.Download
import Html exposing (Attribute, Html, button, div, iframe, input, p, section, textarea)
import Json.Decode
import Json.Encode
import List as L
import Parser as P exposing (..)
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
            let
                f strCtn =
                    case P.run (withIndent -1 contenu) strCtn of
                        Ok ctn ->
                            voirBlocs ctn

                        Err erreurs ->
                            deadEndsToStringBis erreurs
            in
            ( { model
                | structureDuContenu = nouvelleStructure
                , contenuGenere = f model.structureDuContenu
              }
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


source =
    """{
    "branchingScenario": {
        "endScreens": [
            {
                "endScreenTitle": "<p>Fin du parcours personnalisé</p>\\n",
                "endScreenSubtitle": "<p>N'hésitez pas à recommencer !</p>\\n",
                "contentId": -1,
                "endScreenScore": 0
            }
        ],
        "scoringOptionGroup": {
            "scoringOption": "no-score",
            "includeInteractionsScores": true
        },
        "startScreen": {
            "startScreenTitle": "<p>Préliminaires</p>\\n",
            "startScreenSubtitle": "<p>Le langage et les règles du jeux mathématiques</p>\\n"
        },
        "behaviour": {
            "enableBackwardsNavigation": true,
            "forceContentFinished": false
        },
        "l10n": {
            "startScreenButtonText": "Commencer le cours",
            "endScreenButtonText": "Recommencer le cours",
            "backButtonText": "Revenir en arrière",
            "proceedButtonText": "Continuer",
            "disableProceedButtonText": "Jouer la vidéo de nouveau",
            "replayButtonText": "Votre note:",
            "scoreText": "Votre note:",
            "fullscreenAria": "Plein écran"
        }}}"""



{-
   ██╗  ██╗███████╗██████╗
   ██║  ██║██╔════╝██╔══██╗
   ███████║███████╗██████╔╝
   ██╔══██║╚════██║██╔═══╝
   ██║  ██║███████║██║
   ╚═╝  ╚═╝╚══════╝╚═╝
-}


type H5P branchingScenarioComposable coursePresentationComposable
    = BranchingScenarioH5P BranchingScenario
    | CoursePresentationH5P


type BranchingScenarioComposable
    = BranchingScenarioComposable


type BranchingScenarioNonComposable
    = BranchingScenarioNonComposable


type CoursePresentationComposable
    = CoursePresentationComposable


type CoursePresentationNonComposable
    = CoursePresentationNonComposable


h5pDecoder : Json.Decode.Decoder (H5P branchingScenarioComposable coursePresentationComposable)
h5pDecoder =
    Json.Decode.map BranchingScenarioH5P <|
        Json.Decode.field "branchingScenario" branchingScenarioDecoder



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


branchingScenarioDecoder : Json.Decode.Decoder BranchingScenario
branchingScenarioDecoder =
    Json.Decode.map6 BranchingScenario
        (Json.Decode.field "behaviour" branchingScenarioBehaviourDecoder)
        (Json.Decode.field "endScreens" <| Json.Decode.list branchingScenarioEndScreensObjectDecoder)
        (Json.Decode.field "l10n" branchingScenarioL10nDecoder)
        (Json.Decode.field "scoringOptionGroup" branchingScenarioScoringOptionGroupDecoder)
        (Json.Decode.field "startScreen" branchingScenarioStartScreenDecoder)
        (Json.Decode.field "content" <| Json.Decode.list branchingScenarioContentDecoder)


branchingScenarioBehaviourDecoder : Json.Decode.Decoder BranchingScenarioBehaviour
branchingScenarioBehaviourDecoder =
    Json.Decode.map2 BranchingScenarioBehaviour
        (Json.Decode.field "enableBackwardsNavigation" Json.Decode.bool)
        (Json.Decode.field "forceContentFinished" Json.Decode.bool)


branchingScenarioEndScreensObjectDecoder : Json.Decode.Decoder BranchingScenarioEndScreensObject
branchingScenarioEndScreensObjectDecoder =
    Json.Decode.map4 BranchingScenarioEndScreensObject
        (Json.Decode.field "contentId" Json.Decode.int)
        (Json.Decode.field "endScreenScore" Json.Decode.int)
        (Json.Decode.field "endScreenSubtitle" Json.Decode.string)
        (Json.Decode.field "endScreenTitle" Json.Decode.string)


branchingScenarioL10nDecoder : Json.Decode.Decoder BranchingScenarioL10n
branchingScenarioL10nDecoder =
    Json.Decode.map8 BranchingScenarioL10n
        (Json.Decode.field "backButtonText" Json.Decode.string)
        (Json.Decode.field "disableProceedButtonText" Json.Decode.string)
        (Json.Decode.field "endScreenButtonText" Json.Decode.string)
        (Json.Decode.field "fullscreenAria" Json.Decode.string)
        (Json.Decode.field "proceedButtonText" Json.Decode.string)
        (Json.Decode.field "replayButtonText" Json.Decode.string)
        (Json.Decode.field "scoreText" Json.Decode.string)
        (Json.Decode.field "startScreenButtonText" Json.Decode.string)


branchingScenarioScoringOptionGroupDecoder : Json.Decode.Decoder BranchingScenarioScoringOptionGroup
branchingScenarioScoringOptionGroupDecoder =
    Json.Decode.map2 BranchingScenarioScoringOptionGroup
        (Json.Decode.field "includeInteractionsScores" Json.Decode.bool)
        (Json.Decode.field "scoringOption" Json.Decode.string)


branchingScenarioStartScreenDecoder : Json.Decode.Decoder BranchingScenarioStartScreen
branchingScenarioStartScreenDecoder =
    Json.Decode.map2 BranchingScenarioStartScreen
        (Json.Decode.field "startScreenSubtitle" Json.Decode.string)
        (Json.Decode.field "startScreenTitle" Json.Decode.string)


encodedBranchingScenario : BranchingScenario -> Json.Encode.Value
encodedBranchingScenario branchingScenario =
    Json.Encode.object
        [ ( "behaviour", encodedBranchingScenarioBehaviour branchingScenario.behaviour )
        , ( "endScreens", Json.Encode.list encodedBranchingScenarioEndScreensObject branchingScenario.endScreens )
        , ( "l10n", encodedBranchingScenarioL10n branchingScenario.l10n )
        , ( "scoringOptionGroup", encodedBranchingScenarioScoringOptionGroup branchingScenario.scoringOptionGroup )
        , ( "startScreen", encodedBranchingScenarioStartScreen branchingScenario.startScreen )
        ]


encodedBranchingScenarioBehaviour : BranchingScenarioBehaviour -> Json.Encode.Value
encodedBranchingScenarioBehaviour branchingScenarioBehaviour =
    Json.Encode.object
        [ ( "enableBackwardsNavigation", Json.Encode.bool branchingScenarioBehaviour.enableBackwardsNavigation )
        , ( "forceContentFinished", Json.Encode.bool branchingScenarioBehaviour.forceContentFinished )
        ]


encodedBranchingScenarioEndScreensObject : BranchingScenarioEndScreensObject -> Json.Encode.Value
encodedBranchingScenarioEndScreensObject branchingScenarioEndScreensObject =
    Json.Encode.object
        [ ( "contentId", Json.Encode.int branchingScenarioEndScreensObject.contentId )
        , ( "endScreenScore", Json.Encode.int branchingScenarioEndScreensObject.endScreenScore )
        , ( "endScreenSubtitle", Json.Encode.string branchingScenarioEndScreensObject.endScreenSubtitle )
        , ( "endScreenTitle", Json.Encode.string branchingScenarioEndScreensObject.endScreenTitle )
        ]


encodedBranchingScenarioL10n : BranchingScenarioL10n -> Json.Encode.Value
encodedBranchingScenarioL10n branchingScenarioL10n =
    Json.Encode.object
        [ ( "backButtonText", Json.Encode.string branchingScenarioL10n.backButtonText )
        , ( "disableProceedButtonText", Json.Encode.string branchingScenarioL10n.disableProceedButtonText )
        , ( "endScreenButtonText", Json.Encode.string branchingScenarioL10n.endScreenButtonText )
        , ( "fullscreenAria", Json.Encode.string branchingScenarioL10n.fullscreenAria )
        , ( "proceedButtonText", Json.Encode.string branchingScenarioL10n.proceedButtonText )
        , ( "replayButtonText", Json.Encode.string branchingScenarioL10n.replayButtonText )
        , ( "scoreText", Json.Encode.string branchingScenarioL10n.scoreText )
        , ( "startScreenButtonText", Json.Encode.string branchingScenarioL10n.startScreenButtonText )
        ]


encodedBranchingScenarioScoringOptionGroup : BranchingScenarioScoringOptionGroup -> Json.Encode.Value
encodedBranchingScenarioScoringOptionGroup branchingScenarioScoringOptionGroup =
    Json.Encode.object
        [ ( "includeInteractionsScores", Json.Encode.bool branchingScenarioScoringOptionGroup.includeInteractionsScores )
        , ( "scoringOption", Json.Encode.string branchingScenarioScoringOptionGroup.scoringOption )
        ]


encodedBranchingScenarioStartScreen : BranchingScenarioStartScreen -> Json.Encode.Value
encodedBranchingScenarioStartScreen branchingScenarioStartScreen =
    Json.Encode.object
        [ ( "startScreenSubtitle", Json.Encode.string branchingScenarioStartScreen.startScreenSubtitle )
        , ( "startScreenTitle", Json.Encode.string branchingScenarioStartScreen.startScreenTitle )
        ]


type alias BranchingScenarioContent =
    { feedback : BranchingScenarioContentFeedback
    , forceContentFinished : String
    , showContentTitle : Bool
    , type_ : BranchingScenarioContentType
    }


type alias BranchingScenarioContentFeedback =
    { subtitle : String
    }


type alias BranchingScenarioContentType =
    {}


branchingScenarioContentDecoder : Json.Decode.Decoder BranchingScenarioContent
branchingScenarioContentDecoder =
    Json.Decode.map4 BranchingScenarioContent
        (Json.Decode.field "feedback" branchingScenarioContentFeedbackDecoder)
        (Json.Decode.field "forceContentFinished" Json.Decode.string)
        (Json.Decode.field "showContentTitle" Json.Decode.bool)
        (Json.Decode.field "type" branchingScenarioContentTypeDecoder)


branchingScenarioContentFeedbackDecoder : Json.Decode.Decoder BranchingScenarioContentFeedback
branchingScenarioContentFeedbackDecoder =
    Json.Decode.map BranchingScenarioContentFeedback
        (Json.Decode.field "subtitle" Json.Decode.string)


branchingScenarioContentTypeDecoder : Json.Decode.Decoder BranchingScenarioContentType
branchingScenarioContentTypeDecoder =
    Json.Decode.succeed BranchingScenarioContentType


encodedBranchingScenarioContent : BranchingScenarioContent -> Json.Encode.Value
encodedBranchingScenarioContent branchingScenarioContent =
    Json.Encode.object
        [ ( "feedback", encodedBranchingScenarioContentFeedback branchingScenarioContent.feedback )
        , ( "forceContentFinished", Json.Encode.string branchingScenarioContent.forceContentFinished )
        , ( "showContentTitle", Json.Encode.bool branchingScenarioContent.showContentTitle )
        , ( "type", encodedBranchingScenarioContentType branchingScenarioContent.type_ )
        ]


encodedBranchingScenarioContentFeedback : BranchingScenarioContentFeedback -> Json.Encode.Value
encodedBranchingScenarioContentFeedback branchingScenarioContentFeedback =
    Json.Encode.object
        [ ( "subtitle", Json.Encode.string branchingScenarioContentFeedback.subtitle )
        ]


encodedBranchingScenarioContentType : BranchingScenarioContentType -> Json.Encode.Value
encodedBranchingScenarioContentType branchingScenarioContentType =
    Json.Encode.object
        []


nouveauBranchingScenario =
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
-- Course Presentation


type alias CoursePresentation =
    { behaviour : CoursePresentationBehaviour
    , confirmCheck : CoursePresentationConfirmCheck
    , confirmRetry : CoursePresentationConfirmRetry
    , correct : String
    , l10n : CoursePresentationL10n
    , media : CoursePresentationMedia
    , question : String
    }


type alias CoursePresentationBehaviour =
    { autoCheck : Bool
    , confirmCheckDialog : Bool
    , confirmRetryDialog : Bool
    , enableCheckButton : Bool
    , enableRetry : Bool
    , enableSolutionsButton : Bool
    , feedbackOnCorrect : String
    , feedbackOnWrong : String
    }


type alias CoursePresentationConfirmCheck =
    { body : String
    , cancelLabel : String
    , confirmLabel : String
    , header : String
    }


type alias CoursePresentationConfirmRetry =
    { body : String
    , cancelLabel : String
    , confirmLabel : String
    , header : String
    }


type alias CoursePresentationL10n =
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


type alias CoursePresentationMedia =
    { disableImageZooming : Bool
    }


coursePresentationDecoder : Json.Decode.Decoder CoursePresentation
coursePresentationDecoder =
    Json.Decode.map7 CoursePresentation
        (Json.Decode.field "behaviour" coursePresentationBehaviourDecoder)
        (Json.Decode.field "confirmCheck" coursePresentationConfirmCheckDecoder)
        (Json.Decode.field "confirmRetry" coursePresentationConfirmRetryDecoder)
        (Json.Decode.field "correct" Json.Decode.string)
        (Json.Decode.field "l10n" coursePresentationL10nDecoder)
        (Json.Decode.field "media" coursePresentationMediaDecoder)
        (Json.Decode.field "question" Json.Decode.string)


coursePresentationBehaviourDecoder : Json.Decode.Decoder CoursePresentationBehaviour
coursePresentationBehaviourDecoder =
    Json.Decode.map8 CoursePresentationBehaviour
        (Json.Decode.field "autoCheck" Json.Decode.bool)
        (Json.Decode.field "confirmCheckDialog" Json.Decode.bool)
        (Json.Decode.field "confirmRetryDialog" Json.Decode.bool)
        (Json.Decode.field "enableCheckButton" Json.Decode.bool)
        (Json.Decode.field "enableRetry" Json.Decode.bool)
        (Json.Decode.field "enableSolutionsButton" Json.Decode.bool)
        (Json.Decode.field "feedbackOnCorrect" Json.Decode.string)
        (Json.Decode.field "feedbackOnWrong" Json.Decode.string)


coursePresentationConfirmCheckDecoder : Json.Decode.Decoder CoursePresentationConfirmCheck
coursePresentationConfirmCheckDecoder =
    Json.Decode.map4 CoursePresentationConfirmCheck
        (Json.Decode.field "body" Json.Decode.string)
        (Json.Decode.field "cancelLabel" Json.Decode.string)
        (Json.Decode.field "confirmLabel" Json.Decode.string)
        (Json.Decode.field "header" Json.Decode.string)


coursePresentationConfirmRetryDecoder : Json.Decode.Decoder CoursePresentationConfirmRetry
coursePresentationConfirmRetryDecoder =
    Json.Decode.map4 CoursePresentationConfirmRetry
        (Json.Decode.field "body" Json.Decode.string)
        (Json.Decode.field "cancelLabel" Json.Decode.string)
        (Json.Decode.field "confirmLabel" Json.Decode.string)
        (Json.Decode.field "header" Json.Decode.string)


coursePresentationL10nDecoder : Json.Decode.Decoder CoursePresentationL10n
coursePresentationL10nDecoder =
    let
        fieldSet0 =
            Json.Decode.map8 CoursePresentationL10n
                (Json.Decode.field "a11yCheck" Json.Decode.string)
                (Json.Decode.field "a11yRetry" Json.Decode.string)
                (Json.Decode.field "a11yShowSolution" Json.Decode.string)
                (Json.Decode.field "checkAnswer" Json.Decode.string)
                (Json.Decode.field "correctAnswerMessage" Json.Decode.string)
                (Json.Decode.field "falseText" Json.Decode.string)
                (Json.Decode.field "score" Json.Decode.string)
                (Json.Decode.field "scoreBarLabel" Json.Decode.string)
    in
    Json.Decode.map6 (<|)
        fieldSet0
        (Json.Decode.field "showSolutionButton" Json.Decode.string)
        (Json.Decode.field "submitAnswer" Json.Decode.string)
        (Json.Decode.field "trueText" Json.Decode.string)
        (Json.Decode.field "tryAgain" Json.Decode.string)
        (Json.Decode.field "wrongAnswerMessage" Json.Decode.string)


coursePresentationMediaDecoder : Json.Decode.Decoder CoursePresentationMedia
coursePresentationMediaDecoder =
    Json.Decode.map CoursePresentationMedia
        (Json.Decode.field "disableImageZooming" Json.Decode.bool)


encodedCoursePresentation : CoursePresentation -> Json.Encode.Value
encodedCoursePresentation coursePresentation =
    Json.Encode.object
        [ ( "behaviour", encodedCoursePresentationBehaviour coursePresentation.behaviour )
        , ( "confirmCheck", encodedCoursePresentationConfirmCheck coursePresentation.confirmCheck )
        , ( "confirmRetry", encodedCoursePresentationConfirmRetry coursePresentation.confirmRetry )
        , ( "correct", Json.Encode.string coursePresentation.correct )
        , ( "l10n", encodedCoursePresentationL10n coursePresentation.l10n )
        , ( "media", encodedCoursePresentationMedia coursePresentation.media )
        , ( "question", Json.Encode.string coursePresentation.question )
        ]


encodedCoursePresentationBehaviour : CoursePresentationBehaviour -> Json.Encode.Value
encodedCoursePresentationBehaviour coursePresentationBehaviour =
    Json.Encode.object
        [ ( "autoCheck", Json.Encode.bool coursePresentationBehaviour.autoCheck )
        , ( "confirmCheckDialog", Json.Encode.bool coursePresentationBehaviour.confirmCheckDialog )
        , ( "confirmRetryDialog", Json.Encode.bool coursePresentationBehaviour.confirmRetryDialog )
        , ( "enableCheckButton", Json.Encode.bool coursePresentationBehaviour.enableCheckButton )
        , ( "enableRetry", Json.Encode.bool coursePresentationBehaviour.enableRetry )
        , ( "enableSolutionsButton", Json.Encode.bool coursePresentationBehaviour.enableSolutionsButton )
        , ( "feedbackOnCorrect", Json.Encode.string coursePresentationBehaviour.feedbackOnCorrect )
        , ( "feedbackOnWrong", Json.Encode.string coursePresentationBehaviour.feedbackOnWrong )
        ]


encodedCoursePresentationConfirmCheck : CoursePresentationConfirmCheck -> Json.Encode.Value
encodedCoursePresentationConfirmCheck coursePresentationConfirmCheck =
    Json.Encode.object
        [ ( "body", Json.Encode.string coursePresentationConfirmCheck.body )
        , ( "cancelLabel", Json.Encode.string coursePresentationConfirmCheck.cancelLabel )
        , ( "confirmLabel", Json.Encode.string coursePresentationConfirmCheck.confirmLabel )
        , ( "header", Json.Encode.string coursePresentationConfirmCheck.header )
        ]


encodedCoursePresentationConfirmRetry : CoursePresentationConfirmRetry -> Json.Encode.Value
encodedCoursePresentationConfirmRetry coursePresentationConfirmRetry =
    Json.Encode.object
        [ ( "body", Json.Encode.string coursePresentationConfirmRetry.body )
        , ( "cancelLabel", Json.Encode.string coursePresentationConfirmRetry.cancelLabel )
        , ( "confirmLabel", Json.Encode.string coursePresentationConfirmRetry.confirmLabel )
        , ( "header", Json.Encode.string coursePresentationConfirmRetry.header )
        ]


encodedCoursePresentationL10n : CoursePresentationL10n -> Json.Encode.Value
encodedCoursePresentationL10n coursePresentationL10n =
    Json.Encode.object
        [ ( "a11yCheck", Json.Encode.string coursePresentationL10n.a11yCheck )
        , ( "a11yRetry", Json.Encode.string coursePresentationL10n.a11yRetry )
        , ( "a11yShowSolution", Json.Encode.string coursePresentationL10n.a11yShowSolution )
        , ( "checkAnswer", Json.Encode.string coursePresentationL10n.checkAnswer )
        , ( "correctAnswerMessage", Json.Encode.string coursePresentationL10n.correctAnswerMessage )
        , ( "falseText", Json.Encode.string coursePresentationL10n.falseText )
        , ( "score", Json.Encode.string coursePresentationL10n.score )
        , ( "scoreBarLabel", Json.Encode.string coursePresentationL10n.scoreBarLabel )
        , ( "showSolutionButton", Json.Encode.string coursePresentationL10n.showSolutionButton )
        , ( "submitAnswer", Json.Encode.string coursePresentationL10n.submitAnswer )
        , ( "trueText", Json.Encode.string coursePresentationL10n.trueText )
        , ( "tryAgain", Json.Encode.string coursePresentationL10n.tryAgain )
        , ( "wrongAnswerMessage", Json.Encode.string coursePresentationL10n.wrongAnswerMessage )
        ]


encodedCoursePresentationMedia : CoursePresentationMedia -> Json.Encode.Value
encodedCoursePresentationMedia coursePresentationMedia =
    Json.Encode.object
        [ ( "disableImageZooming", Json.Encode.bool coursePresentationMedia.disableImageZooming )
        ]



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


trueFalseDecoder : Json.Decode.Decoder TrueFalse
trueFalseDecoder =
    Json.Decode.map7 TrueFalse
        (Json.Decode.field "behaviour" trueFalseBehaviourDecoder)
        (Json.Decode.field "confirmCheck" trueFalseConfirmCheckDecoder)
        (Json.Decode.field "confirmRetry" trueFalseConfirmRetryDecoder)
        (Json.Decode.field "correct" Json.Decode.string)
        (Json.Decode.field "l10n" trueFalseL10nDecoder)
        (Json.Decode.field "media" trueFalseMediaDecoder)
        (Json.Decode.field "question" Json.Decode.string)


trueFalseBehaviourDecoder : Json.Decode.Decoder TrueFalseBehaviour
trueFalseBehaviourDecoder =
    Json.Decode.map8 TrueFalseBehaviour
        (Json.Decode.field "autoCheck" Json.Decode.bool)
        (Json.Decode.field "confirmCheckDialog" Json.Decode.bool)
        (Json.Decode.field "confirmRetryDialog" Json.Decode.bool)
        (Json.Decode.field "enableCheckButton" Json.Decode.bool)
        (Json.Decode.field "enableRetry" Json.Decode.bool)
        (Json.Decode.field "enableSolutionsButton" Json.Decode.bool)
        (Json.Decode.maybe <| Json.Decode.field "feedbackOnCorrect" Json.Decode.string)
        (Json.Decode.maybe <| Json.Decode.field "feedbackOnWrong" Json.Decode.string)


trueFalseConfirmCheckDecoder : Json.Decode.Decoder TrueFalseConfirmCheck
trueFalseConfirmCheckDecoder =
    Json.Decode.map4 TrueFalseConfirmCheck
        (Json.Decode.field "body" Json.Decode.string)
        (Json.Decode.field "cancelLabel" Json.Decode.string)
        (Json.Decode.field "confirmLabel" Json.Decode.string)
        (Json.Decode.field "header" Json.Decode.string)


trueFalseConfirmRetryDecoder : Json.Decode.Decoder TrueFalseConfirmRetry
trueFalseConfirmRetryDecoder =
    Json.Decode.map4 TrueFalseConfirmRetry
        (Json.Decode.field "body" Json.Decode.string)
        (Json.Decode.field "cancelLabel" Json.Decode.string)
        (Json.Decode.field "confirmLabel" Json.Decode.string)
        (Json.Decode.field "header" Json.Decode.string)


trueFalseL10nDecoder : Json.Decode.Decoder TrueFalseL10n
trueFalseL10nDecoder =
    let
        fieldSet0 =
            Json.Decode.map8 TrueFalseL10n
                (Json.Decode.field "a11yCheck" Json.Decode.string)
                (Json.Decode.field "a11yRetry" Json.Decode.string)
                (Json.Decode.field "a11yShowSolution" Json.Decode.string)
                (Json.Decode.field "checkAnswer" Json.Decode.string)
                (Json.Decode.field "correctAnswerMessage" Json.Decode.string)
                (Json.Decode.field "falseText" Json.Decode.string)
                (Json.Decode.field "score" Json.Decode.string)
                (Json.Decode.field "scoreBarLabel" Json.Decode.string)
    in
    Json.Decode.map6 (<|)
        fieldSet0
        (Json.Decode.field "showSolutionButton" Json.Decode.string)
        (Json.Decode.field "submitAnswer" Json.Decode.string)
        (Json.Decode.field "trueText" Json.Decode.string)
        (Json.Decode.field "tryAgain" Json.Decode.string)
        (Json.Decode.field "wrongAnswerMessage" Json.Decode.string)


trueFalseMediaDecoder : Json.Decode.Decoder TrueFalseMedia
trueFalseMediaDecoder =
    Json.Decode.map TrueFalseMedia
        (Json.Decode.field "disableImageZooming" Json.Decode.bool)


encodedTrueFalse : TrueFalse -> Json.Encode.Value
encodedTrueFalse trueFalse =
    Json.Encode.object
        [ ( "behaviour", encodedTrueFalseBehaviour trueFalse.behaviour )
        , ( "confirmCheck", encodedTrueFalseConfirmCheck trueFalse.confirmCheck )
        , ( "confirmRetry", encodedTrueFalseConfirmRetry trueFalse.confirmRetry )
        , ( "correct", Json.Encode.string trueFalse.correct )
        , ( "l10n", encodedTrueFalseL10n trueFalse.l10n )
        , ( "media", encodedTrueFalseMedia trueFalse.media )
        , ( "question", Json.Encode.string trueFalse.question )
        ]


encodedTrueFalseBehaviour : TrueFalseBehaviour -> Json.Encode.Value
encodedTrueFalseBehaviour trueFalseBehaviour =
    Json.Encode.object <|
        [ ( "autoCheck", Json.Encode.bool trueFalseBehaviour.autoCheck )
        , ( "confirmCheckDialog", Json.Encode.bool trueFalseBehaviour.confirmCheckDialog )
        , ( "confirmRetryDialog", Json.Encode.bool trueFalseBehaviour.confirmRetryDialog )
        , ( "enableCheckButton", Json.Encode.bool trueFalseBehaviour.enableCheckButton )
        , ( "enableRetry", Json.Encode.bool trueFalseBehaviour.enableRetry )
        , ( "enableSolutionsButton", Json.Encode.bool trueFalseBehaviour.enableSolutionsButton )
        ]
            ++ (case trueFalseBehaviour.feedbackOnCorrect of
                    Just value ->
                        [ ( "feedbackOnCorrect", Json.Encode.string value ) ]

                    Nothing ->
                        []
               )
            ++ (case trueFalseBehaviour.feedbackOnWrong of
                    Just value ->
                        [ ( "feedbackOnWrong", Json.Encode.string value ) ]

                    Nothing ->
                        []
               )


encodedTrueFalseConfirmCheck : TrueFalseConfirmCheck -> Json.Encode.Value
encodedTrueFalseConfirmCheck trueFalseConfirmCheck =
    Json.Encode.object
        [ ( "body", Json.Encode.string trueFalseConfirmCheck.body )
        , ( "cancelLabel", Json.Encode.string trueFalseConfirmCheck.cancelLabel )
        , ( "confirmLabel", Json.Encode.string trueFalseConfirmCheck.confirmLabel )
        , ( "header", Json.Encode.string trueFalseConfirmCheck.header )
        ]


encodedTrueFalseConfirmRetry : TrueFalseConfirmRetry -> Json.Encode.Value
encodedTrueFalseConfirmRetry trueFalseConfirmRetry =
    Json.Encode.object
        [ ( "body", Json.Encode.string trueFalseConfirmRetry.body )
        , ( "cancelLabel", Json.Encode.string trueFalseConfirmRetry.cancelLabel )
        , ( "confirmLabel", Json.Encode.string trueFalseConfirmRetry.confirmLabel )
        , ( "header", Json.Encode.string trueFalseConfirmRetry.header )
        ]


encodedTrueFalseL10n : TrueFalseL10n -> Json.Encode.Value
encodedTrueFalseL10n trueFalseL10n =
    Json.Encode.object
        [ ( "a11yCheck", Json.Encode.string trueFalseL10n.a11yCheck )
        , ( "a11yRetry", Json.Encode.string trueFalseL10n.a11yRetry )
        , ( "a11yShowSolution", Json.Encode.string trueFalseL10n.a11yShowSolution )
        , ( "checkAnswer", Json.Encode.string trueFalseL10n.checkAnswer )
        , ( "correctAnswerMessage", Json.Encode.string trueFalseL10n.correctAnswerMessage )
        , ( "falseText", Json.Encode.string trueFalseL10n.falseText )
        , ( "score", Json.Encode.string trueFalseL10n.score )
        , ( "scoreBarLabel", Json.Encode.string trueFalseL10n.scoreBarLabel )
        , ( "showSolutionButton", Json.Encode.string trueFalseL10n.showSolutionButton )
        , ( "submitAnswer", Json.Encode.string trueFalseL10n.submitAnswer )
        , ( "trueText", Json.Encode.string trueFalseL10n.trueText )
        , ( "tryAgain", Json.Encode.string trueFalseL10n.tryAgain )
        , ( "wrongAnswerMessage", Json.Encode.string trueFalseL10n.wrongAnswerMessage )
        ]


encodedTrueFalseMedia : TrueFalseMedia -> Json.Encode.Value
encodedTrueFalseMedia trueFalseMedia =
    Json.Encode.object
        [ ( "disableImageZooming", Json.Encode.bool trueFalseMedia.disableImageZooming )
        ]



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
