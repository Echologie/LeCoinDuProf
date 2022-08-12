module GenerateurDeProblemes exposing (..)

import Browser exposing (Document)
import Element exposing (..)
import Element.Background as Background
import Element.Border as Border
import Element.Events exposing (..)
import Element.Font as Font
import Element.Input as Input
import File.Download
import Fraction as F exposing (Fraction)
import Html exposing (Attribute, Html, button, div, iframe, input, p, section, textarea)
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
    "Générateur de problèmes"



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


init : Model
init =
    { structureDuSujet = ""
    , sujetGenere = ""
    }



{-
   ██    ██ ██████  ██████   █████  ████████ ███████
   ██    ██ ██   ██ ██   ██ ██   ██    ██    ██
   ██    ██ ██████  ██   ██ ███████    ██    █████
   ██    ██ ██      ██   ██ ██   ██    ██    ██
    ██████  ██      ██████  ██   ██    ██    ███████
-}


type Msg
    = StructureDuSujet String
    | GenererSujetAleatoire
    | GenererVariantesSujet
    | SujetGenere String
    | TelechargerSujet


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

        GenererSujetAleatoire ->
            let
                f strSuj =
                    case P.run (withIndent -1 sujet) strSuj of
                        Ok sjt ->
                            Random.map quizScanVoirSujet <| sujetsAleatoires sjt

                        Err erreurs ->
                            Random.constant <| deadEndsToStringBis erreurs
            in
            ( model
            , Random.generate SujetGenere (f model.structureDuSujet)
            )

        GenererVariantesSujet ->
            let
                f strSuj =
                    case P.run (withIndent -1 sujet) strSuj of
                        Ok sjt ->
                            evalBoxVoirBlocs <| variantesBlocs sjt

                        Err erreurs ->
                            deadEndsToStringBis erreurs
            in
            ( { model | sujetGenere = f model.structureDuSujet }
            , Cmd.none
            )

        TelechargerSujet ->
            ( model
            , File.Download.string "Sujets.tex" "text/tex" model.sujetGenere
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
            { onChange = StructureDuSujet
            , label = Input.labelHidden "chose"
            , placeholder =
                Just <|
                    Input.placeholder [] <|
                        text "Structure du sujet"
            , text = model.structureDuSujet
            , spellcheck = True
            }
        , column [ spacing petitEspacement, height fill, width fill, scrollbars ]
            -- L'attibut scrollbars présent dans la liste ci-dessus  ^^^^^^^^^^
            -- est nécessaire pour que l'élément ci-dessous ne s'étende pas !
            [ paragraph []
                [ text
                    """
                            Pour générer 89 sujets alétoires appuyer sur QuizScan et
                            pour générer toutes les variantes du sujet appuyer sur EvalBox.
                            """
                ]
            , row
                [ width fill
                , padding petitEspacement
                , spacing tresGrandEspacement
                ]
                [ bouton GenererSujetAleatoire "QuizScan"
                , bouton GenererVariantesSujet "EvalBox"
                , bouton TelechargerSujet "Télécharger"
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
                text model.sujetGenere
            ]
        ]



{-
   ██████   █████  ██████  ███████ ███████ ██████      ███████ ██    ██      ██ ███████ ████████
   ██   ██ ██   ██ ██   ██ ██      ██      ██   ██     ██      ██    ██      ██ ██         ██
   ██████  ███████ ██████  ███████ █████   ██████      ███████ ██    ██      ██ █████      ██
   ██      ██   ██ ██   ██      ██ ██      ██   ██          ██ ██    ██ ██   ██ ██         ██
   ██      ██   ██ ██   ██ ███████ ███████ ██   ██     ███████  ██████   █████  ███████    ██
-}


type alias Blocs =
    List Bloc


type Bloc
    = Sujet Blocs
    | VariableAremplacer Aremplacer Blocs
    | Entete Macro Blocs
    | QCM Macro Propositions
    | VraiFaux Propositions


type alias Propositions =
    List Proposition


type Proposition
    = Vrai Macro
    | Faux Macro


voirBlocsParseAleatoire blocsPotentiel =
    case P.run (withIndent -1 blocs) blocsPotentiel of
        Ok sjt ->
            Random.map quizScanVoirBlocs <| blocsAleatoires sjt

        Err erreurs ->
            Random.constant <| deadEndsToStringBis erreurs


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
                    succeed (\prblm -> Loop (prblm :: prblms))
                        |= bloc

                fin =
                    P.map (\_ -> Done (List.reverse prblms))

                suite col_ind =
                    oneOf
                        [ succeed ()
                            |. end
                            |> fin
                        , if Tuple.first col_ind > Tuple.second col_ind then
                            -- if col > ind
                            boucle
                            -- |> Debug.log "Boucle sur un bloc "

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
            flip withIndent <|
                oneOf
                    [ vraiFaux
                    , qcm
                    , backtrackable variableAremplacer
                    , entete
                    ]
    in
    getCol
        |> andThen suite


flip f a b =
    f b a


reserve =
    Set.fromList
        [ "qcm"
        , "vrfx"
        ]


sousBlocs =
    let
        suite col_ind =
            if Tuple.first col_ind > Tuple.second col_ind then
                -- if col > ind
                withIndent (Tuple.first col_ind) (lazy (\_ -> blocs))
                -- Aucune idée de l'effet du lazy, ça marche sans...

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
        |= blocs



-- sousBlocs


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
                        [ succeed (\mcr -> Loop (Vrai mcr :: prps))
                            |. symbol "+"
                            |= macro
                        , succeed (\mcr -> Loop (Faux mcr :: prps))
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
                        , if Tuple.first col_ind > Tuple.second col_ind then
                            -- if col > ind
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


type alias Macro =
    List TexteVariable


voirMacro =
    S.concat << L.map voirTexteVariable


voirTexteVariable txtvar =
    case txtvar of
        Texte txt ->
            txt

        Variable var ->
            let
                expressionParseePotentielle =
                    Pem.parserExpressionMathematique var
            in
            case expressionParseePotentielle of
                Err erreur ->
                    "L'expression est mal formée."

                Ok expressionParsee ->
                    case Result.map F.teX <| Pem.resultatFractionnaire <| expressionParsee of
                        Ok a ->
                            a

                        Err erreur ->
                            erreur


texteSansVariables : Parser TexteVariable
texteSansVariables =
    let
        condition caractere =
            caractere /= '#' && caractere /= '\n'
    in
    succeed Texte
        |= P.getChompedString
            (succeed ()
                |. P.chompIf condition
                |. P.chompWhile condition
            )


expressionVariable : Parser TexteVariable
expressionVariable =
    succeed Variable
        |. symbol "#"
        |= P.getChompedString (P.chompUntil "#")
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


type alias Variables =
    List Aremplacer


type alias Aremplacer =
    { var : String
    , vals : List String
    }


parserAremplacer variables =
    case P.run aRemplacer variables of
        Ok ars ->
            ars

        Err _ ->
            Aremplacer "" []


espaces =
    chompWhile <| (==) ' '


variableAremplacer : Parser Bloc
variableAremplacer =
    -- Debug.log "variableAremplacer " <|
    succeed VariableAremplacer
        |= aRemplacer
        |= blocs



-- sousBlocs


aRemplacer : Parser Aremplacer
aRemplacer =
    succeed (\x y -> Aremplacer x (L.map (F.asciiMath << Pem.evaluerUnsafe) y))
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
            , item = Pem.expressionMathematique
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
    Random.map L.concat <|
        Random.Extra.sequence <|
            L.map blocAleatoire sjt


blocAleatoire : Bloc -> Random.Generator Blocs
blocAleatoire prblm =
    case prblm of
        Sujet blcs ->
            Random.map (L.singleton << Sujet) (blocsAleatoires blcs)

        VariableAremplacer ar sjt ->
            let
                vrbl =
                    ar.var

                vlr =
                    valeurAleatoire "" ar.vals

                f sj vl =
                    remplacerLaVariableDansLesBlocsAleatoires vrbl vl sj
            in
            Random.andThen (f sjt) vlr

        Entete mcr sjt ->
            Random.map (L.singleton << Entete mcr) (blocsAleatoires sjt)

        VraiFaux prps ->
            Random.map
                (L.singleton << VraiFaux << L.singleton)
                (valeurAleatoire (Vrai [ Texte "Le prof de maths est le meilleur." ]) prps)

        QCM mcr prps ->
            Random.map
                (L.singleton << QCM mcr)
                (Random.List.shuffle prps)


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


remplacerLaVariableDansLeBlocAleatoire : String -> String -> Bloc -> Random.Generator Blocs
remplacerLaVariableDansLeBlocAleatoire vrbl vlr prblm =
    case prblm of
        Sujet blcs ->
            remplacerLaVariableDansLesBlocsAleatoires vrbl vlr blcs

        VariableAremplacer ar sjt ->
            blocAleatoire (VariableAremplacer ar sjt)
                |> Random.andThen (remplacerLaVariableDansLesBlocsAleatoires vrbl vlr)

        Entete mcr sjt ->
            Random.map L.singleton <|
                Random.map2 Entete
                    (Random.constant <| remplacerLaVariableParLaValeurDansLaMacro vrbl vlr mcr)
                    (remplacerLaVariableDansLesBlocsAleatoires vrbl vlr sjt)

        QCM mcr prps ->
            Random.map L.singleton <|
                Random.map2 QCM
                    (Random.constant <| remplacerLaVariableParLaValeurDansLaMacro vrbl vlr mcr)
                    (Random.List.shuffle <|
                        L.map (remplacerLaVariableParLaValeurDansLaProposition vrbl vlr) prps
                    )

        VraiFaux prps ->
            Random.map
                (L.singleton
                    << VraiFaux
                    << L.singleton
                    << remplacerLaVariableParLaValeurDansLaProposition vrbl vlr
                )
            <|
                valeurAleatoire (Vrai [ Texte "Le prof de maths est le meilleur." ]) prps


remplacerLaVariableDansLesBlocsAleatoires : String -> String -> Blocs -> Random.Generator Blocs
remplacerLaVariableDansLesBlocsAleatoires vrbl vlr sjt =
    Random.map L.concat <|
        Random.Extra.sequence <|
            L.map (remplacerLaVariableDansLeBlocAleatoire vrbl vlr) sjt


remplacerLaVariableParLaValeurDansLaProposition vrbl vlr prp =
    case prp of
        Vrai mcr ->
            Vrai <| remplacerLaVariableParLaValeurDansLaMacro vrbl vlr mcr

        Faux mcr ->
            Faux <| remplacerLaVariableParLaValeurDansLaMacro vrbl vlr mcr



{-
   ██    ██  █████  ██████  ██  █████  ███    ██ ████████ ███████ ███████
   ██    ██ ██   ██ ██   ██ ██ ██   ██ ████   ██    ██    ██      ██
   ██    ██ ███████ ██████  ██ ███████ ██ ██  ██    ██    █████   ███████
    ██  ██  ██   ██ ██   ██ ██ ██   ██ ██  ██ ██    ██    ██           ██
     ████   ██   ██ ██   ██ ██ ██   ██ ██   ████    ██    ███████ ███████
-}


variantesBlocs : Blocs -> Blocs
variantesBlocs =
    L.concat << L.map variantesBloc


variantesBloc : Bloc -> Blocs
variantesBloc blcs =
    case blcs of
        Sujet blcss ->
            L.singleton <| Sujet <| variantesBlocs blcss

        VariableAremplacer ar blcss ->
            remplacerLaVariableDansLesBlocs ar blcss

        Entete mcr blcss ->
            case qcmsDepuisVraiFauxx mcr blcss of
                Just qcms ->
                    qcms

                Nothing ->
                    [ Entete [ Texte "Je ne peux pas prendre en charge une telle imbrication :(" ] [] ]

        VraiFaux prps ->
            --pourri
            --qcmsDepuisVraiFauxx [ Texte "La proposition suivante est-elle correcte ?" ]
            [ VraiFaux prps ]

        QCM mcr prps ->
            [ QCM mcr prps ]


qcmsDepuisVraiFauxx : Macro -> Blocs -> Maybe Blocs
qcmsDepuisVraiFauxx mcr blcs =
    let
        alternativesDuVraiFaux blc =
            case blc of
                VraiFaux prps ->
                    Just prps

                _ ->
                    Nothing

        listeDesAlternatives listePartielle listeDeMaybePropositions =
            case listeDeMaybePropositions of
                [] ->
                    Just <| List.reverse listePartielle

                Nothing :: lstMbPrps ->
                    Nothing

                (Just prps) :: lstMbPrps ->
                    listeDesAlternatives (prps :: listePartielle) lstMbPrps
    in
    List.map alternativesDuVraiFaux blcs
        |> listeDesAlternatives []
        |> Maybe.map mix
        |> Maybe.map (List.map (QCM mcr))


{-| mix [ [1,2] , [3,4] , [5,6] ] == [ [1,3,5] , [1,3,6] , [1,4,5] , [1,4,6] , [2,3,5] , ... ]
-}
mix : List (List a) -> List (List a)
mix lls =
    case lls of
        [] ->
            []

        [] :: llss ->
            []

        l :: [] ->
            List.map List.singleton l

        (a :: ls) :: llss ->
            List.map ((::) a) (mix llss) ++ mix (ls :: llss)


queDesVraiFaux blcs =
    List.foldl (&&) True <| List.map estUnVraiFaux blcs


estUnVraiFaux blc =
    case blc of
        VraiFaux _ ->
            True

        _ ->
            False


remplacerLaVariableDansLeBloc : Aremplacer -> Bloc -> Blocs
remplacerLaVariableDansLeBloc ar blc =
    case blc of
        Sujet blcs ->
            remplacerLaVariableDansLesBlocs ar blcs

        VariableAremplacer arr sjt ->
            variantesBloc (VariableAremplacer arr sjt)
                |> remplacerLaVariableDansLesBlocs ar

        Entete mcr blcs ->
            case qcmsDepuisVraiFauxx mcr blcs of
                Just qcms ->
                    remplacerLaVariableDansLesBlocs ar qcms

                Nothing ->
                    [ Entete [ Texte "Je ne peux pas prendre en charge une telle imbrication :(" ] [] ]

        -- List.map (\x -> Entete x []) (remplacerLaVariableDansLaMacro ar mcr)
        --( remplacerLaVariableDansLesBlocs ar blcs )
        QCM mcr prps ->
            let
                f vlr =
                    QCM
                        (remplacerLaVariableParLaValeurDansLaMacro ar.var vlr mcr)
                        (L.map (remplacerLaVariableParLaValeurDansLaProposition ar.var vlr) prps)
            in
            L.map f ar.vals

        --( L.map (remplacerLaVariableParLaValeurDansLaProposition vrbl vlr) prps )
        VraiFaux prps ->
            [ Entete [ Texte "J'ai besoin d'un entête pour générer des QCM à partir de vrai-faux :(" ] [] ]


remplacerLaVariableDansLesBlocs : Aremplacer -> Blocs -> Blocs
remplacerLaVariableDansLesBlocs ar blcs =
    L.concat <| L.map (remplacerLaVariableDansLeBloc ar) blcs



{-
    ██████  ██    ██ ██ ███████ ███████  ██████  █████  ███    ██
   ██    ██ ██    ██ ██    ███  ██      ██      ██   ██ ████   ██
   ██    ██ ██    ██ ██   ███   ███████ ██      ███████ ██ ██  ██
   ██ ▄▄ ██ ██    ██ ██  ███         ██ ██      ██   ██ ██  ██ ██
    ██████   ██████  ██ ███████ ███████  ██████ ██   ██ ██   ████
       ▀▀
-}


quizScanVoirSujet : Blocs -> String
quizScanVoirSujet blcs =
    """\\documentclass[oneside,twocolumn,landscape]{book}
\\usepackage[T1]{fontenc}
\\usepackage[utf8]{inputenc}
\\usepackage{geometry}
\\geometry{verbose,tmargin=1cm,bmargin=1cm,lmargin=2cm,rmargin=2cm}
\\setcounter{secnumdepth}{3}
\\setcounter{tocdepth}{3}
\\usepackage{mathrsfs}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{amsfonts}
\\usepackage{bbold}
\\usepackage{xcolor}
\\pagestyle{empty}
\\newcounter{NumeroDuSujet}
\\setcounter{NumeroDuSujet}{10}
\\newenvironment{Sujet}[1][]
  {\\refstepcounter{NumeroDuSujet}\\section*{Numéro du sujet :~\\theNumeroDuSujet}\\par #1}{\\newpage}
\\newcounter{NumeroDeLaQuestion}[NumeroDuSujet]
\\newenvironment{VraiFaux}[1][]
  {\\begin{enumerate}\\setcounter{enumi}{\\theNumeroDeLaQuestion}#1}
  {\\end{enumerate}\\stepcounter{NumeroDeLaQuestion}}
\\newenvironment{QCM}[1][]
  {\\begin{enumerate}\\setcounter{enumi}{\\theNumeroDeLaQuestion}\\item #1}
  {\\end{enumerate}\\stepcounter{NumeroDeLaQuestion}}

\\let\\Vrai\\item
\\let\\Faux\\item

% Pour obtenir les corrigés, retirer les % devant les deux lignes suivantes :

%\\def\\Vrai#1{\\item{\\color{green}#1}}
%\\def\\Faux#1{\\item{\\color{red}#1}}

\\begin{document}

""" ++ quizScanVoirBlocs blcs ++ "\n\n\\end{document}"


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
                ++ (S.join "\n" <| L.map f prps)
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
   ███████ ██    ██  █████  ██      ██████   ██████  ██   ██
   ██      ██    ██ ██   ██ ██      ██   ██ ██    ██  ██ ██
   █████   ██    ██ ███████ ██      ██████  ██    ██   ███
   ██       ██  ██  ██   ██ ██      ██   ██ ██    ██  ██ ██
   ███████   ████   ██   ██ ███████ ██████   ██████  ██   ██
-}


evalBoxVoirBlocs : Blocs -> String
evalBoxVoirBlocs blcs =
    S.join "\n" <| L.map evalBoxVoirBloc blcs


evalBoxVoirBloc blc =
    let
        f prp =
            case prp of
                Vrai mc ->
                    "+" ++ voirMacro mc

                Faux mc ->
                    "-" ++ voirMacro mc
    in
    case blc of
        Sujet blcs ->
            evalBoxVoirBlocs blcs

        Entete mcr sjt ->
            voirMacro mcr
                ++ evalBoxVoirBlocs sjt

        QCM mcr prps ->
            voirMacro mcr
                ++ "\n"
                ++ (S.join "\n" <| L.map f prps)

        VraiFaux prps ->
            S.concat <| L.map f prps

        VariableAremplacer ar sjt ->
            "" ++ evalBoxVoirBlocs sjt



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
--}


remplacerLaVariableDansLaMacro : Aremplacer -> Macro -> List Macro
remplacerLaVariableDansLaMacro ar mcr =
    let
        f val =
            remplacerLaVariableParLaValeurDansLaMacro ar.var val mcr
    in
    L.map f ar.vals


remplacerLaVariableParLaValeurDansLaMacro : String -> String -> Macro -> Macro
remplacerLaVariableParLaValeurDansLaMacro var val mcr =
    L.map (remplacerLaVariableParLaValeurDansLeTexteVariable var val) mcr


remplacerLaVariableParLaValeurDansLeTexteVariable var val tv =
    case tv of
        Texte chaine ->
            Texte chaine

        Variable chaine ->
            Variable <| S.replace var val chaine



{-
   ███████ ██   ██ ██████  ██████  ███████ ███████ ███████ ██  ██████  ███    ██ ███████
   ██       ██ ██  ██   ██ ██   ██ ██      ██      ██      ██ ██    ██ ████   ██ ██
   █████     ███   ██████  ██████  █████   ███████ ███████ ██ ██    ██ ██ ██  ██ ███████
   ██       ██ ██  ██      ██   ██ ██           ██      ██ ██ ██    ██ ██  ██ ██      ██
   ███████ ██   ██ ██      ██   ██ ███████ ███████ ███████ ██  ██████  ██   ████ ███████
-}


monome a n =
    if a == 0 then
        ""

    else if n == 0 then
        String.fromInt a

    else if ( n, a ) == ( 1, 1 ) then
        "x"

    else if ( n, a ) == ( 1, -1 ) then
        "-x"

    else if n == 1 then
        String.fromInt a ++ "x"

    else if a == 1 then
        "x^{" ++ String.fromInt n ++ "}"

    else if a == -1 then
        "-x^{" ++ String.fromInt n ++ "}"

    else
        String.fromInt a ++ "x^{" ++ String.fromInt n ++ "}"


poly a_ks =
    if a_ks == [] then
        "0"

    else
        polyBis a_ks (List.length a_ks - 1)


polyBis a_ks n =
    case a_ks of
        [] ->
            ""

        a_n :: a_kss ->
            if a_n == 0 then
                polyBis a_kss (n - 1)

            else
                monome a_n n ++ polyGen a_kss (n - 1)


polyGen a_ks n =
    case a_ks of
        [] ->
            ""

        a_i :: a_is ->
            if a_i <= 0 then
                monome a_i n ++ polyGen a_is (n - 1)

            else
                "+" ++ monome a_i n ++ polyGen a_is (n - 1)


polyD a_ks =
    polyDbis a_ks (List.length a_ks - 1)


polyDbis a_ks n =
    case a_ks of
        [] ->
            []

        a_0 :: [] ->
            []

        a_k :: a_kss ->
            (n * a_k) :: polyDbis a_kss (n - 1)


dl a_ks =
    if a_ks == [] then
        "0"

    else
        dlBis a_ks 0


dlBis a_ks n =
    case a_ks of
        [] ->
            ""

        premierCoef :: suite ->
            if premierCoef == 0 then
                dlBis suite (n + 1)

            else
                monome premierCoef n ++ dlGen suite (n + 1)


dlGen a_ks n =
    case a_ks of
        [] ->
            ""

        a_i :: a_is ->
            if a_i <= 0 then
                monome a_i n ++ dlGen a_is (n + 1)

            else
                "+" ++ monome a_i n ++ dlGen a_is (n + 1)
