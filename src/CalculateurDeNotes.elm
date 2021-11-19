module CalculateurDeNotes exposing (..)

import Browser
import Html exposing (Html)
import Element exposing (..)
import Element.Input as Input
import Set
import Array exposing (..)
import Parser exposing (..)



{-
        ███    ███  █████  ██ ███    ██ 
        ████  ████ ██   ██ ██ ████   ██ 
        ██ ████ ██ ███████ ██ ██ ██  ██ 
        ██  ██  ██ ██   ██ ██ ██  ██ ██ 
        ██      ██ ██   ██ ██ ██   ████ 
-}

main =
  Browser.element
    { init = init
    , update = update
    , subscriptions = subscriptions
    , view = view
    }



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

init : () -> (Model, Cmd Msg)
init _ =
  ( { bareme = ""
    , reponsesCorrectes = ""
    , reponsesEleves = ""
    , eleves = []
    }
  , Cmd.none
  )



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
  -- | CalculerNotes

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  let
    brms = unsafeRun baremeSujet [] model.bareme
    rpnCorrectes = unsafeRun reponsesCorrectes Array.empty model.reponsesCorrectes
    rpnEleves = unsafeRun reponsesEleves [] model.reponsesEleves
  in
  case msg of
    NouveauBareme nouveauBareme ->
      let
        brmss = unsafeRun baremeSujet [] nouveauBareme
      in
      ( { model
        | bareme = nouveauBareme
        , eleves = notes brmss rpnCorrectes rpnEleves
        }
      , Cmd.none
      )
    NouvellesReponsesCorrectes nouvellesReponsesCorrectes ->
      let
        rpnCorrectess = unsafeRun reponsesCorrectes Array.empty nouvellesReponsesCorrectes
      in
      ( { model
        | reponsesCorrectes = nouvellesReponsesCorrectes
        , eleves = notes brms rpnCorrectess rpnEleves
        }
      , Cmd.none
      )
    NouvellesReponsesEleves nouvellesReponsesEleves ->
      let
        rpnElevess = unsafeRun reponsesEleves [] nouvellesReponsesEleves
      in
      ( { model
        | reponsesEleves = nouvellesReponsesEleves
        , eleves = notes brms rpnCorrectes rpnElevess
        }
      , Cmd.none
      )
      {--
    CalculerNotes ->
      ( { model | eleves = notes brms rpnCorrectes rpnEleves }
      , Cmd.none
      )
    --}

unsafeRun prsr defaut texte =
  case run prsr texte of
    Ok x -> x
    _ -> defaut


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

view : Model -> Html Msg
view model =
  layout [] <|
    row [spacing grandEspacement, padding tresGrandEspacement, height fill, width fill, clip, scrollbars]
      [ column [spacing petitEspacement, height fill, width fill, clip, scrollbars]
        [ Input.multiline [height <| maximum 300 fill, clip, scrollbars]
            { onChange = NouveauBareme
            , label = Input.labelAbove [] <| text "Barème"
            , placeholder =
                Just
                <| Input.placeholder []
                <| text "Entrer le barème sous la forme +3 -1, +2 -1"
            , text = model.bareme
            , spellcheck = False
            }
        , Input.multiline [height <| maximum 300 fill, clip, scrollbars]
            { onChange = NouvellesReponsesCorrectes
            , label = Input.labelAbove [] <| text "Réponses correctes"
            , placeholder =
                Just
                <| Input.placeholder []
                <| text "Entrer les réponses correctes pour chaque sujet"
            , text = model.reponsesCorrectes
            , spellcheck = False
            }
        , Input.multiline [height <| maximum 300 fill, clip, scrollbars]
            { onChange = NouvellesReponsesEleves
            , label = Input.labelAbove [] <| text "Réponses des élèves"
            , placeholder =
                Just
                <| Input.placeholder []
                <| text "Entrer les réponses des élèves"
            , text = model.reponsesEleves
            , spellcheck = False
            }
        ]
      , column [spacing petitEspacement, height fill, width fill]
        [ {-- Input.button []
            { onPress = Just CalculerNotes
            , label = text "Calculer les notes"
            }
          --}
          text
            <| "Moyenne : " ++ String.fromFloat (moyenne model.eleves)
            ++ " Écart type : " ++ String.fromFloat (ecartType model.eleves)
        , voirNotes model.eleves
        ]
      ]

