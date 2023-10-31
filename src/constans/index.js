import images from './images'
import theme, { COLORS, SIZES, FONTS } from './theme'

export { images, theme, COLORS, SIZES, FONTS }

export const imagesDataURL = [
    'https://i.ibb.co/B4y9pcb/test.jpg'
]

export const cabangOlahraga = [
    {
        title: 'Badminton',
        image: require('../../assets/dummy/badminton.png')
    },
    {
        title: 'Futsal',
        image: require('../../assets/dummy/futsal.png')
    },
    {
        title: 'Mini-Soccer',
        image: require('../../assets/dummy/mini-soccer.png')
    }
]

export const sortCategoryData = ['All', 'Belanja', 'Badminton', 'Futsal', 'Mini Soccer'];

export const categoriesData = [
    {
        title: 'Ocean',
        image: require('../../assets/dummy/ocean.png')
    },
    {
        title: 'Mountain',
        image: require('../../assets/dummy/mountain.png')
    },
    {
        title: 'Camp',
        image: require('../../assets/dummy/camp.png')
    },
    {
        title: 'Sunset',
        image: require('../../assets/dummy/sunset.png')
    },
    {
        title: 'Hiking',
        image: require('../../assets/dummy/hiking.png')
    },
    {
        title: 'Beach',
        image: require('../../assets/dummy/beach.png')
    },
    {
        title: 'Forest',
        image: require('../../assets/dummy/forest.png')
    },   
]

export const Lapangan = [
    {
        title: 'Osaka Castle',
        duration: '12 Days',
        distance: '400 KM',
        weather: '20 C',
        price: 1200,
        shortDescription: "Osaka Castle is a Japanese castle in Chūō-ku, Osaka, Japan. The castle is one of Japan's most famous landmarks.",
        longDescription: "Osaka Castle is a Japanese castle in Chūō-ku, Osaka, Japan. The castle is one of Japan's most famous landmarks and it played a major role in the unification of Japan during the sixteenth century of the Azuchi-Momoyama period.",
        image: require('../../assets/dummy/beach.png')
    },
    {
        title: 'Island Itsukushima Shrine',
        duration: '7 Days',
        distance: '450 KM',
        weather: '30 C',
        price: 3000,
        shortDescription: "The Itsukushima shrine is one of Japan's most popular tourist attractions.",
        longDescription: "Itsukushima Shrine is a Shinto shrine on the island of Itsukushima, best known for its 'floating' torii gate. It is in the city of Hatsukaichi in Hiroshima Prefecture in Japan, accessible from the mainland by ferry at Miyajimaguchi Station.",
        image: require('../../assets/dummy/hiking.png')
    },
    
    {
        title: 'Babusar Top',
        duration: '5 Days',
        distance: '299 KM',
        weather: '14 C',
        price: 1000,
        shortDescription: "Babusar Top is a mountain pass in Pakistan at the north of the 150 km long in beautiful Kaghan Valley",
        longDescription: "Babusar Pass or Babusar Top is a mountain pass in Pakistan at the north of the 150 km long Kaghan Valley, connecting it via the Thak Nala with Chilas on the Karakoram Highway. It is the highest point in Kaghan Valley that can be easily accessed by cars.",
        image: require('../../assets/dummy/camp.png')
    },
    {
        title: 'Todaiji Temple',
        duration: '20 Days',
        distance: '604 KM',
        weather: '34 C',
        price: 400,
        shortDescription: "Todaiji is one of Japan's most famous and significant temples and a landmark of Nara.",
        longDescription: "Tōdai-ji is a Buddhist temple complex that was once one of the powerful Seven Great Temples, located in the city of Nara, Japan. Though it was originally founded in the year 738 CE, Tōdai-ji was not opened until the year 752 CE.",
        image: require('../../assets/dummy/forest.png')
    },
]

