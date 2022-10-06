module Evergreen.V1.GenerateurH5P exposing (..)

import Evergreen.V1.Zip
import File
import Time


type alias H5pArchive =
    Evergreen.V1.Zip.Zip


type alias Model =
    { source : String
    , generatedContent : List String
    , originalH5pArchive : H5pArchive
    , generatedH5pArchives : List H5pArchive
    , zone : Time.Zone
    , time : Time.Posix
    }


type Msg
    = UpdateTime
    | NewTime ( Time.Zone, Time.Posix )
    | NewContent (List String)
    | Generate String
    | GenerateArchive
    | Download
    | TakeOriginalH5pArchive
    | H5pArchiveLoaded File.File
    | ZipArchiveLoaded (Maybe H5pArchive)
