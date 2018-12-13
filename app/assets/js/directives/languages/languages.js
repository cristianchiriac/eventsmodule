angular
    .module('app')
    .provider('countries', () => {
        let countries = [{
                "language": "af_ZA",
                "country": "Afrikaans - South Africa",
                "isonumeric": 436,
                "alfa3": "AFK"
            },
            {
                "language": "sq_AL",
                "country": "Albanian - Albania",
                "isonumeric": 41,
                "alfa3": "SQI"
            },
            {
                "language": "ar_DZ",
                "country": "Arabic - Algeria",
                "isonumeric": 1401,
                "alfa3": "ARG"
            },
            {
                "language": "ar_BH",
                "country": "Arabic - Bahrain",
                "isonumeric": 301,
                "alfa3": "ARH"
            },
            {
                "language": "ar_EG",
                "country": "Arabic - Egypt",
                "isonumeric": 1,
                "alfa3": "ARE"
            },
            {
                "language": "ar_IQ",
                "country": "Arabic - Iraq",
                "isonumeric": 801,
                "alfa3": "ARI"
            },
            {
                "language": "ar_JO",
                "country": "Arabic - Jordan",
                "isonumeric": 201,
                "alfa3": "ARJ"
            },
            {
                "language": "ar_KW",
                "country": "Arabic - Kuwait",
                "isonumeric": 3401,
                "alfa3": "ARK"
            },
            {
                "language": "ar_LB",
                "country": "Arabic - Lebanon",
                "isonumeric": 3001,
                "alfa3": "ARB"
            },
            {
                "language": "ar_LY",
                "country": "Arabic - Libya",
                "isonumeric": 1001,
                "alfa3": "ARL"
            },
            {
                "language": "ar_MA",
                "country": "Arabic - Morocco",
                "isonumeric": 1801,
                "alfa3": "ARM"
            },
            {
                "language": "ar_OM",
                "country": "Arabic - Oman",
                "isonumeric": 2001,
                "alfa3": "ARO"
            },
            {
                "language": "ar_QA",
                "country": "Arabic - Qatar",
                "isonumeric": 4001,
                "alfa3": "ARQ"
            },
            {
                "language": "ar_SA",
                "country": "Arabic - Saudi Arabia",
                "isonumeric": 401,
                "alfa3": "ARA"
            },
            {
                "language": "ar_SY",
                "country": "Arabic - Syria",
                "isonumeric": 2801,
                "alfa3": "ARS"
            },
            {
                "language": "ar_TN",
                "country": "Arabic - Tunisia",
                "isonumeric": 101,
                "alfa3": "ART"
            },
            {
                "language": "ar_AE",
                "country": "Arabic - United Arab Emirates",
                "isonumeric": 3801,
                "alfa3": "ARU"
            },
            {
                "language": "ar_YE",
                "country": "Arabic - Yemen",
                "isonumeric": 2401,
                "alfa3": "ARY"
            },
            {
                "language": "hy_AM",
                "country": "Armenian - Armenia",
                "isonumeric": 42,
                "alfa3": ""
            },
            {
                "language": "Cy_az-AZ",
                "country": "Azeri (Cyrillic) - Azerbaijan",
                "isonumeric": 82,
                "alfa3": ""
            },
            {
                "language": "Lt_az-AZ",
                "country": "Azeri (Latin) - Azerbaijan",
                "isonumeric": 42,
                "alfa3": ""
            },
            {
                "language": "eu_ES",
                "country": "Basque - Basque",
                "isonumeric": 42,
                "alfa3": "EUQ"
            },
            {
                "language": "be_BY",
                "country": "Belarusian - Belarus",
                "isonumeric": 423,
                "alfa3": "BEL"
            },
            {
                "language": "bg_BG",
                "country": "Bulgarian - Bulgaria",
                "isonumeric": 402,
                "alfa3": "BGR"
            },
            {
                "language": "ca_ES",
                "country": "Catalan - Catalan",
                "isonumeric": 403,
                "alfa3": "CAT"
            },
            {
                "language": "zh_CN",
                "country": "Chinese - China",
                "isonumeric": 804,
                "alfa3": "CHS"
            },
            {
                "language": "zh_HK",
                "country": "Chinese - Hong Kong SAR",
                "isonumeric": 4,
                "alfa3": "ZHH"
            },
            {
                "language": "zh_MO",
                "country": "Chinese - Macau SAR",
                "isonumeric": 1404,
                "alfa3": ""
            },
            {
                "language": "zh_SG",
                "country": "Chinese - Singapore",
                "isonumeric": 1004,
                "alfa3": "ZHI"
            },
            {
                "language": "zh_TW",
                "country": "Chinese - Taiwan",
                "isonumeric": 404,
                "alfa3": "CHT"
            },
            {
                "language": "zh_CHS",
                "country": "Chinese (Simplified)",
                "isonumeric": 4,
                "alfa3": ""
            },
            {
                "language": "zh_CHT",
                "country": "Chinese (Traditional)",
                "isonumeric": 704,
                "alfa3": ""
            },
            {
                "language": "hr_HR",
                "country": "Croatian - Croatia",
                "isonumeric": 41,
                "alfa3": "HRV"
            },
            {
                "language": "cs_CZ",
                "country": "Czech - Czech Republic",
                "isonumeric": 405,
                "alfa3": "CSY"
            },
            {
                "language": "da_DK",
                "country": "Danish - Denmark",
                "isonumeric": 406,
                "alfa3": "DAN"
            },
            {
                "language": "di_-MV",
                "country": "Dhivehi - Maldives",
                "isonumeric": 465,
                "alfa3": ""
            },
            {
                "language": "nl_BE",
                "country": "Dutch - Belgium",
                "isonumeric": 813,
                "alfa3": "NLB"
            },
            {
                "language": "nl_NL",
                "country": "Dutch - The Netherlands",
                "isonumeric": 413,
                "alfa3": ""
            },
            {
                "language": "en_AU",
                "country": "English - Australia",
                "isonumeric": 9,
                "alfa3": "ENA"
            },
            {
                "language": "en_BZ",
                "country": "English - Belize",
                "isonumeric": 2809,
                "alfa3": "ENL"
            },
            {
                "language": "en_CA",
                "country": "English - Canada",
                "isonumeric": 1009,
                "alfa3": "ENC"
            },
            {
                "language": "en_CB",
                "country": "English - Caribbean",
                "isonumeric": 2409,
                "alfa3": ""
            },
            {
                "language": "en_IE",
                "country": "English - Ireland",
                "isonumeric": 1809,
                "alfa3": "ENI"
            },
            {
                "language": "en_JM",
                "country": "English - Jamaica",
                "isonumeric": 2009,
                "alfa3": "ENJ"
            },
            {
                "language": "en_NZ",
                "country": "English - New Zealand",
                "isonumeric": 1409,
                "alfa3": "ENZ"
            },
            {
                "language": "en_PH",
                "country": "English - Philippines",
                "isonumeric": 3409,
                "alfa3": ""
            },
            {
                "language": "en_ZA",
                "country": "English - South Africa",
                "isonumeric": 109,
                "alfa3": "ENS"
            },
            {
                "language": "en_TT",
                "country": "English - Trinidad and Tobago",
                "isonumeric": 209,
                "alfa3": "ENT"
            },
            {
                "language": "en_GB",
                "country": "English - United Kingdom",
                "isonumeric": 809,
                "alfa3": "ENG"
            },
            {
                "language": "en_US",
                "country": "English - United States",
                "isonumeric": 409,
                "alfa3": "ENU"
            },
            {
                "language": "en_ZW",
                "country": "English - Zimbabwe",
                "isonumeric": 3009,
                "alfa3": ""
            },
            {
                "language": "et_EE",
                "country": "Estonian - Estonia",
                "isonumeric": 425,
                "alfa3": "ETI"
            },
            {
                "language": "fo_FO",
                "country": "Faroese - Faroe Islands",
                "isonumeric": 438,
                "alfa3": "FOS"
            },
            {
                "language": "fa_IR",
                "country": "Farsi - Iran",
                "isonumeric": 429,
                "alfa3": "FAR"
            },
            {
                "language": "fi_FI",
                "country": "Finnish - Finland",
                "isonumeric": 40,
                "alfa3": "FIN"
            },
            {
                "language": "fr_BE",
                "country": "French - Belgium",
                "isonumeric": 80,
                "alfa3": "FRB"
            },
            {
                "language": "fr_CA",
                "country": "French - Canada",
                "isonumeric": 0,
                "alfa3": "FRC"
            },
            {
                "language": "fr_FR",
                "country": "French - France",
                "isonumeric": 40,
                "alfa3": ""
            },
            {
                "language": "fr_LU",
                "country": "French - Luxembourg",
                "isonumeric": 140,
                "alfa3": "FRL"
            },
            {
                "language": "fr_MC",
                "country": "French - Monaco",
                "isonumeric": 180,
                "alfa3": ""
            },
            {
                "language": "fr_CH",
                "country": "French - Switzerland",
                "isonumeric": 100,
                "alfa3": "FRS"
            },
            {
                "language": "gl_ES",
                "country": "Galician - Galician",
                "isonumeric": 456,
                "alfa3": ""
            },
            {
                "language": "ka_GE",
                "country": "Georgian - Georgia",
                "isonumeric": 437,
                "alfa3": ""
            },
            {
                "language": "de_AT",
                "country": "German - Austria",
                "isonumeric": 7,
                "alfa3": "DEA"
            },
            {
                "language": "de_DE",
                "country": "German - Germany",
                "isonumeric": 407,
                "alfa3": ""
            },
            {
                "language": "de_LI",
                "country": "German - Liechtenstein",
                "isonumeric": 1407,
                "alfa3": "DEC"
            },
            {
                "language": "de_LU",
                "country": "German - Luxembourg",
                "isonumeric": 1007,
                "alfa3": "DEL"
            },
            {
                "language": "de_CH",
                "country": "German - Switzerland",
                "isonumeric": 807,
                "alfa3": "DES"
            },
            {
                "language": "el_GR",
                "country": "Greek - Greece",
                "isonumeric": 408,
                "alfa3": "ELL"
            },
            {
                "language": "gu_IN",
                "country": "Gujarati - India",
                "isonumeric": 447,
                "alfa3": ""
            },
            {
                "language": "he_IL",
                "country": "Hebrew - Israel",
                "isonumeric": 40,
                "alfa3": "HEB"
            },
            {
                "language": "hi_IN",
                "country": "Hindi - India",
                "isonumeric": 439,
                "alfa3": "HIN"
            },
            {
                "language": "hu_HU",
                "country": "Hungarian - Hungary",
                "isonumeric": '0040E',
                "alfa3": "HUN"
            },
            {
                "language": "is_IS",
                "country": "Icelandic - Iceland",
                "isonumeric": 40,
                "alfa3": "ISL"
            },
            {
                "language": "id_ID",
                "country": "Indonesian - Indonesia",
                "isonumeric": 421,
                "alfa3": ""
            },
            {
                "language": "it_IT",
                "country": "Italian - Italy",
                "isonumeric": 410,
                "alfa3": ""
            },
            {
                "language": "it_CH",
                "country": "Italian - Switzerland",
                "isonumeric": 810,
                "alfa3": "ITS"
            },
            {
                "language": "ja_JP",
                "country": "Japanese - Japan",
                "isonumeric": 411,
                "alfa3": "JPN"
            },
            {
                "language": "kn_IN",
                "country": "Kannada - India",
                "isonumeric": 44,
                "alfa3": ""
            },
            {
                "language": "kk_KZ",
                "country": "Kazakh - Kazakhstan",
                "isonumeric": 43,
                "alfa3": ""
            },
            {
                "language": "ko_-IN",
                "country": "Konkani - India",
                "isonumeric": 457,
                "alfa3": ""
            },
            {
                "language": "ko_KR",
                "country": "Korean - Korea",
                "isonumeric": 412,
                "alfa3": "KOR"
            },
            {
                "language": "ky_KZ",
                "country": "Kyrgyz - Kazakhstan",
                "isonumeric": 440,
                "alfa3": ""
            },
            {
                "language": "lv_LV",
                "country": "Latvian - Latvia",
                "isonumeric": 426,
                "alfa3": "LVI"
            },
            {
                "language": "lt_LT",
                "country": "Lithuanian - Lithuania",
                "isonumeric": 427,
                "alfa3": "LTH"
            },
            {
                "language": "mk_MK",
                "country": "Macedonian (FYROM)",
                "isonumeric": 42,
                "alfa3": "MKD"
            },
            {
                "language": "ms_BN",
                "country": "Malay - Brunei",
                "isonumeric": '0083E',
                "alfa3": ""
            },
            {
                "language": "ms_MY",
                "country": "Malay - Malaysia",
                "isonumeric": '0043E',
                "alfa3": ""
            },
            {
                "language": "mr_IN",
                "country": "Marathi - India",
                "isonumeric": '0044E',
                "alfa3": ""
            },
            {
                "language": "mn_MN",
                "country": "Mongolian - Mongolia",
                "isonumeric": 450,
                "alfa3": ""
            },
            {
                "language": "nb_NO",
                "country": "Norwegian - Norway",
                "isonumeric": 414,
                "alfa3": ""
            },
            {
                "language": "nn_NO",
                "country": "Norwegian (Nynorsk) - Norway",
                "isonumeric": 814,
                "alfa3": ""
            },
            {
                "language": "pl_PL",
                "country": "Polish - Poland",
                "isonumeric": 415,
                "alfa3": "PLK"
            },
            {
                "language": "pt_BR",
                "country": "Portuguese - Brazil",
                "isonumeric": 416,
                "alfa3": "PTB"
            },
            {
                "language": "pt_PT",
                "country": "Portuguese - Portugal",
                "isonumeric": 816,
                "alfa3": ""
            },
            {
                "language": "pa_IN",
                "country": "Punjabi - India",
                "isonumeric": 446,
                "alfa3": ""
            },
            {
                "language": "ro_RO",
                "country": "Romanian - Romania",
                "isonumeric": 418,
                "alfa3": "ROM"
            },
            {
                "language": "ru_RU",
                "country": "Russian - Russia",
                "isonumeric": 419,
                "alfa3": "RUS"
            },
            {
                "language": "sa_IN",
                "country": "Sanskrit - India",
                "isonumeric": 44,
                "alfa3": ""
            },
            {
                "language": "Cy_sr-SP",
                "country": "Serbian (Cyrillic) - Serbia",
                "isonumeric": 1,
                "alfa3": ""
            },
            {
                "language": "Lt_sr-SP",
                "country": "Serbian (Latin) - Serbia",
                "isonumeric": 81,
                "alfa3": ""
            },
            {
                "language": "sk_SK",
                "country": "Slovak - Slovakia",
                "isonumeric": 41,
                "alfa3": "SKY"
            },
            {
                "language": "sl_SI",
                "country": "Slovenian - Slovenia",
                "isonumeric": 424,
                "alfa3": "SLV"
            },
            {
                "language": "es_AR",
                "country": "Spanish - Argentina",
                "isonumeric": 20,
                "alfa3": "ESS"
            },
            {
                "language": "es_BO",
                "country": "Spanish - Bolivia",
                "isonumeric": 400,
                "alfa3": "ESB"
            },
            {
                "language": "es_CL",
                "country": "Spanish - Chile",
                "isonumeric": 340,
                "alfa3": "ESL"
            },
            {
                "language": "es_CO",
                "country": "Spanish - Colombia",
                "isonumeric": 240,
                "alfa3": "ESO"
            },
            {
                "language": "es_CR",
                "country": "Spanish - Costa Rica",
                "isonumeric": 140,
                "alfa3": "ESC"
            },
            {
                "language": "es_DO",
                "country": "Spanish - Dominican Republic",
                "isonumeric": 10,
                "alfa3": "ESD"
            },
            {
                "language": "es_EC",
                "country": "Spanish - Ecuador",
                "isonumeric": 300,
                "alfa3": "ESF"
            },
            {
                "language": "es_SV",
                "country": "Spanish - El Salvador",
                "isonumeric": 440,
                "alfa3": "ESE"
            },
            {
                "language": "es_GT",
                "country": "Spanish - Guatemala",
                "isonumeric": 100,
                "alfa3": "ESG"
            },
            {
                "language": "es_HN",
                "country": "Spanish - Honduras",
                "isonumeric": 480,
                "alfa3": "ESH"
            },
            {
                "language": "es_MX",
                "country": "Spanish - Mexico",
                "isonumeric": 80,
                "alfa3": "ESM"
            },
            {
                "language": "es_NI",
                "country": "Spanish - Nicaragua",
                "isonumeric": 40,
                "alfa3": "ESI"
            },
            {
                "language": "es_PA",
                "country": "Spanish - Panama",
                "isonumeric": 180,
                "alfa3": "ESA"
            },
            {
                "language": "es_PY",
                "country": "Spanish - Paraguay",
                "isonumeric": 30,
                "alfa3": "ESZ"
            },
            {
                "language": "es_PE",
                "country": "Spanish - Peru",
                "isonumeric": 280,
                "alfa3": "ESR"
            },
            {
                "language": "es_PR",
                "country": "Spanish - Puerto Rico",
                "isonumeric": 500,
                "alfa3": "ES"
            },
            {
                "language": "es_ES",
                "country": "Spanish - Spain",
                "isonumeric": 0,
                "alfa3": ""
            },
            {
                "language": "es_UY",
                "country": "Spanish - Uruguay",
                "isonumeric": 380,
                "alfa3": "ESY"
            },
            {
                "language": "es_VE",
                "country": "Spanish - Venezuela",
                "isonumeric": 200,
                "alfa3": "ESV"
            },
            {
                "language": "sw_KE",
                "country": "Swahili - Kenya",
                "isonumeric": 441,
                "alfa3": ""
            },
            {
                "language": "sv_FI",
                "country": "Swedish - Finland",
                "isonumeric": 81,
                "alfa3": "SVF"
            },
            {
                "language": "sv_SE",
                "country": "Swedish - Sweden",
                "isonumeric": 41,
                "alfa3": ""
            },
            {
                "language": "sy_-SY",
                "country": "Syriac - Syria",
                "isonumeric": 45,
                "alfa3": ""
            },
            {
                "language": "ta_IN",
                "country": "Tamil - India",
                "isonumeric": 449,
                "alfa3": ""
            },
            {
                "language": "tt_RU",
                "country": "Tatar - Russia",
                "isonumeric": 444,
                "alfa3": ""
            },
            {
                "language": "te_IN",
                "country": "Telugu - India",
                "isonumeric": 44,
                "alfa3": ""
            },
            {
                "language": "th_TH",
                "country": "Thai - Thailand",
                "isonumeric": '0041E',
                "alfa3": "THA"
            },
            {
                "language": "tr_TR",
                "country": "Turkish - Turkey",
                "isonumeric": 41,
                "alfa3": "TRK"
            },
            {
                "language": "uk_UA",
                "country": "Ukrainian - Ukraine",
                "isonumeric": 422,
                "alfa3": "UKR"
            },
            {
                "language": "ur_PK",
                "country": "Urdu - Pakistan",
                "isonumeric": 420,
                "alfa3": "URD"
            },
            {
                "language": "Cy_uz-UZ",
                "country": "Uzbek (Cyrillic) - Uzbekistan",
                "isonumeric": 843,
                "alfa3": ""
            },
            {
                "language": "Lt_uz-UZ",
                "country": "Uzbek (Latin) - Uzbekistan",
                "isonumeric": 443,
                "alfa3": ""
            },
            {
                "language": "vi_VN",
                "country": "Vietnamese - Vietnam",
                "isonumeric": 42,
                "alfa3": "VIT"
            }
        ];
        return {
            $get: () => countries
        };
    });
