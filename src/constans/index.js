import images from './images'
import theme, { COLORS, SIZES, FONTS } from './theme'
import Api from './Api'

export { images, theme, COLORS, SIZES, FONTS, Api }

export const imagesDataURL = [
    'https://i.ibb.co/B4y9pcb/test.jpg'
]

export const Storage = {
    Storage : 'https://sportscamp.my.id/storage/'
}

export const cabangOlahraga = [
    {
        title: 'Bulu Tangkis',
        image: require('../../assets/dummy/badminton.png')
    },
    {
        title: 'Futsal',
        image: require('../../assets/dummy/futsal.png')
    },
    {
        title: 'Mini Soccer',
        image: require('../../assets/dummy/mini-soccer.png')
    }
]

export const sortCategoryData = ['All', 'Belanja', 'Badminton', 'Futsal', 'Mini Soccer'];

export const jenisRiwayat = ['draft', 'pending' , 'berhasil', 'gagal']

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

export const TransferBank = [
    {
        image : require('../../assets/imp/PayMethode/Bni.jpg'),
        title: 'Bni',
        Nomor: 5678345634
    },
    {
        image : require('../../assets/imp/PayMethode/bri.png'),
        title: 'Bri',
        Nomor: 123456435
    },
    {
        image : require('../../assets/imp/PayMethode/mandiri.png'),
        title: 'Mandiri',
        Nomor: 2345676543
    }
]
