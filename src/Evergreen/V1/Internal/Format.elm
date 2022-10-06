module Evergreen.V1.Internal.Format exposing (..)

import Bytes


type EntryBytes
    = Exactly Bytes.Bytes
    | Offset Bytes.Bytes Int


type CompressionMethod
    = Stored
    | Deflated
    | Unsupported Int


type alias EntryMeta =
    { madeBy : Int
    , extractMinVersion : Int
    , flag : Int
    , compressionMethod : CompressionMethod
    , lastModified : Int
    , crc32 : Int
    , compressedSize : Int
    , uncompressedSize : Int
    , fileName : String
    , extraField : Bytes.Bytes
    , comment : String
    , internalAttributes : Int
    , externalAttributes : Int
    }


type Entry
    = Entry EntryBytes EntryMeta