voirNotes : Eleves -> Element Msg
voirNotes rpnsEleves =
  table []
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
                      Nothing -> Element.text ""
                      Just nt -> Element.text <| String.fromFloat nt
            }
          ]
      }

petitEspacement = 20

grandEspacement = 5*petitEspacement // 4

tresGrandEspacement = 25*petitEspacement // 16

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


type alias BaremeSujet = List BaremeQuestion

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
type alias ReponsesCorrectes = Array Reponses

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


type alias Reponses = List String

reponses =
  sequence
    { start = ""
    , separator = ""
    , end = ""
    , spaces = espaces
    , item = variable
      { start = ( \ x -> x /= '\n' && x /= ';' )
      , inner = \_ -> False
      , reserved = Set.fromList []
      }
    , trailing = Optional
    }


type alias Eleves = List Eleve

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
  , reponses : Reponses
  , note : Maybe Float
  }

reponsesEleve =
  succeed Eleve
    |= etudiant
    |= int
    |. champzInteret
    |. champzInteret
    |= reponsesQuizScan
    |= champzInteret

etudiant =
  getChompedString
  <| chompIf Char.isDigit
  |. chompIf Char.isDigit
  |. chompIf Char.isDigit
  |. chompIf Char.isDigit
  |. chompIf Char.isDigit

champzInteret =
  succeed Nothing
    |. symbol ";"
    |. chompWhile ( \ x -> x /= '\n' && x /= ';' )

reponsesQuizScan =
  sequence
    { start = ";"
    , separator = ";"
    , end = ""
    , spaces = espaces
    , item = variable
      { start = ( \ x -> x /= '\n' && x /= ';' )
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
        Nothing -> rpnEleve
        Just bonneRpns ->
          { rpnEleve | note = noteSujet brms bonneRpns rpnEleve.reponses }
  in
  List.map f rpnEleves

noteSujet : BaremeSujet -> Reponses -> Reponses -> Maybe Float
noteSujet brms bonneRpns rpnsEleve =
  case brms of
    [] -> Just 0
    brm :: brmss ->
      let
        bonneRpn = List.head bonneRpns
        bonneRpnSuite = List.tail bonneRpns
        rpnEleve = List.head rpnsEleve
        rpnEleveSuite = List.tail rpnsEleve
      in
      case ( (bonneRpn, bonneRpnSuite), (rpnEleve, rpnEleveSuite) ) of
        ( (Just bnRpn, Just bnRpnSuite), (Just rpnElv, Just rpnElvSuite) ) ->
          noteSujet brmss bnRpnSuite rpnElvSuite
          |> Maybe.andThen ( Just << (+) ( noteQuestion brm bnRpn rpnElv ) )
        _ -> Nothing

noteQuestion brm bonneRpn rpnEleve =
  if bonneRpn == rpnEleve then
    brm.bonneReponse
  else if rpnEleve == "-" then
    0
  else
    brm.mauvaiseReponse

moyenne elvs =
  let
    moy nts = List.sum nts / toFloat (List.length nts)
  in
  List.map .note elvs
  |> expurgerNotesManquantes
  |> moy

ecartType elvs =
  let
    moy nts = List.sum nts / toFloat (List.length nts)
    moyCarre = moy << List.map (\x -> x^2)
    ecTp nts = sqrt <| moyCarre nts - (moy nts)^2
  in
  List.map .note elvs
  |> expurgerNotesManquantes
  |> ecTp

expurgerNotesManquantes nts =
  case nts of
    [] -> []
    Nothing :: ntss -> expurgerNotesManquantes ntss
    Just nt :: ntss -> nt :: expurgerNotesManquantes ntss