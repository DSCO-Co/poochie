module.exports = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('flowbite/plugin'),
    //
    // ********** Unofficial 3rd party plugins **********
    //
    // Good for generating hero patterns
    // Full Pattern List:
    //    <https://github.com/AndreaMinato/tailwind-heropatterns#pattern-names-list>
    //
    // https://www.heropatterns.com/
    //
    require('tailwind-heropatterns')({
      // as per tailwind docs you can pass variants
      variants: [],

      // the list of patterns you want to generate a class for
      // the names must be in kebab-case
      // an empty array will generate all 87 patterns
      patterns: [],

      // The foreground colors of the pattern
      colors: {
        default: 'var(--primary)',
        'primary-accent-0': 'var(--primary-accent-0)',
        'primary-accent-1': 'var(--primary-accent-1)',
        'primary-accent-2': 'var(--primary-accent-2)',
        'primary-accent-3': 'var(--primary-accent-3)',
        'primary-accent-4': 'var(--primary-accent-4)',
        'primary-accent-5': 'var(--primary-accent-5)',
        'primary-accent-6': 'var(--primary-accent-6)',
        'primary-accent-7': 'var(--primary-accent-7)',
        'primary-accent-8': 'var(--primary-accent-8)',
        'primary-accent-9': 'var(--primary-accent-9)',
      },

      // The foreground opacity
      opacity: {
        default: '0.4',
        100: '1.0',
      },
    }),
  ],
  safelist: ['outline-none'],
  theme: {
    extend: {
      position: ['responsive', 'sticky'],
      maxWidth: {
        '8xl': '1920px',
      },
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          2: 'var(--primary-2)',
          accent: {
            0: 'var(--primary-accent-0)',
            1: 'var(--primary-accent-1)',
            2: 'var(--primary-accent-2)',
            3: 'var(--primary-accent-3)',
            4: 'var(--primary-accent-4)',
            5: 'var(--primary-accent-5)',
            6: 'var(--primary-accent-6)',
            7: 'var(--primary-accent-7)',
            8: 'var(--primary-accent-8)',
            9: 'var(--primary-accent-9)',
          },
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          2: 'var(--secondary-2)',
        },
        accent: {
          0: 'var(--accent-0)',
          1: 'var(--accent-1)',
          2: 'var(--accent-2)',
          3: 'var(--accent-3)',
          4: 'var(--accent-4)',
          5: 'var(--accent-5)',
          6: 'var(--accent-6)',
          7: 'var(--accent-7)',
          8: 'var(--accent-8)',
          9: 'var(--accent-9)',
        },
        violet: {
          DEFAULT: 'var(--violet)',
          light: 'var(--violet-light)',
          dark: 'var(--violet-dark)',
        },
        pink: {
          DEFAULT: 'var(--pink)',
          light: 'var(--pink-light)',
          super: 'var(--pink-super)',
        },
        cyan: 'var(--cyan)',
        blue: 'var(--blue)',
        green: 'var(--green)',
        red: 'var(--red)',
        hover: 'var(--hover)',
        'hover-1': 'var(--hover-1)',
        'hover-2': 'var(--hover-2)',
      },
      textColor: {
        base: 'var(--text-base)',
        primary: 'var(--text-primary)',
        secondary: 'var(--text-secondary)',
      },
      boxShadow: {
        'outline-normal': '0 0 0 2px var(--accent-2)',
        magical:
          'rgba(0, 0, 0, 0.02) 0px 30px 30px, rgba(0, 0, 0, 0.03) 0px 0px 8px, rgba(0, 0, 0, 0.05) 0px 1px 0px',
      },
      lineHeight: {
        'extra-loose': '2.2',
      },
      scale: {
        120: '1.2',
      },
    },
  },
}
