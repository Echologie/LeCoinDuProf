module GenerateurDeProblemes exposing (..)

import Browser
import Parser as P exposing (..)
import List as L
import Set
import ParserMaths as PM
import String as S
import Fractions as F exposing (Frac)
import Html exposing (Html, Attribute, button, div, textarea, input, p, iframe, section)
--import Html.Attributes as A -- exposing (..)
--import Html.Events
import Random
import Random.Extra
import Random.List
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import Element.Input as Input


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
  { structureDuSujet : String
  , sujetGenere : String
  }

init : () -> (Model, Cmd Msg)
init _ =
  ( { structureDuSujet = ""
    , sujetGenere = ""
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
  = StructureDuSujet String
  | GenererSujet
  | SujetGenere String 

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    StructureDuSujet nouvelleStructure ->
      ( { model | structureDuSujet = nouvelleStructure }
      , Cmd.none
      )
    SujetGenere nouveauSujetGenere ->
      ( { model | sujetGenere = nouveauSujetGenere }
      , Cmd.none
      )
    GenererSujet ->
      let
        f strSuj =
          case P.run (withIndent -1 sujet) strSuj of
            Ok sjt -> Random.map quizScanVoirBlocs <| sujetsAleatoires sjt
            Err erreurs -> Random.constant <| deadEndsToStringBis erreurs
      in
      ( model
      , Random.generate SujetGenere (f model.structureDuSujet)
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

view : Model -> Html Msg
view model =
  layout [] <|
    column [height fill, width fill]
      [ Input.multiline []
          { onChange = StructureDuSujet
          , label = Input.labelHidden "chose"
          , placeholder = Just <| Input.placeholder [] <| text "Structure du sujet"
          , text = model.structureDuSujet
          , spellcheck = True
          }
      , Input.button []
          { onPress = Just GenererSujet
          , label = text "Générer le sujet"
          }
      , text model.sujetGenere
      ]


{-
██████   █████  ██████  ███████ ███████ ██████      ███████ ██    ██      ██ ███████ ████████ 
██   ██ ██   ██ ██   ██ ██      ██      ██   ██     ██      ██    ██      ██ ██         ██    
██████  ███████ ██████  ███████ █████   ██████      ███████ ██    ██      ██ █████      ██    
██      ██   ██ ██   ██      ██ ██      ██   ██          ██ ██    ██ ██   ██ ██         ██    
██      ██   ██ ██   ██ ███████ ███████ ██   ██     ███████  ██████   █████  ███████    ██    
-}

type alias Blocs = List Bloc

type Bloc =
  Sujet (List Bloc)
  | VariableAremplacer Aremplacer Blocs
  | Entete Macro Blocs
  | QCM Macro Propositions
  | VraiFaux Propositions

type alias Propositions = List Proposition

type Proposition =
  Vrai Macro
  | Faux Macro

type alias NombreDeLigne = Int

{--
voirBlocsParse blocsPotentiel =
  case P.run (withIndent -1 blocs) blocsPotentiel of
    Ok sjt -> voirBlocs sjt
    Err erreurs -> deadEndsToStringBis erreurs
--}

voirBlocsParseAleatoire blocsPotentiel =
  case P.run (withIndent -1 blocs) blocsPotentiel of
    Ok sjt -> Random.map quizScanVoirBlocs <| blocsAleatoires sjt
    Err erreurs -> Random.constant <| deadEndsToStringBis erreurs

deadEndsToStringBis errs =
  errs
  |> List.map voirErreur
  |> String.concat
  |> (++) "Il y a des problèmes aux endroits suivants :\n"

voirErreur err =
  "Ligne : " ++ String.fromInt err.row
  ++ " | Colonne : " ++ String.fromInt err.col

{--
voirBlocs = S.join "\n" << L.map voirBloc

voirBloc prblm =
  -- Debug.log "voirBloc " <|
  case prblm of
    Entete mcr sjt ->
      voirMacro mcr
      ++ "\n"
      ++ voirBlocs sjt
    VraiFaux prps ->
      let
        f prp =
          case prp of
            Vrai mcr -> voirMacro mcr
            Faux mcr -> voirMacro mcr
      in
      S.join "\n" <| L.map f prps
    VariableAremplacer ar sjt -> "" ++ voirBlocs sjt
--}

sujet : Parser Blocs
sujet =
  succeed (L.singleton << Sujet)
   |= blocs

blocs : Parser Blocs
blocs =
  let
    problemes prblms =
      let
        boucle =
          -- Debug.log "Boucle sur un bloc (bis) " <|
          succeed ( \prblm -> Loop (prblm :: prblms) )
            |= bloc
        fin =
          P.map (\_ -> Done (List.reverse prblms))
        suite col_ind =
          oneOf
            [ succeed ()
                |. end
              |> fin
            , if Tuple.first col_ind > Tuple.second col_ind then -- if col > ind
                boucle -- |> Debug.log "Boucle sur un bloc "
              else
                succeed ()
                |> fin
             ]
          -- |> Debug.log ( "Choix de l'embrachement dans la boucle (position " ++ S.fromInt (Tuple.first col_ind) ++ "x" ++ S.fromInt (Tuple.second col_ind) ++ ")" )
      in
      succeed Tuple.pair
      |. spaces
      |= getCol
      |= getIndent
      |> andThen suite
  in
  loop [] problemes

bloc : Parser Bloc
bloc =
  let
    suite =
      flip withIndent
        <| oneOf
          [ vraiFaux
          , qcm
          , backtrackable variableAremplacer
          , entete ]
  in
  getCol
  |> andThen suite

flip f a b = f b a

reserve = Set.fromList
  [ "qcm"
  , "vrfx"
  , "var"
  ]

sousBlocs =
  let
    suite col_ind =
      if Tuple.first col_ind > Tuple.second col_ind then -- if col > ind
        withIndent (Tuple.first col_ind) ( lazy (\_ -> blocs) ) -- Aucune idée de l'effet du lazy, ça marche sans...
      else
        succeed []
  in
  succeed Tuple.pair
  |. spaces
  |= getCol
  |= getIndent
  |> andThen suite

entete : Parser Bloc
entete =
  -- Debug.log "entete " <|
  succeed Entete
    |= macro
    |= blocs -- sousBlocs

vraiFaux =
  -- Debug.log "vraiFaux " <|
  succeed VraiFaux
    |. keyword "vrfx"
    |= propositions

qcm =
  -- Debug.log "vraiFaux " <|
  succeed QCM
    |. keyword "qcm"
    |. espaces
    |= macro
    |= propositions

propositions =
  let
    suiteBis prps =
      let
        boucle =
          oneOf
            [ succeed ( \mcr -> Loop ( Vrai mcr :: prps ) )
                |. symbol "+"
                |= macro
            , succeed ( \mcr -> Loop ( Faux mcr :: prps ) )
                |. symbol "-"
                |= macro
            ]
        fin =
          P.map (\_ -> Done prps)
        suite col_ind =
          oneOf
            [ succeed ()
                |. end
              |> fin
            , if Tuple.first col_ind > Tuple.second col_ind then -- if col > ind
                boucle
              else
                succeed ()
                |> fin
             ]
      in
      succeed Tuple.pair
      |. spaces
      |= getCol
      |= getIndent
      |> andThen suite
  in
  loop [] suiteBis


{-
██████   █████  ██████  ███████ ███████ ██████      ███    ███  █████   ██████ ██████   ██████  
██   ██ ██   ██ ██   ██ ██      ██      ██   ██     ████  ████ ██   ██ ██      ██   ██ ██    ██ 
██████  ███████ ██████  ███████ █████   ██████      ██ ████ ██ ███████ ██      ██████  ██    ██ 
██      ██   ██ ██   ██      ██ ██      ██   ██     ██  ██  ██ ██   ██ ██      ██   ██ ██    ██ 
██      ██   ██ ██   ██ ███████ ███████ ██   ██     ██      ██ ██   ██  ██████ ██   ██  ██████  
-}

type TexteVariable
  = Texte String
  | Variable String

type alias Macro
  = List TexteVariable

voirMacro = S.concat << L.map voirTexteVariable

voirTexteVariable txtvar =
  case txtvar of
    Texte txt -> txt
    Variable var ->
      let
        expressionParseePotentielle = PM.parseMaths var
      in
      case expressionParseePotentielle of
        Err erreur -> "L'expression est mal formée."
        Ok expressionParsee ->
          case Maybe.map F.teX <| PM.evaluer <| expressionParsee of
            Just a -> a
            Nothing -> "Les puissances non-entières ne sont pas acceptées."

texteSansVariables : Parser TexteVariable
texteSansVariables =
  let
    condition caractere = caractere /= '#' && caractere /= '\n'
  in
  succeed Texte
  |= P.getChompedString (
    succeed ()
    |. P.chompIf condition
    |. P.chompWhile condition

  )

expressionVariable : Parser TexteVariable
expressionVariable
  = succeed Variable
  |. symbol "#"
  |= P.getChompedString ( P.chompUntil "#" )
  |. symbol "#"

macro : Parser Macro
macro =
  let
    suite ls =
      P.oneOf
        [ succeed (\l -> P.Loop (l :: ls))
            |= P.oneOf
              [ expressionVariable
              , texteSansVariables
              , backtrackable retourAlaLigne
              ]
        , succeed ()
            |> P.map (\_ -> P.Done (List.reverse ls))
        ]
  in
  P.loop [] suite

retourAlaLigne =
  let
    suite ind =
      succeed (Texte "\n")
        |. token "\n"
        |. token (S.repeat (ind - 1) " ")
  in
  getIndent
  |> andThen suite


{-
        ██████   █████  ██████  ███████ ███████ ██████      ██    ██  █████  ██████  
        ██   ██ ██   ██ ██   ██ ██      ██      ██   ██     ██    ██ ██   ██ ██   ██ 
        ██████  ███████ ██████  ███████ █████   ██████      ██    ██ ███████ ██████  
        ██      ██   ██ ██   ██      ██ ██      ██   ██      ██  ██  ██   ██ ██   ██ 
        ██      ██   ██ ██   ██ ███████ ███████ ██   ██       ████   ██   ██ ██   ██ 
-}

type alias Variables = List Aremplacer

type alias Aremplacer =
  { var : String
  , vals : List String
  }

parserAremplacer variables =
  case P.run aRemplacer variables of
          Ok ars -> ars
          Err _ -> Aremplacer "" []

espaces =
  chompWhile <| (==) ' '

variableAremplacer : Parser Bloc
variableAremplacer =
  -- Debug.log "variableAremplacer " <|
  succeed VariableAremplacer
    |= aRemplacer
    |= blocs -- sousBlocs

aRemplacer : Parser Aremplacer
aRemplacer =
  succeed ( \x y -> Aremplacer x (L.map (F.raw << PM.evaluerBis) y) )
    |. espaces
    |= variable
      { start = Char.isAlpha
      , inner = Char.isAlpha
      , reserved = reserve
      }
    |. espaces
    |. symbol ":"
    |= sequence
      { start = ""
      , separator = ","
      , end = ""
      , spaces = espaces
      , item = PM.expr
      , trailing = P.Optional
      }

{-
███████      ██ ████████      █████  ██      ███████  █████  ████████  ██████  ██ ██████  ███████ 
██           ██    ██        ██   ██ ██      ██      ██   ██    ██    ██    ██ ██ ██   ██ ██      
███████      ██    ██        ███████ ██      █████   ███████    ██    ██    ██ ██ ██████  █████   
     ██ ██   ██    ██        ██   ██ ██      ██      ██   ██    ██    ██    ██ ██ ██   ██ ██      
███████  █████     ██        ██   ██ ███████ ███████ ██   ██    ██     ██████  ██ ██   ██ ███████ 
-}

sujetsAleatoires : Blocs -> Random.Generator Blocs
sujetsAleatoires sjt =
  blocsAleatoires sjt
  |> Random.list 89
  |> Random.map L.concat

blocsAleatoires : Blocs -> Random.Generator Blocs
blocsAleatoires sjt =
  Random.map L.concat
  <| Random.Extra.sequence
  <| L.map blocAleatoire sjt

blocAleatoire : Bloc -> Random.Generator Blocs
blocAleatoire prblm =
  case prblm of
    Sujet blcs ->
      Random.map (L.singleton << Sujet) (blocsAleatoires blcs)
    VariableAremplacer ar sjt ->
      let
        vrbl = ar.var
        vlr = valeurAleatoire "" ar.vals
        f sj vl = remplacerLaVariableDansLesBlocsAleatoires vrbl vl sj
      in
      {--
      Debug.log
        ( "blocAleatoire, branche VariableAremplacer, variable : "
          ++ vrbl ++ " "
        ) <|
      --}
      Random.andThen (f sjt) vlr
    Entete mcr sjt ->
      Random.map (L.singleton << Entete mcr) (blocsAleatoires sjt)
    VraiFaux prps ->
      Random.map
        (L.singleton << VraiFaux << L.singleton)
        ( valeurAleatoire ( Vrai [ Texte "Le prof de maths est le meilleur." ] ) prps )
    QCM mcr prps ->
      Random.map
        (L.singleton << QCM mcr)
        (Random.List.shuffle prps )

{-| Permet de prendre un élément aléatoire dans une liste
    avec une valeur par défaut si la liste est vide.
-}
valeurAleatoire : a -> List a -> Random.Generator a
valeurAleatoire f fs =
  case fs of
    [] ->
      Random.constant f
    ff :: fss ->
      Random.uniform ff fss

remplacerLaVariableDansLeBlocAleatoire :
  String -> String -> Bloc -> Random.Generator Blocs
remplacerLaVariableDansLeBlocAleatoire vrbl vlr prblm =
  case prblm of
    Sujet blcs ->
      remplacerLaVariableDansLesBlocsAleatoires vrbl vlr blcs
    VariableAremplacer ar sjt ->
      blocAleatoire (VariableAremplacer ar sjt)
      |> Random.andThen (remplacerLaVariableDansLesBlocsAleatoires vrbl vlr)
    Entete mcr sjt ->
      Random.map L.singleton
      <| Random.map2 Entete
          ( Random.constant <| remplacerLaVariableParLaValeurDansLaMacro vrbl vlr mcr )
          ( remplacerLaVariableDansLesBlocsAleatoires vrbl vlr sjt )
    QCM mcr prps ->
      Random.map L.singleton
      <| Random.map2 QCM
          ( Random.constant <| remplacerLaVariableParLaValeurDansLaMacro vrbl vlr mcr )
          ( Random.List.shuffle
            <| L.map (remplacerLaVariableParLaValeurDansLaProposition vrbl vlr) prps
          )
    VraiFaux prps ->
      Random.map
        ( L.singleton
          << VraiFaux
          << L.singleton
          << remplacerLaVariableParLaValeurDansLaProposition vrbl vlr
        )
        <| valeurAleatoire ( Vrai [ Texte "Le prof de maths est le meilleur." ] ) prps

remplacerLaVariableDansLesBlocsAleatoires :
  String -> String -> Blocs -> Random.Generator Blocs
remplacerLaVariableDansLesBlocsAleatoires vrbl vlr sjt =
  Random.map L.concat
  <| Random.Extra.sequence
  <| L.map (remplacerLaVariableDansLeBlocAleatoire vrbl vlr) sjt

remplacerLaVariableParLaValeurDansLaProposition vrbl vlr prp =
  case prp of
    Vrai mcr -> Vrai <| remplacerLaVariableParLaValeurDansLaMacro vrbl vlr mcr
    Faux mcr -> Faux <| remplacerLaVariableParLaValeurDansLaMacro vrbl vlr mcr


{-
         ██████  ██    ██ ██ ███████ ███████  ██████  █████  ███    ██ 
        ██    ██ ██    ██ ██    ███  ██      ██      ██   ██ ████   ██ 
        ██    ██ ██    ██ ██   ███   ███████ ██      ███████ ██ ██  ██ 
        ██ ▄▄ ██ ██    ██ ██  ███         ██ ██      ██   ██ ██  ██ ██ 
         ██████   ██████  ██ ███████ ███████  ██████ ██   ██ ██   ████ 
            ▀▀                                                         
-}

quizScanVoirBlocs : Blocs -> String
quizScanVoirBlocs blcs =
  S.join "\n" <| L.map quizScanVoirBloc blcs

quizScanVoirBloc prblm =
  case prblm of
    Sujet blcs ->
      "\n\\begin{Sujet}\n"
      ++ quizScanVoirBlocs blcs
      ++ "\n\\end{Sujet}"
    Entete mcr sjt ->
      -- "\n  \\begin{itemize}\n    \\item "
      voirMacro mcr
      ++ "\n"
      ++ quizScanVoirBlocs sjt
      -- ++ "  \\end{itemize}"
    QCM mcr prps ->
      let
        f prp =
          case prp of
            Vrai mc ->
              "    \\Vrai{" ++ voirMacro mc ++ "}"
            Faux mc ->
              "    \\Faux{" ++ voirMacro mc ++ "}"
      in
      "\n  \\begin{QCM}\n"
      ++ voirMacro mcr
      ++ "\n    \\begin{enumerate}\n"
      ++ ( S.join "\n" <| L.map f prps )
      ++ "\n    \\end{enumerate}\n  \\end{QCM}"
    VraiFaux prps ->
      let
        f prp =
          case prp of
            Vrai mc ->
              "\n  \\begin{VraiFaux}\n    \\Vrai{" ++ voirMacro mc ++ "}\n  \\end{VraiFaux}"
            Faux mc ->
              "\n  \\begin{VraiFaux}\n    \\Faux{" ++ voirMacro mc ++ "}\n  \\end{VraiFaux}"
      in
      S.concat <| L.map f prps
    VariableAremplacer ar sjt ->
      "" ++ quizScanVoirBlocs sjt



{-
        ███    ███ ██ ██   ██ ███████ ██    ██ ██████  
        ████  ████ ██  ██ ██  ██      ██    ██ ██   ██ 
        ██ ████ ██ ██   ███   █████   ██    ██ ██████  
        ██  ██  ██ ██  ██ ██  ██      ██    ██ ██   ██ 
        ██      ██ ██ ██   ██ ███████  ██████  ██   ██ 
-}

{--
remplacer : String -> String -> List String
remplacer variables question =
  let
    ars =
      S.lines variables
      |> L.map parserAremplacer
    mcr =
      parserQuestion question
  in
  remplacerLesVariablesDansLaMacro ars mcr

remplacerLesVariablesDansLaMacro : List Aremplacer -> Macro -> List String
remplacerLesVariablesDansLaMacro ars mcr =
  remplacerLesVariablesDansLaMacroBis ars [mcr]
  |> L.map voirMacro

remplacerLesVariablesDansLaMacroBis : List Aremplacer -> List Macro -> List Macro
remplacerLesVariablesDansLaMacroBis ars macros =
  case ars of
    [] -> macros
    ar :: arss ->
      L.map (remplacerLaVariableDansLaMacro ar) macros
      |> L.concat
      |> remplacerLesVariablesDansLaMacroBis arss

remplacerLaVariableDansLaMacro : Aremplacer -> Macro -> List Macro
remplacerLaVariableDansLaMacro ar mcr =
  let
    f val = remplacerLaVariableParLaValeurDansLaMacro ar.var val mcr
  in  
  L.map f ar.vals 
--}

remplacerLaVariableParLaValeurDansLaMacro : String -> String -> Macro -> Macro
remplacerLaVariableParLaValeurDansLaMacro var val mcr =
  L.map (remplacerLaVariableParLaValeurDansLeTexteVariable var val) mcr

remplacerLaVariableParLaValeurDansLeTexteVariable var val tv =
  case tv of
    Texte chaine -> Texte chaine
    Variable chaine -> Variable <| S.replace var val chaine
--}


{-

        ███████ ██   ██ ██████  ██████  ███████ ███████ ███████ ██  ██████  ███    ██ ███████ 
        ██       ██ ██  ██   ██ ██   ██ ██      ██      ██      ██ ██    ██ ████   ██ ██      
        █████     ███   ██████  ██████  █████   ███████ ███████ ██ ██    ██ ██ ██  ██ ███████ 
        ██       ██ ██  ██      ██   ██ ██           ██      ██ ██ ██    ██ ██  ██ ██      ██ 
        ███████ ██   ██ ██      ██   ██ ███████ ███████ ███████ ██  ██████  ██   ████ ███████ 
                                                                                              
                                                                                              

-}

monome a n =
  if a == 0 then ""
  else if n == 0 then ( String.fromInt a )
  else if (n,a) == (1,1) then "x"
  else if (n,a) == (1,-1) then "-x"
  else if n == 1 then ( String.fromInt a ) ++ "x"
  else if a == 1 then "x^{" ++ ( String.fromInt n ) ++ "}"
  else if a == -1 then "-x^{" ++ ( String.fromInt n ) ++ "}"
  else ( String.fromInt a ) ++ "x^{" ++ ( String.fromInt n ) ++ "}"

poly a_ks =
  if a_ks == [] then "0"
  else polyBis a_ks ( List.length a_ks - 1 )

polyBis a_ks n =
  case a_ks of
    [] -> ""
    a_n :: a_kss ->
      if a_n == 0 then polyBis a_kss ( n - 1 )
      else ( monome a_n n ) ++ ( polyGen a_kss ( n - 1 ) )

polyGen a_ks n =
  case a_ks of
    [] -> ""
    a_i :: a_is ->
      if a_i <= 0 then ( monome a_i n ) ++ ( polyGen a_is ( n - 1 ) )
      else "+" ++ ( monome a_i n ) ++ ( polyGen a_is ( n - 1 ) )

polyD a_ks = polyDbis a_ks ( List.length a_ks - 1 )

polyDbis a_ks n =
  case a_ks of
    [] -> []
    a_0 :: [] -> []
    a_k :: a_kss -> ( n*a_k ) :: polyDbis a_kss ( n - 1 )

dl a_ks =
  if a_ks == [] then "0"
  else dlBis a_ks 0

dlBis a_ks n =
  case a_ks of
    [] -> ""
    premierCoef :: suite ->
      if premierCoef == 0 then dlBis suite ( n + 1 )
      else ( monome premierCoef n ) ++ ( dlGen suite ( n + 1 ) )

dlGen a_ks n =
  case a_ks of
    [] -> ""
    a_i :: a_is ->
      if a_i <= 0 then ( monome a_i n ) ++ ( dlGen a_is ( n + 1 ) )
      else "+" ++ ( monome a_i n ) ++ ( dlGen a_is ( n + 1 ) )