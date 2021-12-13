export class ParserNumber {
    static colDecimals = (value: number) => {
        return new Intl.NumberFormat("es-CO").format(value)
    }
}