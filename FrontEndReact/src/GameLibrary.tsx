import { useState } from "react";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Search, User, Star } from "lucide-react";


const games = [
    { id: 1, title: "Elden Ring", genre: "RPG", rating: 9.5, cover: "https://placehold.co/300x400?text=Elden+Ring" },
    { id: 2, title: "Cyberpunk 2077", genre: "Action", rating: 8.2, cover: "https://placehold.co/300x400?text=Cyberpunk" },
    { id: 3, title: "Hades", genre: "Roguelike", rating: 9.0, cover: "https://placehold.co/300x400?text=Hades" },
    { id: 4, title: "The Witcher 3", genre: "RPG", rating: 9.7, cover: "https://placehold.co/300x400?text=Witcher+3" },
];

export default function GameLibrary() {
    const [search, setSearch] = useState("");


    const filteredGames = games.filter((g) =>
        g.title.toLowerCase().includes(search.toLowerCase())
    );


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-white shadow">
                <h1 className="text-2xl font-bold">🎮 My Game Library</h1>
                <div className="flex items-center gap-2">
                    <div className="relative w-64">
                        <Input
                            placeholder="Search games..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                    <Button variant="ghost">
                        <User className="h-6 w-6" />
                    </Button>
                </div>
            </header>


            {/* Game Grid */}
            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {filteredGames.map((game) => (
                    <Card key={game.id} className="overflow-hidden shadow-lg">
                        <img src={game.cover} alt={game.title} className="w-full h-48 object-cover" />
                        <CardContent className="p-4">
                            <h2 className="text-lg font-semibold">{game.title}</h2>
                            <p className="text-sm text-gray-600">{game.genre}</p>
                            <div className="flex items-center gap-1 mt-2 text-yellow-500">
                                <Star className="h-4 w-4 fill-yellow-500" />
                                <span>{game.rating}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </main>
        </div>
    );
}