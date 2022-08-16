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
                    case P.run h5pParser strCtn of
                        Ok ctn ->
                            h5pEncode 2 ctn

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
                    case P.run h5pParser strCtn of
                        Ok ctn ->
                            h5pEncode 0 ctn

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
    "presentation": {
        "slides": [
            {
                "elements": [
                    
                ],
                "slideBackgroundSelector": {"fillSlideBackground": ""}
            }
            
        ],
        "keywordListEnabled": true,
        "globalBackgroundSelector": {"fillGlobalBackground": ""},
        "keywordListAlwaysShow": false,
        "keywordListAutoHide": false,
        "keywordListOpacity": 90
    },
    "override": {
        "activeSurface": false,
        "hideSummarySlide": false,
        "summarySlideSolutionButton": true,
        "summarySlideRetryButton": true,
        "enablePrintButton": false,
        "social": {
            "showFacebookShare": false,
            "facebookShare": {
                "url": "@currentpageurl",
                "quote": "I scored @score out of @maxScore on a task at @currentpageurl."
            },
            "showTwitterShare": false,
            "twitterShare": {
                "statement": "I scored @score out of @maxScore on a task at @currentpageurl.",
                "url": "@currentpageurl",
                "hashtags": "h5p, course"
            },
            "showGoogleShare": false,
            "googleShareUrl": "@currentpageurl"
        }
    },
    "l10n": {
        "slide": "Diapositive",
        "score": "Score",
        "yourScore": "Votre score",
        "maxScore": "Score maximum",
        "total": "Total",
        "totalScore": "Score total",
        "showSolutions": "Voir la correction",
        "retry": "Recommencer",
        "exportAnswers": "Exporter",
        "hideKeywords": "Cacher la liste des mots-clés",
        "showKeywords": "Afficher la liste des mots-clés",
        "fullscreen": "Plein écran",
        "exitFullscreen": "Quitter le plein écran",
        "prevSlide": "Diapositive précédente",
        "nextSlide": "Diapositive suivante",
        "currentSlide": "Diapositive courante",
        "lastSlide": "Dernière diapositive",
        "solutionModeTitle": "Sortir du mode &quot;Correction&quot;",
        "solutionModeText": "Passer en mode &quot;correction&quot;",
        "summaryMultipleTaskText": "Activités multiples",
        "scoreMessage": "Votre score :",
        "shareFacebook": "Partager sur Facebook",
        "shareTwitter": "Partager sur Twitter",
        "shareGoogle": "Partager sur Google+",
        "summary": "Résumé",
        "solutionsButtonTitle": "Afficher les commentaires",
        "printTitle": "Imprimer",
        "printIngress": "Comment souhaitez-vous imprimer cette présentation ?",
        "printAllSlides": "Imprimer toutes les diapositives",
        "printCurrentSlide": "Imprimer la diapositive courante",
        "noTitle": "Sans intitulé",
        "accessibilitySlideNavigationExplanation": "Utilisez les fleches gauche et droite pour pour naviguer entre les diapositives",
        "accessibilityCanvasLabel": "Le champs de présentation. Utilisez les fleches gauche et droite pour naviguer entre les diapositives.",
        "containsNotCompleted": "@slideName contient des interactions incomplètes",
        "containsCompleted": "@slideName ccontient des interactions complètes",
        "slideCount": "Diapositive a @index de @total",
        "containsOnlyCorrect": "toutes les réponses sont bonnes sur @slideName",
        "containsIncorrectAnswers": "@slideName contient des réponses incorrectes",
        "shareResult": "Partager le résultat",
        "accessibilityTotalScore": "Vous avez obtenu @score sur @maxScore points au total",
        "accessibilityEnteredFullscreen": "Mode plein-écran activé",
        "accessibilityExitedFullscreen": "Mode plein-écran désactivé",
        "confirmDialogHeader": "Envoyer vos réponses",
        "confirmDialogText": "Cette action va envoyer vos réponses, voulez-vous continuer?",
        "confirmDialogConfirmText": "Envoyer et voir les résultats"
    }
}"""



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
    | CoursePresentationH5P CoursePresentation
    | TrueFalseH5P TrueFalse


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
    , slides : List CoursePresentationPresentationSlidesObject
    }


type alias CoursePresentationPresentationGlobalBackgroundSelector =
    { fillGlobalBackground : String
    }


type alias CoursePresentationPresentationSlidesObject =
    { elements : List ()
    , slideBackgroundSelector : CoursePresentationPresentationSlidesObjectSlideBackgroundSelector
    }


type alias CoursePresentationPresentationSlidesObjectSlideBackgroundSelector =
    { fillSlideBackground : String
    }


coursePresentationDecoder : Json.Decode.Decoder CoursePresentation
coursePresentationDecoder =
    Json.Decode.map3 CoursePresentation
        (Json.Decode.field "l10n" coursePresentationL10nDecoder)
        (Json.Decode.field "override" coursePresentationOverrideDecoder)
        (Json.Decode.field "presentation" coursePresentationPresentationDecoder)


coursePresentationL10nDecoder : Json.Decode.Decoder CoursePresentationL10n
coursePresentationL10nDecoder =
    let
        fieldSet0 =
            Json.Decode.map8 CoursePresentationL10n
                (Json.Decode.field "accessibilityCanvasLabel" Json.Decode.string)
                (Json.Decode.field "accessibilityEnteredFullscreen" Json.Decode.string)
                (Json.Decode.field "accessibilityExitedFullscreen" Json.Decode.string)
                (Json.Decode.field "accessibilitySlideNavigationExplanation" Json.Decode.string)
                (Json.Decode.field "accessibilityTotalScore" Json.Decode.string)
                (Json.Decode.field "confirmDialogConfirmText" Json.Decode.string)
                (Json.Decode.field "confirmDialogHeader" Json.Decode.string)
                (Json.Decode.field "confirmDialogText" Json.Decode.string)

        fieldSet1 =
            Json.Decode.map8 (<|)
                fieldSet0
                (Json.Decode.field "containsCompleted" Json.Decode.string)
                (Json.Decode.field "containsIncorrectAnswers" Json.Decode.string)
                (Json.Decode.field "containsNotCompleted" Json.Decode.string)
                (Json.Decode.field "containsOnlyCorrect" Json.Decode.string)
                (Json.Decode.field "currentSlide" Json.Decode.string)
                (Json.Decode.field "exitFullscreen" Json.Decode.string)
                (Json.Decode.field "exportAnswers" Json.Decode.string)

        fieldSet2 =
            Json.Decode.map8 (<|)
                fieldSet1
                (Json.Decode.field "fullscreen" Json.Decode.string)
                (Json.Decode.field "hideKeywords" Json.Decode.string)
                (Json.Decode.field "lastSlide" Json.Decode.string)
                (Json.Decode.field "maxScore" Json.Decode.string)
                (Json.Decode.field "nextSlide" Json.Decode.string)
                (Json.Decode.field "noTitle" Json.Decode.string)
                (Json.Decode.field "prevSlide" Json.Decode.string)

        fieldSet3 =
            Json.Decode.map8 (<|)
                fieldSet2
                (Json.Decode.field "printAllSlides" Json.Decode.string)
                (Json.Decode.field "printCurrentSlide" Json.Decode.string)
                (Json.Decode.field "printIngress" Json.Decode.string)
                (Json.Decode.field "printTitle" Json.Decode.string)
                (Json.Decode.field "retry" Json.Decode.string)
                (Json.Decode.field "score" Json.Decode.string)
                (Json.Decode.field "scoreMessage" Json.Decode.string)

        fieldSet4 =
            Json.Decode.map8 (<|)
                fieldSet3
                (Json.Decode.field "shareFacebook" Json.Decode.string)
                (Json.Decode.field "shareGoogle" Json.Decode.string)
                (Json.Decode.field "shareResult" Json.Decode.string)
                (Json.Decode.field "shareTwitter" Json.Decode.string)
                (Json.Decode.field "showKeywords" Json.Decode.string)
                (Json.Decode.field "showSolutions" Json.Decode.string)
                (Json.Decode.field "slide" Json.Decode.string)

        fieldSet5 =
            Json.Decode.map8 (<|)
                fieldSet4
                (Json.Decode.field "slideCount" Json.Decode.string)
                (Json.Decode.field "solutionModeText" Json.Decode.string)
                (Json.Decode.field "solutionModeTitle" Json.Decode.string)
                (Json.Decode.field "solutionsButtonTitle" Json.Decode.string)
                (Json.Decode.field "summary" Json.Decode.string)
                (Json.Decode.field "summaryMultipleTaskText" Json.Decode.string)
                (Json.Decode.field "total" Json.Decode.string)
    in
    Json.Decode.map3 (<|)
        fieldSet5
        (Json.Decode.field "totalScore" Json.Decode.string)
        (Json.Decode.field "yourScore" Json.Decode.string)


coursePresentationOverrideDecoder : Json.Decode.Decoder CoursePresentationOverride
coursePresentationOverrideDecoder =
    Json.Decode.map6 CoursePresentationOverride
        (Json.Decode.field "activeSurface" Json.Decode.bool)
        (Json.Decode.field "enablePrintButton" Json.Decode.bool)
        (Json.Decode.field "hideSummarySlide" Json.Decode.bool)
        (Json.Decode.field "social" coursePresentationOverrideSocialDecoder)
        (Json.Decode.field "summarySlideRetryButton" Json.Decode.bool)
        (Json.Decode.field "summarySlideSolutionButton" Json.Decode.bool)


coursePresentationOverrideSocialDecoder : Json.Decode.Decoder CoursePresentationOverrideSocial
coursePresentationOverrideSocialDecoder =
    Json.Decode.map6 CoursePresentationOverrideSocial
        (Json.Decode.field "facebookShare" coursePresentationOverrideSocialFacebookShareDecoder)
        (Json.Decode.field "googleShareUrl" Json.Decode.string)
        (Json.Decode.field "showFacebookShare" Json.Decode.bool)
        (Json.Decode.field "showGoogleShare" Json.Decode.bool)
        (Json.Decode.field "showTwitterShare" Json.Decode.bool)
        (Json.Decode.field "twitterShare" coursePresentationOverrideSocialTwitterShareDecoder)


coursePresentationOverrideSocialFacebookShareDecoder : Json.Decode.Decoder CoursePresentationOverrideSocialFacebookShare
coursePresentationOverrideSocialFacebookShareDecoder =
    Json.Decode.map2 CoursePresentationOverrideSocialFacebookShare
        (Json.Decode.field "quote" Json.Decode.string)
        (Json.Decode.field "url" Json.Decode.string)


coursePresentationOverrideSocialTwitterShareDecoder : Json.Decode.Decoder CoursePresentationOverrideSocialTwitterShare
coursePresentationOverrideSocialTwitterShareDecoder =
    Json.Decode.map3 CoursePresentationOverrideSocialTwitterShare
        (Json.Decode.field "hashtags" Json.Decode.string)
        (Json.Decode.field "statement" Json.Decode.string)
        (Json.Decode.field "url" Json.Decode.string)


coursePresentationPresentationDecoder : Json.Decode.Decoder CoursePresentationPresentation
coursePresentationPresentationDecoder =
    Json.Decode.map6 CoursePresentationPresentation
        (Json.Decode.field "globalBackgroundSelector" coursePresentationPresentationGlobalBackgroundSelectorDecoder)
        (Json.Decode.field "keywordListAlwaysShow" Json.Decode.bool)
        (Json.Decode.field "keywordListAutoHide" Json.Decode.bool)
        (Json.Decode.field "keywordListEnabled" Json.Decode.bool)
        (Json.Decode.field "keywordListOpacity" Json.Decode.int)
        (Json.Decode.field "slides" <| Json.Decode.list coursePresentationPresentationSlidesObjectDecoder)


coursePresentationPresentationGlobalBackgroundSelectorDecoder : Json.Decode.Decoder CoursePresentationPresentationGlobalBackgroundSelector
coursePresentationPresentationGlobalBackgroundSelectorDecoder =
    Json.Decode.map CoursePresentationPresentationGlobalBackgroundSelector
        (Json.Decode.field "fillGlobalBackground" Json.Decode.string)


coursePresentationPresentationSlidesObjectDecoder : Json.Decode.Decoder CoursePresentationPresentationSlidesObject
coursePresentationPresentationSlidesObjectDecoder =
    Json.Decode.map2 CoursePresentationPresentationSlidesObject
        (Json.Decode.field "elements" <| Json.Decode.list <| Json.Decode.succeed ())
        (Json.Decode.field "slideBackgroundSelector" coursePresentationPresentationSlidesObjectSlideBackgroundSelectorDecoder)


coursePresentationPresentationSlidesObjectSlideBackgroundSelectorDecoder : Json.Decode.Decoder CoursePresentationPresentationSlidesObjectSlideBackgroundSelector
coursePresentationPresentationSlidesObjectSlideBackgroundSelectorDecoder =
    Json.Decode.map CoursePresentationPresentationSlidesObjectSlideBackgroundSelector
        (Json.Decode.field "fillSlideBackground" Json.Decode.string)


encodedCoursePresentation : CoursePresentation -> Json.Encode.Value
encodedCoursePresentation coursePresentation =
    Json.Encode.object
        [ ( "l10n", encodedCoursePresentationL10n coursePresentation.l10n )
        , ( "override", encodedCoursePresentationOverride coursePresentation.override )
        , ( "presentation", encodedCoursePresentationPresentation coursePresentation.presentation )
        ]


encodedCoursePresentationL10n : CoursePresentationL10n -> Json.Encode.Value
encodedCoursePresentationL10n coursePresentationL10n =
    Json.Encode.object
        [ ( "accessibilityCanvasLabel", Json.Encode.string coursePresentationL10n.accessibilityCanvasLabel )
        , ( "accessibilityEnteredFullscreen", Json.Encode.string coursePresentationL10n.accessibilityEnteredFullscreen )
        , ( "accessibilityExitedFullscreen", Json.Encode.string coursePresentationL10n.accessibilityExitedFullscreen )
        , ( "accessibilitySlideNavigationExplanation", Json.Encode.string coursePresentationL10n.accessibilitySlideNavigationExplanation )
        , ( "accessibilityTotalScore", Json.Encode.string coursePresentationL10n.accessibilityTotalScore )
        , ( "confirmDialogConfirmText", Json.Encode.string coursePresentationL10n.confirmDialogConfirmText )
        , ( "confirmDialogHeader", Json.Encode.string coursePresentationL10n.confirmDialogHeader )
        , ( "confirmDialogText", Json.Encode.string coursePresentationL10n.confirmDialogText )
        , ( "containsCompleted", Json.Encode.string coursePresentationL10n.containsCompleted )
        , ( "containsIncorrectAnswers", Json.Encode.string coursePresentationL10n.containsIncorrectAnswers )
        , ( "containsNotCompleted", Json.Encode.string coursePresentationL10n.containsNotCompleted )
        , ( "containsOnlyCorrect", Json.Encode.string coursePresentationL10n.containsOnlyCorrect )
        , ( "currentSlide", Json.Encode.string coursePresentationL10n.currentSlide )
        , ( "exitFullscreen", Json.Encode.string coursePresentationL10n.exitFullscreen )
        , ( "exportAnswers", Json.Encode.string coursePresentationL10n.exportAnswers )
        , ( "fullscreen", Json.Encode.string coursePresentationL10n.fullscreen )
        , ( "hideKeywords", Json.Encode.string coursePresentationL10n.hideKeywords )
        , ( "lastSlide", Json.Encode.string coursePresentationL10n.lastSlide )
        , ( "maxScore", Json.Encode.string coursePresentationL10n.maxScore )
        , ( "nextSlide", Json.Encode.string coursePresentationL10n.nextSlide )
        , ( "noTitle", Json.Encode.string coursePresentationL10n.noTitle )
        , ( "prevSlide", Json.Encode.string coursePresentationL10n.prevSlide )
        , ( "printAllSlides", Json.Encode.string coursePresentationL10n.printAllSlides )
        , ( "printCurrentSlide", Json.Encode.string coursePresentationL10n.printCurrentSlide )
        , ( "printIngress", Json.Encode.string coursePresentationL10n.printIngress )
        , ( "printTitle", Json.Encode.string coursePresentationL10n.printTitle )
        , ( "retry", Json.Encode.string coursePresentationL10n.retry )
        , ( "score", Json.Encode.string coursePresentationL10n.score )
        , ( "scoreMessage", Json.Encode.string coursePresentationL10n.scoreMessage )
        , ( "shareFacebook", Json.Encode.string coursePresentationL10n.shareFacebook )
        , ( "shareGoogle", Json.Encode.string coursePresentationL10n.shareGoogle )
        , ( "shareResult", Json.Encode.string coursePresentationL10n.shareResult )
        , ( "shareTwitter", Json.Encode.string coursePresentationL10n.shareTwitter )
        , ( "showKeywords", Json.Encode.string coursePresentationL10n.showKeywords )
        , ( "showSolutions", Json.Encode.string coursePresentationL10n.showSolutions )
        , ( "slide", Json.Encode.string coursePresentationL10n.slide )
        , ( "slideCount", Json.Encode.string coursePresentationL10n.slideCount )
        , ( "solutionModeText", Json.Encode.string coursePresentationL10n.solutionModeText )
        , ( "solutionModeTitle", Json.Encode.string coursePresentationL10n.solutionModeTitle )
        , ( "solutionsButtonTitle", Json.Encode.string coursePresentationL10n.solutionsButtonTitle )
        , ( "summary", Json.Encode.string coursePresentationL10n.summary )
        , ( "summaryMultipleTaskText", Json.Encode.string coursePresentationL10n.summaryMultipleTaskText )
        , ( "total", Json.Encode.string coursePresentationL10n.total )
        , ( "totalScore", Json.Encode.string coursePresentationL10n.totalScore )
        , ( "yourScore", Json.Encode.string coursePresentationL10n.yourScore )
        ]


encodedCoursePresentationOverride : CoursePresentationOverride -> Json.Encode.Value
encodedCoursePresentationOverride coursePresentationOverride =
    Json.Encode.object
        [ ( "activeSurface", Json.Encode.bool coursePresentationOverride.activeSurface )
        , ( "enablePrintButton", Json.Encode.bool coursePresentationOverride.enablePrintButton )
        , ( "hideSummarySlide", Json.Encode.bool coursePresentationOverride.hideSummarySlide )
        , ( "social", encodedCoursePresentationOverrideSocial coursePresentationOverride.social )
        , ( "summarySlideRetryButton", Json.Encode.bool coursePresentationOverride.summarySlideRetryButton )
        , ( "summarySlideSolutionButton", Json.Encode.bool coursePresentationOverride.summarySlideSolutionButton )
        ]


encodedCoursePresentationOverrideSocial : CoursePresentationOverrideSocial -> Json.Encode.Value
encodedCoursePresentationOverrideSocial coursePresentationOverrideSocial =
    Json.Encode.object
        [ ( "facebookShare", encodedCoursePresentationOverrideSocialFacebookShare coursePresentationOverrideSocial.facebookShare )
        , ( "googleShareUrl", Json.Encode.string coursePresentationOverrideSocial.googleShareUrl )
        , ( "showFacebookShare", Json.Encode.bool coursePresentationOverrideSocial.showFacebookShare )
        , ( "showGoogleShare", Json.Encode.bool coursePresentationOverrideSocial.showGoogleShare )
        , ( "showTwitterShare", Json.Encode.bool coursePresentationOverrideSocial.showTwitterShare )
        , ( "twitterShare", encodedCoursePresentationOverrideSocialTwitterShare coursePresentationOverrideSocial.twitterShare )
        ]


encodedCoursePresentationOverrideSocialFacebookShare : CoursePresentationOverrideSocialFacebookShare -> Json.Encode.Value
encodedCoursePresentationOverrideSocialFacebookShare coursePresentationOverrideSocialFacebookShare =
    Json.Encode.object
        [ ( "quote", Json.Encode.string coursePresentationOverrideSocialFacebookShare.quote )
        , ( "url", Json.Encode.string coursePresentationOverrideSocialFacebookShare.url )
        ]


encodedCoursePresentationOverrideSocialTwitterShare : CoursePresentationOverrideSocialTwitterShare -> Json.Encode.Value
encodedCoursePresentationOverrideSocialTwitterShare coursePresentationOverrideSocialTwitterShare =
    Json.Encode.object
        [ ( "hashtags", Json.Encode.string coursePresentationOverrideSocialTwitterShare.hashtags )
        , ( "statement", Json.Encode.string coursePresentationOverrideSocialTwitterShare.statement )
        , ( "url", Json.Encode.string coursePresentationOverrideSocialTwitterShare.url )
        ]


encodedCoursePresentationPresentation : CoursePresentationPresentation -> Json.Encode.Value
encodedCoursePresentationPresentation coursePresentationPresentation =
    Json.Encode.object
        [ ( "globalBackgroundSelector", encodedCoursePresentationPresentationGlobalBackgroundSelector coursePresentationPresentation.globalBackgroundSelector )
        , ( "keywordListAlwaysShow", Json.Encode.bool coursePresentationPresentation.keywordListAlwaysShow )
        , ( "keywordListAutoHide", Json.Encode.bool coursePresentationPresentation.keywordListAutoHide )
        , ( "keywordListEnabled", Json.Encode.bool coursePresentationPresentation.keywordListEnabled )
        , ( "keywordListOpacity", Json.Encode.int coursePresentationPresentation.keywordListOpacity )
        , ( "slides", Json.Encode.list encodedCoursePresentationPresentationSlidesObject coursePresentationPresentation.slides )
        ]


encodedCoursePresentationPresentationGlobalBackgroundSelector : CoursePresentationPresentationGlobalBackgroundSelector -> Json.Encode.Value
encodedCoursePresentationPresentationGlobalBackgroundSelector coursePresentationPresentationGlobalBackgroundSelector =
    Json.Encode.object
        [ ( "fillGlobalBackground", Json.Encode.string coursePresentationPresentationGlobalBackgroundSelector.fillGlobalBackground )
        ]


encodedCoursePresentationPresentationSlidesObject : CoursePresentationPresentationSlidesObject -> Json.Encode.Value
encodedCoursePresentationPresentationSlidesObject coursePresentationPresentationSlidesObject =
    Json.Encode.object
        [ ( "elements", Json.Encode.list (\_ -> Json.Encode.null) coursePresentationPresentationSlidesObject.elements )
        , ( "slideBackgroundSelector", encodedCoursePresentationPresentationSlidesObjectSlideBackgroundSelector coursePresentationPresentationSlidesObject.slideBackgroundSelector )
        ]


encodedCoursePresentationPresentationSlidesObjectSlideBackgroundSelector : CoursePresentationPresentationSlidesObjectSlideBackgroundSelector -> Json.Encode.Value
encodedCoursePresentationPresentationSlidesObjectSlideBackgroundSelector coursePresentationPresentationSlidesObjectSlideBackgroundSelector =
    Json.Encode.object
        [ ( "fillSlideBackground", Json.Encode.string coursePresentationPresentationSlidesObjectSlideBackgroundSelector.fillSlideBackground )
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


h5pParser : Parser (H5P branchingScenarioComposable coursePresentationComposable)
h5pParser =
    oneOf
        [ branchingScenarioParser
        , coursePresentationParser
        , trueFalseParser
        ]


branchingScenarioParser =
    succeed (BranchingScenarioH5P nouveauBranchingScenario)
        |. symbol "*"


coursePresentationParser =
    succeed (CoursePresentationH5P nouveauCoursePresentation)
        |. symbol "*"


trueFalseParser =
    succeed (TrueFalseH5P nouveauTrueFalse)
        |. symbol "*"




