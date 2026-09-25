import { ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"

export default function PortfolioCard({ item }) {
  return (
    <Link
      to={`/portfolio/${item._id}`}
      className="
        group relative block overflow-hidden 
        rounded-lg xs:rounded-xl sm:rounded-xl md:rounded-2xl lg:rounded-2xl 
        shadow-lg xs:shadow-xl sm:shadow-2xl md:shadow-2xl
      "
    >
      {/* Background Image */}
      <img
        src={item.thumbinal}
        alt={item.title}
        className="
          w-full object-cover 
          h-72 sm:h-80 md:h-80 lg:h-[19rem] xl:h-[20rem] 2xl:h-[25rem]
          transition-transform duration-700 ease-out 
          group-hover:scale-105 group-hover:duration-1000
        "
      />

      {/* Floating Action Button (Center) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className={`
    flex items-center justify-center rounded-full 
    bg-[#04A9C1] text-white 
    h-10 w-10 sm:h-8 sm:w-8 md:h-8 md:w-8 lg:h-8 lg:w-8 xl:h-9 xl:w-9 2xl:h-10 2xl:w-10 
    shadow-md xs:shadow-lg sm:shadow-xl lg:shadow-2xl 
    transform 
    ${/* lg and up: start hidden, appear on hover */ ''}
    scale-0 lg:scale-0 
    transition-transform duration-300 ease-out 
    group-hover:scale-100 lg:group-hover:scale-125 
    pointer-events-auto
  `}>
          <ArrowUpRight
            size={20}
            className="xs:size-[22] sm:size-24 md:size-7 lg:size-6 xl:size-8 2xl:size-8"
            strokeWidth={2.5}
          />
        </div>
      </div>

      {/* Bottom Info Panel */}
      <div className={`
  absolute bottom-0 left-0 right-0 
  h-24 xs:h-28 sm:h-32 md:h-32 lg:h-28 xl:h-28 2xl:h-32 
  rounded-xl bg-[#04A9C1]
  p-3 xs:p-4 sm:p-4 md:p-5 lg:p-4 xl:p-5 
  text-white
  transform 
  ${/* lg and up: start hidden (translate-y-full), appear on hover */ ''}
  translate-y-0 lg:translate-y-full 
  transition-transform duration-500 ease-out 
  lg:group-hover:translate-y-0
`}>
        <p className="
    mb-1 text-sm xs:text-base sm:text-base md:text-lg  lg:text-base xl:text-lg 
    font-medium opacity-90 tracking-wider
  ">
          {item.catagory}
        </p>
        <h3 className="
    text-lg xs:text-xl sm:text-xl md:text-lg lg:text-base xl:text-2xl 2xl:text-xl 
    font-bold leading-tight line-clamp-2
  ">
          {item.title}
        </h3>
      </div>

      {/* Subtle Overlay on Hover */}
      <div className={`
  absolute inset-0 bg-black/10 
  opacity-0 lg:opacity-0 
  transition-opacity duration-400 ease-out 
  lg:group-hover:opacity-100
`} />
    </Link>
  )
}

PortfolioCard.propTypes = {
  item: PropTypes.shape({
    thumbinal: PropTypes.string,
    _id: PropTypes.string,
    catagory: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
}