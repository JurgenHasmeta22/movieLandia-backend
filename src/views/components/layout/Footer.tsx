export default function Footer() {
    return (
        <footer class="bg-black text-white py-10">
            <div class="max-w-5xl mx-auto px-4">
                <div class="flex flex-wrap justify-between">
                    <div class="mb-6 w-full sm:w-1/2 md:w-1/4">
                        <h4 class="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Explore</h4>
                        <ul class="space-y-2">
                            <li>
                                <a href="/movies" class="flex items-center space-x-2 hover:text-gray-400">
                                    <i class="fas fa-film"></i>
                                    <span>Movies</span>
                                </a>
                            </li>
                            <li>
                                <a href="/series" class="flex items-center space-x-2 hover:text-gray-400">
                                    <i class="fas fa-tv"></i>
                                    <span>Series</span>
                                </a>
                            </li>
                            <li>
                                <a href="/genres" class="flex items-center space-x-2 hover:text-gray-400">
                                    <i class="fas fa-list"></i>
                                    <span>Genres</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="mb-6 w-full sm:w-1/2 md:w-1/4">
                        <h4 class="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Account</h4>
                        <ul class="space-y-2">
                            <li>
                                <a href="/signin" class="flex items-center space-x-2 hover:text-gray-400">
                                    <i class="fas fa-sign-in-alt"></i>
                                    <span>Sign In</span>
                                </a>
                            </li>
                            <li>
                                <a href="/signup" class="flex items-center space-x-2 hover:text-gray-400">
                                    <i class="fas fa-user-plus"></i>
                                    <span>Sign Up</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="mb-6 w-full sm:w-1/2 md:w-1/4">
                        <h4 class="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Follow Us</h4>
                        <ul class="flex space-x-4">
                            <li>
                                <a href="#" class="hover:text-gray-400">
                                    <i class="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="hover:text-gray-400">
                                    <i class="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="hover:text-gray-400">
                                    <i class="fab fa-instagram"></i>
                                </a>
                            </li>
                            <li>
                                <a href="#" class="hover:text-gray-400">
                                    <i class="fab fa-youtube"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="mb-6 w-full sm:w-1/2 md:w-1/4">
                        <h4 class="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">Newsletter</h4>
                        <form class="flex w-full">
                            <input
                                type="email"
                                placeholder="Email"
                                class="bg-gray-700 text-white px-4 py-2 rounded-l-full focus:outline-none focus:bg-gray-600 w-full"
                            />
                            <button
                                type="submit"
                                class="bg-gray-600 text-white px-4 py-2 rounded-r-full hover:bg-gray-500"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>
                <div class="border-t border-gray-700 pt-4 mt-6 text-center">
                    <p class="text-gray-500">&copy; 2024 | MovieLandia24</p>
                </div>
            </div>
        </footer>
    );
}
