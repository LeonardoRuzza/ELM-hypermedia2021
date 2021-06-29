<template>
  <!-- The contact form includes the fields for: name, surname, email, country, message.  -->
  <form name="contact_form" action="" method="post">
    <label class="form-label" for="fname"> First Name: </label>
    <input
      id="fname"
      class="form-field"
      name="fname"
      placeholder="Your name.."
      required
    />
    <label class="form-label" for="lname"> Last Name: </label>
    <input
      id="lname"
      class="form-field"
      name="lname"
      placeholder="Your last name.."
      required
    />
    <label class="form-label" for="email"> Email: </label>
    <input
      id="email"
      class="form-field"
      name="email"
      placeholder="Your email.."
      required
    />
    <label class="form-label" for="country">Country</label>
    <select id="countries" name="countries" required>
      <option
        v-for="(item, itemIndex) of countries"
        :key="'footer-item-' + itemIndex"
        :value="item"
      >
        {{ item.name }}
      </option>
      <!-- controllare che il value del selected sia effettivamente il paese selezionato -->
    </select>
    <label class="form-label" for="message"> Message: </label>
    <textarea
      id="message"
      class="form-field"
      name="message"
      placeholder="Write here your message.."
      :value="defaultMessage"
    ></textarea>
    <input class="form-button" type="submit" value="Send Message" />
  </form>
</template>

