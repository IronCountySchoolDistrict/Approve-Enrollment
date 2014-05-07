
#coding: utf8
import re
p = re.compile(r'\w{3}\s{1}(.*)')
str = """ACE Achinese (Aceh)
ACH Acoli
AFR Afrikaans
ALB Albanian
ASE American Sign Language
AMH Amharic
APA Apache
ARA Arabic
ARP Arapaho
ARM Armenian
AII Assyrian Neo-Aramaic
BAQ Basque
BEN Bengali
BOS Bosnian
BUL Bulgarian
BUR Burmese
KHM Cambodian (Khmer)
YUE Cantonese
CEB Cebuano - Philippines
QUC Central Quiché
CHA Chamorro
CHR Cherokee
CHW Chichewa
CHI Chinese (other than Cantonese or Mandarin)
CHK Chuukese (Trukese)
CPE Creole English-based (other than Tok Pisin)
CPF Creole French-based (other than Haitian)
CPP Creole Portuguese-based
SCR Croatian
CUS Cushitic
CZE Czech
DAN Danish
PRS Dari (Eastern Farsi)
DIN Dinka
DUT Dutch (Flemish)
EFI Efik (Riverain Ibibio)
ENG English 
XEA Eskimo-Aleut
FIJ Fijian
FIL Filipino (Pilipino)
FIN Finnish
FRE French
GAR Ga-Rankuwa
GBA Gbaya
GEO Georgian
GER German
GKN Gokana
XGO Goshute
GRV Grebo (Globo)
GRE Greek
GUJ Gujarati
HAT HaitianHAU Hausa
HAW Hawaiian
HEB Hebrew
HIN Hindi
HMN Hmong
HOP Hopi
HUN Hungarian
IBA Iban
ISL Icelandic
IBO Igbo (Ibo)
IND Indonesia
ITA Italian
JPN Japanese
KEO Kakwa
KAN Kannada
KNU Kanuma
KAR Karen
KOR Korean
KRW Krahn
KRO Kru
KUR Kurdish
LAO Lao
LIN Lingala
LIT Lithuanian
LOZ Lozi
YMM Maay (Maimai, Rahanween)
MAB Mabaan (Southern Burun)
MAC Macedonian
MHI Madi
MAL Malagasy
MAY Malay
CMN Mandarin
MAN Mandingo
MAO Maori
MAR Marathi
MAH Marshallese
MON Mongolian
MRL Mortlockese
XMA Mushungulu
NAV Navajo
NEP Nepali
SBA Ngambay
NAI North American Indian (other than any listed separately)
NOR Norwegian
NUB Nubian
NUS Nuer
XPI Paiute
PAU Palauan
PAP Papiamento
PER Persian (Farsi)
PGP Pingelapese
PON Pohnpeian
POL Polish
POR Portuguese
PAN Punjabi
PUS Pushto (Pashto)
RUM Romanian
RNG Ronga
RUN Rundi (Kirundi, Urundi)
RUS Russian
SMO Samoan
SCC Serbian
XSR Sherpa
SHH Shoshone
SND Sindi
SIN Sinhalese
SIO Siouan (Sioux)
SLK Slovak
SLV Slovenian
SOM Somali
SPA Spanish
SWA Swahili
SWE Swedish
GSW Swiss German
TGL Tagalog
TAH Tahitian
TAM Tamil
TEL Telugu
THA Thai
TIB Tibetan
TIR Tigrigna (Tigrinya)
OOD Tohono O'odham (Papago)
TPI Tok Pisin
TON Tongan
TUR Turkish
UDU Uduk (Twampa)
UKR Ukrainian
URD Urdu
UTE Ute
VAI Vai
VIE Vietnamese
WEL Welsh
PES Western Farsi
WOL Wolof (Gambian)
YAP Yapese
YOR Yoruba
ZUL Zulu
ZUN ZuniNote"""
 
matches = p.findall(str)
for match in matches:
	print '<option value="' + match + '">' + match + '</option>'
