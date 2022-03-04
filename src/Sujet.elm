module Sujet exposing (..)


type Bloc typeDeBloc etat exportabilite
    = Bloc
        { entete : Macro
        , contenu : List Bloc
        , commentaire : Macro
        }



-- Les différents types de blocs


type Simple
    = Simple


type Qcm
    = Qcm


type VraiFaux
    = VraixFaux


type Aremplacer
    = Aremplacer


type Tag
    = Tag



-- Les blocs peuvent être complets ou incomplets


type Complet
    = Complet


type Incomplet
    = Incomplet



-- Les blocs peuvent être exportable (en QuizScan ou EvalBox) ou non


type NonExportable
    = NonExportable


type ExportableEnQuizscanSeulement
    = ExportableEnQuizscanSeulement


type Exportable
    = Exportable