export const Company = [
    {
        title: 'Osaka Castle',
        rating: '12',
        place: 'Batam',
        jalan: 'jl. Pemuda',
        jarak: '1 KM',
        jenis: 'Futsal',
        price: 1200,
        operasional: "13.00 - 20.00 && 10.00 - 23.00",
        longDescription: "Osaka Castle is a Japanese castle in Chūō-ku, Osaka, Japan. The castle is one of Japan's most famous landmarks and it played a major role in the unification of Japan during the sixteenth century of the Azuchi-Momoyama period.",
        image: require('../../assets/dummy/mountain.png'),
        fasilitas: "wifi, mosque, parking, toilet, shopping-bag"
    },
    {
        title: 'Island Itsukushima Shrine',
        rating: '7',
        place: 'Batam',
        jalan: 'jl. Pemuda',
        jarak: '1 KM',
        jenis: 'Badminton',
        price: 3000,
        operasional: "10.00 - 20.00",
        longDescription: "Itsukushima Shrine is a Shinto shrine on the island of Itsukushima, best known for its 'floating' torii gate. It is in the city of Hatsukaichi in Hiroshima Prefecture in Japan, accessible from the mainland by ferry at Miyajimaguchi Station.",
        image: require('../../assets/dummy/sunset.png'),
        fasilitas: "mosque, parking, toilet, shopping-bag"
    },
    
    {
        title: 'Babusar Top',
        rating: '5',
        place: 'Batam',
        jalan: 'jl. Pemuda',
        jarak: '1 KM',
        jenis: 'Futsal',
        price: 1000,
        operasional: "10.00 - 20.00",
        longDescription: "Babusar Pass or Babusar Top is a mountain pass in Pakistan at the north of the 150 km long Kaghan Valley, connecting it via the Thak Nala with Chilas on the Karakoram Highway. It is the highest point in Kaghan Valley that can be easily accessed by cars.",
        image: require('../../assets/dummy/ocean.png'),
        fasilitas: "wifi, mosque, parking, toilet"
    },
    {
        title: 'Todaiji Temple',
        rating: '20',
        place: 'Batam',
        jalan: 'jl. Pemuda',
        jarak: '1 KM',
        jenis: 'Badminton',
        price: 400,
        operasional: "13.00 - 20.00 && 10.00 - 22.00",
        longDescription: "Tōdai-ji is a Buddhist temple complex that was once one of the powerful Seven Great Temples, located in the city of Nara, Japan. Though it was originally founded in the year 738 CE, Tōdai-ji was not opened until the year 752 CE.",
        image: require('../../assets/dummy/forest.png'),
        fasilitas: "wifi, mosque, parking, toilet, shopping-bag"
    },
]

export const Price = [
    {
        Jam: '08.00-09.00',
        price: 100000,
    },
    {
        Jam: '10.00-11.00',
        price: 100000,
    },
    {
        Jam: '12.00-13.00',
        price: 100000,
        status: 'booked'
    },
    {
        Jam: '14.00-15.00',
        price: 100000,
    },
    {
        Jam: '16.00-17.00',
        price: 100000,
        status: 'booked'
    },
    {
        Jam: '18.00-20.00',
        price: 100000,
    },
    {
        Jam: '21.00-22.00',
        price: 100000,
    },
    {
        Jam: '23.00-24.00',
        price: 100000,
        status: 'booked'
    },
]
export const Ddigital = [
    {
        image : require('../../assets/imp/PayMethode/dana.png'),
        title : 'Dana',
        Nomor : 87654356271,
    },
    {
        image : require('../../assets/imp/PayMethode/gopay.png'),
        title : 'Gopay',
        Nomor : 87654356271,
    }
]
export const Bni = [
    {
        title : 'Bni',
        Nomor : 87654356271,
    }
]
export const Bri = [
    {
        title : 'Bri',
        Nomor : 87654356271,
    }
]
export const Mandiri = [
    {
        title : 'Mandiri',
        Nomor : 87654356271,
    }
]