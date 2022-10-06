module Evergreen.V1.CalculateurDeNotes exposing (..)


type alias Reponses =
    List String


type alias Eleve =
    { numeroEtudiant : String
    , numeroSujet : Int
    , nomEtudiant : String
    , prenomEtudiant : String
    , reponses : Reponses
    , note : Maybe Float
    }


type alias Eleves =
    List Eleve


type alias Model =
    { bareme : String
    , reponsesCorrectes : String
    , reponsesEleves : String
    , eleves : Eleves
    }


type Msg
    = NouveauBareme String
    | NouvellesReponsesCorrectes String
    | NouvellesReponsesEleves String
    | TelechargerNotes
