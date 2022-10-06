module GenerateurH5P exposing (..)

--import Debug

import Browser exposing (Document)
import Bytes.Encode
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import Element.Input exposing (labelHidden, multiline, placeholder)
import File exposing (File)
import File.Download
import File.Select as Select
import Json.Decode as D
import Json.Encode as E
import List as L
import Parser.Advanced as P exposing (..)
import Random as R exposing (Generator)
import Random.Extra as REx
import Set
import String as S
import Style exposing (..)
import Task
import Time exposing (Posix, Zone, here, now)
import Tuple exposing (pair)
import UUID exposing (UUID)
import Update.Extra
import Zip exposing (Zip)
import Zip.Entry exposing (compress, store)


titre =
    "Générateur d'archives H5P"



--todo =
--    Debug.todo "Cette fonctionnalité est en cours de développement"
--h5pTest h5p =
--    case h5p of
--        BranchingScenarioH5P branchingScenario ->
--            branchingScenario.content
--                |> L.map branchingScenarioTest
--                |> S.join "\n"
--        _ ->
--            ""
--branchingScenarioTest branchingScenarioContent =
--    case branchingScenarioContent.type_.params of
--        CoursePresentationBranchingScenarioContentTypeParams cp ->
--            branchingScenarioContent.type_.metadata.title
--                ++ " -> "
--                ++ S.fromInt (Maybe.withDefault -2 branchingScenarioContent.nextContentId)
--        BranchingQuestionBranchingScenarioContentTypeParams bq ->
--            bq
--                |> .alternatives
--                |> L.map (\x -> .text x ++ " -> " ++ S.fromInt (.nextContentId x))
--                |> S.join " | "
--                |> (++) (bq.question ++ " : ")
--        _ ->
--            ""
{-
    .--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--.
   / .. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \
   \ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/ /
    \/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /
    / /\/ /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /\/ /\
   / /\ \/`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'\ \/\ \
   \ \/\ \                                                                                    /\ \/ /
    \/ /\ \                             ████████╗███████╗ █████╗                             / /\/ /
    / /\/ /                             ╚══██╔══╝██╔════╝██╔══██╗                            \ \/ /\
   / /\ \/                                 ██║   █████╗  ███████║                             \ \/\ \
   \ \/\ \                                 ██║   ██╔══╝  ██╔══██║                             /\ \/ /
    \/ /\ \                                ██║   ███████╗██║  ██║                            / /\/ /
    / /\/ /                                ╚═╝   ╚══════╝╚═╝  ╚═╝                            \ \/ /\
   / /\ \/                                                                                    \ \/\ \
   \ \/\ \.--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--./\ \/ /
    \/ /\/ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ /\/ /
    / /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\
   / /\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \
   \ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `' /
    `--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'
-}
{-
   ███    ███  ██████  ██████  ███████ ██
   ████  ████ ██    ██ ██   ██ ██      ██
   ██ ████ ██ ██    ██ ██   ██ █████   ██
   ██  ██  ██ ██    ██ ██   ██ ██      ██
   ██      ██  ██████  ██████  ███████ ███████
-}


type alias Model =
    { source : String
    , generatedContent : List String
    , originalH5pArchive : H5pArchive
    , generatedH5pArchives : List H5pArchive
    , zone : Time.Zone
    , time : Time.Posix
    }


type alias H5pArchive =
    Zip


init : Model
init =
    { source = ""
    , generatedContent =
        L.singleton
            """Copiez-Collez votre contenu à gauche pour voir
apparaître le contenu du fichier content.json"""
    , originalH5pArchive = Zip.empty
    , generatedH5pArchives = []
    , zone = Time.utc
    , time = Time.millisToPosix 0
    }



{-
   ██    ██ ██████  ██████   █████  ████████ ███████
   ██    ██ ██   ██ ██   ██ ██   ██    ██    ██
   ██    ██ ██████  ██   ██ ███████    ██    █████
   ██    ██ ██      ██   ██ ██   ██    ██    ██
    ██████  ██      ██████  ██   ██    ██    ███████
-}


type Msg
    = UpdateTime
    | NewTime ( Zone, Posix )
    | NewContent (List String)
    | Generate String
    | GenerateArchive
    | Download
    | TakeOriginalH5pArchive
    | H5pArchiveLoaded File
    | ZipArchiveLoaded (Maybe H5pArchive)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        UpdateTime ->
            ( model, Task.perform NewTime (Task.map2 pair here now) )

        NewTime ( zone, time ) ->
            ( { model
                | time = time
                , zone = zone
              }
            , Cmd.none
            )

        NewContent generatedContent ->
            ( { model
                | generatedContent = generatedContent
              }
            , Cmd.none
            )
                |> Update.Extra.andThen update UpdateTime
                |> Update.Extra.andThen update GenerateArchive

        Generate source ->
            let
                h5pGenerator =
                    case P.run contentParser source of
                        Ok gen ->
                            R.map toJson gen

                        Err erreurs ->
                            deadEndsToStringBis erreurs
                                |> L.singleton
                                |> R.constant

                toJson =
                    -- Remplacer (h5pEncode 2) par h5pTest pour tester
                    -- TODO Remplacer par 0 quand projet terminé
                    L.map (h5pEncode 0)
            in
            ( { model | source = source }
            , R.generate NewContent h5pGenerator
            )

        GenerateArchive ->
            let
                makeContentEntry content =
                    Bytes.Encode.string content
                        |> Bytes.Encode.encode
                        |> store
                            { path = "content/content.json"
                            , lastModified = ( model.zone, model.time )
                            , comment = Nothing
                            }

                makeH5pArchive entry =
                    Zip.insert entry model.originalH5pArchive

                generatedH5pArchives =
                    model.generatedContent
                        |> L.map (makeH5pArchive << makeContentEntry)
            in
            ( { model
                | generatedH5pArchives = generatedH5pArchives

                --, generatedContent =
                --    generatedH5pArchives
                --        |> L.map Zip.entries
                --        |> L.map (L.map Zip.Entry.path)
                --        |> L.map (S.join "\n")
              }
            , Cmd.none
            )

        Download ->
            ( model
            , case model.generatedH5pArchives of
                h5p :: h5ps ->
                    h5p
                        |> Zip.toBytes
                        |> File.Download.bytes
                            "Parcours.h5p"
                            "application/h5p"

                _ ->
                    Cmd.none
            )

        TakeOriginalH5pArchive ->
            let
                readArchive file =
                    file
                        |> File.toBytes
                        |> Task.map Zip.fromBytes
                        |> Task.perform ZipArchiveLoaded
            in
            ( model
            , Select.file [ "application/h5p" ] H5pArchiveLoaded
            )

        H5pArchiveLoaded file ->
            ( model
            , file
                |> File.toBytes
                |> Task.map Zip.fromBytes
                |> Task.perform ZipArchiveLoaded
            )

        ZipArchiveLoaded zipFile ->
            ( case zipFile of
                Just zip ->
                    { model
                        | originalH5pArchive = zip
                        , generatedContent =
                            zip
                                |> Zip.entries
                                |> L.map Zip.Entry.path
                    }

                Nothing ->
                    { model | generatedContent = [ "Erreur de chargement" ] }
            , Cmd.none
            )
                |> Update.Extra.andThen update GenerateArchive



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
        [ multiline
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
            , label = labelHidden "Structure du contenu"
            , placeholder =
                Just <|
                    placeholder [] <|
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
                [ bouton TakeOriginalH5pArchive "Téléverser"
                , bouton Download "Télécharger"
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
                text <|
                    S.join "\n\n" model.generatedContent
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
    | InteractiveVideoH5p InteractiveVideo


h5pEncode indent content =
    E.encode indent <|
        case content of
            BranchingScenarioH5P branchingScenario ->
                encodedBranchingScenario branchingScenario

            CoursePresentationH5P coursePresentation ->
                encodedCoursePresentation coursePresentation

            TrueFalseH5P trueFalse ->
                encodedTrueFalse trueFalse

            InteractiveVideoH5p interactiveVideo ->
                encodedInteractiveVideo interactiveVideo



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
    , nextContentId : Maybe Int
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
    = AdvancedTextBranchingScenarioContentTypeParams String
    | BranchingQuestionBranchingScenarioContentTypeParams BranchingQuestion
    | CoursePresentationBranchingScenarioContentTypeParams CoursePresentation
    | InteractiveVideoBranchingScenarioContentTypeParams InteractiveVideo



{-
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
       --todo
       D.succeed <| new contentField



   {- À reprendre en ajoutant la gestion de la présence éventuelle d'un
      champ nextContentId

       D.map5 BranchingScenarioContent
           (D.field "contentBehaviour" D.string)
           (D.field "feedback" branchingScenarioContentFeedbackDecoder)
           (D.field "forceContentFinished" D.string)
           (D.field "showContentTitle" D.bool)
           (D.field "type" branchingScenarioContentTypeDecoder)
   -}


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
       D.map CoursePresentationBranchingScenarioContentTypeParams <|
           coursePresentationDecoder

-}


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
    E.object <|
        [ ( "contentBehaviour", E.string branchingScenarioContent.contentBehaviour )
        , ( "feedback", encodedBranchingScenarioContentFeedback branchingScenarioContent.feedback )
        , ( "forceContentFinished", E.string branchingScenarioContent.forceContentFinished )
        , ( "showContentTitle", E.bool branchingScenarioContent.showContentTitle )
        , ( "type", encodedBranchingScenarioContentType branchingScenarioContent.type_ )
        ]
            ++ (case branchingScenarioContent.nextContentId of
                    Just id ->
                        [ ( "nextContentId", E.int id ) ]

                    Nothing ->
                        []
               )


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

        AdvancedTextBranchingScenarioContentTypeParams text ->
            E.object [ ( "text", E.string text ) ]

        BranchingQuestionBranchingScenarioContentTypeParams q ->
            encodedBranchingQuestion q

        InteractiveVideoBranchingScenarioContentTypeParams v ->
            encodedInteractiveVideo v



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
    { alternatives : List BranchingQuestionAlternatives
    , question : String
    }


type alias BranchingQuestionAlternatives =
    { feedback : BranchingQuestionAlternativesFeedback
    , nextContentId : Int
    , text : String
    }


type alias BranchingQuestionAlternativesFeedback =
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


branchingQuestionAlternativesObjectDecoder : D.Decoder BranchingQuestionAlternatives
branchingQuestionAlternativesObjectDecoder =
    D.map3 BranchingQuestionAlternatives
        (D.field "feedback" branchingQuestionAlternativesObjectFeedbackDecoder)
        (D.field "nextContentId" D.int)
        (D.field "text" D.string)


branchingQuestionAlternativesObjectFeedbackDecoder : D.Decoder BranchingQuestionAlternativesFeedback
branchingQuestionAlternativesObjectFeedbackDecoder =
    D.map2 BranchingQuestionAlternativesFeedback
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
        [ ( "alternatives", E.list encodedBranchingQuestionAlternatives branchingQuestion.alternatives )
        , ( "question", E.string branchingQuestion.question )
        ]


encodedBranchingQuestionAlternatives : BranchingQuestionAlternatives -> E.Value
encodedBranchingQuestionAlternatives branchingQuestionAlternativesObject =
    E.object
        [ ( "feedback", encodedBranchingQuestionAlternativesFeedback branchingQuestionAlternativesObject.feedback )
        , ( "nextContentId", E.int branchingQuestionAlternativesObject.nextContentId )
        , ( "text", E.string branchingQuestionAlternativesObject.text )
        ]


encodedBranchingQuestionAlternativesFeedback : BranchingQuestionAlternativesFeedback -> E.Value
encodedBranchingQuestionAlternativesFeedback branchingQuestionAlternativesObjectFeedback =
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
    , backgroundOpacity : Float
    , buttonSize : String
    , displayAsButton : Bool
    , goToSlideType : String
    , height : Float
    , invisible : Bool
    , solution : String
    , width : Float
    , x : Float
    , y : Float
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
    , defaultLanguage : String --Maybe String
    }


type CoursePresentationPresentationSlidesElementsActionParams
    = TrueFalseCoursePresentationPresentationSlidesElementsActionParams TrueFalse


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
        [ ( "globalBackgroundSelector"
          , encodedCoursePresentationPresentationGlobalBackgroundSelector
                coursePresentationPresentation.globalBackgroundSelector
          )
        , ( "keywordListAlwaysShow", E.bool coursePresentationPresentation.keywordListAlwaysShow )
        , ( "keywordListAutoHide", E.bool coursePresentationPresentation.keywordListAutoHide )
        , ( "keywordListEnabled", E.bool coursePresentationPresentation.keywordListEnabled )
        , ( "keywordListOpacity", E.int coursePresentationPresentation.keywordListOpacity )
        , ( "slides"
          , E.list encodedCoursePresentationPresentationSlides
                coursePresentationPresentation.slides
          )
        ]


encodedCoursePresentationPresentationGlobalBackgroundSelector : CoursePresentationPresentationGlobalBackgroundSelector -> E.Value
encodedCoursePresentationPresentationGlobalBackgroundSelector coursePresentationPresentationGlobalBackgroundSelector =
    E.object
        [ ( "fillGlobalBackground", E.string coursePresentationPresentationGlobalBackgroundSelector.fillGlobalBackground )
        ]


encodedCoursePresentationPresentationSlides : CoursePresentationPresentationSlides -> E.Value
encodedCoursePresentationPresentationSlides coursePresentationPresentationSlides =
    E.object
        [ ( "elements", E.list encodedCoursePresentationPresentationSlidesElements coursePresentationPresentationSlides.elements )
        , ( "slideBackgroundSelector", encodedCoursePresentationPresentationSlidesSlideBackgroundSelector coursePresentationPresentationSlides.slideBackgroundSelector )
        ]


encodedCoursePresentationPresentationSlidesElements : CoursePresentationPresentationSlidesElements -> E.Value
encodedCoursePresentationPresentationSlidesElements coursePresentationPresentationSlidesElements =
    E.object
        [ ( "action", encodedCoursePresentationPresentationSlidesElementsAction coursePresentationPresentationSlidesElements.action )
        , ( "alwaysDisplayComments", E.bool coursePresentationPresentationSlidesElements.alwaysDisplayComments )
        , ( "backgroundOpacity", E.float coursePresentationPresentationSlidesElements.backgroundOpacity )
        , ( "buttonSize", E.string coursePresentationPresentationSlidesElements.buttonSize )
        , ( "displayAsButton", E.bool coursePresentationPresentationSlidesElements.displayAsButton )
        , ( "goToSlideType", E.string coursePresentationPresentationSlidesElements.goToSlideType )
        , ( "height", E.float coursePresentationPresentationSlidesElements.height )
        , ( "invisible", E.bool coursePresentationPresentationSlidesElements.invisible )
        , ( "solution", E.string coursePresentationPresentationSlidesElements.solution )
        , ( "width", E.float coursePresentationPresentationSlidesElements.width )
        , ( "x", E.float coursePresentationPresentationSlidesElements.x )
        , ( "y", E.float coursePresentationPresentationSlidesElements.y )
        ]


encodedCoursePresentationPresentationSlidesElementsAction : CoursePresentationPresentationSlidesElementsAction -> E.Value
encodedCoursePresentationPresentationSlidesElementsAction coursePresentationPresentationSlidesElementsAction =
    E.object
        [ ( "library", E.string coursePresentationPresentationSlidesElementsAction.library )
        , ( "metadata", encodedCoursePresentationPresentationSlidesElementsActionMetadata coursePresentationPresentationSlidesElementsAction.metadata )
        , ( "params", encodedCoursePresentationPresentationSlidesElementsActionParams coursePresentationPresentationSlidesElementsAction.params )
        , ( "subContentId", E.string coursePresentationPresentationSlidesElementsAction.subContentId )
        ]


encodedCoursePresentationPresentationSlidesElementsActionMetadata : CoursePresentationPresentationSlidesElementsActionMetadata -> E.Value
encodedCoursePresentationPresentationSlidesElementsActionMetadata coursePresentationPresentationSlidesElementsActionMetadata =
    E.object
        ([ ( "contentType", E.string coursePresentationPresentationSlidesElementsActionMetadata.contentType )
         , ( "license", E.string coursePresentationPresentationSlidesElementsActionMetadata.license )
         , ( "title", E.string coursePresentationPresentationSlidesElementsActionMetadata.title )
         ]
            ++ (case coursePresentationPresentationSlidesElementsActionMetadata.defaultLanguage of
                    defaultLanguage ->
                        [ ( "defaultLanguage", E.string defaultLanguage ) ]
                --Nothing ->
                --    []
               )
        )


encodedCoursePresentationPresentationSlidesElementsActionParams : CoursePresentationPresentationSlidesElementsActionParams -> E.Value
encodedCoursePresentationPresentationSlidesElementsActionParams coursePresentationPresentationSlidesElementsActionParams =
    case coursePresentationPresentationSlidesElementsActionParams of
        TrueFalseCoursePresentationPresentationSlidesElementsActionParams trueFalse ->
            encodedTrueFalse trueFalse


encodedCoursePresentationPresentationSlidesSlideBackgroundSelector : CoursePresentationPresentationSlidesSlideBackgroundSelector -> E.Value
encodedCoursePresentationPresentationSlidesSlideBackgroundSelector coursePresentationPresentationSlidesSlideBackgroundSelector =
    E.object
        [ ( "fillSlideBackground", E.string coursePresentationPresentationSlidesSlideBackgroundSelector.fillSlideBackground )
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
                (D.field "FalseText" D.string)
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



{-
   ██ ███    ██ ████████ ███████ ██████   █████   ██████ ████████ ██ ██    ██ ███████
   ██ ████   ██    ██    ██      ██   ██ ██   ██ ██         ██    ██ ██    ██ ██
   ██ ██ ██  ██    ██    █████   ██████  ███████ ██         ██    ██ ██    ██ █████
   ██ ██  ██ ██    ██    ██      ██   ██ ██   ██ ██         ██    ██  ██  ██  ██
   ██ ██   ████    ██    ███████ ██   ██ ██   ██  ██████    ██    ██   ████   ███████


   ██    ██ ██ ██████  ███████  ██████
   ██    ██ ██ ██   ██ ██      ██    ██
   ██    ██ ██ ██   ██ █████   ██    ██
    ██  ██  ██ ██   ██ ██      ██    ██
     ████   ██ ██████  ███████  ██████
-}


type alias InteractiveVideo =
    { interactiveVideo : InteractiveVideoInteractiveVideo
    , l10n : InteractiveVideoL10n
    , override : InteractiveVideoOverride
    }


type alias InteractiveVideoInteractiveVideo =
    { assets : Maybe InteractiveVideoInteractiveVideoAssets
    , summary : InteractiveVideoInteractiveVideoSummary
    , video : InteractiveVideoInteractiveVideoVideo
    }


type alias InteractiveVideoInteractiveVideoAssets =
    { interactions : List InteractiveVideoInteractiveVideoAssetsInteractions }


type alias InteractiveVideoInteractiveVideoAssetsInteractions =
    { action : InteractiveVideoInteractiveVideoAssetsInteractionsAction
    , adaptivity : InteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity
    , buttonOnMobile : Bool
    , displayType : String
    , duration : InteractiveVideoInteractiveVideoAssetsInteractionsDuration
    , height : Float
    , label : String
    , libraryTitle : String
    , pause : Bool
    , width : Float
    , x : Float
    , y : Float
    }


type alias InteractiveVideoInteractiveVideoAssetsInteractionsAction =
    { library : String
    , metadata : InteractiveVideoInteractiveVideoAssetsInteractionsActionMetadata
    , params : InteractiveVideoInteractiveVideoAssetsInteractionsActionParams
    , subContentId : String
    }


type alias InteractiveVideoInteractiveVideoAssetsInteractionsActionMetadata =
    { contentType : String
    , license : String
    , title : String
    }


type InteractiveVideoInteractiveVideoAssetsInteractionsActionParams
    = TrueFalseInteractiveVideoInteractiveVideoAssetsInteractionsActionParams TrueFalse


type alias InteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity =
    { correct : InteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity_
    , requireCompletion : Bool
    , wrong : InteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity_
    }


type alias InteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity_ =
    { allowOptOut : Bool
    , message : String
    }


type alias InteractiveVideoInteractiveVideoAssetsInteractionsDuration =
    { from : Float
    , to : Float
    }


type alias InteractiveVideoInteractiveVideoSummary =
    { displayAt : Int
    , task : InteractiveVideoInteractiveVideoSummaryTask
    }


type alias InteractiveVideoInteractiveVideoSummaryTask =
    { library : String
    , metadata : InteractiveVideoInteractiveVideoSummaryTaskMetadata
    , params : InteractiveVideoInteractiveVideoSummaryTaskParams
    , subContentId : String
    }


type alias InteractiveVideoInteractiveVideoSummaryTaskMetadata =
    { contentType : String
    , defaultLanguage : String
    , license : String
    , title : String
    }


type alias InteractiveVideoInteractiveVideoSummaryTaskParams =
    { alternativeIncorrectLabel : String
    , intro : String
    , labelCorrect : String
    , labelCorrectAnswers : String
    , labelIncorrect : String
    , overallFeedback : List InteractiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObject
    , progressText : String
    , resultLabel : String
    , scoreBarLabel : String
    , scoreLabel : String
    , solvedLabel : String
    , summaries : List InteractiveVideoInteractiveVideoSummaryTaskParamsSummariesObject
    , tipButtonLabel : String
    }


type alias InteractiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObject =
    { from : Int
    , to : Int
    }


type alias InteractiveVideoInteractiveVideoSummaryTaskParamsSummariesObject =
    { subContentId : String
    , tip : String
    }


type alias InteractiveVideoInteractiveVideoVideo =
    { files : List InteractiveVideoInteractiveVideoVideoFilesObject
    , startScreenOptions : InteractiveVideoInteractiveVideoVideoStartScreenOptions
    , textTracks : InteractiveVideoInteractiveVideoVideoTextTracks
    }


type alias InteractiveVideoInteractiveVideoVideoFilesObject =
    { copyright : InteractiveVideoInteractiveVideoVideoFilesObjectCopyright
    , mime : String
    , path : String
    }


type alias InteractiveVideoInteractiveVideoVideoFilesObjectCopyright =
    { license : String
    }


type alias InteractiveVideoInteractiveVideoVideoStartScreenOptions =
    { hideStartTitle : Bool
    , title : String
    }


type alias InteractiveVideoInteractiveVideoVideoTextTracks =
    { videoTrack : List InteractiveVideoInteractiveVideoVideoTextTracksVideoTrackObject
    }


type alias InteractiveVideoInteractiveVideoVideoTextTracksVideoTrackObject =
    { kind : String
    , label : String
    , srcLang : String
    }


type alias InteractiveVideoL10n =
    { answered : String
    , back : String
    , bookmarks : String
    , captions : String
    , close : String
    , content : String
    , continueWithVideo : String
    , currentTime : String
    , defaultAdaptivitySeekLabel : String
    , endCardTableRowSummaryWithScore : String
    , endCardTableRowSummaryWithoutScore : String
    , endcardAnsweredScore : String
    , endcardInformation : String
    , endcardInformationMustHaveAnswer : String
    , endcardInformationNoAnswers : String
    , endcardInformationOnSubmitButtonDisabled : String
    , endcardSubmitButton : String
    , endcardSubmitMessage : String
    , endcardTableRowAnswered : String
    , endcardTableRowScore : String
    , endcardTitle : String
    , endscreen : String
    , exitFullscreen : String
    , fullscreen : String
    , hours : String
    , interaction : String
    , minutes : String
    , more : String
    , multipleInteractionsAnnouncement : String
    , mute : String
    , navDisabled : String
    , pause : String
    , play : String
    , playbackRate : String
    , quality : String
    , requiresCompletionWarning : String
    , rewind10 : String
    , seconds : String
    , singleInteractionAnnouncement : String
    , sndDisabled : String
    , summary : String
    , totalTime : String
    , unmute : String
    , videoPausedAnnouncement : String
    , videoProgressBar : Maybe String
    }


type alias InteractiveVideoOverride =
    { autoplay : Bool
    , deactivateSound : Bool
    , loop : Bool
    , preventSkipping : Bool
    , showBookmarksmenuOnLoad : Bool
    , showRewind10 : Bool
    }



--interactiveVideoDecoder : D.Decoder InteractiveVideo
--interactiveVideoDecoder =
--    D.map3 InteractiveVideo
--        (D.field "interactiveVideo" interactiveVideoInteractiveVideoDecoder)
--        (D.field "l10n" interactiveVideoL10nDecoder)
--        (D.field "override" interactiveVideoOverrideDecoder)
--interactiveVideoInteractiveVideoDecoder : D.Decoder InteractiveVideoInteractiveVideo
--interactiveVideoInteractiveVideoDecoder =
--    D.map3 InteractiveVideoInteractiveVideo
--        (D.field "assets" interactiveVideoInteractiveVideoAssetsDecoder)
--        (D.field "summary" interactiveVideoInteractiveVideoSummaryDecoder)
--        (D.field "video" interactiveVideoInteractiveVideoVideoDecoder)
--interactiveVideoInteractiveVideoAssetsDecoder : D.Decoder InteractiveVideoInteractiveVideoAssets
--interactiveVideoInteractiveVideoAssetsDecoder =
--    D.succeed InteractiveVideoInteractiveVideoAssets
--interactiveVideoInteractiveVideoSummaryDecoder : D.Decoder InteractiveVideoInteractiveVideoSummary
--interactiveVideoInteractiveVideoSummaryDecoder =
--    D.map2 InteractiveVideoInteractiveVideoSummary
--        (D.field "displayAt" D.int)
--        (D.field "task" interactiveVideoInteractiveVideoSummaryTaskDecoder)
--interactiveVideoInteractiveVideoAssetsInteractionDecoder : D.Decoder InteractiveVideoInteractiveVideoAssetsInteraction
--interactiveVideoInteractiveVideoAssetsInteractionDecoder =
--    let
--        fieldSet0 =
--            D.map8 InteractiveVideoInteractiveVideoAssetsInteraction
--                (D.field "action" interactiveVideoInteractiveVideoAssetsInteractionActionDecoder)
--                (D.field "adaptivity" interactiveVideoInteractiveVideoAssetsInteractionAdaptivityDecoder)
--                (D.field "buttonOnMobile" D.bool)
--                (D.field "displayType" D.string)
--                (D.field "duration" interactiveVideoInteractiveVideoAssetsInteractionDurationDecoder)
--                (D.field "height" D.int)
--                (D.field "label" D.string)
--                (D.field "libraryTitle" D.string)
--    in
--    D.map5 (<|)
--        fieldSet0
--        (D.field "pause" D.bool)
--        (D.field "width" D.int)
--        (D.field "x" D.float)
--        (D.field "y" D.float)
--interactiveVideoInteractiveVideoAssetsInteractionActionDecoder : D.Decoder InteractiveVideoInteractiveVideoAssetsInteractionAction
--interactiveVideoInteractiveVideoAssetsInteractionActionDecoder =
--    D.map4 InteractiveVideoInteractiveVideoAssetsInteractionAction
--        (D.field "library" D.string)
--        (D.field "metadata" interactiveVideoInteractiveVideoAssetsInteractionActionMetadataDecoder)
--        (D.field "params" interactiveVideoInteractiveVideoAssetsInteractionActionParamsDecoder)
--        (D.field "subContentId" D.string)
--interactiveVideoInteractiveVideoAssetsInteractionActionMetadataDecoder : D.Decoder InteractiveVideoInteractiveVideoAssetsInteractionActionMetadata
--interactiveVideoInteractiveVideoAssetsInteractionActionMetadataDecoder =
--    D.map3 InteractiveVideoInteractiveVideoAssetsInteractionActionMetadata
--        (D.field "contentType" D.string)
--        (D.field "license" D.string)
--        (D.field "title" D.string)
--interactiveVideoInteractiveVideoAssetsInteractionActionParamsDecoder : D.Decoder InteractiveVideoInteractiveVideoAssetsInteractionActionParams
--interactiveVideoInteractiveVideoAssetsInteractionActionParamsDecoder =
--    D.succeed InteractiveVideoInteractiveVideoAssetsInteractionActionParams
--interactiveVideoInteractiveVideoAssetsInteractionAdaptivityDecoder : D.Decoder InteractiveVideoInteractiveVideoAssetsInteractionAdaptivity
--interactiveVideoInteractiveVideoAssetsInteractionAdaptivityDecoder =
--    D.map3 InteractiveVideoInteractiveVideoAssetsInteractionAdaptivity
--        (D.field "correct" interactiveVideoInteractiveVideoAssetsInteractionAdaptivityCorrectDecoder)
--        (D.field "requireCompletion" D.bool)
--        (D.field "wrong" interactiveVideoInteractiveVideoAssetsInteractionAdaptivityWrongDecoder)
--interactiveVideoInteractiveVideoAssetsInteractionAdaptivityCorrectDecoder : D.Decoder InteractiveVideoInteractiveVideoAssetsInteractionAdaptivityCorrect
--interactiveVideoInteractiveVideoAssetsInteractionAdaptivityCorrectDecoder =
--    D.map2 InteractiveVideoInteractiveVideoAssetsInteractionAdaptivityCorrect
--        (D.field "allowOptOut" D.bool)
--        (D.field "message" D.string)
--interactiveVideoInteractiveVideoAssetsInteractionAdaptivityWrongDecoder : D.Decoder InteractiveVideoInteractiveVideoAssetsInteractionAdaptivityWrong
--interactiveVideoInteractiveVideoAssetsInteractionAdaptivityWrongDecoder =
--    D.map2 InteractiveVideoInteractiveVideoAssetsInteractionAdaptivityWrong
--        (D.field "allowOptOut" D.bool)
--        (D.field "message" D.string)
--interactiveVideoInteractiveVideoAssetsInteractionDurationDecoder : D.Decoder InteractiveVideoInteractiveVideoAssetsInteractionDuration
--interactiveVideoInteractiveVideoAssetsInteractionDurationDecoder =
--    D.map2 InteractiveVideoInteractiveVideoAssetsInteractionDuration
--        (D.field "from" D.float)
--        (D.field "to" D.float)
--interactiveVideoInteractiveVideoSummaryTaskDecoder : D.Decoder InteractiveVideoInteractiveVideoSummaryTask
--interactiveVideoInteractiveVideoSummaryTaskDecoder =
--    D.map4 InteractiveVideoInteractiveVideoSummaryTask
--        (D.field "library" D.string)
--        (D.field "metadata" interactiveVideoInteractiveVideoSummaryTaskMetadataDecoder)
--        (D.field "params" interactiveVideoInteractiveVideoSummaryTaskParamsDecoder)
--        (D.field "subContentId" D.string)
--interactiveVideoInteractiveVideoSummaryTaskMetadataDecoder : D.Decoder InteractiveVideoInteractiveVideoSummaryTaskMetadata
--interactiveVideoInteractiveVideoSummaryTaskMetadataDecoder =
--    D.map4 InteractiveVideoInteractiveVideoSummaryTaskMetadata
--        (D.field "contentType" D.string)
--        (D.field "defaultLanguage" D.string)
--        (D.field "license" D.string)
--        (D.field "title" D.string)
--interactiveVideoInteractiveVideoSummaryTaskParamsDecoder : D.Decoder InteractiveVideoInteractiveVideoSummaryTaskParams
--interactiveVideoInteractiveVideoSummaryTaskParamsDecoder =
--    let
--        fieldSet0 =
--            D.map8 InteractiveVideoInteractiveVideoSummaryTaskParams
--                (D.field "alternativeIncorrectLabel" D.string)
--                (D.field "intro" D.string)
--                (D.field "labelCorrect" D.string)
--                (D.field "labelCorrectAnswers" D.string)
--                (D.field "labelIncorrect" D.string)
--                (D.field "overallFeedback" <| D.list interactiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObjectDecoder)
--                (D.field "progressText" D.string)
--                (D.field "resultLabel" D.string)
--    in
--    D.map6 (<|)
--        fieldSet0
--        (D.field "scoreBarLabel" D.string)
--        (D.field "scoreLabel" D.string)
--        (D.field "solvedLabel" D.string)
--        (D.field "summaries" <| D.list interactiveVideoInteractiveVideoSummaryTaskParamsSummariesObjectDecoder)
--        (D.field "tipButtonLabel" D.string)
--interactiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObjectDecoder : D.Decoder InteractiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObject
--interactiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObjectDecoder =
--    D.map2 InteractiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObject
--        (D.field "from" D.int)
--        (D.field "to" D.int)
--interactiveVideoInteractiveVideoSummaryTaskParamsSummariesObjectDecoder : D.Decoder InteractiveVideoInteractiveVideoSummaryTaskParamsSummariesObject
--interactiveVideoInteractiveVideoSummaryTaskParamsSummariesObjectDecoder =
--    D.map2 InteractiveVideoInteractiveVideoSummaryTaskParamsSummariesObject
--        (D.field "subContentId" D.string)
--        (D.field "tip" D.string)
--interactiveVideoInteractiveVideoVideoDecoder : D.Decoder InteractiveVideoInteractiveVideoVideo
--interactiveVideoInteractiveVideoVideoDecoder =
--    D.map3 InteractiveVideoInteractiveVideoVideo
--        (D.field "files" <| D.list interactiveVideoInteractiveVideoVideoFilesObjectDecoder)
--        (D.field "startScreenOptions" interactiveVideoInteractiveVideoVideoStartScreenOptionsDecoder)
--        (D.field "textTracks" interactiveVideoInteractiveVideoVideoTextTracksDecoder)
--interactiveVideoInteractiveVideoVideoFilesObjectDecoder : D.Decoder InteractiveVideoInteractiveVideoVideoFilesObject
--interactiveVideoInteractiveVideoVideoFilesObjectDecoder =
--    D.map3 InteractiveVideoInteractiveVideoVideoFilesObject
--        (D.field "copyright" interactiveVideoInteractiveVideoVideoFilesObjectCopyrightDecoder)
--        (D.field "mime" D.string)
--        (D.field "path" D.string)
--interactiveVideoInteractiveVideoVideoFilesObjectCopyrightDecoder : D.Decoder InteractiveVideoInteractiveVideoVideoFilesObjectCopyright
--interactiveVideoInteractiveVideoVideoFilesObjectCopyrightDecoder =
--    D.map InteractiveVideoInteractiveVideoVideoFilesObjectCopyright
--        (D.field "license" D.string)
--interactiveVideoInteractiveVideoVideoStartScreenOptionsDecoder : D.Decoder InteractiveVideoInteractiveVideoVideoStartScreenOptions
--interactiveVideoInteractiveVideoVideoStartScreenOptionsDecoder =
--    D.map2 InteractiveVideoInteractiveVideoVideoStartScreenOptions
--        (D.field "hideStartTitle" D.bool)
--        (D.field "title" D.string)
--interactiveVideoInteractiveVideoVideoTextTracksDecoder : D.Decoder InteractiveVideoInteractiveVideoVideoTextTracks
--interactiveVideoInteractiveVideoVideoTextTracksDecoder =
--    D.map InteractiveVideoInteractiveVideoVideoTextTracks
--        (D.field "videoTrack" <| D.list interactiveVideoInteractiveVideoVideoTextTracksVideoTrackObjectDecoder)
--interactiveVideoInteractiveVideoVideoTextTracksVideoTrackObjectDecoder : D.Decoder InteractiveVideoInteractiveVideoVideoTextTracksVideoTrackObject
--interactiveVideoInteractiveVideoVideoTextTracksVideoTrackObjectDecoder =
--    D.map3 InteractiveVideoInteractiveVideoVideoTextTracksVideoTrackObject
--        (D.field "kind" D.string)
--        (D.field "label" D.string)
--        (D.field "srcLang" D.string)
--interactiveVideoL10nDecoder : D.Decoder InteractiveVideoL10n
--interactiveVideoL10nDecoder =
--    let
--        fieldSet0 =
--            D.map8 InteractiveVideoL10n
--                (D.field "answered" D.string)
--                (D.field "back" D.string)
--                (D.field "bookmarks" D.string)
--                (D.field "captions" D.string)
--                (D.field "close" D.string)
--                (D.field "content" D.string)
--                (D.field "continueWithVideo" D.string)
--                (D.field "currentTime" D.string)
--        fieldSet1 =
--            D.map8 (<|)
--                fieldSet0
--                (D.field "defaultAdaptivitySeekLabel" D.string)
--                (D.field "endCardTableRowSummaryWithScore" D.string)
--                (D.field "endCardTableRowSummaryWithoutScore" D.string)
--                (D.field "endcardAnsweredScore" D.string)
--                (D.field "endcardInformation" D.string)
--                (D.field "endcardInformationMustHaveAnswer" D.string)
--                (D.field "endcardInformationNoAnswers" D.string)
--        fieldSet2 =
--            D.map8 (<|)
--                fieldSet1
--                (D.field "endcardInformationOnSubmitButtonDisabled" D.string)
--                (D.field "endcardSubmitButton" D.string)
--                (D.field "endcardSubmitMessage" D.string)
--                (D.field "endcardTableRowAnswered" D.string)
--                (D.field "endcardTableRowScore" D.string)
--                (D.field "endcardTitle" D.string)
--                (D.field "endscreen" D.string)
--        fieldSet3 =
--            D.map8 (<|)
--                fieldSet2
--                (D.field "exitFullscreen" D.string)
--                (D.field "fullscreen" D.string)
--                (D.field "hours" D.string)
--                (D.field "interaction" D.string)
--                (D.field "minutes" D.string)
--                (D.field "more" D.string)
--                (D.field "multipleInteractionsAnnouncement" D.string)
--        fieldSet4 =
--            D.map8 (<|)
--                fieldSet3
--                (D.field "mute" D.string)
--                (D.field "navDisabled" D.string)
--                (D.field "pause" D.string)
--                (D.field "play" D.string)
--                (D.field "playbackRate" D.string)
--                (D.field "quality" D.string)
--                (D.field "requiresCompletionWarning" D.string)
--        fieldSet5 =
--            D.map8 (<|)
--                fieldSet4
--                (D.field "rewind10" D.string)
--                (D.field "seconds" D.string)
--                (D.field "singleInteractionAnnouncement" D.string)
--                (D.field "sndDisabled" D.string)
--                (D.field "summary" D.string)
--                (D.field "totalTime" D.string)
--                (D.field "unmute" D.string)
--    in
--    D.map2 (<|)
--        fieldSet5
--        (D.field "videoPausedAnnouncement" D.string)
--interactiveVideoOverrideDecoder : D.Decoder InteractiveVideoOverride
--interactiveVideoOverrideDecoder =
--    D.map6 InteractiveVideoOverride
--        (D.field "autoplay" D.bool)
--        (D.field "deactivateSound" D.bool)
--        (D.field "loop" D.bool)
--        (D.field "preventSkipping" D.bool)
--        (D.field "showBookmarksmenuOnLoad" D.bool)
--        (D.field "showRewind10" D.bool)


encodedInteractiveVideo : InteractiveVideo -> E.Value
encodedInteractiveVideo interactiveVideo =
    E.object
        [ ( "interactiveVideo", encodedInteractiveVideoInteractiveVideo interactiveVideo.interactiveVideo )
        , ( "l10n", encodedInteractiveVideoL10n interactiveVideo.l10n )
        , ( "override", encodedInteractiveVideoOverride interactiveVideo.override )
        ]


encodedInteractiveVideoInteractiveVideo : InteractiveVideoInteractiveVideo -> E.Value
encodedInteractiveVideoInteractiveVideo interactiveVideoInteractiveVideo =
    E.object <|
        [ ( "assets"
          , case interactiveVideoInteractiveVideo.assets of
                Just assets ->
                    encodedInteractiveVideoInteractiveVideoAssets assets

                Nothing ->
                    E.object []
          )
        ]
            ++ [ ( "summary", encodedInteractiveVideoInteractiveVideoSummary interactiveVideoInteractiveVideo.summary )
               , ( "video", encodedInteractiveVideoInteractiveVideoVideo interactiveVideoInteractiveVideo.video )
               ]


encodedInteractiveVideoInteractiveVideoAssets : InteractiveVideoInteractiveVideoAssets -> E.Value
encodedInteractiveVideoInteractiveVideoAssets interactiveVideoInteractiveVideoAssets =
    E.object
        [ ( "interactions", E.list encodedInteractiveVideoInteractiveVideoAssetsInteractions interactiveVideoInteractiveVideoAssets.interactions ) ]


encodedInteractiveVideoInteractiveVideoAssetsInteractions : InteractiveVideoInteractiveVideoAssetsInteractions -> E.Value
encodedInteractiveVideoInteractiveVideoAssetsInteractions interactiveVideoInteractiveVideoAssetsInteractions =
    E.object
        [ ( "action", encodedInteractiveVideoInteractiveVideoAssetsInteractionsAction interactiveVideoInteractiveVideoAssetsInteractions.action )
        , ( "adaptivity", encodedInteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity interactiveVideoInteractiveVideoAssetsInteractions.adaptivity )
        , ( "buttonOnMobile", E.bool interactiveVideoInteractiveVideoAssetsInteractions.buttonOnMobile )
        , ( "displayType", E.string interactiveVideoInteractiveVideoAssetsInteractions.displayType )
        , ( "duration", encodedInteractiveVideoInteractiveVideoAssetsInteractionsDuration interactiveVideoInteractiveVideoAssetsInteractions.duration )
        , ( "height", E.float interactiveVideoInteractiveVideoAssetsInteractions.height )
        , ( "label", E.string interactiveVideoInteractiveVideoAssetsInteractions.label )
        , ( "libraryTitle", E.string interactiveVideoInteractiveVideoAssetsInteractions.libraryTitle )
        , ( "pause", E.bool interactiveVideoInteractiveVideoAssetsInteractions.pause )
        , ( "width", E.float interactiveVideoInteractiveVideoAssetsInteractions.width )
        , ( "x", E.float interactiveVideoInteractiveVideoAssetsInteractions.x )
        , ( "y", E.float interactiveVideoInteractiveVideoAssetsInteractions.y )
        ]


encodedInteractiveVideoInteractiveVideoAssetsInteractionsAction : InteractiveVideoInteractiveVideoAssetsInteractionsAction -> E.Value
encodedInteractiveVideoInteractiveVideoAssetsInteractionsAction interactiveVideoInteractiveVideoAssetsInteractionsAction =
    E.object
        [ ( "library", E.string interactiveVideoInteractiveVideoAssetsInteractionsAction.library )
        , ( "metadata", encodedInteractiveVideoInteractiveVideoAssetsInteractionsActionMetadata interactiveVideoInteractiveVideoAssetsInteractionsAction.metadata )
        , ( "params", encodedInteractiveVideoInteractiveVideoAssetsInteractionsActionParams interactiveVideoInteractiveVideoAssetsInteractionsAction.params )
        , ( "subContentId", E.string interactiveVideoInteractiveVideoAssetsInteractionsAction.subContentId )
        ]


encodedInteractiveVideoInteractiveVideoAssetsInteractionsActionMetadata : InteractiveVideoInteractiveVideoAssetsInteractionsActionMetadata -> E.Value
encodedInteractiveVideoInteractiveVideoAssetsInteractionsActionMetadata interactiveVideoInteractiveVideoAssetsInteractionsActionMetadata =
    E.object
        [ ( "contentType", E.string interactiveVideoInteractiveVideoAssetsInteractionsActionMetadata.contentType )
        , ( "license", E.string interactiveVideoInteractiveVideoAssetsInteractionsActionMetadata.license )
        , ( "title", E.string interactiveVideoInteractiveVideoAssetsInteractionsActionMetadata.title )
        ]


encodedInteractiveVideoInteractiveVideoAssetsInteractionsActionParams : InteractiveVideoInteractiveVideoAssetsInteractionsActionParams -> E.Value
encodedInteractiveVideoInteractiveVideoAssetsInteractionsActionParams interactiveVideoInteractiveVideoAssetsInteractionsActionParams =
    case interactiveVideoInteractiveVideoAssetsInteractionsActionParams of
        TrueFalseInteractiveVideoInteractiveVideoAssetsInteractionsActionParams trueFalse ->
            encodedTrueFalse trueFalse


encodedInteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity : InteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity -> E.Value
encodedInteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity interactiveVideoInteractiveVideoAssetsInteractionsAdaptivity =
    E.object
        [ ( "correct", encodedInteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity_ interactiveVideoInteractiveVideoAssetsInteractionsAdaptivity.correct )
        , ( "requireCompletion", E.bool interactiveVideoInteractiveVideoAssetsInteractionsAdaptivity.requireCompletion )
        , ( "wrong", encodedInteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity_ interactiveVideoInteractiveVideoAssetsInteractionsAdaptivity.wrong )
        ]


encodedInteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity_ : InteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity_ -> E.Value
encodedInteractiveVideoInteractiveVideoAssetsInteractionsAdaptivity_ interactiveVideoInteractiveVideoAssetsInteractionsAdaptivity_ =
    E.object
        [ ( "allowOptOut", E.bool interactiveVideoInteractiveVideoAssetsInteractionsAdaptivity_.allowOptOut )
        , ( "message", E.string interactiveVideoInteractiveVideoAssetsInteractionsAdaptivity_.message )
        ]


encodedInteractiveVideoInteractiveVideoAssetsInteractionsDuration : InteractiveVideoInteractiveVideoAssetsInteractionsDuration -> E.Value
encodedInteractiveVideoInteractiveVideoAssetsInteractionsDuration interactiveVideoInteractiveVideoAssetsInteractionsDuration =
    E.object
        [ ( "from", E.float interactiveVideoInteractiveVideoAssetsInteractionsDuration.from )
        , ( "to", E.float interactiveVideoInteractiveVideoAssetsInteractionsDuration.to )
        ]


encodedInteractiveVideoInteractiveVideoSummary : InteractiveVideoInteractiveVideoSummary -> E.Value
encodedInteractiveVideoInteractiveVideoSummary interactiveVideoInteractiveVideoSummary =
    E.object
        [ ( "displayAt", E.int interactiveVideoInteractiveVideoSummary.displayAt )
        , ( "task", encodedInteractiveVideoInteractiveVideoSummaryTask interactiveVideoInteractiveVideoSummary.task )
        ]


encodedInteractiveVideoInteractiveVideoSummaryTask : InteractiveVideoInteractiveVideoSummaryTask -> E.Value
encodedInteractiveVideoInteractiveVideoSummaryTask interactiveVideoInteractiveVideoSummaryTask =
    E.object
        [ ( "library", E.string interactiveVideoInteractiveVideoSummaryTask.library )
        , ( "metadata", encodedInteractiveVideoInteractiveVideoSummaryTaskMetadata interactiveVideoInteractiveVideoSummaryTask.metadata )
        , ( "params", encodedInteractiveVideoInteractiveVideoSummaryTaskParams interactiveVideoInteractiveVideoSummaryTask.params )
        , ( "subContentId", E.string interactiveVideoInteractiveVideoSummaryTask.subContentId )
        ]


encodedInteractiveVideoInteractiveVideoSummaryTaskMetadata : InteractiveVideoInteractiveVideoSummaryTaskMetadata -> E.Value
encodedInteractiveVideoInteractiveVideoSummaryTaskMetadata interactiveVideoInteractiveVideoSummaryTaskMetadata =
    E.object
        [ ( "contentType", E.string interactiveVideoInteractiveVideoSummaryTaskMetadata.contentType )
        , ( "defaultLanguage", E.string interactiveVideoInteractiveVideoSummaryTaskMetadata.defaultLanguage )
        , ( "license", E.string interactiveVideoInteractiveVideoSummaryTaskMetadata.license )
        , ( "title", E.string interactiveVideoInteractiveVideoSummaryTaskMetadata.title )
        ]


encodedInteractiveVideoInteractiveVideoSummaryTaskParams : InteractiveVideoInteractiveVideoSummaryTaskParams -> E.Value
encodedInteractiveVideoInteractiveVideoSummaryTaskParams interactiveVideoInteractiveVideoSummaryTaskParams =
    E.object
        [ ( "alternativeIncorrectLabel", E.string interactiveVideoInteractiveVideoSummaryTaskParams.alternativeIncorrectLabel )
        , ( "intro", E.string interactiveVideoInteractiveVideoSummaryTaskParams.intro )
        , ( "labelCorrect", E.string interactiveVideoInteractiveVideoSummaryTaskParams.labelCorrect )
        , ( "labelCorrectAnswers", E.string interactiveVideoInteractiveVideoSummaryTaskParams.labelCorrectAnswers )
        , ( "labelIncorrect", E.string interactiveVideoInteractiveVideoSummaryTaskParams.labelIncorrect )
        , ( "overallFeedback", E.list encodedInteractiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObject interactiveVideoInteractiveVideoSummaryTaskParams.overallFeedback )
        , ( "progressText", E.string interactiveVideoInteractiveVideoSummaryTaskParams.progressText )
        , ( "resultLabel", E.string interactiveVideoInteractiveVideoSummaryTaskParams.resultLabel )
        , ( "scoreBarLabel", E.string interactiveVideoInteractiveVideoSummaryTaskParams.scoreBarLabel )
        , ( "scoreLabel", E.string interactiveVideoInteractiveVideoSummaryTaskParams.scoreLabel )
        , ( "solvedLabel", E.string interactiveVideoInteractiveVideoSummaryTaskParams.solvedLabel )
        , ( "summaries", E.list encodedInteractiveVideoInteractiveVideoSummaryTaskParamsSummariesObject interactiveVideoInteractiveVideoSummaryTaskParams.summaries )
        , ( "tipButtonLabel", E.string interactiveVideoInteractiveVideoSummaryTaskParams.tipButtonLabel )
        ]


encodedInteractiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObject : InteractiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObject -> E.Value
encodedInteractiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObject interactiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObject =
    E.object
        [ ( "from", E.int interactiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObject.from )
        , ( "to", E.int interactiveVideoInteractiveVideoSummaryTaskParamsOverallFeedbackObject.to )
        ]


encodedInteractiveVideoInteractiveVideoSummaryTaskParamsSummariesObject : InteractiveVideoInteractiveVideoSummaryTaskParamsSummariesObject -> E.Value
encodedInteractiveVideoInteractiveVideoSummaryTaskParamsSummariesObject interactiveVideoInteractiveVideoSummaryTaskParamsSummariesObject =
    E.object
        [ ( "subContentId", E.string interactiveVideoInteractiveVideoSummaryTaskParamsSummariesObject.subContentId )
        , ( "tip", E.string interactiveVideoInteractiveVideoSummaryTaskParamsSummariesObject.tip )
        ]


encodedInteractiveVideoInteractiveVideoVideo : InteractiveVideoInteractiveVideoVideo -> E.Value
encodedInteractiveVideoInteractiveVideoVideo interactiveVideoInteractiveVideoVideo =
    E.object
        [ ( "files", E.list encodedInteractiveVideoInteractiveVideoVideoFilesObject interactiveVideoInteractiveVideoVideo.files )
        , ( "startScreenOptions", encodedInteractiveVideoInteractiveVideoVideoStartScreenOptions interactiveVideoInteractiveVideoVideo.startScreenOptions )
        , ( "textTracks", encodedInteractiveVideoInteractiveVideoVideoTextTracks interactiveVideoInteractiveVideoVideo.textTracks )
        ]


encodedInteractiveVideoInteractiveVideoVideoFilesObject : InteractiveVideoInteractiveVideoVideoFilesObject -> E.Value
encodedInteractiveVideoInteractiveVideoVideoFilesObject interactiveVideoInteractiveVideoVideoFilesObject =
    E.object
        [ ( "copyright", encodedInteractiveVideoInteractiveVideoVideoFilesObjectCopyright interactiveVideoInteractiveVideoVideoFilesObject.copyright )
        , ( "mime", E.string interactiveVideoInteractiveVideoVideoFilesObject.mime )
        , ( "path", E.string interactiveVideoInteractiveVideoVideoFilesObject.path )
        ]


encodedInteractiveVideoInteractiveVideoVideoFilesObjectCopyright : InteractiveVideoInteractiveVideoVideoFilesObjectCopyright -> E.Value
encodedInteractiveVideoInteractiveVideoVideoFilesObjectCopyright interactiveVideoInteractiveVideoVideoFilesObjectCopyright =
    E.object
        [ ( "license", E.string interactiveVideoInteractiveVideoVideoFilesObjectCopyright.license )
        ]


encodedInteractiveVideoInteractiveVideoVideoStartScreenOptions : InteractiveVideoInteractiveVideoVideoStartScreenOptions -> E.Value
encodedInteractiveVideoInteractiveVideoVideoStartScreenOptions interactiveVideoInteractiveVideoVideoStartScreenOptions =
    E.object
        [ ( "hideStartTitle", E.bool interactiveVideoInteractiveVideoVideoStartScreenOptions.hideStartTitle )
        , ( "title", E.string interactiveVideoInteractiveVideoVideoStartScreenOptions.title )
        ]


encodedInteractiveVideoInteractiveVideoVideoTextTracks : InteractiveVideoInteractiveVideoVideoTextTracks -> E.Value
encodedInteractiveVideoInteractiveVideoVideoTextTracks interactiveVideoInteractiveVideoVideoTextTracks =
    E.object
        [ ( "videoTrack", E.list encodedInteractiveVideoInteractiveVideoVideoTextTracksVideoTrackObject interactiveVideoInteractiveVideoVideoTextTracks.videoTrack )
        ]


encodedInteractiveVideoInteractiveVideoVideoTextTracksVideoTrackObject : InteractiveVideoInteractiveVideoVideoTextTracksVideoTrackObject -> E.Value
encodedInteractiveVideoInteractiveVideoVideoTextTracksVideoTrackObject interactiveVideoInteractiveVideoVideoTextTracksVideoTrackObject =
    E.object
        [ ( "kind", E.string interactiveVideoInteractiveVideoVideoTextTracksVideoTrackObject.kind )
        , ( "label", E.string interactiveVideoInteractiveVideoVideoTextTracksVideoTrackObject.label )
        , ( "srcLang", E.string interactiveVideoInteractiveVideoVideoTextTracksVideoTrackObject.srcLang )
        ]


encodedInteractiveVideoL10n : InteractiveVideoL10n -> E.Value
encodedInteractiveVideoL10n interactiveVideoL10n =
    E.object <|
        [ ( "answered", E.string interactiveVideoL10n.answered )
        , ( "back", E.string interactiveVideoL10n.back )
        , ( "bookmarks", E.string interactiveVideoL10n.bookmarks )
        , ( "captions", E.string interactiveVideoL10n.captions )
        , ( "close", E.string interactiveVideoL10n.close )
        , ( "content", E.string interactiveVideoL10n.content )
        , ( "continueWithVideo", E.string interactiveVideoL10n.continueWithVideo )
        , ( "currentTime", E.string interactiveVideoL10n.currentTime )
        , ( "defaultAdaptivitySeekLabel", E.string interactiveVideoL10n.defaultAdaptivitySeekLabel )
        , ( "endCardTableRowSummaryWithScore", E.string interactiveVideoL10n.endCardTableRowSummaryWithScore )
        , ( "endCardTableRowSummaryWithoutScore", E.string interactiveVideoL10n.endCardTableRowSummaryWithoutScore )
        , ( "endcardAnsweredScore", E.string interactiveVideoL10n.endcardAnsweredScore )
        , ( "endcardInformation", E.string interactiveVideoL10n.endcardInformation )
        , ( "endcardInformationMustHaveAnswer", E.string interactiveVideoL10n.endcardInformationMustHaveAnswer )
        , ( "endcardInformationNoAnswers", E.string interactiveVideoL10n.endcardInformationNoAnswers )
        , ( "endcardInformationOnSubmitButtonDisabled", E.string interactiveVideoL10n.endcardInformationOnSubmitButtonDisabled )
        , ( "endcardSubmitButton", E.string interactiveVideoL10n.endcardSubmitButton )
        , ( "endcardSubmitMessage", E.string interactiveVideoL10n.endcardSubmitMessage )
        , ( "endcardTableRowAnswered", E.string interactiveVideoL10n.endcardTableRowAnswered )
        , ( "endcardTableRowScore", E.string interactiveVideoL10n.endcardTableRowScore )
        , ( "endcardTitle", E.string interactiveVideoL10n.endcardTitle )
        , ( "endscreen", E.string interactiveVideoL10n.endscreen )
        , ( "exitFullscreen", E.string interactiveVideoL10n.exitFullscreen )
        , ( "fullscreen", E.string interactiveVideoL10n.fullscreen )
        , ( "hours", E.string interactiveVideoL10n.hours )
        , ( "interaction", E.string interactiveVideoL10n.interaction )
        , ( "minutes", E.string interactiveVideoL10n.minutes )
        , ( "more", E.string interactiveVideoL10n.more )
        , ( "multipleInteractionsAnnouncement", E.string interactiveVideoL10n.multipleInteractionsAnnouncement )
        , ( "mute", E.string interactiveVideoL10n.mute )
        , ( "navDisabled", E.string interactiveVideoL10n.navDisabled )
        , ( "pause", E.string interactiveVideoL10n.pause )
        , ( "play", E.string interactiveVideoL10n.play )
        , ( "playbackRate", E.string interactiveVideoL10n.playbackRate )
        , ( "quality", E.string interactiveVideoL10n.quality )
        , ( "requiresCompletionWarning", E.string interactiveVideoL10n.requiresCompletionWarning )
        , ( "rewind10", E.string interactiveVideoL10n.rewind10 )
        , ( "seconds", E.string interactiveVideoL10n.seconds )
        , ( "singleInteractionAnnouncement", E.string interactiveVideoL10n.singleInteractionAnnouncement )
        , ( "sndDisabled", E.string interactiveVideoL10n.sndDisabled )
        , ( "summary", E.string interactiveVideoL10n.summary )
        , ( "totalTime", E.string interactiveVideoL10n.totalTime )
        , ( "unmute", E.string interactiveVideoL10n.unmute )
        , ( "videoPausedAnnouncement", E.string interactiveVideoL10n.videoPausedAnnouncement )
        ]
            ++ (case interactiveVideoL10n.videoProgressBar of
                    Just videoProgressBar ->
                        [ ( "videoProgressBar", E.string videoProgressBar ) ]

                    Nothing ->
                        []
               )


encodedInteractiveVideoOverride : InteractiveVideoOverride -> E.Value
encodedInteractiveVideoOverride interactiveVideoOverride =
    E.object
        [ ( "autoplay", E.bool interactiveVideoOverride.autoplay )
        , ( "deactivateSound", E.bool interactiveVideoOverride.deactivateSound )
        , ( "loop", E.bool interactiveVideoOverride.loop )
        , ( "preventSkipping", E.bool interactiveVideoOverride.preventSkipping )
        , ( "showBookmarksmenuOnLoad", E.bool interactiveVideoOverride.showBookmarksmenuOnLoad )
        , ( "showRewind10", E.bool interactiveVideoOverride.showRewind10 )
        ]



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
    | AdvancedTextContext
    | BranchingQuestionContext
    | BranchingQuestionAlternativeContext
    | CoursePresentationContext
    | TrueFalseContext
    | InteractiveVideoContext


contentParser : Parser Context Problem (Generator (List H5p))
contentParser =
    succeed REx.sequence
        |. inContext PreambleContext preambleParser
        |= inContext RootContext (many h5pParser 1)
        |. end EndOfFile


preambleParser =
    -- Plus compliqué que nécessaire, en vue d'améliorations futures
    succeed identity
        |. genericBlocContentParser


type H5pSubContext
    = BranchingScenarioH5pSubContext
    | CoursePresentationH5pSubContext
    | TrueFalseH5pSubContext
    | InteractiveVideoH5pSubContext


h5pParser : Int -> Parser Context Problem (Generator H5p)
h5pParser depth =
    succeed identity
        |= subContextParser
            [ ( BranchingScenarioH5pSubContext, Just "BranchingScenario" )
            , ( CoursePresentationH5pSubContext, Just "CoursePresentation" )
            , ( TrueFalseH5pSubContext, Just "TrueFalse" )
            , ( InteractiveVideoH5pSubContext, Just "InteractiveVideo" )
            ]
        |> andThen
            (\context ->
                case context of
                    BranchingScenarioH5pSubContext ->
                        inContext BranchingScenarioContext <|
                            succeed (R.map BranchingScenarioH5P)
                                |= branchingScenarioParser depth

                    CoursePresentationH5pSubContext ->
                        inContext CoursePresentationContext <|
                            succeed (R.map CoursePresentationH5P)
                                |= coursePresentationParser depth

                    TrueFalseH5pSubContext ->
                        inContext TrueFalseContext <|
                            succeed (R.map TrueFalseH5P)
                                |= trueFalseParser

                    InteractiveVideoH5pSubContext ->
                        inContext InteractiveVideoContext <|
                            succeed (R.map InteractiveVideoH5p << .interactiveVideo)
                                |= interactiveVideoParser depth
            )


branchingScenarioParser depth =
    succeed
        (\title branchingScenarioState ->
            branchingScenarioState
                |> .content
                |> L.reverse
                |> REx.sequence
                |> buildBranchingScenario title
        )
        |= genericHeadlineParser
        |. genericBlocContentParser
        |= branchingScenarioContentParser (depth + 1) { content = [], lastIdUsed = -1 }


type BranchingScenarioSubContext
    = AdvancedTextBranchingScenarioSubContext
    | CoursePresentationBranchingScenarioSubContext
    | InteractiveVideoBranchingScenarioSubContext
    | BranchingQuestionBranchingScenarioSubContext


type alias BranchingScenarioState =
    { content : List (Generator BranchingScenarioContent)
    , lastIdUsed : Int
    }


branchingScenarioContentParser :
    Int
    -> BranchingScenarioState
    -> Parser Context Problem BranchingScenarioState
branchingScenarioContentParser depth state =
    oneOf
        [ withStars depth
            (succeed identity
                |= subContextParser
                    [ ( AdvancedTextBranchingScenarioSubContext, Just "Text" )
                    , ( CoursePresentationBranchingScenarioSubContext, Just "CoursePresentation" )
                    , ( InteractiveVideoBranchingScenarioSubContext, Just "InteractiveVideo" )
                    , ( BranchingQuestionBranchingScenarioSubContext, Just "BranchingQuestion" )
                    ]
                |> andThen
                    (\context ->
                        case context of
                            BranchingQuestionBranchingScenarioSubContext ->
                                inContext BranchingQuestionContext <|
                                    branchingQuestionParser depth state

                            AdvancedTextBranchingScenarioSubContext ->
                                inContext AdvancedTextContext
                                    (succeed
                                        (\content ->
                                            let
                                                newContent =
                                                    buildBranchingScenarioContent
                                                        content.headline
                                                        "Text"
                                                        "H5P.AdvancedText 1.1"
                                                        (Just (state.lastIdUsed + 2))
                                                        ("""<h2 style="text-align:center"><span style="color:#4FB0AE;"><span style="font-size:1.50em;"><strong>"""
                                                            ++ content.headline
                                                            ++ """</strong></span></span></h2><span style="font-size:1.25em;"><p>"""
                                                            ++ content.blocContent
                                                            ++ "</p></span>"
                                                            |> AdvancedTextBranchingScenarioContentTypeParams
                                                            |> R.constant
                                                        )
                                            in
                                            { state
                                                | content =
                                                    newContent :: state.content
                                                , lastIdUsed = state.lastIdUsed + 1
                                            }
                                        )
                                    )
                                    |= genericContentParser
                                    |> andThen (branchingScenarioContentParser depth)

                            CoursePresentationBranchingScenarioSubContext ->
                                inContext CoursePresentationContext
                                    (succeed
                                        (\coursePresentation ->
                                            let
                                                newContent =
                                                    buildBranchingScenarioContent
                                                        "Présentation sans titre"
                                                        "Course Presentation"
                                                        "H5P.CoursePresentation 1.24"
                                                        (Just (state.lastIdUsed + 2))
                                                        (coursePresentation
                                                            --|> R.map
                                                            --    (with2 presentationField slidesField <|
                                                            --        L.map
                                                            --            (with elementsField <|
                                                            --                L.map (with3 actionField metadataField defaultLanguageField "fr")
                                                            --            )
                                                            --    )
                                                            |> R.map CoursePresentationBranchingScenarioContentTypeParams
                                                        )
                                            in
                                            { state
                                                | content =
                                                    newContent :: state.content
                                                , lastIdUsed = state.lastIdUsed + 1
                                            }
                                        )
                                        |= coursePresentationParser depth
                                        |> andThen (branchingScenarioContentParser depth)
                                    )

                            InteractiveVideoBranchingScenarioSubContext ->
                                inContext InteractiveVideoContext
                                    (succeed
                                        (\content ->
                                            let
                                                interactiveVideoHelp =
                                                    content.interactiveVideo
                                                        |> R.map
                                                            (with2
                                                                l10nField
                                                                videoProgressBarField
                                                                (Just "Progression vidéo")
                                                            )

                                                newContent =
                                                    buildBranchingScenarioContent
                                                        content.title
                                                        "Interactive Video"
                                                        "H5P.InteractiveVideo 1.24"
                                                        (Just (state.lastIdUsed + 2))
                                                        (R.map InteractiveVideoBranchingScenarioContentTypeParams
                                                            interactiveVideoHelp
                                                        )
                                            in
                                            { state
                                                | content =
                                                    newContent :: state.content
                                                , lastIdUsed = state.lastIdUsed + 1
                                            }
                                        )
                                        |= interactiveVideoParser depth
                                        |> andThen (branchingScenarioContentParser depth)
                                    )
                    )
            )
        , succeed
            { state
                | content =
                    case state.content of
                        c :: cc ->
                            c
                                |> R.map (with nextContentIdField (Just -1))
                                |> (\x -> x :: cc)

                        [] ->
                            state.content
            }
        ]


branchingQuestionParser :
    Int
    -> BranchingScenarioState
    -> Parser Context Problem BranchingScenarioState
branchingQuestionParser depth state =
    succeed identity
        |= genericHeadlineParser
        |. genericBlocContentParser
        |> andThen
            (\question ->
                succeed
                    (\subState ->
                        { state
                            | content =
                                subState.content ++ state.content
                            , lastIdUsed = subState.lastIdUsed
                        }
                    )
                    |= branchingQuestionAlternativeParser (depth + 1)
                        { alternatives = []
                        , content = []
                        , lastIdUsed = state.lastIdUsed + 1
                        , question = question
                        }
                    |> andThen (branchingScenarioContentParser depth)
            )


type alias BranchingQuestionState =
    { alternatives : List BranchingQuestionAlternatives
    , content : List (Generator BranchingScenarioContent)
    , lastIdUsed : Int
    , question : String
    }


branchingQuestionAlternativeParser :
    Int
    -> BranchingQuestionState
    -> Parser Context Problem BranchingScenarioState
branchingQuestionAlternativeParser depth state =
    oneOf
        [ withStars depth <|
            inContext BranchingQuestionAlternativeContext <|
                (succeed identity
                    |= genericHeadlineParser
                    |. genericBlocContentParser
                    |> andThen
                        (\alternative ->
                            branchingScenarioContentParser (depth + 1)
                                { content = state.content
                                , lastIdUsed = state.lastIdUsed
                                }
                                |> andThen
                                    (\content ->
                                        branchingQuestionAlternativeParser depth
                                            { state
                                                | alternatives =
                                                    buildBranchingQuestionAlternative
                                                        alternative
                                                        (case content.content of
                                                            [] ->
                                                                -1

                                                            _ ->
                                                                state.lastIdUsed + 1
                                                        )
                                                        :: state.alternatives
                                                , content = content.content
                                                , lastIdUsed = content.lastIdUsed
                                            }
                                    )
                        )
                )
        , let
            branchingQuestion =
                buildBranchingScenarioContent
                    "Embranchement"
                    "Branching Question"
                    "H5P.BranchingQuestion 1.0"
                    Nothing
                    params

            params =
                R.constant <|
                    BranchingQuestionBranchingScenarioContentTypeParams
                        { alternatives = L.reverse state.alternatives
                        , question = state.question
                        }
          in
          succeed
            { content = state.content ++ [ branchingQuestion ]
            , lastIdUsed = state.lastIdUsed
            }
        ]


coursePresentationParser depth =
    succeed buildCoursePresentation
        |. genericHeadlineParser
        |. genericBlocContentParser
        |= many coursePresentationSlideParser (depth + 1)


coursePresentationSlideParser depth =
    succeed buildSlide
        |. genericHeadlineParser
        |. genericBlocContentParser
        |= many coursePresentationSlideElementParser (depth + 1)


type CoursePresentationSlideElementSubContext
    = TrueFalseCoursePresentationSlideElementSubContext


coursePresentationSlideElementParser : Int -> Parser Context Problem (Generator CoursePresentationPresentationSlidesElements)
coursePresentationSlideElementParser depth =
    succeed identity
        |= subContextParser
            [ ( TrueFalseCoursePresentationSlideElementSubContext, Just "TrueFalse" )
            ]
        |> andThen
            (\context ->
                case context of
                    TrueFalseCoursePresentationSlideElementSubContext ->
                        inContext TrueFalseContext <|
                            succeed
                                (\trueFalse ->
                                    buildSlideElement
                                        "Quiz"
                                        "True/False Question"
                                        "H5P.TrueFalse 1.8"
                                        (R.map
                                            TrueFalseCoursePresentationPresentationSlidesElementsActionParams
                                            trueFalse
                                        )
                                )
                                |= trueFalseParser
            )


trueFalseParser =
    succeed
        (\truthValue proposition feedback ->
            buildTrueFalse proposition truthValue feedback.onCorrect feedback.onWrong
        )
        |= signParser
        |= genericHeadlineParser
        |= trueFalseBlocContentParser { onCorrect = [], onWrong = [] }


signParser =
    oneOf
        [ succeed True
            |. token (Token "+" (Missing "+"))
        , succeed False
            |. token (Token "-" (Missing "-"))
        ]


trueFalseBlocContentParser feedback =
    oneOf
        [ succeed S.length
            |= getChompedString spacesOrTabs
            |> andThen
                (\numberOfSpaces ->
                    oneOf
                        [ succeed
                            (\truthValue line ->
                                case truthValue of
                                    True ->
                                        { feedback | onCorrect = line :: feedback.onCorrect }

                                    False ->
                                        { feedback | onWrong = line :: feedback.onWrong }
                            )
                            |. spacesOrTabs
                            |= signParser
                            |. atLeastOneSpace
                            |= getChompedString (chompWhile ((/=) '\n'))
                            |. oneOf
                                [ token (Token "\n" GenericProblem)
                                , succeed ()
                                ]
                            |> andThen trueFalseBlocContentParser
                        , succeed
                            (\line ->
                                { feedback
                                    | onCorrect = line :: feedback.onCorrect
                                    , onWrong = line :: feedback.onWrong
                                }
                            )
                            |= getChompedString
                                (succeed ()
                                    |. (if numberOfSpaces == 0 then
                                            chompIf ((/=) '*') EndOfFile

                                        else
                                            succeed ()
                                                |. chompWhile ((/=) '\n')
                                       )
                                )
                            |. oneOf
                                [ token (Token "\n" GenericProblem)
                                , succeed ()
                                ]
                            |> andThen trueFalseBlocContentParser
                        ]
                )
        , succeed
            { onCorrect = Just <| S.join "\n" <| L.reverse feedback.onCorrect
            , onWrong = Just <| S.join "\n" <| L.reverse feedback.onWrong
            }
        ]


interactiveVideoParser depth =
    succeed buildInteractiveVideo
        |= genericHeadlineParser
        |= genericBlocContentParser
        |= many interactionInteractiveVideoParser (depth + 1)


type InteractionInteractiveVideoSubParser
    = TrueFalseInteractionInteractiveVideoSubParser


interactionInteractiveVideoParser depth =
    succeed
        (\time subContext ->
            { time = time
            , subContext = subContext
            }
        )
        |= float ExpectingTimeCode ExpectingTimeCode
        |. atLeastOneSpace
        |= subContextParser
            [ ( TrueFalseInteractionInteractiveVideoSubParser, Just "TrueFalse" )
            ]
        |> andThen
            (\record ->
                case record.subContext of
                    TrueFalseInteractionInteractiveVideoSubParser ->
                        inContext TrueFalseContext <|
                            succeed
                                (\trueFalse ->
                                    buildInteractionInteractiveVideo
                                        record.time
                                        "Vrai ou faux"
                                        "Vrai ou faux"
                                        "True/False Question"
                                        "H5P.TrueFalse 1.8"
                                        (R.map
                                            TrueFalseInteractiveVideoInteractiveVideoAssetsInteractionsActionParams
                                            trueFalse
                                        )
                                )
                                |= trueFalseParser
            )


many blocParser depth =
    sequence
        { start = Token "" GenericProblem
        , separator = Token "" GenericProblem
        , end = Token "" GenericProblem
        , spaces = succeed ()
        , item = withStars depth (blocParser depth)
        , trailing = Optional
        }


withStars depth parser =
    succeed identity
        |. symbol (Token (S.repeat depth "*") (MissingStars depth))
        |= getChompedString (chompWhile ((==) '*'))
        |. atLeastOneSpace
        |> andThen
            (\x ->
                if S.length x == 0 then
                    parser

                else
                    problem InconsistantStructure
            )


atLeastOneSpace =
    succeed ()
        |. space
        |. spacesOrTabs


space =
    token (Token " " MissingSpace)


spacesOrTabs =
    chompWhile (\x -> x == ' ' || x == '\t')


subContextParser subContexts =
    let
        subContextParserHelp ( subContextConstructor, subContextString ) =
            succeed subContextConstructor
                |. (case subContextString of
                        Just string ->
                            keyword (Token string (Missing string))

                        Nothing ->
                            succeed ()
                   )
                |. spacesOrTabs
    in
    oneOf (L.map subContextParserHelp subContexts)


genericContentParser =
    succeed
        (\headline blocContent ->
            { headline = headline
            , blocContent = blocContent
            }
        )
        |= genericHeadlineParser
        |= genericBlocContentParser


genericHeadlineParser =
    succeed identity
        |= (getChompedString <| chompWhile ((/=) '\n'))
        |. oneOf
            [ token (Token "\n" <| Missing "Retour à la ligne")
            , succeed ()
            ]


genericBlocContentParser =
    getChompedString
        (succeed identity
            |. chompWhile ((/=) '*')
            |= getCol
            |> andThen
                (\col ->
                    if col > 1 then
                        oneOf
                            [ end EndOfFile
                            , succeed ()
                                |. token (Token "*" EndOfFile)
                                |. genericBlocContentParser
                            ]

                    else
                        succeed ()
                )
        )



{-
    .--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--.
   / .. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \
   \ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/ /
    \/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /
    / /\/ /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /\/ /\
   / /\ \/`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'\ \/\ \
   \ \/\ \                                                                                    /\ \/ /
    \/ /\ \           ██████╗ ██╗   ██╗██╗██╗     ██████╗ ███████╗██████╗ ███████╗           / /\/ /
    / /\/ /           ██╔══██╗██║   ██║██║██║     ██╔══██╗██╔════╝██╔══██╗██╔════╝           \ \/ /\
   / /\ \/            ██████╔╝██║   ██║██║██║     ██║  ██║█████╗  ██████╔╝███████╗            \ \/\ \
   \ \/\ \            ██╔══██╗██║   ██║██║██║     ██║  ██║██╔══╝  ██╔══██╗╚════██║            /\ \/ /
    \/ /\ \           ██████╔╝╚██████╔╝██║███████╗██████╔╝███████╗██║  ██║███████║           / /\/ /
    / /\/ /           ╚═════╝  ╚═════╝ ╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝           \ \/ /\
   / /\ \/                                                                                    \ \/\ \
   \ \/\ \.--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--./\ \/ /
    \/ /\/ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ /\/ /
    / /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\
   / /\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \
   \ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `' /
    `--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'
-}


