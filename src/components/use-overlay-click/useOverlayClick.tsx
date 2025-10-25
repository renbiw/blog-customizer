import { useEffect, useRef } from 'react';

export function useOverlayClick(useOverlayClick: (event: MouseEvent) => void) {
	const ref = useRef<HTMLElement | null>(null);

	useEffect(() => {
		function handleClick(event: MouseEvent) {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				useOverlayClick(event);
			}
		}

		document.addEventListener('mousedown', handleClick);
		return () => {
			document.removeEventListener('mousedown', handleClick);
		};
	}, [useOverlayClick]);

	return ref;
}
