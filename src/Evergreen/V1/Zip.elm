module Evergreen.V1.Zip exposing (..)

import Evergreen.V1.Internal.Format


type Zip
    = Zip (List Evergreen.V1.Internal.Format.Entry)