buildBranchingScenario title content =
    R.map (buildBranchingScenarioHelp title) content


buildBranchingScenarioHelp title content =
    { endScreens =
        [ { endScreenTitle = "Fin du parcours"
          , endScreenSubtitle = "Revenez vite !"
          , contentId = -1
          , endScreenScore = 0
          }
        ]
    , scoringOptionGroup =
        { scoringOption = "no-score"
        , includeInteractionsScores = True
        }
    , startScreen =
        { startScreenTitle =
            case title of
                "" ->
                    "<p>Préparez vos méninges !</p>\n"

                _ ->
                    title
        , startScreenSubtitle = "<p>Votre session de travail personnalisée</p>\n"
        }
    , behaviour =
        { enableBackwardsNavigation = True
        , forceContentFinished = False
        }
    , l10n =
        { startScreenButtonText = "Démarrer"
        , endScreenButtonText = "Recommencer"
        , backButtonText = "Revenir en arrière"
        , proceedButtonText = "Continuer"
        , disableProceedButtonText = "Jouer la vidéo de nouveau"
        , replayButtonText = "Votre note :"
        , scoreText = "Votre note :"
        , fullscreenAria = "Plein écran"
        }
    , content = content
    }


buildBranchingScenarioContent title contentType library nextContentId params =
    R.map2
        (buildBranchingScenarioContentHelp title contentType library nextContentId)
        params
        UUID.generator


