import { useState } from "react";
import './app.css'

export default function App() {
  const API_KEY = import.meta.env.VITE_SPOONACULAR_KEY;
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const fetchRecipes = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=10&apiKey=${API_KEY}`
    );
    const data = await res.json();
    setRecipes(data.results);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-yellow-50 to-orange-100">
      
      {/* HEADER */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold text-orange-600">🍽️ RecipeSearch</h1>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6">
            <a href="#" className="text-gray-600 hover:text-orange-500">Home</a>
            <a href="#" className="text-gray-600 hover:text-orange-500">About</a>
            <a href="#" className="text-gray-600 hover:text-orange-500">Contact</a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Mobile Nav Menu */}
        {menuOpen && (
          <nav className="md:hidden bg-white border-t border-gray-200">
            <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-orange-50">Home</a>
            <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-orange-50">About</a>
            <a href="#" className="block px-6 py-3 text-gray-600 hover:bg-orange-50">Contact</a>
          </nav>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
        {/* Search Form */}
        <form
          onSubmit={fetchRecipes}
          className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto"
        >
          <input
            type="text"
            placeholder="Search for recipes..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 shadow-sm"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300"
          >
            Search
          </button>
        </form>

        {/* Recipes Grid */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {recipes.length === 0 && (
            <p className="col-span-full text-center text-gray-500 text-lg">
              No recipes yet. Try searching!
            </p>
          )}
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{recipe.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* FOOTER */}
      <footer className="bg-white mt-10 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <h4 className="text-lg font-semibold text-orange-600 mb-3">RecipeSearch</h4>
            <p className="text-gray-600 text-sm">
              Discover delicious recipes from all over the world, anytime.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-500">Home</a></li>
              <li><a href="#" className="hover:text-orange-500">About</a></li>
              <li><a href="#" className="hover:text-orange-500">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="#" className="hover:text-orange-500">API Docs</a></li>
              <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-orange-500">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Follow Us</h4>
            <div className="flex gap-4 text-gray-600">
              <a href="#" className="hover:text-orange-500">🐦</a>
              <a href="#" className="hover:text-orange-500">📘</a>
              <a href="#" className="hover:text-orange-500">📸</a>
            </div>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 py-4 border-t border-gray-200">
          © {new Date().getFullYear()} RecipeSearch. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
