export type TArtist = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: string
}

export type TEvent = {
    id: string,
    name: string,
    price: number,
    description: string, 
    place: string,
    date: string,
    image_url: string,
    artist: string
}