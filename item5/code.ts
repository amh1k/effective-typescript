// Item 5: Limit Use of the any Type

// any Types Mask Bugs When You Refactor Code

interface ComponentProps {
  onSelectItem: (item: any) => void;
}
function renderSelector(props: ComponentProps) {}

let selectedId: number = 0;

function handleSelectItem(item: any) {
  selectedId = item.id;
}
renderSelector({ onSelectItem: handleSelectItem });
/*Later you rework the selector in a way that makes it harder to pass the
whole item object through to onSelectItem. But that’s no big deal since
you just need the ID. You change the signature in ComponentProps:*/

/* 
interface ComponentProps {
  onSelectItem: (id: number) => void;
 }
*/

// … or is it? handleSelectItem takes an any parameter, so it’s just as happy
// with an item as it is with an ID. It produces a runtime exception, despite
// passing the type checker. Had you used a more specific type, this would
// have been caught by the type checker.
