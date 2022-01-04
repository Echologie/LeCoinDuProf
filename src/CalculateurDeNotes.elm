module CalculateurDeNotes exposing (..)

import Array exposing (..)
import Browser exposing (Document)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import Element.Input as Input
import File.Download
import Html exposing (Html)
import Parser exposing (..)
import Set
import Style exposing (..)


titre =
    "Calculateur de notes"



{-
   ███    ███  ██████  ██████  ███████ ██
   ████  ████ ██    ██ ██   ██ ██      ██
   ██ ████ ██ ██    ██ ██   ██ █████   ██
   ██  ██  ██ ██    ██ ██   ██ ██      ██
   ██      ██  ██████  ██████  ███████ ███████
-}


type alias Model =
    { bareme : String
    , reponsesCorrectes : String
    , reponsesEleves : String
    , eleves : Eleves
    }


init : Model
init =
    { bareme = ""
    , reponsesCorrectes = ""
    , reponsesEleves = ""
    , eleves = []
    }



{-
   ██    ██ ██████  ██████   █████  ████████ ███████
   ██    ██ ██   ██ ██   ██ ██   ██    ██    ██
   ██    ██ ██████  ██   ██ ███████    ██    █████
   ██    ██ ██      ██   ██ ██   ██    ██    ██
    ██████  ██      ██████  ██   ██    ██    ███████
-}


type Msg
    = NouveauBareme String
    | NouvellesReponsesCorrectes String
    | NouvellesReponsesEleves String
    | TelechargerNotes


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        brms =
            unsafeRun baremeSujet [] model.bareme

        rpnCorrectes =
            unsafeRun reponsesCorrectes Array.empty model.reponsesCorrectes

        rpnEleves =
            unsafeRun reponsesEleves [] model.reponsesEleves
    in
    case msg of
        NouveauBareme nouveauBareme ->
            let
                brmss =
                    unsafeRun baremeSujet [] nouveauBareme
            in
            ( { model
                | bareme = nouveauBareme
                , eleves = notes brmss rpnCorrectes rpnEleves
              }
            , Cmd.none
            )

        NouvellesReponsesCorrectes nouvellesReponsesCorrectes ->
            let
                rpnCorrectess =
                    unsafeRun reponsesCorrectes Array.empty nouvellesReponsesCorrectes
            in
            ( { model
                | reponsesCorrectes = nouvellesReponsesCorrectes
                , eleves = notes brms rpnCorrectess rpnEleves
              }
            , Cmd.none
            )

        NouvellesReponsesEleves nouvellesReponsesEleves ->
            let
                rpnElevess =
                    unsafeRun reponsesEleves [] nouvellesReponsesEleves
            in
            ( { model
                | reponsesEleves = nouvellesReponsesEleves
                , eleves = notes brms rpnCorrectes rpnElevess
              }
            , Cmd.none
            )

        TelechargerNotes ->
            ( model
            , File.Download.string "Notes.org" "text/org" <| voirNotesOrg model.eleves
            )


unsafeRun prsr defaut texte =
    case run prsr texte of
        Ok x ->
            x

        _ ->
            defaut



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
        ]
        [ column
            [ spacing petitEspacement
            , height fill
            , width fill
            , scrollbars
            , clip
            ]
            [ Input.multiline
                [ height fill
                , clip
                , scrollbars
                , width fill
                , Background.color <| vert 0.2
                , Border.rounded 8
                , Border.innerShadow
                    { blur = 10
                    , color = rgb255 10 10 10
                    , offset = ( 0.3, 0.4 )
                    , size = 2
                    }
                ]
                { onChange = NouveauBareme
                , label = Input.labelAbove [] <| text "Barème"
                , placeholder =
                    Just <|
                        Input.placeholder [] <|
                            text "Entrer le barème sous la forme +3 -1, +2 -1"
                , text = model.bareme
                , spellcheck = False
                }
            , Input.multiline
                [ height fill
                , clip
                , scrollbars
                , width fill
                , Background.color <| vert 0.2
                , Border.rounded 8
                , Border.innerShadow
                    { blur = 10
                    , color = rgb255 10 10 10
                    , offset = ( 0.3, 0.4 )
                    , size = 2
                    }
                ]
                { onChange = NouvellesReponsesCorrectes
                , label = Input.labelAbove [] <| text "Réponses correctes"
                , placeholder =
                    Just <|
                        Input.placeholder [] <|
                            text "Entrer les réponses correctes pour chaque sujet"
                , text = model.reponsesCorrectes
                , spellcheck = False
                }
            , Input.multiline
                [ height fill
                , clip
                , scrollbars
                , width fill
                , Background.color <| vert 0.2
                , Border.rounded 8
                , Border.innerShadow
                    { blur = 10
                    , color = rgb255 10 10 10
                    , offset = ( 0.3, 0.4 )
                    , size = 2
                    }
                ]
                { onChange = NouvellesReponsesEleves
                , label = Input.labelAbove [] <| text "Réponses des élèves"
                , placeholder =
                    Just <|
                        Input.placeholder [] <|
                            text "Entrer les réponses des élèves"
                , text = model.reponsesEleves
                , spellcheck = False
                }
            ]
        , column
            [ spacing petitEspacement
            , height fill
            , width fill
            ]
            [ text <|
                "Moyenne : "
                    ++ String.fromFloat (moyenne model.eleves)
                    ++ " Écart type : "
                    ++ String.fromFloat (ecartType model.eleves)
            , bouton TelechargerNotes "Télécharger le fichier de notes"
            , voirNotes model.eleves
            ]
        ]