<script>
export default {
  props: {
    defaultMessage: { type: String, default: () => '' },
  },
  // Set the values to show for the county selection of the form.
  data() {
    return {
      countries: [
        {
          name: 'Afghanistan',
          code: 'AF',
        },
        {
          name: 'Åland Islands',
          code: 'AX',
        },
        {
          name: 'Albania',
          code: 'AL',
        },
        {
          name: 'Algeria',
          code: 'DZ',
        },
        {
          name: 'American Samoa',
          code: 'AS',
        },
        {
          name: 'Andorra',
          code: 'AD',
        },
        {
          name: 'Angola',
          code: 'AO',
        },
        {
          name: 'Anguilla',
          code: 'AI',
        },
        {
          name: 'Antarctica',
          code: 'AQ',
        },
        {
          name: 'Antigua and Barbuda',
          code: 'AG',
        },
        {
          name: 'Argentina',
          code: 'AR',
        },
        {
          name: 'Armenia',
          code: 'AM',
        },
        {
          name: 'Aruba',
          code: 'AW',
        },
        {
          name: 'Australia',
          code: 'AU',
        },
        {
          name: 'Austria',
          code: 'AT',
        },
        {
          name: 'Azerbaijan',
          code: 'AZ',
        },
        {
          name: 'Bahamas',
          code: 'BS',
        },
        {
          name: 'Bahrain',
          code: 'BH',
        },
        {
          name: 'Bangladesh',
          code: 'BD',
        },
        {
          name: 'Barbados',
          code: 'BB',
        },
        {
          name: 'Belarus',
          code: 'BY',
        },
        {
          name: 'Belgium',
          code: 'BE',
        },
        {
          name: 'Belize',
          code: 'BZ',
        },
        {
          name: 'Benin',
          code: 'BJ',
        },
        {
          name: 'Bermuda',
          code: 'BM',
        },
        {
          name: 'Bhutan',
          code: 'BT',
        },
        {
          name: 'Bolivia, Plurinational State of',
          code: 'BO',
        },
        {
          name: 'Bonaire, Sint Eustatius and Saba',
          code: 'BQ',
        },
        {
          name: 'Bosnia and Herzegovina',
          code: 'BA',
        },
        {
          name: 'Botswana',
          code: 'BW',
        },
        {
          name: 'Bouvet Island',
          code: 'BV',
        },
        {
          name: 'Brazil',
          code: 'BR',
        },
        {
          name: 'British Indian Ocean Territory',
          code: 'IO',
        },
        {
          name: 'Brunei Darussalam',
          code: 'BN',
        },
        {
          name: 'Bulgaria',
          code: 'BG',
        },
        {
          name: 'Burkina Faso',
          code: 'BF',
        },
        {
          name: 'Burundi',
          code: 'BI',
        },
        {
          name: 'Cambodia',
          code: 'KH',
        },
        {
          name: 'Cameroon',
          code: 'CM',
        },
        {
          name: 'Canada',
          code: 'CA',
        },
        {
          name: 'Cape Verde',
          code: 'CV',
        },
        {
          name: 'Cayman Islands',
          code: 'KY',
        },
        {
          name: 'Central African Republic',
          code: 'CF',
        },
        {
          name: 'Chad',
          code: 'TD',
        },
        {
          name: 'Chile',
          code: 'CL',
        },
        {
          name: 'China',
          code: 'CN',
        },
        {
          name: 'Christmas Island',
          code: 'CX',
        },
        {
          name: 'Cocos (Keeling) Islands',
          code: 'CC',
        },
        {
          name: 'Colombia',
          code: 'CO',
        },
        {
          name: 'Comoros',
          code: 'KM',
        },
        {
          name: 'Congo',
          code: 'CG',
        },
        {
          name: 'Congo, the Democratic Republic of the',
          code: 'CD',
        },
        {
          name: 'Cook Islands',
          code: 'CK',
        },
        {
          name: 'Costa Rica',
          code: 'CR',
        },
        {
          name: "Côte d'Ivoire",
          code: 'CI',
        },
        {
          name: 'Croatia',
          code: 'HR',
        },
        {
          name: 'Cuba',
          code: 'CU',
        },
        {
          name: 'Curaçao',
          code: 'CW',
        },
        {
          name: 'Cyprus',
          code: 'CY',
        },
        {
          name: 'Czech Republic',
          code: 'CZ',
        },
        {
          name: 'Denmark',
          code: 'DK',
        },
        {
          name: 'Djibouti',
          code: 'DJ',
        },
        {
          name: 'Dominica',
          code: 'DM',
        },
        {
          name: 'Dominican Republic',
          code: 'DO',
        },
        {
          name: 'Ecuador',
          code: 'EC',
        },
        {
          name: 'Egypt',
          code: 'EG',
        },
        {
          name: 'El Salvador',
          code: 'SV',
        },
        {
          name: 'Equatorial Guinea',
          code: 'GQ',
        },
        {
          name: 'Eritrea',
          code: 'ER',
        },
        {
          name: 'Estonia',
          code: 'EE',
        },
        {
          name: 'Ethiopia',
          code: 'ET',
        },
        {
          name: 'Falkland Islands (Malvinas)',
          code: 'FK',
        },
        {
          name: 'Faroe Islands',
          code: 'FO',
        },
        {
          name: 'Fiji',
          code: 'FJ',
        },
        {
          name: 'Finland',
          code: 'FI',
        },
        {
          name: 'France',
          code: 'FR',
        },
        {
          name: 'French Guiana',
          code: 'GF',
        },
        {
          name: 'French Polynesia',
          code: 'PF',
        },
        {
          name: 'French Southern Territories',
          code: 'TF',
        },
        {
          name: 'Gabon',
          code: 'GA',
        },
        {
          name: 'Gambia',
          code: 'GM',
        },
        {
          name: 'Georgia',
          code: 'GE',
        },
        {
          name: 'Germany',
          code: 'DE',
        },
        {
          name: 'Ghana',
          code: 'GH',
        },
        {
          name: 'Gibraltar',
          code: 'GI',
        },
        {
          name: 'Greece',
          code: 'GR',
        },
        {
          name: 'Greenland',
          code: 'GL',
        },
        {
          name: 'Grenada',
          code: 'GD',
        },
        {
          name: 'Guadeloupe',
          code: 'GP',
        },
        {
          name: 'Guam',
          code: 'GU',
        },
        {
          name: 'Guatemala',
          code: 'GT',
        },
        {
          name: 'Guernsey',
          code: 'GG',
        },
        {
          name: 'Guinea',
          code: 'GN',
        },
        {
          name: 'Guinea-Bissau',
          code: 'GW',
        },
        {
          name: 'Guyana',
          code: 'GY',
        },
        {
          name: 'Haiti',
          code: 'HT',
        },
        {
          name: 'Heard Island and McDonald Islands',
          code: 'HM',
        },
        {
          name: 'Holy See (Vatican City State)',
          code: 'VA',
        },
        {
          name: 'Honduras',
          code: 'HN',
        },
        {
          name: 'Hong Kong',
          code: 'HK',
        },
        {
          name: 'Hungary',
          code: 'HU',
        },
        {
          name: 'Iceland',
          code: 'IS',
        },
        {
          name: 'India',
          code: 'IN',
        },
        {
          name: 'Indonesia',
          code: 'ID',
        },
        {
          name: 'Iran, Islamic Republic of',
          code: 'IR',
        },
        {
          name: 'Iraq',
          code: 'IQ',
        },
        {
          name: 'Ireland',
          code: 'IE',
        },
        {
          name: 'Isle of Man',
          code: 'IM',
        },
        {
          name: 'Israel',
          code: 'IL',
        },
        {
          name: 'Italy',
          code: 'IT',
        },
        {
          name: 'Jamaica',
          code: 'JM',
        },
        {
          name: 'Japan',
          code: 'JP',
        },
        {
          name: 'Jersey',
          code: 'JE',
        },
        {
          name: 'Jordan',
          code: 'JO',
        },
        {
          name: 'Kazakhstan',
          code: 'KZ',
        },
        {
          name: 'Kenya',
          code: 'KE',
        },
        {
          name: 'Kiribati',
          code: 'KI',
        },
        {
          name: "Korea, Democratic People's Republic of",
          code: 'KP',
        },
        {
          name: 'Korea, Republic of',
          code: 'KR',
        },
        {
          name: 'Kuwait',
          code: 'KW',
        },
        {
          name: 'Kyrgyzstan',
          code: 'KG',
        },
        {
          name: "Lao People's Democratic Republic",
          code: 'LA',
        },
        {
          name: 'Latvia',
          code: 'LV',
        },
        {
          name: 'Lebanon',
          code: 'LB',
        },
        {
          name: 'Lesotho',
          code: 'LS',
        },
        {
          name: 'Liberia',
          code: 'LR',
        },
        {
          name: 'Libya',
          code: 'LY',
        },
        {
          name: 'Liechtenstein',
          code: 'LI',
        },
        {
          name: 'Lithuania',
          code: 'LT',
        },
        {
          name: 'Luxembourg',
          code: 'LU',
        },
        {
          name: 'Macao',
          code: 'MO',
        },
        {
          name: 'Macedonia, the Former Yugoslav Republic of',
          code: 'MK',
        },
        {
          name: 'Madagascar',
          code: 'MG',
        },
        {
          name: 'Malawi',
          code: 'MW',
        },
        {
          name: 'Malaysia',
          code: 'MY',
        },
        {
          name: 'Maldives',
          code: 'MV',
        },
        {
          name: 'Mali',
          code: 'ML',
        },
        {
          name: 'Malta',
          code: 'MT',
        },
        {
          name: 'Marshall Islands',
          code: 'MH',
        },
        {
          name: 'Martinique',
          code: 'MQ',
        },
        {
          name: 'Mauritania',
          code: 'MR',
        },
        {
          name: 'Mauritius',
          code: 'MU',
        },
        {
          name: 'Mayotte',
          code: 'YT',
        },
        {
          name: 'Mexico',
          code: 'MX',
        },
        {
          name: 'Micronesia, Federated States of',
          code: 'FM',
        },
        {
          name: 'Moldova, Republic of',
          code: 'MD',
        },
        {
          name: 'Monaco',
          code: 'MC',
        },
        {
          name: 'Mongolia',
          code: 'MN',
        },
        {
          name: 'Montenegro',
          code: 'ME',
        },
        {
          name: 'Montserrat',
          code: 'MS',
        },
        {
          name: 'Morocco',
          code: 'MA',
        },
        {
          name: 'Mozambique',
          code: 'MZ',
        },
        {
          name: 'Myanmar',
          code: 'MM',
        },
        {
          name: 'Namibia',
          code: 'NA',
        },
        {
          name: 'Nauru',
          code: 'NR',
        },
        {
          name: 'Nepal',
          code: 'NP',
        },
        {
          name: 'Netherlands',
          code: 'NL',
        },
        {
          name: 'New Caledonia',
          code: 'NC',
        },
        {
          name: 'New Zealand',
          code: 'NZ',
        },
        {
          name: 'Nicaragua',
          code: 'NI',
        },
        {
          name: 'Niger',
          code: 'NE',
        },
        {
          name: 'Nigeria',
          code: 'NG',
        },
        {
          name: 'Niue',
          code: 'NU',
        },
        {
          name: 'Norfolk Island',
          code: 'NF',
        },
        {
          name: 'Northern Mariana Islands',
          code: 'MP',
        },
        {
          name: 'Norway',
          code: 'NO',
        },
        {
          name: 'Oman',
          code: 'OM',
        },
        {
          name: 'Pakistan',
          code: 'PK',
        },
        {
          name: 'Palau',
          code: 'PW',
        },
        {
          name: 'Palestine, State of',
          code: 'PS',
        },
        {
          name: 'Panama',
          code: 'PA',
        },
        {
          name: 'Papua New Guinea',
          code: 'PG',
        },
        {
          name: 'Paraguay',
          code: 'PY',
        },
        {
          name: 'Peru',
          code: 'PE',
        },
        {
          name: 'Philippines',
          code: 'PH',
        },
        {
          name: 'Pitcairn',
          code: 'PN',
        },
        {
          name: 'Poland',
          code: 'PL',
        },
        {
          name: 'Portugal',
          code: 'PT',
        },
        {
          name: 'Puerto Rico',
          code: 'PR',
        },
        {
          name: 'Qatar',
          code: 'QA',
        },
        {
          name: 'Réunion',
          code: 'RE',
        },
        {
          name: 'Romania',
          code: 'RO',
        },
        {
          name: 'Russian Federation',
          code: 'RU',
        },
        {
          name: 'Rwanda',
          code: 'RW',
        },
        {
          name: 'Saint Barthélemy',
          code: 'BL',
        },
        {
          name: 'Saint Helena, Ascension and Tristan da Cunha',
          code: 'SH',
        },
        {
          name: 'Saint Kitts and Nevis',
          code: 'KN',
        },
        {
          name: 'Saint Lucia',
          code: 'LC',
        },
        {
          name: 'Saint Martin (French part)',
          code: 'MF',
        },
        {
          name: 'Saint Pierre and Miquelon',
          code: 'PM',
        },
        {
          name: 'Saint Vincent and the Grenadines',
          code: 'VC',
        },
        {
          name: 'Samoa',
          code: 'WS',
        },
        {
          name: 'San Marino',
          code: 'SM',
        },
        {
          name: 'Sao Tome and Principe',
          code: 'ST',
        },
        {
          name: 'Saudi Arabia',
          code: 'SA',
        },
        {
          name: 'Senegal',
          code: 'SN',
        },
        {
          name: 'Serbia',
          code: 'RS',
        },
        {
          name: 'Seychelles',
          code: 'SC',
        },
        {
          name: 'Sierra Leone',
          code: 'SL',
        },
        {
          name: 'Singapore',
          code: 'SG',
        },
        {
          name: 'Sint Maarten (Dutch part)',
          code: 'SX',
        },
        {
          name: 'Slovakia',
          code: 'SK',
        },
        {
          name: 'Slovenia',
          code: 'SI',
        },
        {
          name: 'Solomon Islands',
          code: 'SB',
        },
        {
          name: 'Somalia',
          code: 'SO',
        },
        {
          name: 'South Africa',
          code: 'ZA',
        },
        {
          name: 'South Georgia and the South Sandwich Islands',
          code: 'GS',
        },
        {
          name: 'South Sudan',
          code: 'SS',
        },
        {
          name: 'Spain',
          code: 'ES',
        },
        {
          name: 'Sri Lanka',
          code: 'LK',
        },
        {
          name: 'Sudan',
          code: 'SD',
        },
        {
          name: 'Suriname',
          code: 'SR',
        },
        {
          name: 'Svalbard and Jan Mayen',
          code: 'SJ',
        },
        {
          name: 'Swaziland',
          code: 'SZ',
        },
        {
          name: 'Sweden',
          code: 'SE',
        },
        {
          name: 'Switzerland',
          code: 'CH',
        },
        {
          name: 'Syrian Arab Republic',
          code: 'SY',
        },
        {
          name: 'Taiwan, Province of China',
          code: 'TW',
        },
        {
          name: 'Tajikistan',
          code: 'TJ',
        },
        {
          name: 'Tanzania, United Republic of',
          code: 'TZ',
        },
        {
          name: 'Thailand',
          code: 'TH',
        },
        {
          name: 'Timor-Leste',
          code: 'TL',
        },
        {
          name: 'Togo',
          code: 'TG',
        },
        {
          name: 'Tokelau',
          code: 'TK',
        },
        {
          name: 'Tonga',
          code: 'TO',
        },
        {
          name: 'Trinidad and Tobago',
          code: 'TT',
        },
        {
          name: 'Tunisia',
          code: 'TN',
        },
        {
          name: 'Turkey',
          code: 'TR',
        },
        {
          name: 'Turkmenistan',
          code: 'TM',
        },
        {
          name: 'Turks and Caicos Islands',
          code: 'TC',
        },
        {
          name: 'Tuvalu',
          code: 'TV',
        },
        {
          name: 'Uganda',
          code: 'UG',
        },
        {
          name: 'Ukraine',
          code: 'UA',
        },
        {
          name: 'United Arab Emirates',
          code: 'AE',
        },
        {
          name: 'United Kingdom',
          code: 'GB',
        },
        {
          name: 'United States',
          code: 'US',
        },
        {
          name: 'United States Minor Outlying Islands',
          code: 'UM',
        },
        {
          name: 'Uruguay',
          code: 'UY',
        },
        {
          name: 'Uzbekistan',
          code: 'UZ',
        },
        {
          name: 'Vanuatu',
          code: 'VU',
        },
        {
          name: 'Venezuela, Bolivarian Republic of',
          code: 'VE',
        },
        {
          name: 'Viet Nam',
          code: 'VN',
        },
        {
          name: 'Virgin Islands, British',
          code: 'VG',
        },
        {
          name: 'Virgin Islands, U.S.',
          code: 'VI',
        },
        {
          name: 'Wallis and Futuna',
          code: 'WF',
        },
        {
          name: 'Western Sahara',
          code: 'EH',
        },
        {
          name: 'Yemen',
          code: 'YE',
        },
        {
          name: 'Zambia',
          code: 'ZM',
        },
        {
          name: 'Zimbabwe',
          code: 'ZW',
        },
      ],
    }
  },
}
</script>

