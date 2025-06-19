import { Dialog as DialogPrimitive } from "bits-ui";

import Title from "./title.svelte";
import Footer from "./footer.svelte";
import Header from "./header.svelte";
import Overlay from "./overlay.svelte";
import Content from "./content.svelte";
import Description from "./description.svelte";

const Root: typeof DialogPrimitive.Root = DialogPrimitive.Root;
const Trigger: typeof DialogPrimitive.Trigger = DialogPrimitive.Trigger;
const Close: typeof DialogPrimitive.Close = DialogPrimitive.Close;
const Portal: typeof DialogPrimitive.Portal = DialogPrimitive.Portal;

export {
	Root,
	Title,
	Portal,
	Footer,
	Header,
	Trigger,
	Overlay,
	Content,
	Description,
	Close,
};