buildBranchingScenarioContentHelp title contentType library nextContentId params uuid =
    { contentBehaviour = "useBehavioural"
    , feedback =
        { subtitle = ""
        }
    , forceContentFinished = "useBehavioural"
    , showContentTitle = False
    , nextContentId = Nothing
    , type_ =
        { library = ""
        , params = params
        , subContentId = ""
        , metadata =
            { license = "U"
            , title = title
            , contentType = ""
            }
        }
    }
        --|> with3 typeField metadataField titleField title
        |> with3 typeField metadataField contentTypeField contentType
        |> with2 typeField libraryField library
        |> with2 typeField subContentIdField (UUID.toString uuid)
        |> with nextContentIdField nextContentId


buildBranchingQuestionAlternative alternative nextContentId =
    { nextContentId = nextContentId
    , feedback =
        { title = ""
        , subtitle = ""
        }
    , text = alternative
    }


buildCoursePresentation slides =
    R.map buildCoursePresentationHelp <| REx.sequence slides


buildCoursePresentationHelp slides =
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
        { globalBackgroundSelector =
            { fillGlobalBackground = ""
            }
        , keywordListAlwaysShow = False
        , keywordListAutoHide = False
        , keywordListEnabled = True
        , keywordListOpacity = 90
        , slides = slides
        }
    }


