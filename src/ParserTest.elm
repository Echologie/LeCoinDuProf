module ParserTest exposing (..)

-- Press buttons to increment and decrement a counter.
--
-- Read how it works:
--   https://guide.elm-lang.org/architecture/buttons.html
--

import Parser exposing (..)
import Browser
import Html exposing (Html, button, div, text)
import Html.Events exposing (onClick)
import Maybe exposing (Maybe)
import Result exposing (Result)



-- MAIN


main =
  Browser.sandbox { init = init, update = update, view = view }



-- MODEL


type alias Model = Int


init : Model
init =
  0



-- UPDATE


type Msg
  = Increment
  | Decrement


update : Msg -> Model -> Model
update msg model =
  case msg of
    Increment ->
      model + 1

    Decrement ->
      model - 1



-- VIEW


view : Model -> Html Msg
view model =
  div [] [ text texte ]


texte = voirArbreParse <| run arbre "*\n  *"
{--
  """
  *
    *
    *
      *
      *
      *
        *
        *
      *
        *
      *
    *
      *
      *
      *
  """
--}

unArbre =
  Arbre
    [ Arbre []
    , Arbre
      [ Arbre []
      ]
    ]

voirArbreParse arbreParsePotentiel =
  case arbreParsePotentiel of
    Err erreurs -> deadEndsToString erreurs
    Ok arbreParse -> voirArbre arbreParse
          
{--
parser =
  succeed identity
  |. mangeDesEspaces 2
  |= (
    chompUntil "\n"
    |> getChompedString
  )

mangeDesEspaces ind =
  token <| String.repeat ind " "


mangeDesEspacesBis =
  let
    ind =
      case getIndent of
        Ok indent -> indent
        Err _ -> 0
  in
  token <| String.repeat ind " "
--}

type Arbre = Arbre (List Arbre)

voirArbre arbr =
  case arbr of
    Arbre [] -> "[]"
    Arbre arbrs -> "[" ++ String.concat (List.map voirArbre arbrs) ++ "]"

{--
parserArbre = parserArbreInd 0

parserArbreInd ind =
  succeed Arbre
  |. token <| String.repeat ind " "
  |
  |. symbol "*"
  |= oneOF [fin, sousArbre]
  |. token "\n"
  |. spaces
  |= 

type Ligne =
  LigneVide
  | Ligne Indentation

type alias Indentation =
  { indentation : Int
  , ligne : String
  }

parserArborescence chaine =
  chaine
  |> String.lines
  |> List.map profondeur
  |> construireArbre

construireArbre : List Ligne -> Result Arbre
construireArbre lgns =
  case lgns of
    [] -> Ok <| Arbre []
    LigneVide :: lgnss -> Ok <| construireArbre lgnss
    Ligne ind :: lgnss ->
      construireArbreBis ind.indentation ( Arbre [] ) lgnss

construireArbreBis prfdr arbrs lgns =
  case

profondeur : String -> Ligne
profondeur ligne =
  Indentation 0 ligne
  |> profondeurBis

profondeurBis ind =
  if String.isEmpty ind.ligne then
    LigneVide
  else if String.startsWith " " then
    { ind
      | indentation = ind.indentation + 1
      , ligne = String.dropLeft 1 ind.ligne
    }
  else
    ind
--}


{-| Ce parser change l'indentation courante, cré un arbre puis
  y intègre ses branches grâce à une boucle
-}
arbre : Parser Arbre
arbre =
  let
    suite =
      flip withIndent
        <| succeed Arbre
          |. symbol "*"
          |= loop [] arbres -- (Etat ind []) remplacé par []
  in
  getCol
  |> andThen suite

flip f a b = f b a


type alias Etat =
  { indentation : Int
  , arborescence : List Arbre
  }

arbres arbrs =
  let
    suite col_ind =
      if Tuple.first col_ind > Tuple.second col_ind then -- if col > ind
        succeed ( \arbr -> Loop (arbr :: arbrs) )
          |= lazy (\_ -> arbre)
      else
        succeed ()
          |> map (\_ -> Done (List.reverse arbrs))
  in
  succeed Tuple.pair
  |. spaces
  |= getCol
  |= getIndent
  |> andThen suite
  {--
  oneOf
    [ succeed ( \arbr -> Loop { etat | arborescence = arbr :: etat.arborescence } )
        |= arbresBis
        |. spaces
    , succeed ()
        |> map (\_ -> Done (List.reverse etat.arborescence))
    ]
    --}

{--
arbresBis typeInd =
  case typeInd of
    MemeIndentation ->
      succeed ( \arbr -> Loop { etat | arborescence = arbr :: etat.arborescence } )
        |. symbol "*"
        |. spaces
        |= regarderIndentation

type Indentation =
  MemeIndentation
  | MoinsIndentee
  | PlusIndentee

regarderIndentation : Parser Indentation
regarderIndentation =
  succeed pair
    |= getCol
    |= getIndent
  |> andThen regarderIndentationBis

regarderIndentationBis col_ind =
  let
    col = first col_ind
    ind = second col_ind
  if col == ind then MemeIndentation
  else if col < ind then MoinsIndentee
  else PlusIndentee

arbresBis : Parser Arbre
arbresBis =
  memeIndentation
  |> andThen arbresTer

arbresTer : Bool -> Parser Arbre
arbresTer mmInd =
  if mmInd then
    succeed Arbre
  else
    problem "expecting more spaces"

plusIndentee : Parser Bool
plusIndentee =
  succeed (>=)
    |= getCol
    |= getIndent

moinsIndentee : Parser Bool
moinsIndentee =
  succeed (<=)
    |= getCol
    |= getIndent

parser =
  succeed (x -> Arbre )
  |= oneOf
    [ getChompedString <| chompUntil "\n"
    , succeed ""
    ]
  |. token "\n"
  |. spaces
  |= changerIndentation parser

parserBis =
  getChompedString <| chompUntil "\n"
  |. token "\n"
  |. spaces
  |= changerIndentation parser


changerIndentation prsr
  succeed (col -> withIndent col prsr)
  |= getCol
--}
