export default function ChangeBodyThemeClass(theme) {
    document.body.className =
        Array
            .from   ( document.body.classList               )
            .filter ( classes => !~classes.indexOf('theme') )
            .concat ( [`theme-${ theme }`]                  )
            .join   ( ' ' )
}