buildSlide elements =
    R.map buildSlideHelp <| REx.sequence <| elements


buildSlideHelp elements =
    { elements = elements
    , slideBackgroundSelector =
        { fillSlideBackground = ""
        }
    }


buildSlideElement title contentType library params =
    R.map2
        (buildSlideElementHelp title contentType library)
        params
        (R.map UUID.toString UUID.generator)


buildSlideElementHelp title contentType library params uuid =
    { x = 5
    , y = 10
    , width = 90
    , height = 80
    , action =
        { library = library
        , params = params
        , subContentId = uuid
        , metadata =
            { contentType = contentType
            , defaultLanguage = "fr" --Nothing
            , license = "U"
            , title = title
            }
        }
    , alwaysDisplayComments = False
    , backgroundOpacity = 0
    , displayAsButton = False
    , buttonSize = "big"
    , goToSlideType = "specified"
    , invisible = False
    , solution = ""
    }


buildTrueFalse question truthValue feedbackOnCorrect feedbackOnWrong =
    R.constant <|
        { behaviour =
            { autoCheck = True
            , confirmCheckDialog = False
            , confirmRetryDialog = False
            , enableCheckButton = False
            , enableRetry = False
            , enableSolutionsButton = False
            , feedbackOnCorrect = feedbackOnCorrect
            , feedbackOnWrong = feedbackOnWrong
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
        , correct =
            case truthValue of
                True ->
                    "true"

                False ->
                    "false"
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
        , question = question
        }


buildInteractiveVideo title link interactions =
    let
        uuid =
            R.map UUID.toString UUID.generator
    in
    { title = title
    , interactiveVideo =
        R.map3 (buildInteractiveVideoHelp title link) (REx.sequence interactions) uuid uuid
    }


buildInteractiveVideoHelp title link interactions uuid1 uuid2 =
    { interactiveVideo =
        { assets =
            case interactions of
                [] ->
                    Nothing

                _ ->
                    Just { interactions = interactions }
        , summary =
            { displayAt = 3
            , task =
                { library =
                    "H5P.Summary 1.10"
                , metadata =
                    { contentType = "Summary"
                    , defaultLanguage = "fr"
                    , license = "U"
                    , title = "Untitled Summary"
                    }
                , params =
                    { alternativeIncorrectLabel = "Incorrect"
                    , intro = "Choose the correct statement."
                    , labelCorrect = "Correct."
                    , labelCorrectAnswers = "Réponses correctes."
                    , labelIncorrect = "Incorrect! Please try again."
                    , overallFeedback =
                        [ { from = 0
                          , to = 100
                          }
                        ]
                    , progressText = "Progression de :num sur :total"
                    , resultLabel = "Votre résultat :"
                    , scoreBarLabel = "Vous avez :num points sur un total de :total"
                    , scoreLabel = "Erreurs :"
                    , solvedLabel = "Progression :"
                    , summaries =
                        [ { subContentId = uuid1
                          , tip = ""
                          }
                        ]
                    , tipButtonLabel = "Montrer l&#039;indice"
                    }
                , subContentId = uuid2
                }
            }
        , video =
            { files =
                [ { copyright =
                        { license = "U"
                        }
                  , mime = "video/YouTube"
                  , path = link
                  }
                ]
            , startScreenOptions =
                { hideStartTitle = False
                , title = title
                }
            , textTracks =
                { videoTrack =
                    [ { kind = "subtitles"
                      , label = "Subtitles"
                      , srcLang = "fr"
                      }
                    ]
                }
            }
        }
    , l10n =
        { answered = "@answered réponses données"
        , back = "Retour"
        , bookmarks = "Signets"
        , captions = "Sous-titres"
        , close = "Fermer"
        , content = "Contenu"
        , continueWithVideo = "Reprendre la lecture"
        , currentTime = "Durée actuelle :"
        , defaultAdaptivitySeekLabel = "Continue"
        , endCardTableRowSummaryWithScore = "Vous avez obtenu de @score sur un total de @points pour la question @question qui apparaissait à @minutes minutes et @secondes secondes."
        , endCardTableRowSummaryWithoutScore = "Vous avez répondu aux @question qui sont apparues après @minutes minutes et @seconds secondes."
        , endcardAnsweredScore = "Réponses"
        , endcardInformation = "Vous avez répondu à @answered questions."
        , endcardInformationMustHaveAnswer = "Vous devez répondre à au moins une question avant de pouvoir soumettre vos réponses."
        , endcardInformationNoAnswers = "Vous n&#039;avez répondu à aucune question."
        , endcardInformationOnSubmitButtonDisabled = "Vous avez répondu à @answered questions. Cliquez ci-dessous pour les remettre."
        , endcardSubmitButton = "Remettre vos réponses"
        , endcardSubmitMessage = "Vos réponses ont été remises !"
        , endcardTableRowAnswered = "Questions auxquelles vous avez répondu"
        , endcardTableRowScore = "Score"
        , endcardTitle = "@answered question(s) auxquelles vous avez répondu"
        , endscreen = "Continuer"
        , exitFullscreen = "Sortir du plein écran"
        , fullscreen = "Plein écran"
        , hours = "Heures"
        , interaction = "Activité"
        , minutes = "Minutes"
        , more = "More player options"
        , multipleInteractionsAnnouncement = "De multiples interactions sont apparues."
        , mute = "Sourdine, présentement le son est activé."
        , navDisabled = "La navigation est désactivée"
        , pause = "Pause"
        , play = "Jouer"
        , playbackRate = "Vitesse de lecture"
        , quality = "Qualité de la vidéo"
        , requiresCompletionWarning = "Vous devez répondre correctement à toutes les questions avant de continuer."
        , rewind10 = "Revenir en arrière de 10 secondes"
        , seconds = "Secondes"
        , singleInteractionAnnouncement = "Une interaction est apparue."
        , sndDisabled = "Le son est désactivé"
        , summary = "Résumé"
        , totalTime = "Temps total :"
        , unmute = "Activer le son, présentement en sourdine."
        , videoPausedAnnouncement = "La vidéo est en pause."
        , videoProgressBar = Nothing
        }
    , override =
        { autoplay = False
        , deactivateSound = False
        , loop = False
        , preventSkipping = False
        , showBookmarksmenuOnLoad = False
        , showRewind10 = False
        }
    }


buildInteractionInteractiveVideo time label title contentType library params =
    R.map2
        (buildInteractionInteractiveVideoHelp time label title contentType library)
        params
        (R.map UUID.toString UUID.generator)


buildInteractionInteractiveVideoHelp time label title contentType library params uuid =
    { x = 10
    , y = 10
    , width = 80
    , height = 80
    , duration =
        { from = time
        , to = time
        }
    , libraryTitle = contentType
    , action =
        { library = library
        , params = params
        , subContentId = uuid
        , metadata =
            { contentType = contentType
            , license = "U"
            , title = title
            }
        }
    , pause = True
    , displayType = "button" --"poster"
    , buttonOnMobile = False
    , adaptivity =
        { correct =
            { allowOptOut = False
            , message = ""
            }
        , wrong =
            { allowOptOut = False
            , message = ""
            }
        , requireCompletion = False
        }
    , label = label
    }



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


with5 field subField subSubField subSubSubField subSubSubSubField value record =
    let
        subRecord =
            map field record
                |> with4 subField subSubField subSubSubField subSubSubSubField value
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


textField =
    { with = \value record -> { record | text = value }
    , accessor = .text
    }


startScreenSubtitleField =
    { with = \value record -> { record | startScreenSubtitle = value }
    , accessor = .startScreenSubtitle
    }


contentField =
    { with = \value record -> { record | content = value }
    , accessor = .content
    }


typeField =
    { with = \value record -> { record | type_ = value }
    , accessor = .type_
    }


interactiveVideoField =
    { with = \value record -> { record | summary = value }
    , accessor = .summary
    }


taskField =
    { with = \value record -> { record | task = value }
    , accessor = .task
    }


l10nField =
    { with = \value record -> { record | l10n = value }
    , accessor = .l10n
    }


videoProgressBarField =
    { with = \value record -> { record | videoProgressBar = value }
    , accessor = .videoProgressBar
    }


presentationField =
    { with = \value record -> { record | presentation = value }
    , accessor = .presentation
    }


slidesField =
    { with = \value record -> { record | slides = value }
    , accessor = .slides
    }


elementsField =
    { with = \value record -> { record | elements = value }
    , accessor = .elements
    }


actionField =
    { with = \value record -> { record | action = value }
    , accessor = .action
    }


defaultLanguageField =
    { with = \value record -> { record | defaultLanguage = value }
    , accessor = .defaultLanguage
    }


summaryField =
    { with = \value record -> { record | interactiveVideo = value }
    , accessor = .interactiveVideo
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
    }



{-
    .--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--.
   / .. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \.. \
   \ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/ /
    \/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /
    / /\/ /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /`' /\/ /\
   / /\ \/`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'\ \/\ \
   \ \/\ \                                                                                    /\ \/ /
    \/ /\ \                                                                                  / /\/ /
    / /\/ /                ███████ ██████  ██████   ██████  ██████  ███████                  \ \/ /\
   / /\ \/                 ██      ██   ██ ██   ██ ██    ██ ██   ██ ██                        \ \/\ \
   \ \/\ \                 █████   ██████  ██████  ██    ██ ██████  ███████                   /\ \/ /
    \/ /\ \                ██      ██   ██ ██   ██ ██    ██ ██   ██      ██                  / /\/ /
    / /\/ /                ███████ ██   ██ ██   ██  ██████  ██   ██ ███████                  \ \/ /\
   / /\ \/                                                                                    \ \/\ \
   \ \/\ \                                                                                    /\ \/ /
    \/ /\ \         ██   ██  █████  ███    ██ ██████  ██      ██ ███    ██  ██████           / /\/ /
    / /\/ /         ██   ██ ██   ██ ████   ██ ██   ██ ██      ██ ████   ██ ██                \ \/ /\
   / /\ \/          ███████ ███████ ██ ██  ██ ██   ██ ██      ██ ██ ██  ██ ██   ███           \ \/\ \
   \ \/\ \          ██   ██ ██   ██ ██  ██ ██ ██   ██ ██      ██ ██  ██ ██ ██    ██           /\ \/ /
    \/ /\ \         ██   ██ ██   ██ ██   ████ ██████  ███████ ██ ██   ████  ██████           / /\/ /
    / /\/ /                                                                                  \ \/ /\
   / /\ \/                                                                                    \ \/\ \
   \ \/\ \.--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--..--./\ \/ /
    \/ /\/ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ ../ /\/ /
    / /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\/ /\
   / /\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \/\ \
   \ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `'\ `' /
    `--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'`--'
-}


type Problem
    = --TODO
      NoContent
    | Problem String
    | GenericProblem
    | EndOfFile
    | UnknownContentType String
    | InconsistantStructure
    | MissingSpace
    | Missing String
    | MissingStars Int
    | ExpectingTimeCode


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

        UnknownContentType x ->
            "Contenu H5P inconnu : " ++ x ++ "\n"

        InconsistantStructure ->
            "La structure du document n'est pas consistante !\n"

        MissingSpace ->
            "Les '*' doivent être suivies d'une espace\n"

        Missing contentType ->
            "Est-ce qu'il ne manquerait pas un " ++ contentType ++ " ?\n"

        MissingStars n ->
            "Je m'attends à trouver " ++ S.fromInt n ++ " '*'\n"

        ExpectingTimeCode ->
            "Je m'attends à trouver un flottant représentant un temps en secondes\n"

        GenericProblem ->
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
                        ++ " "
                        ++ x
                        ++ showContextHelp (depth + 1) cc
            in
            case c of
                PreambleContext ->
                    "Préambule"

                RootContext ->
                    if cc == [] then
                        "Racine du document"

                    else
                        showContextHelp 1 cc

                BranchingScenarioContext ->
                    f "BranchingScenario\n"

                BranchingQuestionContext ->
                    f "BranchingQuestion\n"

                BranchingQuestionAlternativeContext ->
                    f "Alternative\n"

                AdvancedTextContext ->
                    f "Text\n"

                CoursePresentationContext ->
                    f "CoursePresentation\n"

                TrueFalseContext ->
                    f "TrueFalse\n"

                InteractiveVideoContext ->
                    f "InteractiveVideo\n"
