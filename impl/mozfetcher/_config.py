software = {
    "Linux_64bit": {
       "url": "http://ftp.mozilla.org/pub/mozilla.org/xulrunner/nightly/latest-trunk/xulrunner-2.0b8pre.en-US.linux-x86_64.tar.bz2",
       "md5": "a51d73e008bdc583e01d03ecd7988f16",
       "bin": {
           "path": "xulrunner/xulrunner",
           "sig": "6edae91d12aca0de126b7636d9f53468"
       }
    },
    # for both 32 and 64 bit darwin we'll use 32 bit binaries
    ( "Darwin_64bit", "Darwin_32bit" ): {
        "url": "http://ftp.mozilla.org/pub/mozilla.org/xulrunner/nightly/latest-trunk/xulrunner-2.0b7pre.en-US.mac-i386.sdk.tar.bz2",
        "md5": "133c4263a070d0d4ea26ca1f346b8e4a",
        "bin": {
            "path": "xulrunner-sdk/bin/xulrunner",
            "sig": "d73744c51f5655e803c0fe9ce3a88052"
        }
    }
}

def getConfig(platform):
    for key in software:
        if type(key) is str:
            if platform == key:
                return software[key]
        elif platform in key:
            return software[key]
    raise RuntimeError("unsupported platform: " + platform)
