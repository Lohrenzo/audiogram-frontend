import "./skeleton.css";

type Props = {
    width: string;
    height: string;
    variant: string;
}

export default function Skeleton({ width, height, variant }: Props) {
    const style = {
        width,
        height
    }

    return (
        <div className={ `skeleton ${variant}` } style={ style }></div>
    )
}