<style scoped>
form {
  padding: 12px 20px 12px 20px;
  margin: 8px 10px 8px 10px;
  border: 5px solid black;
  border-radius: 1.7rem;
  -moz-box-shadow: 2px 2px 6px #888;
  -webkit-box-shadow: 2px 2px 6px #888;
  box-shadow: 2px 2px 6px #888;
}
.form-label {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
  display: block;
  color: white;
  background-color: #26272b;
  -moz-box-shadow: 2px 2px 6px orange;
  -webkit-box-shadow: 2px 2px 6px orange;
  box-shadow: 2px 2px 6px orange;
  border: 1px solid orange;
  border-radius: 1.7rem;
}
.form-field,
#countries {
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 25px;
  width: 100%;
  display: block;
}
input[type='text'],
select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 1.7rem;
  box-sizing: border-box;
}

input[type='submit'] {
  width: 100%;
  margin-right: 10px;
  margin-left: 10px;
  margin-bottom: 15px;
  background-color: grey;
  color: black;
  padding: 14px 20px;
  border: 1px solid orange;
  border-radius: 1.7rem;
  cursor: pointer;
  -moz-box-shadow: 2px 2px 6px #888;
  -webkit-box-shadow: 2px 2px 6px #888;
  box-shadow: 2px 2px 6px #888;
}

input[type='submit']:hover {
  background-color: orange;
  color: black;
}

#message {
  width: 100%;
  height: 100%;
}
</style>
