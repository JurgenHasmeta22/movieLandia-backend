/// <reference types="@kitajs/html/alpine.d.ts" />

import { User } from '@prisma/client';

interface HeaderProps {
    user: User | null;
    titleTerm: string;
}

function Header({ user, titleTerm }: HeaderProps) {
    function searchHandler(initialTerm: string) {
        return {
            updateSearch(event: Event) {
                const searchTerm = (event.target as HTMLInputElement).value.trim();
                const url = new URL(window.location.href);
                const path = url.pathname;

                if (path.includes('/search')) {
                    if (searchTerm) {
                        url.searchParams.set('title', searchTerm);
                    } else {
                        url.searchParams.delete('title');
                    }
                } else {
                    url.pathname = '/search';
                    url.searchParams.set('title', searchTerm);
                }

                window.history.pushState({}, '', url);
                window.location.reload();
            },
        };
    }

    return (
        <header class="bg-black fixed top-0 left-0 w-full z-50">
            <nav class="flex flex-wrap items-center justify-between px-8 py-6">
                <div class="flex items-center space-x-6">
                    <a href="/">
                        <span class="text-xl font-bold text-white">MovieLandia24</span>
                    </a>
                    <a href="/movies" class="flex items-center space-x-2 text-white hover:text-gray-400">
                        <i class="fas fa-film"></i>
                        <span>Movies</span>
                    </a>
                    <a href="/genres" class="flex items-center space-x-2 text-white hover:text-gray-400">
                        <i class="fas fa-list"></i>
                        <span>Genres</span>
                    </a>
                    <a href="/series" class="flex items-center space-x-2 text-white hover:text-gray-400">
                        <i class="fas fa-tv"></i>
                        <span>Series</span>
                    </a>
                </div>
                <div class="flex flex-wrap items-center space-x-6">
                    <div class="relative">
                        <input
                            type="text"
                            id="searchInput"
                            placeholder="What are you going to watch?"
                            class="bg-gray-700 text-white rounded-full px-4 py-2 pl-10 focus:outline-none"
                            x-data={`${`searchHandler('${titleTerm}')`}`}
                            x-on:input={'updateSearch($event)'}
                            x-init={"$el.value = '${titleTerm}'"}
                        />
                        <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    </div>
                    <span class="text-white hover:text-gray-400 cursor-pointer">
                        <i class="fas fa-moon"></i>
                    </span>
                    {user ? (
                        <div class="relative">
                            <div class="flex items-center text-white">
                                <i class="fas fa-user mr-2"></i>
                                <span safe>${user.userName}</span>
                            </div>
                            <div class="absolute left-0 mt-2 bg-gray-800 rounded-lg shadow-lg hidden">
                                <a href="#" class="block px-4 py-2 text-white hover:bg-gray-700">
                                    Profile
                                </a>
                                <form action="/logout" method="post">
                                    <button type="submit" class="block px-4 py-2 text-white hover:bg-gray-700">
                                        Logout
                                    </button>
                                </form>
                            </div>
                        </div>
                    ) : (
                        <>
                            <a href="/login" class="flex items-center text-white hover:text-gray-400">
                                <i class="fas fa-sign-in-alt mr-2"></i>
                                <span>Sign In</span>
                            </a>
                            <a href="/register" class="flex items-center text-white hover:text-gray-400">
                                <i class="fas fa-user-plus mr-2"></i>
                                <span>Sign Up</span>
                            </a>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default Header;
