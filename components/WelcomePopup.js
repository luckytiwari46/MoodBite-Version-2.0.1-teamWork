import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ALL_IMAGES = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQt3y8HA3PzGvfczlTw4BUFYXetN5F--BU4w&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpJ0Z8Wqp4V9ugpE7ks0OC6KNO-qekAc9R-A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXoma1rg-tQ9sMRkfdCU-k5iHhPI15WK6Y3RXKUj_QCQ&s",
    "https://photos.smugmug.com/Asia/India/i-Pf4hCQr/0/d3d38770/X2/indian-food-dosa-X2.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3EPCkEtsg2MvpCXj_alUWEAiEtL_W0uHUNg&s",
    "https://cdn.prod.website-files.com/64931d2aee18510b47f4bb1f/64d26739f645999c3c34ffb3_6-Must-Have-Indian-Dishes-That-Everyone-Should-Try-Blog-Cover.jpeg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZEdcy591GRbwHuiTAZZRPCQ3jHwhBmPAWfw&s"
];

const ALL_EMOJIS = [
    "https://emojiisland.com/cdn/shop/products/Smiling_Face_Emoji_large.png?v=1571606036",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQlWw7ESNqJsUpcIkqXPXoKCa2iY9InOG00A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-WzvaVMq4sjCPhpbW4DjVPJcZmSZJ1mYVfw&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpltXDN-Iy4Z-Nc61tVeobqRU8biNiyD3VjA&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3QhOLvR3_sX144Hz0KvVJOdxzqq0XSM-yWg&s",
    "https://cdn-icons-png.flaticon.com/512/1094/1094328.png"
];

export default function WelcomePopup({ isOpen, onClose }) {
    const [bgImages, setBgImages] = useState([]);
    const [bgEmojis, setBgEmojis] = useState([]);

    useEffect(() => {
        if (isOpen) {
            // Pick 5 random, unique food images
            const shuffledImages = [...ALL_IMAGES].sort(() => 0.5 - Math.random());
            setBgImages(shuffledImages.slice(0, 5));

            // Pick 4 random, unique emojis
            const shuffledEmojis = [...ALL_EMOJIS].sort(() => 0.5 - Math.random());
            setBgEmojis(shuffledEmojis.slice(0, 4));
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 overflow-hidden"
                >
                    {/* BACKGROUND FIXED FOOD IMAGES - COMPLETELY STATIC OVERRIDE */}
                    {bgImages.map((src, index) => {
                        const positions = [
                            { top: "8%", left: "8%", width: "18vw", height: "18vw" },        // top-left
                            { top: "8%", right: "8%", width: "20vw", height: "20vw" },       // top-right
                            { top: "40%", left: "4%", width: "16vw", height: "16vw" },       // middle-left
                            { top: "40%", right: "4%", width: "22vw", height: "22vw" },      // middle-right
                            { bottom: "8%", left: "40%", width: "18vw", height: "18vw" },    // bottom-center
                        ];
                        
                        const pos = positions[index] || positions[0];

                        return (
                            <img
                                key={`food-${index}`}
                                src={src}
                                alt="Food dish background"
                                style={{
                                    position: 'absolute',
                                    borderRadius: '1.5rem',
                                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
                                    objectFit: 'cover',
                                    zIndex: 0,
                                    ...pos
                                }}
                                className="pointer-events-none opacity-80"
                            />
                        );
                    })}

                    {/* FIXED EMOJI IMAGES */}
                    {bgEmojis.map((src, index) => {
                        const emojiPositions = [
                            { top: "15%", left: "40%", width: "6vw", height: "6vw" },
                            { bottom: "15%", right: "25%", width: "7vw", height: "7vw" },
                            { top: "25%", right: "25%", width: "5vw", height: "5vw" },
                            { bottom: "35%", left: "20%", width: "8vw", height: "8vw" },
                        ];
                        
                        const pos = emojiPositions[index] || emojiPositions[0];

                        return (
                            <img
                                key={`emoji-${index}`}
                                src={src}
                                alt="Mood emoji"
                                style={{
                                    position: 'absolute',
                                    objectFit: 'contain',
                                    zIndex: 5,
                                    ...pos
                                }}
                                className="pointer-events-none opacity-90 drop-shadow-xl"
                            />
                        );
                    })}

                    {/* MAIN LIGHT CARD - STATIC CONTENT */}
                    <div className="relative z-10 bg-white/90 border border-neutral-200 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center backdrop-blur-xl">
                        <h2 className="text-3xl font-extrabold mb-2 text-gray-900 drop-shadow-sm">🍛 MoodBite AI</h2>
                        <h3 className="text-lg font-bold text-indigo-900 mb-6 drop-shadow-sm">AI-Powered Food Recommendation System</h3>
                        
                        <p className="text-gray-800 mb-4 text-sm leading-relaxed font-semibold">
                            Welcome to your personalized food assistant. Discover Indian dishes based on your emotions using Artificial Intelligence.
                        </p>
                        
                        <p className="text-gray-800 mb-8 text-sm leading-relaxed font-semibold">
                            Analyze your mood, get instant food suggestions, and enjoy a smarter way of eating.
                        </p>
                        
                        <button
                            onClick={onClose}
                            className="bg-gradient-to-r from-orange-500 to-rose-500 text-white px-8 py-3 rounded-full font-bold shadow-[0_10px_20px_rgba(249,115,22,0.4)] w-full text-lg tracking-wide border border-orange-400/50 hover:scale-105 transition-transform"
                        >
                            Start Exploring
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
