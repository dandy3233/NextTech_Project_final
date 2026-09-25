import { useState } from "react";
import PropTypes from "prop-types";
import {
  FaTwitter,
  FaLinkedinIn,
  FaFacebookF,
} from "react-icons/fa";

const TeamCard = ({ member }) => {
  const [showSocials, setShowSocials] = useState(false);
  const [imageError, setImageError] = useState(false);

  /* ===============================
     MEMBER DATA (Backend Postman Variable Names)
  =============================== */

  const {
    name,
    specialty,
    image,
    socialMedia,
  } = member || {};

  /* ===============================
     IMAGE
  =============================== */

  const fallbackImage = "/Public/Images/Teams/default-avatar.png";

  const currentImage = imageError || !image
    ? fallbackImage
    : image;

  /* ===============================
     PLATFORM → ICON MAP
  =============================== */

  const PLATFORM_ICONS = {
    facebook: { icon: FaFacebookF, size: 14 },
    twitter:  { icon: FaTwitter,   size: 14 },
    linkedin: { icon: FaLinkedinIn, size: 15 },
  };

  /* ===============================
     DYNAMIC SOCIAL ITEMS FROM BACKEND
  =============================== */

  const socialItems = (Array.isArray(socialMedia) ? socialMedia : [])
    .filter((item) => item?.platform && item?.url && item.url !== "#")
    .map((item) => {
      const key = item.platform.toLowerCase();
      return {
        platform: item.platform,
        url: item.url,
        ...(PLATFORM_ICONS[key] || {}),
      };
    })
    .filter((item) => item.icon);

  /* ===============================
     DYNAMIC HEIGHT (each button = 52px)
  =============================== */

  const ITEM_HEIGHT = 52;
  const expandedHeight = socialItems.length * ITEM_HEIGHT;


  /* ===============================
     SOCIAL CLICK
  =============================== */

  const handleSocialClick = (event, url) => {
    event.stopPropagation();

    if (url && url !== "#") {
      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  return (
    <article
      className="group w-full select-none"
      onMouseEnter={() => setShowSocials(true)}
      onMouseLeave={() => setShowSocials(false)}
    >
      {/* ===============================
          IMAGE AREA
      =============================== */}

      <div className="relative w-full">

        {/* ===============================
            IMAGE CONTAINER
        =============================== */}

        <div
          className="
            relative
            w-full
            aspect-[317/405]
            overflow-hidden
            rounded-[14px]
            bg-gray-200
          "
        >
          {/* IMAGE */}

          <img
            src={currentImage}
            alt={name}
            onError={() => setImageError(true)}
            className={`
              h-full
              w-full
              object-cover
              object-center
              origin-center
              transition-transform
              duration-[700ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                showSocials
                  ? "scale-[1.025]"
                  : "scale-100"
              }
            `}
          />

          {/* ===============================
              HOVER IMAGE OVERLAY
          =============================== */}

          <div
            className={`
              pointer-events-none
              absolute
              inset-0
              bg-[#0B162C]
              transition-opacity
              duration-[700ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]

              ${
                showSocials
                  ? "opacity-[0.18]"
                  : "opacity-0"
              }
            `}
          />
        </div>

        {/* ===============================
            BLUE VERTICAL ACCENT LINE
        =============================== */}

        <div
          className="
            pointer-events-none
            absolute
            left-[39px]
            -bottom-[29px]
            z-10
            h-[81px]
            w-[3px]
            rounded-full
            bg-[#1997C5]
          "
        />

        {/* ===============================
            SOCIAL MENU
        =============================== */}

        {socialItems.length > 0 && (
        <div
          className="
            absolute
            right-[39px]
            -bottom-[26px]
            z-30
            h-[54px]
            w-[54px]
          "
          onClick={(event) => event.stopPropagation()}
        >
          <div
            className={`
              absolute
              bottom-0
              right-0
              w-[54px]
              overflow-hidden
              rounded-[9px]
              bg-[#1997C5]
              shadow-lg

              transition-[height]
              duration-[500ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
            `}
            style={{
              height: showSocials
                ? `${expandedHeight}px`
                : "54px",
            }}
          >
            {/* SOCIAL ICON LIST */}

            <div
              className="
                absolute
                bottom-0
                right-0
                flex
                w-[54px]
                flex-col
              "
              style={{ height: `${expandedHeight}px` }}
            >
              {socialItems.map((social, index) => {
                const IconComponent = social.icon;
                const isLast = index === socialItems.length - 1;
                return (
                  <button
                    key={social.platform}
                    type="button"
                    aria-label={social.platform}
                    onClick={(event) =>
                      handleSocialClick(
                        event,
                        social.url
                      )
                    }
                    className={`
                      flex
                      h-[52px]
                      min-h-[52px]
                      w-full
                      items-center
                      justify-center

                      ${!isLast ? "border-b border-white/30" : ""}

                      bg-[#1997C5]
                      text-white

                      transition-colors
                      duration-200

                      hover:bg-[#1997C5]
                      hover:text-[#0B162C]
                    `}
                  >
                    <IconComponent size={social.size} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* PLUS BUTTON */}

          <button
            type="button"
            aria-label="Show social links"
            onClick={(event) => {
              event.stopPropagation();
            }}
            className={`
              absolute
              bottom-0
              right-0
              z-40

              flex
              h-[54px]
              w-[54px]
              items-center
              justify-center

              rounded-[9px]

              bg-[#1997C5]
              text-white

              shadow-md

              transition-all
              duration-300
              ease-out

              ${
                showSocials
                  ? `
                    pointer-events-none
                    opacity-0
                    scale-[0.96]
                  `
                  : `
                    pointer-events-auto
                    opacity-100
                    scale-100
                  `
              }
            `}
          >
            <span
              className="
                text-[23px]
                font-light
                leading-none
              "
            >
              +
            </span>
          </button>
        </div>
        )}

      </div>

      {/* ===============================
          MEMBER INFORMATION
      =============================== */}

      <div
        className="
          pt-[43px]
          pl-[39px]
        "
      >
        {/* MEMBER NAME */}

        <h3
          className={`
            text-[26px]
            font-medium
            leading-none

            transition-colors
            duration-300

            ${
              showSocials
                ? "text-[#1997C5]"
                : "text-[#283646]"
            }
          `}
        >
          {name}
        </h3>

        {/* MEMBER SPECIALTY */}

        <p
          className="
            mt-[15px]
            text-[16px]
            font-normal
            text-[#8B949E]
          "
        >
          {specialty}
        </p>
      </div>
    </article>
  );
};

/* ===============================
   PROP TYPES
=============================== */

TeamCard.propTypes = {
  member: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    specialty: PropTypes.string,
    image: PropTypes.string,
    socialMedia: PropTypes.array,
  }),
};

export default TeamCard;