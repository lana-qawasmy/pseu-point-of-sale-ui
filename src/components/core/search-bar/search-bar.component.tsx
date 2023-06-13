
import './search-bar.css';
import { MagnifyingGlass } from 'phosphor-react';

interface Iprops {
    Height?: number,
    Width?: number,
    Id: string,
    Name: string,
    Padding?: number,
    FontSize?: number,
    Raduis?: number,
    Placeholder?: string,
    FontWeight?: 'bold' | 'bolder' | 'lighter' | 'normal' | 'inherit' | 'initial' | 'unset' |
    100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900,
    FontColor?: string,
    OnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = (props: Iprops) => {
    const styles = {
        height: props.Height || '30px',
        width: props.Width || '250px',
        borderRadius: props.Raduis || '2px',
        padding: props.Padding || '4px 8px',
        color: props.FontColor || 'black',
        fontSize: `${props.FontSize} px` || '20px',
        fontWeight: props.FontWeight || 'normal',
    };
    return (
        <div>
            searching
            <div className="searchWrapper">
                <input
                    style={styles}
                    id={props.Id}
                    placeholder={props.Placeholder || 'search '}
                    className='searchInput'
                    onChange={e => (props.OnChange && props.OnChange(e))}
                />
                <div className="magnifying">
                    <MagnifyingGlass size={25} weight="bold" color={props.FontColor || '#aaa'} />
                </div>
            </div>
        </div>
    );
};

export default SearchBar;