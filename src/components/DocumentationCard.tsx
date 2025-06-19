interface DocProps {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export default function DocumentationCard({ title, description, imageUrl, link }: DocProps) {
  return (
    <div class="relative max-w-2xl mx-auto mt-16">
      <div class="absolute inset-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 
                  bg-[length:200%_200%] bg-[position:0%_50%] blur-lg opacity-80 rounded-xl z-[-1] animate-gradient-move"></div>

      <div class="relative rounded-xl p-6 bg-white dark:bg-gray-900 shadow-lg transition-all duration-300 border border-transparent hover:border-[3px] hover:border-[rgb(0,255,255)] group flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 overflow-hidden">
        <img
          src={imageUrl}
          alt={`thumbnail ${title}`}
          class="w-32 h-32 rounded-md object-cover flex-shrink-0"
        />

        <div class="flex flex-col flex-1">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h2>
          <p class="text-gray-700 dark:text-gray-300 mb-6">{description}</p>
          <div>
            <a
              href={link}
              class="btn-sound relative inline-flex h-11 items-center justify-center px-6 rounded-full bg-primary text-white font-semibold 
                     border-2 border-[rgb(59,130,246)] transition duration-300 animate-hover-rgb-shadow"
            >
              GET HERE
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