voirNotes : Eleves -> Element Msg
voirNotes rpnsEleves =
    table
        [ height fill
        , width fill
        , clip
        , scrollbars
        , padding petitEspacement
        , Background.color <| vert 0.2
        , Border.rounded 8
        , Border.innerShadow
            { blur = 10
            , color = rgb255 10 10 10
            , offset = ( 0.3, 0.4 )
            , size = 2
            }
        ]
        { data = rpnsEleves
        , columns =
            [ { header = Element.text "Numéro étudiant"
              , width = fill
              , view =
                    \rpns ->
                        Element.text rpns.numeroEtudiant
              }
            , { header = Element.text "Note"
              , width = fill
              , view =
                    \rpns ->
                        case rpns.note of
                            Nothing ->
                                Element.text ""

                            Just nt ->
                                Element.text <| String.fromFloat nt
              }
            ]
        }


voirNotesOrg : Eleves -> String
voirNotesOrg rpnsEleves =
    let
        numero rpns =
            rpns.numeroEtudiant

        voirNote rpns =
            case rpns.note of
                Nothing ->
                    ""

                Just nt ->
                    String.fromFloat nt

        ligne rpns =
            "|"
                ++ rpns.numeroEtudiant
                ++ "|"
                ++ rpns.nomEtudiant
                ++ "|"
                ++ rpns.prenomEtudiant
                ++ "|"
                ++ voirNote rpns
                ++ "|\n"
    in
    "|Numéro|Nom|Prénom|Note|\n"
        ++ String.concat (List.map ligne rpnsEleves)



{-
   ██████   █████  ██████  ███████ ███    ███ ███████
   ██   ██ ██   ██ ██   ██ ██      ████  ████ ██
   ██████  ███████ ██████  █████   ██ ████ ██ █████
   ██   ██ ██   ██ ██   ██ ██      ██  ██  ██ ██
   ██████  ██   ██ ██   ██ ███████ ██      ██ ███████
-}
{--
baremeEtReponses =
  succeed (\brm rpn -> BaremeEtReponses brm (List.map (String.split "") rpn))
    |= baremeSujet
    |= reponses
--}


type alias BaremeSujet =
    List BaremeQuestion


baremeSujet =
    sequence
        { start = ""
        , separator = ","
        , end = ""
        , spaces = espaces
        , item = baremeQuestion
        , trailing = Forbidden
        }


espaces =
    chompWhile <| (==) ' '


type alias BaremeQuestion =
    { bonneReponse : Float
    , mauvaiseReponse : Float
    }


baremeQuestion =
    succeed BaremeQuestion
        |= nombre
        |. spaces
        |= nombre


nombre : Parser Float
nombre =
    oneOf
        [ succeed negate
            |. symbol "-"
            |= float
        , succeed identity
            |. symbol "+"
            |= float
        ]



{-
   ██████  ███████ ██████   ██████  ███    ██ ███████ ███████ ███████
   ██   ██ ██      ██   ██ ██    ██ ████   ██ ██      ██      ██
   ██████  █████   ██████  ██    ██ ██ ██  ██ ███████ █████   ███████
   ██   ██ ██      ██      ██    ██ ██  ██ ██      ██ ██           ██
   ██   ██ ███████ ██       ██████  ██   ████ ███████ ███████ ███████
-}


type alias ReponsesCorrectes =
    Array Reponses


reponsesCorrectes : Parser ReponsesCorrectes
reponsesCorrectes =
    succeed Array.fromList
        |= sequence
            { start = ""
            , separator = "\n"
            , end = ""
            , spaces = espaces
            , item = reponses
            , trailing = Optional
            }


type alias Reponses =
    List String


reponses =
    sequence
        { start = ""
        , separator = ""
        , end = ""
        , spaces = espaces
        , item =
            variable
                { start = \x -> x /= '\n' && x /= ';'
                , inner = \_ -> False
                , reserved = Set.fromList []
                }
        , trailing = Optional
        }


