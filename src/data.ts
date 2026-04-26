export interface Place {
  id: string;
  name: string;
  category: string;
  district: string;
  description: string;
  latitude: number;
  longitude: number;
  hours?: string;
}

export const places: Place[] = [
  { id: "haci-bekir", name: "Ali Muhiddin Hacı Bekir", category: "Şekerleme", district: "Fatih", description: "1777 yılında kurulan, Osmanlı sarayının baş şekercisi.", latitude: 41.0165, longitude: 28.9740, hours: "09:00 - 20:00" },
  { id: "vefa-bozacisi", name: "Vefa Bozacısı", category: "İçecek / Tarihi", district: "Fatih", description: "1876'dan beri aynı dükkanda hizmet veren tarihi bozacı.", latitude: 41.0158, longitude: 28.9594, hours: "08:30 - 23:00" },
  { id: "altan-sekerleme", name: "Altan Şekerleme", category: "Şekerleme", district: "Fatih", description: "1865 yılından beri akide şekeri ve lokum üreten nostaljik esnaf.", latitude: 41.0195, longitude: 28.9669, hours: "09:00 - 19:30" },
  { id: "pandeli-restoran", name: "Pandeli Restoran", category: "Restoran", district: "Fatih", description: "Mısır Çarşısı'nın girişinde kurulan mavi çinili ikonik mekan.", latitude: 41.0164, longitude: 28.9710, hours: "11:30 - 19:00" },
  { id: "sultanahmet-koftecisi", name: "Tarihi Sultanahmet Köftecisi", category: "Köfteci", district: "Fatih", description: "1920'den beri aynı lezzeti koruyan tarihi köfteci.", latitude: 41.0079, longitude: 28.9774, hours: "10:30 - 23:00" },
  { id: "agora-meyhanesi", name: "Agora Meyhanesi", category: "Meyhane", district: "Fatih", description: "1890'da kurulan, şarkılara konu olmuş Balat efsanesi.", latitude: 41.0336, longitude: 28.9482, hours: "12:00 - 01:00" },
  { id: "haci-abdullah", name: "Hacı Abdullah Lokantası", category: "Esnaf Lokantası", district: "Beyoğlu", description: "1888'den günümüze gelen asırlık Osmanlı mutfağı.", latitude: 41.0357, longitude: 28.9818, hours: "11:30 - 23:00" },
  { id: "inci-pastanesi", name: "İnci Pastanesi", category: "Pastane", district: "Beyoğlu", description: "Türkiye'yi Profiterol tatlısı ile tanıştıran efsanevi pastane.", latitude: 41.0354, longitude: 28.9802, hours: "09:00 - 22:00" },
  { id: "karakoy-gulluoglu", name: "Karaköy Güllüoğlu", category: "Tatlıcı", district: "Beyoğlu", description: "İstanbul'un en ikonik baklavacısı haline gelen tarihi mekan.", latitude: 41.0232, longitude: 28.9778, hours: "07:00 - 01:00" },
  { id: "asri-tursucu", name: "Asri Turşucu", category: "Turşucu", district: "Beyoğlu", description: "1913'ten beri Cihangir'in meşhur turşucusu.", latitude: 41.0312, longitude: 28.9818, hours: "09:00 - 20:00" },
  { id: "rejans", name: "1924 İstanbul (Rejans)", category: "Restoran", district: "Beyoğlu", description: "Atatürk'ün masasının hala durduğu tarihi Rus restoranı.", latitude: 41.0323, longitude: 28.9768, hours: "12:00 - 01:00" },
  { id: "saray-muhallebicisi", name: "Saray Muhallebicisi", category: "Tatlıcı", district: "Beyoğlu", description: "1935'ten beri İstiklal'in klasik sütlü tatlıcı durağı.", latitude: 41.0351, longitude: 28.9806, hours: "07:00 - 01:00" },
  { id: "namli-gurme", name: "Namlı Gurme", category: "Şarküteri", district: "Beyoğlu", description: "1929'dan beri Karaköy'ün kahvaltı ve şarküteri devi.", latitude: 41.0238, longitude: 28.9765, hours: "07:00 - 22:00" },
  { id: "sekerci-cafer-erol", name: "Şekerci Cafer Erol", category: "Şekerleme", district: "Kadıköy", description: "1807'den beri Kadıköy Meydanı'ndaki asırlık şekerci.", latitude: 40.9897, longitude: 29.0255, hours: "09:00 - 22:00" },
  { id: "baylan-pastanesi", name: "Baylan Pastanesi", category: "Pastane", district: "Kadıköy", description: "1923 yılında kurulan ve Kup Griye'yi icat eden kült pastane.", latitude: 40.9882, longitude: 29.0238, hours: "07:00 - 22:00" },
  { id: "yanyali-fehmi", name: "Yanyalı Fehmi Lokantası", category: "Esnaf Lokantası", district: "Kadıköy", description: "1919'da kurulan, Yanya köftesiyle ünlü tarihi lokanta.", latitude: 40.9904, longitude: 29.0241, hours: "11:00 - 22:00" },
  { id: "beyaz-firin", name: "Beyaz Fırın", category: "Fırın / Pastane", district: "Kadıköy", description: "1836'dan beri iki asırlık bir İstanbul klasiği.", latitude: 40.9898, longitude: 29.0261, hours: "07:00 - 22:00" },
  { id: "kanaat-lokantasi", name: "Kanaat Lokantası", category: "Esnaf Lokantası", district: "Üsküdar", description: "1933'ten beri tencere yemeklerini yaşatan tarihi lokanta.", latitude: 41.0267, longitude: 29.0152, hours: "11:00 - 22:00" },
  { id: "kuzguncuk-firini", name: "Tarihi Kuzguncuk Fırını", category: "Fırın / Pastane", district: "Üsküdar", description: "Mahalle kültürünün simgesi, meşhur acıbadem fırını.", latitude: 41.0348, longitude: 29.0305, hours: "07:00 - 21:00" },
  { id: "kisikli-fasulyecisi", name: "Tarihi Kısıklı Kuru Fasulyecisi", category: "Restoran", district: "Üsküdar", description: "1938'den beri bakır kazanlarda pişen meşhur fasulye.", latitude: 41.0258, longitude: 29.0682, hours: "11:30 - 21:00" },
  { id: "ismet-baba", name: "İsmet Baba Restaurant", category: "Balıkçı / Meyhane", district: "Üsküdar", description: "1951'den beri Kuzguncuk'un simge sahil balıkçısı.", latitude: 41.0360, longitude: 29.0309, hours: "12:00 - 23:30" },
  { id: "sariyer-borekcisi", name: "Tarihi Sarıyer Börekçisi", category: "Börekçi", district: "Sarıyer", description: "1895'te kurulan orijinal Sarıyer böreğinin adresi.", latitude: 41.1685, longitude: 29.0558, hours: "06:00 - 20:00" },
  { id: "kirecburnu-firini", name: "Tarihi Kireçburnu Fırını", category: "Fırın", district: "Sarıyer", description: "1928'de kurulan Boğaz'ın simge fırınlarından biri.", latitude: 41.1448, longitude: 29.0519, hours: "06:30 - 22:00" },
  { id: "ali-baba-balik", name: "Tarihi Ali Baba Balık Lokantası", category: "Restoran", district: "Sarıyer", description: "1920'den beri taze mevsim balıkları sunan balıkçı.", latitude: 41.1469, longitude: 29.0560, hours: "12:00 - 23:00" },
  { id: "hasan-pasa-firini", name: "Yedi Sekiz Hasan Paşa Fırını", category: "Fırın", district: "Beşiktaş", description: "1880 kuruluşu meşhur acıbadem ve galeta fırını.", latitude: 41.0432, longitude: 29.0062, hours: "07:00 - 20:00" },
  { id: "bebek-badem-ezmecisi", name: "Bebek Badem Ezmecisi", category: "Şekerleme", district: "Beşiktaş", description: "1904'ten beri el yapımı badem ezmesi üreten dükkan.", latitude: 41.0772, longitude: 29.0435, hours: "09:00 - 19:00" },
  { id: "soydan-tursulari", name: "Soydan Turşuları", category: "Turşucu", district: "Beşiktaş", description: "1935'ten beri Beşiktaş çarşısının efsanevi turşucusu.", latitude: 41.0435, longitude: 29.0051, hours: "09:00 - 20:00" },
  { id: "kanlica-yogurtcusu", name: "Kanlıca İsmailağa Yoğurtçusu", category: "Tatlıcı", district: "Beykoz", description: "1893'ten beri meşhur Kanlıca yoğurdu geleneği.", latitude: 41.1011, longitude: 29.0652, hours: "08:00 - 23:00" },
  { id: "beykoz-pacacisi", name: "Tarihi Beykoz Paçacısı", category: "Esnaf Lokantası", district: "Beykoz", description: "1950'lerden beri şifa niyetine hazırlanan çorbalar.", latitude: 41.1340, longitude: 29.0910, hours: "07:00 - 22:00" },
  { id: "doganay-balik", name: "Doğanay Balık Lokantası", category: "Restoran", district: "Beykoz", description: "Anadolu Kavağı'nın en eski balık duraklarından.", latitude: 41.1736, longitude: 29.0886, hours: "11:00 - 22:00" },
  { id: "eyup-guveccisi", name: "Tarihi Eyüp Sultan Güveççisi", category: "Esnaf Lokantası", district: "Eyüpsultan", description: "1856'dan beri taş fırında pişen meşhur güveç.", latitude: 41.0475, longitude: 28.9348, hours: "08:00 - 19:00" },
  { id: "pierre-loti", name: "Pierre Loti Kahvehanesi", category: "Kahveci", district: "Eyüpsultan", description: "Efsanevi Haliç manzarasına karşı asırlık kahve keyfi.", latitude: 41.0531, longitude: 28.9341, hours: "08:30 - 23:00" },
  { id: "omur-restoran", name: "Ömür Restoran", category: "Restoran", district: "Bakırköy", description: "1937'de kurulan İstanbul'un köklü restoranlarından.", latitude: 40.9934, longitude: 28.8732, hours: "10:00 - 22:00" },
  { id: "roma-dondurmacisi", name: "Tarihi Roma Dondurmacısı", category: "Dondurmacı", district: "Bakırköy", description: "Yeşilköy'ün nostaljik ve asırlık dondurma durağı.", latitude: 40.9575, longitude: 28.8242, hours: "10:00 - 00:00" },
  { id: "buyukada-pastanesi", name: "Büyükada Pastanesi", category: "Pastane", district: "Adalar", description: "1935'ten beri Büyükada'nın milföy ve kurabiye durağı.", latitude: 40.8712, longitude: 29.1298, hours: "08:00 - 21:00" },
  { id: "prinkipo-dondurmacisi", name: "Prinkipo Dondurmacısı", category: "Dondurmacı", district: "Adalar", description: "1920'lerden beri Büyükada'nın klasik lezzeti.", latitude: 40.8730, longitude: 29.1290, hours: "10:00 - 00:00" },
  { id: "kalpazankaya", name: "Kalpazankaya Restoran", category: "Restoran", district: "Adalar", description: "1959'da Burgazada'da kurulan kuyu kebabı efsanesi.", latitude: 40.8788, longitude: 29.0551, hours: "12:00 - 23:00" },
  { id: "despina-meyhanesi", name: "Despina Meyhanesi", category: "Meyhane", district: "Şişli", description: "1946'da Madam Despina tarafından kurulan tarihi mekan.", latitude: 41.0494, longitude: 28.9806, hours: "18:00 - 01:00" },
  { id: "apik-iskembe", name: "Apik İşkembe", category: "Çorbacı", district: "Şişli", description: "1947'den beri Bomonti'nin meşhur çorbacısı.", latitude: 41.0553, longitude: 28.9822, hours: "24 Saat Açık" },
  { id: "hunkar", name: "Hünkar Lokantası", category: "Esnaf Lokantası", district: "Şişli", description: "1950'den beri Nişantaşı'nda saray lezzetleri sunan mekan.", latitude: 41.0505, longitude: 28.9926, hours: "12:00 - 22:30" }
];