type alias Eleves =
    List Eleve


reponsesEleves : Parser Eleves
reponsesEleves =
    sequence
        { start = ""
        , separator = "\n"
        , end = ""
        , spaces = espaces
        , item = reponsesEleve
        , trailing = Optional
        }



{-
   ███████ ██      ███████ ██    ██ ███████ ███████
   ██      ██      ██      ██    ██ ██      ██
   █████   ██      █████   ██    ██ █████   ███████
   ██      ██      ██       ██  ██  ██           ██
   ███████ ███████ ███████   ████   ███████ ███████
-}


type alias Eleve =
    { numeroEtudiant : String
    , numeroSujet : Int
    , nomEtudiant : String
    , prenomEtudiant : String
    , reponses : Reponses
    , note : Maybe Float
    }


reponsesEleve =
    succeed Eleve
        |= etudiant
        |= int
        |= champ
        |= champ
        |= reponsesQuizScan
        |= champzInteret


etudiant =
    getChompedString <|
        chompIf Char.isDigit
            |. chompIf Char.isDigit
            |. chompIf Char.isDigit
            |. chompIf Char.isDigit
            |. chompIf Char.isDigit


champ =
    succeed identity
        |. symbol ";"
        |= getChompedString (chompWhile ((/=) ';'))


champzInteret =
    succeed Nothing
        |. symbol ";"
        |. chompWhile (\x -> x /= '\n' && x /= ';')


reponsesQuizScan =
    sequence
        { start = ";"
        , separator = ";"
        , end = ""
        , spaces = espaces
        , item =
            variable
                { start = \x -> x /= '\n' && x /= ';'
                , inner = \_ -> False
                , reserved = Set.fromList []
                }
        , trailing = Mandatory
        }


notes : BaremeSujet -> ReponsesCorrectes -> Eleves -> Eleves
notes brms rpnCorrectes rpnEleves =
    let
        f rpnEleve =
            case Array.get (rpnEleve.numeroSujet - 11) rpnCorrectes of
                Nothing ->
                    rpnEleve

                Just bonneRpns ->
                    { rpnEleve | note = noteSujet brms bonneRpns rpnEleve.reponses }
    in
    List.map f rpnEleves


noteSujet : BaremeSujet -> Reponses -> Reponses -> Maybe Float
noteSujet brms bonneRpns rpnsEleve =
    case brms of
        [] ->
            Just 0

        brm :: brmss ->
            let
                bonneRpn =
                    List.head bonneRpns

                bonneRpnSuite =
                    List.tail bonneRpns

                rpnEleve =
                    List.head rpnsEleve

                rpnEleveSuite =
                    List.tail rpnsEleve
            in
            case ( ( bonneRpn, bonneRpnSuite ), ( rpnEleve, rpnEleveSuite ) ) of
                ( ( Just bnRpn, Just bnRpnSuite ), ( Just rpnElv, Just rpnElvSuite ) ) ->
                    noteSujet brmss bnRpnSuite rpnElvSuite
                        |> Maybe.andThen (Just << (+) (noteQuestion brm bnRpn rpnElv))

                _ ->
                    Nothing


noteQuestion brm bonneRpn rpnEleve =
    case bonneRpn of
        "V" ->
            if rpnEleve == "A" then
                brm.bonneReponse

            else if rpnEleve == "B" then
                2 * brm.bonneReponse / 3

            else if rpnEleve == "C" then
                brm.mauvaiseReponse / 3

            else if rpnEleve == "D" then
                brm.mauvaiseReponse

            else
                0

        "F" ->
            if rpnEleve == "D" then
                brm.bonneReponse

            else if rpnEleve == "C" then
                2 * brm.bonneReponse / 3

            else if rpnEleve == "B" then
                brm.mauvaiseReponse / 3

            else if rpnEleve == "A" then
                brm.mauvaiseReponse

            else
                0

        _ ->
            if bonneRpn == rpnEleve then
                brm.bonneReponse

            else if rpnEleve == "-" then
                0

            else
                brm.mauvaiseReponse


moyenne elvs =
    let
        moy nts =
            List.sum nts / toFloat (List.length nts)
    in
    List.map .note elvs
        |> expurgerNotesManquantes
        |> moy


ecartType elvs =
    let
        moy nts =
            List.sum nts / toFloat (List.length nts)

        moyCarre =
            moy << List.map (\x -> x ^ 2)

        ecTp nts =
            sqrt <| moyCarre nts - moy nts ^ 2
    in
    List.map .note elvs
        |> expurgerNotesManquantes
        |> ecTp


expurgerNotesManquantes nts =
    case nts of
        [] ->
            []

        Nothing :: ntss ->
            expurgerNotesManquantes ntss

        (Just nt) :: ntss ->
            nt :: expurgerNotesManquantes ntss
