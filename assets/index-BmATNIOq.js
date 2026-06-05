(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();const La="06:00",Ea="24:00",xn=30,yt=60,oe=120,On=60,Un=new Set(["paid","confirmed"]),tt=[{id:"main-full",label_en:"Main Court Full",label_zh:"主场全场",group:"main",sport:"basketball-volleyball",mode:"full",resources:["main-left","main-right"],price:175,nonMemberPrice:175,memberPrice:175,useLabel_en:"Basketball and Volleyball",capacity:20,minDurationMinutes:oe,imageKey:"full"},{id:"main-half",label_en:"Main Half Court",label_zh:"主场半场",group:"main",sport:"basketball",mode:"main-half",resources:["main-left","main-right"],price:120,nonMemberPrice:120,memberPrice:105,useLabel_en:"Main court",capacity:12,minDurationMinutes:oe,imageKey:"half"},{id:"main-half-a",label_en:"Main Court Half A",label_zh:"主场半场 A",group:"main",sport:"basketball",mode:"half",resources:["main-left"],price:120,nonMemberPrice:120,memberPrice:105,useLabel_en:"Main court",capacity:12,minDurationMinutes:oe,imageKey:"half"},{id:"main-half-b",label_en:"Main Court Half B",label_zh:"主场半场 B",group:"main",sport:"basketball",mode:"half",resources:["main-right"],price:120,nonMemberPrice:120,memberPrice:105,useLabel_en:"Main court",capacity:12,minDurationMinutes:oe,imageKey:"half"},{id:"volleyball-training",label_en:"Volleyball Training / Rental",label_zh:"排球训练 / 租场",group:"main",sport:"volleyball",mode:"full",resources:["main-left","main-right"],price:175,nonMemberPrice:175,memberPrice:175,capacity:20,minDurationMinutes:oe,imageKey:"full",public:!1,active:!1},{id:"basketball-training",label_en:"Basketball Training",label_zh:"篮球训练",group:"main",sport:"basketball",mode:"half",resources:["main-left"],price:120,nonMemberPrice:120,memberPrice:105,capacity:12,public:!1,imageKey:"half"},{id:"small-full",label_en:"Small Court Full",label_zh:"小场全场",group:"small",sport:"basketball",mode:"small-full",resources:["small-half-a","small-half-b"],price:120,nonMemberPrice:120,memberPrice:120,capacity:10,minDurationMinutes:oe,imageKey:"full"},{id:"small-half-a",label_en:"Small Court Half A",label_zh:"小场半场 A",group:"small",sport:"basketball",mode:"small-half",smallHalf:"a",resources:["small-half-a"],price:65,nonMemberPrice:65,memberPrice:65,capacity:5,minDurationMinutes:oe,imageKey:"half"},{id:"small-half-b",label_en:"Small Court Half B",label_zh:"小场半场 B",group:"small",sport:"basketball",mode:"small-half",smallHalf:"b",resources:["small-half-b"],price:65,nonMemberPrice:65,memberPrice:65,capacity:5,minDurationMinutes:oe,imageKey:"half"},{id:"shooting-machine",label_en:"Shooting Machine",label_zh:"投篮机",group:"small",sport:"basketball",mode:"machine",resources:["shooting-machine"],price:120,nonMemberPrice:120,memberPrice:105,useLabel_en:"Shooting machine",capacity:3,minDurationMinutes:On,imageKey:"machine"}];function X(e,t=tt){return t.find(a=>a.id===e&&a.public!==!1)}function R(e,t="en"){return e?e[`label_${t}`]||e.label_en||e.id:""}function Ba(e){return e?Number(e.minDurationMinutes||yt):yt}function at(e){const t=Ba(e);return[t,t+60,t+120]}function ae(e,t){const a=at(e),n=Number(t||a[0]);return a.includes(n)?n:a[0]}function W(e){const[t,a="0"]=String(e).split(":"),n=Number(t),i=Number(a);return!Number.isFinite(n)||!Number.isFinite(i)?NaN:n*60+i}function Ra(e){const t=Math.floor(e/60),a=e%60;return`${String(t).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function ke(e,t){return Ra(W(e)+Number(t||0))}function Nt(e,t=La,a=Ea){const n=W(t),o=W(a)-Number(e||yt),l=[];for(let c=n;c<=o;c+=xn)l.push(Ra(c));return l}function Hn(e,t){return e.date!==t.date?!1:W(e.startTime)<W(t.endTime)&&W(t.startTime)<W(e.endTime)}function Da(e,t){return(e||[]).filter(a=>jn(a)&&Hn(a,t))}function jn(e={}){const t=e.status||"confirmed";return Un.has(t)}function Fa(e){return e.service||X(e.serviceId)||e}function Gn(e,t){const a={smallFull:0,smallHalves:new Set,machineCount:0,machinePositions:new Set};for(const n of Da(e,t)){const i=Fa(n);i.group==="small"&&(i.mode==="small-full"&&(a.smallFull+=1),i.mode==="small-half"&&a.smallHalves.add(i.smallHalf||i.resources?.[0]),i.mode==="machine"&&(n.machinePosition?a.machinePositions.add(n.machinePosition):a.machineCount+=Number(n.quantity||1)))}return a}function Vn(e,t,a){const n=Gn(a,t);if(n.smallFull>0)return{available:!1,remaining:0,reason:"Small court full is already booked."};const i=n.smallHalves.size,o=n.machineCount+n.machinePositions.size,l=i+o,c=i>=2?0:Math.max(0,3-l);if(e.mode==="small-full"){const d=i===0&&o===0;return{available:d,remaining:d?1:0,reason:d?"":"Small court has an overlapping half-court or machine booking."}}if(e.mode==="small-half"){if(n.smallHalves.has(e.smallHalf))return{available:!1,remaining:0,reason:"This small half court is already booked."};const d=l<3;return{available:d,remaining:d?1:0,reason:d?"":"Small court machine/half capacity is full."}}if(e.mode==="machine"){if(t.machinePosition&&n.machinePositions.has(t.machinePosition))return{available:!1,remaining:c,reason:"This shooting machine is already booked."};const d=Number(t.quantity||1),u=c>=d;return{available:u,remaining:c,reason:u?"":"No shooting machine positions remain."}}return{available:!0,remaining:1,reason:""}}function qa(){return[X("main-half-a"),X("main-half-b")].filter(Boolean)}function Wn(e,t){const a=qa().filter(n=>xa(n,e,t).available);return{available:a.length>0,remaining:a.length,reason:a.length?"":"Both main half courts are already booked."}}function xa(e,t,a){for(const n of Da(a,t)){const o=Fa(n).resources||[];if((e.resources||[]).some(l=>o.includes(l)))return{available:!1,remaining:0,reason:"Another booking already uses this court resource."}}return{available:!0,remaining:1,reason:""}}function ne(e,t,a=[]){if(!e)return{available:!1,remaining:0,reason:"Service does not exist."};if(!t?.date||!t?.startTime||!t?.endTime)return{available:!1,remaining:0,reason:"Date and time are required."};const n=W(t.startTime),i=W(t.endTime);if(!Number.isFinite(n)||!Number.isFinite(i)||i<=n)return{available:!1,remaining:0,reason:"End time must be after start time."};const o=Ba(e);return i-n<o?{available:!1,remaining:0,reason:`Minimum booking is ${o/60} hour${o===60?"":"s"}.`}:n<W(La)||i>W(Ea)?{available:!1,remaining:0,reason:"Selected time is outside booking hours."}:e.mode==="main-half"?Wn(t,a):e.group==="small"?Vn(e,t,a):xa(e,t,a)}function Lt(e,t,a=[]){return e?.mode!=="main-half"?e:qa().find(n=>ne(n,t,a).available)||e}function nt({id:e,source:t,service:a,serviceId:n,date:i,startTime:o,endTime:l,quantity:c=1,machinePosition:d="",customer:u={},paymentMethod:p="Credit Card",status:$="confirmed",createdAt:S}){const y=a||X(n);return{id:e||`BK-${Date.now()}`,kind:"resource",status:$,source:t||"customer",serviceId:y?.id||n,serviceLabel_en:y?.label_en||"",serviceLabel_zh:y?.label_zh||"",date:i,startTime:o,endTime:l,quantity:Number(c||1),machinePosition:d,resources:y?.resources||[],customer:u,paymentMethod:p,createdAt:S||new Date().toISOString(),cancelledAt:""}}const Jn=new Set(["regularPrice","memberPrice","nonMemberPrice","capacity","booked","price","stock","discount","order","spots","minDurationMinutes"]),Kn=new Set(["active","featured","waiver","public"]),Yn=new Set(["basketball","volleyball","conditioning","court","membership","merchandise"]),Qn={basketball:"basketball",volleyball:"volleyball","conditioning-training":"conditioning",conditioning:"conditioning","court-rental":"court","open-gym":"court",membership:"membership",merchandise:"merchandise"},Xn={title_en:"title_zh",subtitle_en:"subtitle_zh",detail_en:"detail_zh",audience_en:"audience_zh",statusTitle_en:"statusTitle_zh",statusBody_en:"statusBody_zh",statusButton_en:"statusButton_zh",heroTitle_en:"heroTitle_zh",eyebrow_en:"eyebrow_zh",scheduleTitle_en:"scheduleTitle_zh",scheduleBody_en:"scheduleBody_zh",liveNote_en:"liveNote_zh",footer_en:"footer_zh",role_en:"role_zh",bio_en:"bio_zh",desc_en:"desc_zh",benefits_en:"benefits_zh",summary_en:"summary_zh",dateLabel_en:"dateLabel_zh",button_en:"button_zh",notes_en:"notes_zh",body_en:"body_zh",kicker_en:"kicker_zh",line1_en:"line1_zh",line2_en:"line2_zh",label_en:"label_zh",useLabel_en:"useLabel_zh",productIntro_en:"productIntro_zh",en:"zh"},$t=[{id:"single",label_en:"Single session",label_zh:"",order:1},{id:"package-5",label_en:"Package of 5",label_zh:"",order:2},{id:"package-10",label_en:"Package of 10",label_zh:"",order:3}],St=[{id:"one-on-one",label_en:"One on one",label_zh:"",prices:{single:120,"package-5":575,"package-10":1100},order:1},{id:"group-of-two",label_en:"Group of two",label_zh:"",prices:{single:80,"package-5":388,"package-10":750},order:2},{id:"group-of-three",label_en:"Group of three",label_zh:"",prices:{single:65,"package-5":318,"package-10":600},order:3},{id:"group-of-four",label_en:"Group of four",label_zh:"",prices:{single:55,"package-5":270,"package-10":515},order:4}],kt={programs:{title:"Programs",description:"Home page Training Programs blocks and detail pages. Visible and featured programs automatically appear as clickable home page cards.",addLabel:"Add Home Program Block",copyLabel:"Copy Program",collectionKey:"programs",imageFields:["image"],fields:[{name:"title_en",label:"Title",required:!0},{name:"type",label:"Program Type"},{name:"subtitle_en",label:"Short Description",type:"textarea"},{name:"detail_en",label:"Program Details",type:"textarea"},{name:"audience_en",label:"Best For",type:"textarea"},{name:"statusTitle_en",label:"Status Title"},{name:"statusBody_en",label:"Status Body",type:"textarea"},{name:"statusButton_en",label:"Status Button Text"},{name:"statusRoute",label:"Status Button Route"},{name:"image",label:"Main Image",type:"image",usage:"Home program card and program detail hero."},{name:"order",label:"Display Order",type:"number"},{name:"active",label:"Show on Site",type:"boolean"},{name:"featured",label:"Show on Home Page",type:"boolean"}]},coaches:{title:"Coaches",description:"Coach cards automatically expand on the home page and coaches page.",addLabel:"Add Coach",copyLabel:"Copy Coach",collectionKey:"coaches",imageFields:["portrait","image"],fields:[{name:"name",label:"Coach Name",required:!0},{name:"role_en",label:"Role",type:"textarea"},{name:"bio_en",label:"Coach Bio",type:"textarea"},{name:"programs",label:"Linked Programs",help:"Use commas for multiple programs, for example: basketball, volleyball"},{name:"portrait",label:"Portrait Photo",type:"image",usage:"Coach card and coach detail portrait."},{name:"image",label:"Backup Image",type:"image",usage:"Fallback coach image if portrait is empty."},{name:"order",label:"Display Order",type:"number"},{name:"active",label:"Show on Site",type:"boolean"},{name:"featured",label:"Show on Home Page",type:"boolean"}]},sessions:{title:"Class Schedule",description:"Classes automatically appear on their program page and the public schedule page.",addLabel:"Add Class",copyLabel:"Copy Class",collectionKey:"sessions",fields:[{name:"programId",label:"Program",type:"programSelect",required:!0},{name:"type",label:"Class Type"},{name:"title_en",label:"Class Title",required:!0},{name:"desc_en",label:"Class Description",type:"textarea"},{name:"dates",label:"Date Description"},{name:"datesList",label:"Date List",type:"list",help:"Enter one date per line, or separate dates with commas."},{name:"dateSummary",label:"Date Summary"},{name:"time",label:"Class Time"},{name:"regularPrice",label:"Regular Price",type:"number"},{name:"memberPrice",label:"Member Price",type:"number"},{name:"capacity",label:"Capacity",type:"number"},{name:"booked",label:"Booked Spots",type:"number"},{name:"waiver",label:"Waiver Required",type:"boolean"},{name:"active",label:"Show on Site",type:"boolean"}]},bookingServices:{title:"Booking Services",description:"Public court rental service labels, images, and member / non-member hourly prices. Resource rules stay locked in the booking engine.",addLabel:"Add Booking Service",copyLabel:"Copy Booking Service",collectionKey:"bookingServices",canAdd:!1,canCopy:!1,canDelete:!1,imageFields:["image"],fields:[{name:"label_en",label:"Service Label",required:!0},{name:"useLabel_en",label:"Service Subtitle"},{name:"nonMemberPrice",label:"Non-member Hourly Price",type:"number"},{name:"memberPrice",label:"Member Hourly Price",type:"number"},{name:"capacity",label:"Capacity",type:"number"},{name:"minDurationMinutes",label:"Minimum Duration Minutes",type:"number"},{name:"image",label:"Service Image",type:"image",usage:"Court rental service cards, booking selector, and admin schedule cards."},{name:"imageKey",label:"Display Image",type:"select",options:[["full","Full Court"],["half","Half Court"],["machine","Shooting Machine"]]},{name:"public",label:"Show to Customers",type:"boolean"},{name:"active",label:"Active",type:"boolean"}]},courtSlots:{title:"Court Slots",description:"Manual court slot cards appear on the court rental and schedule pages.",addLabel:"Add Court Slot",copyLabel:"Copy Court Slot",collectionKey:"courtSlots",imageFields:["image"],fields:[{name:"programId",label:"Program",type:"programSelect"},{name:"courtType",label:"Court Type"},{name:"date",label:"Date",type:"date"},{name:"time",label:"Time"},{name:"price",label:"Hourly Price",type:"number"},{name:"capacity",label:"Capacity",type:"number"},{name:"minimum",label:"Minimum Booking"},{name:"image",label:"Court Image",type:"image",usage:"Legacy court slot card image when manual court slots are displayed."},{name:"booked",label:"Booked",type:"boolean"},{name:"active",label:"Show on Site",type:"boolean"}]},openCourtSlots:{title:"Open Gym",description:"Manage basketball drop-in availability. Active slots appear on the Open Gym page.",addLabel:"Add Open Gym Time",copyLabel:"Copy Open Gym Time",collectionKey:"openCourtSlots",fields:[{name:"title_en",label:"Title",required:!0},{name:"date",label:"Date",type:"date",required:!0},{name:"startTime",label:"Start Time",type:"time",required:!0},{name:"endTime",label:"End Time",type:"time",required:!0},{name:"spots",label:"Drop-in Spots",type:"number"},{name:"notes_en",label:"Notes",type:"textarea"},{name:"active",label:"Show on Site",type:"boolean"}]},activities:{title:"Activities",description:"Activities automatically appear on the home page when visible and featured.",addLabel:"Add Activity",copyLabel:"Copy Activity",collectionKey:"activities",imageFields:["image"],fields:[{name:"title_en",label:"Activity Title",required:!0},{name:"summary_en",label:"Activity Summary",type:"textarea"},{name:"dateLabel_en",label:"Date Label"},{name:"button_en",label:"Button Text"},{name:"route",label:"Button Route"},{name:"image",label:"Activity Image",type:"image",usage:"Home activity update card."},{name:"order",label:"Display Order",type:"number"},{name:"active",label:"Show on Site",type:"boolean"},{name:"featured",label:"Show on Home Page",type:"boolean"}]},products:{title:"Products",description:"Product data is available for merchandise display and orders.",addLabel:"Add Product",copyLabel:"Copy Product",collectionKey:"products",imageFields:["image"],fields:[{name:"title_en",label:"Product Name",required:!0},{name:"price",label:"Price",type:"number"},{name:"stock",label:"Stock",type:"number"},{name:"sizes",label:"Sizes / Options"},{name:"image",label:"Product Image",type:"image",usage:"Merchandise product card."},{name:"order",label:"Display Order",type:"number"},{name:"active",label:"Show on Site",type:"boolean"}]},dropdownPages:{title:"Dropdown Pages",description:"Top navigation dropdown items. Visible items automatically appear in their menu and generate a detail page.",addLabel:"Add Dropdown Page",copyLabel:"Copy Dropdown Page",collectionKey:"dropdownPages",imageFields:["image"],fields:[{name:"parentMenu",label:"Parent Menu",type:"select",options:[["basketball","Basketball"],["volleyball","Volleyball"],["conditioning","Conditioning"],["court","Court Rental"],["membership","Membership"],["merchandise","Merchandise"]],required:!0},{name:"label_en",label:"Dropdown Label",required:!0},{name:"title_en",label:"Page Title",required:!0},{name:"subtitle_en",label:"Page Subtitle",type:"textarea"},{name:"body_en",label:"Page Introduction",type:"textarea"},{name:"productIntro_en",label:"Product Introduction",type:"textarea"},{name:"image",label:"Page Image",type:"image",usage:"Catalog tile and dropdown detail hero."},{name:"sessionIds",label:"Linked Products / Classes",type:"sessionMultiSelect",help:"Select products from Class Schedule. Advanced users can also enter class IDs manually."},{name:"order",label:"Display Order",type:"number"},{name:"active",label:"Show on Site",type:"boolean"}]},globalImages:{title:"Images",description:"Global public image assets. Upload replacements and adjust crop focus for logos, default court images, and About gallery photos.",addLabel:"Add Image",copyLabel:"Copy Image",collectionKey:"globalImages",canAdd:!1,canCopy:!1,canDelete:!1,imageFields:["image"],fields:[{name:"label_en",label:"Image Name",required:!0},{name:"usage_en",label:"Frontend Usage",type:"textarea"},{name:"image",label:"Image",type:"image",help:"Paste an image link or upload a local image. Use the focus controls to adjust public cropping."},{name:"active",label:"Show on Site",type:"boolean"}]}};function Oa(e=[]){return e.reduce((t,a)=>Math.max(t,Number(a.order||0)),0)+1}function Zn(e,t=[]){const n=t.find(i=>i.id===e)?.type||Qn[e]||e;return Yn.has(n)?n:""}function Ua(e,t=[],a=[]){const n=Zn(e,a);return t.filter(i=>i.active!==!1&&i.parentMenu===n).sort((i,o)=>Number(i.order||999)-Number(o.order||999))}function ei(e,t=[]){return e?t.some(a=>a.id===e.type)?e.type:t.find(a=>(a.sessionIds||[]).includes(e.id))?.id||"":""}function Ha(e=[],t,a){return!t||!a?e:e.map(n=>{if(n.id!==a)return n;const i=n.sessionIds||[];return{...n,sessionIds:i.includes(t)?i:[...i,t]}})}function ti(e=[],t,a,n){if(!t)return e;const i=e.map(o=>!a||a===n||o.id!==a?o:{...o,sessionIds:(o.sessionIds||[]).filter(l=>l!==t)});return Ha(i,t,n)}function ja(e=[],t){return t?e.map(a=>({...a,sessionIds:(a.sessionIds||[]).filter(n=>n!==t)})):e}function _e(e={}){const t=Array.isArray(e.privatePricingColumns)&&e.privatePricingColumns.length?e.privatePricingColumns:$t,a=Array.isArray(e.privatePricingRows)&&e.privatePricingRows.length?e.privatePricingRows:St,n=t.map((l,c)=>({id:oa(l.id||l.label_en||`column-${c+1}`),label_en:String(l.label_en||"").trim(),label_zh:"",order:Number(l.order||c+1)})).filter(l=>l.id&&l.label_en).sort((l,c)=>Number(l.order||999)-Number(c.order||999)),i=new Set(n.map(l=>l.id)),o=a.map((l,c)=>{const d={};for(const u of n)d[u.id]=Number(l.prices?.[u.id]||0);return{id:oa(l.id||l.label_en||`row-${c+1}`),label_en:String(l.label_en||"").trim(),label_zh:"",prices:d,order:Number(l.order||c+1)}}).filter(l=>l.id&&l.label_en&&Object.keys(l.prices).some(c=>i.has(c))).sort((l,c)=>Number(l.order||999)-Number(c.order||999));return{privatePricingColumns:n,privatePricingRows:o}}function ai(e=[],t,a={}){if(!t)return e;const n=_e(a);return e.map(i=>i.id===t?{...i,...n}:i)}function Et(e){const t={...e};for(const[a,n]of Object.entries(Xn))Object.hasOwn(t,a)&&(t[n]=t[a]);return Object.hasOwn(t,"courtType")&&!Object.hasOwn(t,"title_en")&&(t.title_zh=t.courtType),t}function oa(e){return String(e||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"")}function ni(e,t={}){const a=t.now||Date.now(),n=t.programs?.[0]?.id||"basketball",i=Oa(t.existingItems||t.programs||[]),o=t.defaultImage||"",l={programs:{id:`program-${a}`,type:"training",title_en:"New Program",subtitle_en:"Short program description",detail_en:"Add program details here.",audience_en:"Who this program is best for.",statusTitle_en:"",statusBody_en:"",statusButton_en:"",statusRoute:"",image:o,order:i,active:!0,featured:!0},coaches:{id:`coach-${a}`,name:"New Coach",role_en:"Coach Role",bio_en:"Add coach bio here.",image:o,portrait:o,programs:n,order:i,active:!0,featured:!0},sessions:{id:`session-${a}`,programId:n,type:"",title_en:"New Class",desc_en:"Add class description here.",dates:"By appointment",datesList:[],dateSummary:"New schedule",time:"TBD",regularPrice:0,memberPrice:0,capacity:12,booked:0,waiver:!0,active:!0},courtSlots:{id:`court-${a}`,programId:"court-rental",courtType:"Full Size Court",date:"2026-06-01",time:"6:00 PM - 8:00 PM",price:0,capacity:12,booked:!1,minimum:"Minimum 1H",image:o,active:!0},openCourtSlots:{id:`open-court-${a}`,title_en:"Basketball Drop-In",date:"2026-05-30",startTime:"20:00",endTime:"22:00",spots:12,notes_en:"Drop-in basketball court time",active:!0},activities:{id:`activity-${a}`,title_en:"New Activity",summary_en:"Add activity details here.",dateLabel_en:"New date",button_en:"Learn More",route:"contact",image:o,order:i,active:!0,featured:!0},products:{id:`product-${a}`,title_en:"New Product",price:0,stock:0,sizes:"",image:o,order:i,active:!0},globalImages:{id:`global-image-${a}`,group:"custom",label_en:"New Global Image",usage_en:"Describe where this image appears on the public site.",image:o,imagePositionX:"center",imagePositionY:"center",order:i,active:!0},dropdownPages:{id:`dropdown-${a}`,parentMenu:"basketball",label_en:"New Dropdown Page",title_en:"New Dropdown Page",subtitle_en:"Short page subtitle",body_en:"Add page introduction here.",productIntro_en:"Add product or program details here.",image:o,sessionIds:[],order:i,active:!0}};return Et(l[e]||{id:`${e}-${a}`,active:!0})}function ii(e,t,a={}){const n=a.now||Date.now(),i=structuredClone(t);return i.id=`${e}-copy-${n}`,i.order=Oa(a.existingItems||[]),i.title_en&&(i.title_en=`${i.title_en} Copy`),i.name&&(i.name=`${i.name} Copy`),Et(i)}function ri(e){const t={...e},a=sa(t.sessionIdsManual);delete t.sessionIdsManual;for(const n of Object.keys(t)){if(n==="datesList"||n==="sessionIds"){t[n]=sa(t[n]);continue}if(Kn.has(n)){t[n]=t[n]==="true";continue}if(n==="booked"&&(t[n]==="true"||t[n]==="false")){t[n]=t[n]==="true";continue}Jn.has(n)&&(t[n]=Number(t[n]||0))}return a.length&&(t.sessionIds=[...new Set([...t.sessionIds||[],...a])]),Et(t)}function sa(e){return(Array.isArray(e)?e:[e]).flatMap(t=>String(t||"").split(/[\n,]/)).map(t=>t.trim()).filter(Boolean)}const oi="modulepreload",si=function(e){return"/first-light-client-preview/"+e},la={},li=function(t,a,n){let i=Promise.resolve();if(a&&a.length>0){let d=function(u){return Promise.all(u.map(p=>Promise.resolve(p).then($=>({status:"fulfilled",value:$}),$=>({status:"rejected",reason:$}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");i=d(a.map(u=>{if(u=si(u),u in la)return;la[u]=!0;const p=u.endsWith(".css"),$=p?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${$}`))return;const S=document.createElement("link");if(S.rel=p?"stylesheet":oi,p||(S.as="script"),S.crossOrigin="",S.href=u,c&&S.setAttribute("nonce",c),document.head.appendChild(S),p)return new Promise((y,f)=>{S.addEventListener("load",y),S.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return i.then(l=>{for(const c of l||[])c.status==="rejected"&&o(c.reason);return t().catch(o)})},ca={BASE_URL:"/first-light-client-preview/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},ci="film-to-floor-videos",di=["video/mp4","video/quicktime","video/webm"],ui=500*1024*1024,Bt="firstlight_film_review_staff_session";function we(){return typeof import.meta<"u"&&ca?ca:{}}function _t(e,t){return e?.[t]||""}function mi(e,t){return`${String(e||"").replace(/\/+$/,"")}/functions/v1/${t}`}function it(e=we()){return{url:_t(e,"VITE_SUPABASE_URL"),anonKey:_t(e,"VITE_SUPABASE_ANON_KEY")}}function Be(e=we()){const t=it(e);return!!(t.url&&t.anonKey)}function Ga(e={},t,a={}){const n=Number(a.maxBytes||ui),i=[];return String(e.studentName||"").trim()||i.push("Student name is required."),String(e.phone||"").trim()||i.push("Phone is required."),String(e.email||"").trim()||i.push("Email is required."),String(e.experience||"").trim()||i.push("Playing experience is required."),String(e.goals||"").trim()||i.push("Training goal is required."),t?(di.includes(t.type)||i.push("Upload an MP4, MOV, or WEBM video."),Number(t.size||0)>n&&i.push(`Video must be ${Math.round(n/1024/1024)} MB or smaller.`)):i.push("Video file is required."),{ok:i.length===0,errors:i}}function pi(e,t="en"){if(t!=="zh")return e;const a={"Student name is required.":"请输入学员姓名。","Phone is required.":"请输入电话。","Email is required.":"请输入邮箱。","Playing experience is required.":"请输入打球经验。","Training goal is required.":"请输入训练目标。","Video file is required.":"请上传视频文件。","Upload an MP4, MOV, or WEBM video.":"请上传 MP4、MOV 或 WEBM 视频。"};return e.map(n=>a[n]||n.replace("Video must be","视频大小不能超过").replace(/\s*or smaller\./,"。"))}async function gi(e=we()){const{url:t,anonKey:a}=it(e);if(!t||!a)throw new Error("Supabase video upload is not configured.");const{createClient:n}=await li(async()=>{const{createClient:i}=await import("./index-DdZWAXjq.js");return{createClient:i}},[]);return n(t,a)}async function bi({fields:e,file:t,env:a=we(),onProgress:n}={}){const i=Ga(e,t,{maxBytes:Number(_t(a,"VITE_FILM_REVIEW_MAX_MB")||500)*1024*1024});if(!i.ok)throw new Error(i.errors.join(" "));const o=await gi(a);n?.(10);const{data:l,error:c}=await o.functions.invoke("create-film-review-upload",{body:{...e,fileName:t.name,fileSize:t.size,fileType:t.type}});if(c)throw new Error(c.message||"Could not prepare upload.");n?.(35);const{submissionId:d,path:u,token:p,bucket:$=ci}=l||{};if(!d||!u||!p)throw new Error("Upload preparation response is incomplete.");const{error:S}=await o.storage.from($).uploadToSignedUrl(u,p,t,{contentType:t.type});if(S)throw new Error(S.message||"Video upload failed.");n?.(85);const{data:y,error:f}=await o.functions.invoke("complete-film-review-upload",{body:{submissionId:d,path:u}});if(f)throw new Error(f.message||"Could not finish upload.");return n?.(100),y||{submissionId:d}}function Rt(){if(typeof localStorage>"u")return null;try{return JSON.parse(localStorage.getItem(Bt)||"null")}catch{return null}}function Va(e){try{const t=String(e||"").split(".")[1];if(!t)return{};const a=atob(t.replace(/-/g,"+").replace(/_/g,"/"));return JSON.parse(decodeURIComponent(escape(a)))}catch{return{}}}function Dt(){const e=Rt(),t=e?.role||Va(e?.accessToken).app_metadata?.role;return["staff","admin"].includes(t)}async function hi(e,t,a=we(),n=fetch){const{url:i,anonKey:o}=it(a);if(!i||!o)throw new Error("Supabase staff login is not configured.");const l=await n(`${i.replace(/\/+$/,"")}/auth/v1/token?grant_type=password`,{method:"POST",headers:{apikey:o,"content-type":"application/json"},body:JSON.stringify({email:e,password:t})}),c=await l.json().catch(()=>({}));if(!l.ok)throw new Error(c.error_description||c.msg||"Staff login failed.");const d=Va(c.access_token),u=c.user?.app_metadata?.role||d.app_metadata?.role||"";if(!["staff","admin"].includes(u))throw new Error("This account is not authorized for video reviews.");const p={accessToken:c.access_token,email:c.user?.email||e,role:u};return localStorage.setItem(Bt,JSON.stringify(p)),p}function fi(){typeof localStorage<"u"&&localStorage.removeItem(Bt)}async function Wa(e="",{method:t="GET",body:a,env:n=we(),fetchImpl:i=fetch}={}){const{url:o,anonKey:l}=it(n),c=Rt();if(!o||!l)throw new Error("Supabase video reviews are not configured.");if(!c?.accessToken)throw new Error("Please log in as staff.");const d=await i(`${mi(o,"admin-film-review")}${e}`,{method:t,headers:{apikey:l,authorization:`Bearer ${c.accessToken}`,"content-type":"application/json"},body:a?JSON.stringify(a):void 0}),u=await d.json().catch(()=>({}));if(!d.ok)throw new Error(u.error||u.message||"Video review request failed.");return u}function vi(e={}){return Wa("",e)}function yi(e,t,a={}){return Wa(`/${encodeURIComponent(e)}`,{...a,method:"PATCH",body:t})}const wt=19,J={id:"firstlight-waiver",version:"2026.06",title:"First Light Waiver and Release",title_zh:"First Light 免责协议与责任豁免",body:"I understand that basketball, volleyball, training, open gym, court rental, and related activities involve physical risk. I confirm the participant is medically able to participate and agree to the First Light waiver and release terms.",body_zh:"我理解篮球、排球、训练、开放球场、场地租赁及相关活动存在身体风险。我确认参与者身体状况适合参加活动，并同意 First Light 的免责协议与责任豁免条款。"},$i=new Set(["paid","confirmed"]),Si=["id","fullName","email","phone","birthDate","age","primarySport","experience","preferredClassTime","guardianName","guardianRelation","guardianEmail","guardianPhone","emergencyName","emergencyPhone","medicalNotes","photoConsent","marketingConsent","source","staffNotes","createdAt","updatedAt"],ki=["id","status","studentId","studentName","email","phone","items","total","paymentMethod","paymentStatus","lockStatus","paymentReference","paymentConfirmedAt","waiverSignatureId","createdAt"],_i=["id","studentId","orderId","templateId","templateVersion","participantType","templateAudience","signerName","signerRelation","signedAt","ipAddress","userAgent"];function rt(e,t=new Date){const a=new Date(`${e}T12:00:00`),n=new Date(t);if(Number.isNaN(a.getTime())||Number.isNaN(n.getTime()))return null;let i=n.getUTCFullYear()-a.getUTCFullYear();const o=n.getUTCMonth()-a.getUTCMonth();return(o<0||o===0&&n.getUTCDate()<a.getUTCDate())&&(i-=1),i}function Ft(e,t={}){const a=rt(e?.birthDate,t.asOf);return a===null?!1:a<wt}function wi(e={},t={}){const a=[],n=k(t.participantType||e.participantType),i=rt(e.birthDate,t.asOf),o=[["fullName","fullName is required"],["birthDate","birthDate is required"],["phone","phone is required"],["email","email is required"]];for(const[c,d]of o)String(e[c]||"").trim()||a.push(d);if(e.email&&!String(e.email).includes("@")&&a.push("email must be valid"),n==="adult"&&i!==null&&i<wt&&a.push("adult participant must be 19 or older"),n==="minor"&&i!==null&&i>=wt&&a.push("minor participant must be under 19"),n==="minor"||!n&&Ft(e,t)){const c=e.guardian||{};String(c.name||"").trim()||a.push("guardian.name is required for students under 19"),String(c.relation||"").trim()||a.push("guardian.relation is required for students under 19"),String(c.phone||"").trim()||a.push("guardian.phone is required for students under 19"),String(c.email||"").trim()||a.push("guardian.email is required for students under 19")}else String(e.signatureName||e.fullName||"").trim()||a.push("signatureName is required");return{valid:a.length===0,errors:a}}function Pi(e={},t={}){const a=t.now||new Date().toISOString(),n=e.guardian||{},i=e.emergency||{};return{id:e.id||Z("student",e.email||e.fullName||a),fullName:k(e.fullName),birthDate:k(e.birthDate),age:rt(e.birthDate,t.asOf||a),phone:k(e.phone),email:k(e.email).toLowerCase(),participantType:k(e.participantType),address:k(e.address),primarySport:k(e.primarySport),experience:k(e.experience),preferredClassTime:k(e.preferredClassTime),notes:k(e.notes),source:k(e.source||"website"),staffNotes:k(e.staffNotes),guardianName:k(n.name),guardianRelation:k(n.relation),guardianPhone:k(n.phone),guardianEmail:k(n.email).toLowerCase(),emergencyName:k(i.name),emergencyPhone:k(i.phone),emergencyRelation:k(i.relation),medicalNotes:k(e.medicalNotes),allergies:k(e.allergies),injuries:k(e.injuries),photoConsent:!!e.photoConsent,marketingConsent:!!e.marketingConsent,createdAt:e.createdAt||a,updatedAt:a}}function Ii(e={},t="adult"){const a=e.guardian||{};return t==="minor"?{name:k(a.name),phone:k(a.phone),email:k(a.email).toLowerCase(),participantName:k(e.fullName),participantEmail:k(e.email).toLowerCase(),participantPhone:k(e.phone),guardianName:k(a.name),guardianRelation:k(a.relation),guardianPhone:k(a.phone),guardianEmail:k(a.email).toLowerCase()}:{name:k(e.fullName),phone:k(e.phone),email:k(e.email).toLowerCase(),participantName:k(e.fullName),participantEmail:k(e.email).toLowerCase(),participantPhone:k(e.phone)}}function Ci(e=[],t={},a={}){const n=Pi(t,a),i=e.findIndex(o=>n.email&&o.email?.toLowerCase()===n.email);if(i>=0){const o=[...e];return o[i]={...o[i],...n,id:o[i].id,createdAt:o[i].createdAt||n.createdAt},{students:o,student:o[i]}}return{students:[n,...e],student:n}}function Ti({studentId:e,orderId:t,template:a=J,signerName:n,signerRelation:i,participantType:o="",templateAudience:l="",ipAddress:c="",userAgent:d="",now:u=new Date().toISOString()}={}){return{id:Z("waiver-signature",`${e}:${t}:${a.version}:${u}`),studentId:e,orderId:t,templateId:a.id,templateVersion:a.version,participantType:k(o),templateAudience:k(l||o),signerName:k(n),signerRelation:k(i),signedAt:u,ipAddress:c,userAgent:d}}function Ja({records:e={},order:t={},now:a=new Date().toISOString()}={}){const n=[...e.enrollments||[]],i=[...e.creditPackages||[]],o=[...e.creditTransactions||[]];if(!ue(t))return{...e,enrollments:n,creditPackages:i,creditTransactions:o};for(const l of t.items||[])if((l.kind==="session"||l.kind==="court"||l.kind==="booking"||l.kind==="waitlist")&&n.push({id:Z("enrollment",`${t.id}:${l.id||l.cartId}:${l.kind}`),orderId:t.id,studentId:t.studentId,courseSessionId:l.id||l.serviceId,title:l.title,programId:l.programId||l.serviceId||"",status:l.kind==="waitlist"?"waitlisted":"confirmed",quantity:Number(l.quantity||1),createdAt:a}),l.kind==="package"){const c={id:Z("credit-package",`${t.id}:${l.id}:${a}`),orderId:t.id,studentId:t.studentId,studentName:t.studentName||"",programId:l.programId,title:l.title,originalCredits:Number(l.credits||0),balance:Number(l.credits||0),purchasedAt:a,expiresAt:l.expiresAt||Vi(a,12)};i.push(c),o.push({id:Z("credit-transaction",`${c.id}:purchase`),packageIds:[c.id],studentId:t.studentId,programId:l.programId,type:"purchase",units:c.originalCredits,balanceAfter:c.balance,reason:"purchase",orderId:t.id,createdAt:a})}return{...e,enrollments:n,creditPackages:i,creditTransactions:o}}function ue(e={}){return $i.has(e.status||"confirmed")}function Ka({creditPackages:e=[],creditTransactions:t=[],studentId:a,programId:n,units:i=1,reason:o="check-in",staffId:l="",now:c=new Date().toISOString()}={}){let d=Number(i||0);const u=e.map(f=>({...f})),p=u.filter(f=>f.studentId===a&&f.programId===n&&Number(f.balance||0)>0).sort((f,C)=>String(f.expiresAt||"").localeCompare(String(C.expiresAt||""))),$=[];for(const f of p){if(d<=0)break;const C=Math.min(Number(f.balance||0),d);f.balance=Number(f.balance||0)-C,d-=C,$.push(f.id)}if(d>0)throw new Error("Insufficient course credits");const S=u.filter(f=>f.studentId===a&&f.programId===n).reduce((f,C)=>f+Number(C.balance||0),0),y={id:Z("credit-transaction",`${a}:${n}:${i}:${c}:${o}`),packageIds:$,studentId:a,programId:n,type:"usage",units:-Math.abs(Number(i||0)),balanceAfter:S,reason:o,staffId:l,createdAt:c};return{creditPackages:u,creditTransactions:[...t,y]}}function Ai(e=[],t={}){const a=k(t.email).toLowerCase();return!a||!k(t.password)?null:e.find(n=>k(n.email).toLowerCase()===a)||null}function ot(e={},t,a={}){const n=(e.students||[]).find(v=>v.id===t)||null,i=(e.enrollments||[]).filter(v=>v.studentId===t),o=(e.creditPackages||[]).filter(v=>v.studentId===t),l=o.filter(v=>v.programId!=="membership"),c=(e.creditTransactions||[]).filter(v=>v.studentId===t),d=(e.bookings||[]).filter(v=>v.studentId===t&&v.status!=="cancelled"),u=d.filter(v=>v.kind==="order"),p=d.filter(v=>v.kind==="resource"||v.serviceId&&v.kind!=="order"),$=(e.waiverSignatures||[]).filter(v=>v.studentId===t),S=u.flatMap(v=>(v.items||[]).filter(O=>O.programId==="membership"||/membership/i.test(O.title||"")).map(O=>({...O,orderId:v.id,purchasedAt:v.createdAt}))),y=o.filter(v=>v.programId==="membership"||/membership/i.test(v.title||"")).map(v=>({...v,kind:"membership-package",orderId:v.orderId||"",purchasedAt:v.purchasedAt})),f=[...S,...y],C=Mi({creditPackages:o,orders:u},a),P=l.reduce((v,O)=>v+Number(O.originalCredits||0),0),G=l.reduce((v,O)=>v+Number(O.balance||0),0),Ae=Math.max(0,P-G),gt=[...new Set([...i.map(v=>v.programId),...o.map(v=>v.programId),...u.flatMap(v=>(v.items||[]).map(O=>O.programId))].filter(Boolean))],Ke=[...i.map(v=>({id:v.id,kind:"class",title:v.title||v.courseSessionId,programId:v.programId,status:v.status,date:v.startsAt||v.createdAt||""})),...p.map(v=>({id:v.id,kind:"court",title:v.serviceLabel_en||v.serviceId||"Court booking",title_zh:v.serviceLabel_zh||v.serviceLabel_en||v.serviceId||"场地预约",programId:v.programId||"court-rental",status:v.status||"confirmed",date:[v.date,v.startTime&&v.endTime?`${v.startTime}-${v.endTime}`:""].filter(Boolean).join(" ")}))];return{student:n,enrollments:i,programs:gt,creditPackages:l,membershipPackages:y,creditTransactions:c,creditTotals:{original:P,used:Ae,remaining:G},memberships:f,membership:C,membershipLevel:C.level,orders:u,courtBookings:p,waivers:$,upcomingSchedule:Ke,pastSchedule:[],emptyStates:{enrollments:i.length===0,credits:o.length===0,orders:u.length===0,waivers:$.length===0,schedule:Ke.length===0},alerts:n?Ya(n,e,a):[]}}function Mi(e={},t={}){const a=t.now||new Date().toISOString(),o=[...(e.creditPackages||[]).filter(l=>l.programId==="membership"||/membership/i.test(l.title||"")).map(l=>({id:l.id,source:"creditPackage",title:l.title||"",expiresAt:l.expiresAt||"",purchasedAt:l.purchasedAt||"",active:Number(l.balance??1)>0,item:l})),...(e.orders||e.bookings||[]).filter(l=>l.kind==="order"&&ue(l)).flatMap(l=>(l.items||[]).filter(c=>c.programId==="membership"||/membership/i.test(c.title||"")).map(c=>({id:`${l.id}:${c.id||c.title}`,source:"order",title:c.title||"",expiresAt:c.expiresAt||"",purchasedAt:l.createdAt||"",active:!0,item:{...c,orderId:l.id}})))].filter(l=>l.active&&(!l.expiresAt||xt(l.expiresAt,a)>=0)).map(l=>({...l,level:xi(l)})).filter(l=>l.level!=="visitor").sort((l,c)=>da(c.level)-da(l.level)||String(c.expiresAt||"").localeCompare(String(l.expiresAt||"")))[0];return o?{level:o.level,title:o.level==="plus"?"Membership Plus":"Regular Membership",expiresAt:o.expiresAt,source:o.source,purchasedAt:o.purchasedAt,item:o.item}:{level:"visitor",title:"Visitor",expiresAt:"",source:"none",purchasedAt:"",item:null}}function Ya(e={},t={},a={}){const n=qi(e.id,t),i=[];return n.waiverCount===0&&i.push("Missing waiver"),n.lowestBalance!==null&&n.lowestBalance<=3&&i.push("Low credits"),n.nextExpiry&&xt(n.nextExpiry,a.now||new Date().toISOString())<=45&&i.push("Credits expiring soon"),n.unpaidOrderCount>0&&i.push("Unpaid order"),Ft(e,{asOf:a.now})&&!k(e.guardianName)&&i.push("Missing guardian"),i}function zi(e=[],t={},a={}){const n=k(a.query).toLowerCase();return e.filter(i=>{const o=ot(t,i.id,{now:a.now}),l=o.alerts,c=[i.fullName,i.email,i.phone,i.guardianName].map(k).join(" ").toLowerCase();return!(n&&!c.includes(n)||a.programId&&!o.programs.includes(a.programId)||a.status==="lowBalance"&&!l.includes("Low credits")||a.status==="member"&&o.membershipLevel==="visitor"||["visitor","regular","plus"].includes(a.status)&&o.membershipLevel!==a.status||a.status==="missingWaiver"&&!l.includes("Missing waiver")||a.status==="unpaid"&&!l.includes("Unpaid order")||a.status==="expiring"&&!l.includes("Credits expiring soon"))})}function st(e={},t,a={}){const n=a.now||new Date().toISOString();return(e.creditPackages||[]).filter(i=>i.studentId===t).filter(i=>i.programId!=="membership").filter(i=>Number(i.balance||0)>0).filter(i=>!i.expiresAt||xt(i.expiresAt,n)>=0).map(i=>({...i,used:Math.max(0,Number(i.originalCredits||0)-Number(i.balance||0)),remaining:Number(i.balance||0),canBook:!0})).sort((i,o)=>String(i.expiresAt||"9999-12-31").localeCompare(String(o.expiresAt||"9999-12-31")))}function qt(e={},t,a,n={}){const i=st(e,t,n).find(o=>o.id===a);return i?i.programId==="court-rental"?(e.bookingServices||[]).filter(o=>o.public!==!1).map(o=>({kind:"resource",id:o.id,serviceId:o.id,title:o.label_en||o.id,title_zh:o.label_zh||o.label_en||o.id,programId:"court-rental",service:o})):i.programId==="open-gym"?(e.openCourtSlots||[]).filter(o=>o.active!==!1).filter(o=>Pt(o,e.bookings||[])>0).map(o=>({kind:"openGym",id:o.id,title:o.title_en||o.id,title_zh:o.title_zh||o.title_en||o.id,programId:"open-gym",date:o.date,startTime:o.startTime,endTime:o.endTime,startsAt:Hi(o),remaining:Pt(o,e.bookings||[])})):(e.sessions||[]).filter(o=>o.active!==!1).filter(o=>o.programId===i.programId).map(o=>({kind:"class",id:o.id,title:o.title_en||o.title||o.id,title_zh:o.title_zh||o.title_en||o.title||o.id,programId:o.programId,date:o.date||o.dates||o.dateSummary||"",time:o.time||"",startsAt:o.startsAt||o.date||"",session:o})):[]}function Ni({records:e={},studentId:t,packageId:a,option:n={},now:i=new Date().toISOString()}={}){const o=(e.creditPackages||[]).map(f=>({...f})),l=[...e.creditTransactions||[]],c=[...e.enrollments||[]],d=[...e.bookings||[]],u=(e.openCourtSlots||[]).map(f=>({...f})),p=o.find(f=>f.id===a&&f.studentId===t);if(!p||Number(p.balance||0)<=0)throw new Error("No usable member credit package");if(!Ui(p,n))throw new Error("Selected time does not match this package");p.balance=Number(p.balance||0)-1;const $=o.filter(f=>f.studentId===t&&f.programId===p.programId).reduce((f,C)=>f+Number(C.balance||0),0),S={id:Z("credit-transaction",`${t}:${a}:${n.kind}:${n.id}:${i}:member-reservation`),packageIds:[a],studentId:t,programId:p.programId,type:"usage",units:-1,balanceAfter:$,reason:"member reservation",orderId:"",createdAt:i};l.push(S);const y={id:Z("member-usage",`${t}:${a}:${n.kind}:${n.id}:${i}`),studentId:t,programId:p.programId,title:n.title||n.title_en||n.id,title_zh:n.title_zh||n.title||n.id,status:"confirmed",memberUsage:!0,creditPackageId:a,creditTransactionId:S.id,createdAt:i,startsAt:n.startsAt||n.date||""};if(n.kind==="class")c.push({...y,orderId:"",courseSessionId:n.id,quantity:1});else{const f={...y,kind:n.kind==="openGym"?"open-gym":"resource",source:"member",serviceId:n.serviceId||n.id,serviceLabel_en:n.title||n.id,serviceLabel_zh:n.title_zh||n.title||n.id,openGymSlotId:n.kind==="openGym"?n.id:"",date:n.date||"",startTime:n.startTime||"",endTime:n.endTime||"",quantity:Number(n.quantity||1),machinePosition:n.machinePosition||"",resources:n.resources||n.service?.resources||[],customer:{},paymentMethod:"Member Credit",paymentStatus:"member-credit",lockStatus:"locked"};if(d.unshift(f),n.kind==="openGym"){const C=u.find(P=>P.id===n.id);C&&(C.spots=Math.max(0,Number(C.spots||0)-1))}}return{...e,enrollments:c,bookings:d,creditPackages:o,creditTransactions:l,openCourtSlots:e.openCourtSlots?u:e.openCourtSlots}}function Li({records:e={},studentId:t,usageId:a,now:n=new Date().toISOString(),cutoffHours:i=48}={}){const o=(e.enrollments||[]).map(P=>({...P})),l=(e.bookings||[]).map(P=>({...P})),c=(e.creditPackages||[]).map(P=>({...P})),d=[...e.creditTransactions||[]],u=(e.openCourtSlots||[]).map(P=>({...P})),p=o.find(P=>P.id===a&&P.studentId===t&&P.memberUsage),$=l.find(P=>P.id===a&&P.studentId===t&&P.memberUsage),S=p||$;if(!S)return{...e,cancelled:!1,reason:"Member usage not found"};if(S.status==="cancelled")return{...e,cancelled:!1,reason:"Already cancelled"};const y=ji(S);if(y&&Gi(y,n)<i)return{...e,cancelled:!1,reason:"Cancellation window has passed"};S.status="cancelled",S.cancelledAt=n;const f=c.find(P=>P.id===S.creditPackageId&&P.studentId===t);f&&(f.balance=Number(f.balance||0)+1);const C=c.filter(P=>P.studentId===t&&P.programId===S.programId).reduce((P,G)=>P+Number(G.balance||0),0);if(d.push({id:Z("credit-transaction",`${t}:${a}:${n}:member-cancellation`),packageIds:S.creditPackageId?[S.creditPackageId]:[],studentId:t,programId:S.programId,type:"adjustment",units:1,balanceAfter:C,reason:"member cancellation",orderId:"",createdAt:n}),$?.openGymSlotId){const P=u.find(G=>G.id===$.openGymSlotId);P&&(P.spots=Number(P.spots||0)+1)}return{...e,cancelled:!0,enrollments:o,bookings:l,creditPackages:c,creditTransactions:d,openCourtSlots:e.openCourtSlots?u:e.openCourtSlots}}function Ei(e=[],t={}){return lt(Si,e.map(a=>({...a,age:a.age??rt(a.birthDate,t.asOf||new Date)})))}function Bi(e=[]){return lt(ki,e.map(t=>({...t,items:(t.items||[]).map(a=>a.title||a.id).join("; ")})))}function Ri(e=[]){return lt(_i,e)}function Di(e=[]){const t=new Map;for(const a of e){const n=`${a.studentId}|${a.programId}`,i=t.get(n)||{studentId:a.studentId,studentName:a.studentName||"",programId:a.programId,balance:0,firstExpiry:a.expiresAt||"",lastExpiry:a.expiresAt||""};i.studentName=i.studentName||a.studentName||"",i.balance+=Number(a.balance||0),a.expiresAt&&(!i.firstExpiry||a.expiresAt<i.firstExpiry)&&(i.firstExpiry=a.expiresAt),a.expiresAt&&(!i.lastExpiry||a.expiresAt>i.lastExpiry)&&(i.lastExpiry=a.expiresAt),t.set(n,i)}return lt(["studentId","studentName","programId","balance","firstExpiry","lastExpiry"],[...t.values()])}function lt(e,t){return[e.join(","),...t.map(a=>e.map(n=>Fi(a[n])).join(","))].join(`
`)}function Fi(e){const t=String(e??"");return/[",\n\r]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function k(e){return String(e||"").trim()}function qi(e,t={}){const a=(t.creditPackages||[]).filter(c=>c.studentId===e&&c.programId!=="membership"),n=(t.waiverSignatures||[]).filter(c=>c.studentId===e),i=(t.bookings||[]).filter(c=>c.kind==="order"&&c.studentId===e),o=a.map(c=>Number(c.balance||0)),l=a.map(c=>c.expiresAt).filter(Boolean).sort();return{waiverCount:n.length,lowestBalance:o.length?Math.min(...o):null,nextExpiry:l[0]||"",unpaidOrderCount:i.filter(c=>(c.paymentStatus||"")!=="paid").length}}function xt(e,t){const a=new Date(`${String(e).slice(0,10)}T12:00:00.000Z`),n=new Date(t);return Number.isNaN(a.getTime())||Number.isNaN(n.getTime())?1/0:Math.ceil((a.getTime()-n.getTime())/864e5)}function xi(e={}){const t=e.item?.membershipLevel||e.membershipLevel;return["regular","plus"].includes(t)?t:Oi(e.title)}function Oi(e=""){const t=k(e).toLowerCase();return t?t.includes("plus")||t.includes("training benefit")?"plus":t.includes("regular")||t.includes("general")||t.includes("membership")?"regular":"visitor":"visitor"}function da(e){return e==="plus"?2:e==="regular"?1:0}function Ui(e={},t={}){return e.programId==="court-rental"?t.kind==="resource"&&(t.programId||"court-rental")==="court-rental":e.programId==="open-gym"?t.kind==="openGym"&&(t.programId||"open-gym")==="open-gym":t.kind==="class"&&t.programId===e.programId}function Pt(e={},t=[]){const a=t.filter(n=>n.openGymSlotId===e.id&&n.status!=="cancelled").reduce((n,i)=>n+Number(i.quantity||1),0);return Math.max(0,Number(e.spots||0)-a)}function Hi(e={}){return!e.date||!e.startTime?e.date||"":`${e.date}T${e.startTime}:00.000`}function ji(e={}){const t=e.startsAt||(e.date&&e.startTime?`${e.date}T${e.startTime}:00.000`:e.date);if(!t)return null;const a=new Date(t);return Number.isNaN(a.getTime())?null:a}function Gi(e,t){const a=e instanceof Date?e:new Date(e),n=new Date(t);return Number.isNaN(a.getTime())||Number.isNaN(n.getTime())?1/0:(a.getTime()-n.getTime())/36e5}function Z(e,t){let a=0;const n=String(t||`${Date.now()}-${Math.random()}`);for(let i=0;i<n.length;i+=1)a=(a<<5)-a+n.charCodeAt(i)|0;return`${e}-${Math.abs(a).toString(36)}`}function Vi(e,t){const a=new Date(e);return Number.isNaN(a.getTime())?"":(a.setUTCMonth(a.getUTCMonth()+t),a.toISOString().slice(0,10))}const Wi=["auto","member","non_member"];function Qa(e){return String(e||"").trim()}function ua(e){return Qa(e).toLowerCase()}function ma(e){return Qa(e).replace(/\D/g,"")}function Ji(e,t){return!e||!t?!1:e===t?!0:e.length>=10&&t.length>=10&&e.slice(-10)===t.slice(-10)}function Ki(e){return Number(e?.memberPrice??e?.nonMemberPrice??e?.price??0)}function Yi(e){return Number(e?.nonMemberPrice??e?.price??0)}function Qi(e){return Wi.includes(e)?e:"auto"}function pa(e={}){const t=e.membership?.title||"";return/plus/i.test(t)||e.membershipLevel==="plus"?"Membership Plus":/regular/i.test(t)||e.membershipLevel==="regular"?"Regular Membership":"Visitor"}function bt(e){const t=new Set;return e.filter(a=>!a?.id||t.has(a.id)?!1:(t.add(a.id),!0))}function Xi(e={},{email:t="",phone:a=""}={}){const n=ua(t),i=ma(a),o=e.students||[],l=n?o.filter(d=>[d.email,d.guardianEmail].some(u=>ua(u)===n)):[],c=i?o.filter(d=>[d.phone,d.guardianPhone].some(u=>Ji(ma(u),i))):[];return{emailMatches:bt(l),phoneMatches:bt(c),allMatches:bt([...l,...c])}}function Xa({records:e={},service:t,duration:a=60,quantity:n=1,pricingMode:i="auto",email:o="",phone:l="",now:c=new Date().toISOString()}={}){const d=Qi(i),u=Xi(e,{email:o,phone:l}),p=u.emailMatches[0]||null,$=u.phoneMatches[0]||null,S=p&&$&&p.id!==$.id,y=S?null:p||$||u.allMatches[0]||null,f=y?ot(e,y.id,{now:c}):null,C=["regular","plus"].includes(f?.membershipLevel),P=d==="member"?"member":d==="non_member"?"non_member":C&&!S?"member":"non_member",G=d==="auto"?"auto":"manual",Ae=P==="member"?Ki(t):Yi(t),gt=Math.round(Ae*(Number(a||60)/60)*1),Ke=f?.membershipLevel||"visitor";let v="No member match yet. Non-member rate is selected.",O="";return S?(O="contact_conflict",v="Email and phone match different accounts. Confirm the customer, then choose Member or Non-member manually."):f?.student&&C?v=`Detected: ${pa(f)} - ${f.student.fullName||f.student.email||f.student.id}`:f?.student?v=`No active membership found for ${f.student.fullName||f.student.email||f.student.id}.`:d!=="auto"&&(v="Manual pricing selected. No member account match is required."),d==="member"&&!C?v="Manual member rate selected. No active member match is connected to this booking.":d==="non_member"&&f?.student&&(v=`Manual non-member rate selected for ${f.student.fullName||f.student.email||f.student.id}.`),{pricingMode:d,pricingSource:G,customerType:P,hourlyRate:Ae,total:gt,quantity:Number(n||1),duration:Number(a||60),matchedStudentId:f?.student?.id||"",matchedStudentName:f?.student?.fullName||"",matchedStudentEmail:f?.student?.email||"",matchedStudentPhone:f?.student?.phone||"",membershipLevel:Ke,membershipTitle:f?.membership?.title||pa(f||{}),message:v,warning:O}}const ga={BASE_URL:"/first-light-client-preview/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};function Pe(){return typeof import.meta<"u"&&ga?ga:{}}function ba(e,t){return e?.[t]||e?.[`_${t}`]||""}function Re(e=Pe()){return{supabaseUrl:ba(e,"VITE_SUPABASE_URL").replace(/\/+$/,""),anonKey:ba(e,"VITE_SUPABASE_ANON_KEY")}}function De(e=Pe()){const t=Re(e);return!!(t.supabaseUrl&&t.anonKey)}function Za(e,t=Pe()){const{supabaseUrl:a}=Re(t);if(!a)throw new Error("Supabase URL is not configured.");return`${a}/functions/v1/${e}`}function ha(e){return Math.round(Number(e||0)*100)}function fa(e,t){const a=e?.origin||"",n=e?.pathname||"/";return`${a}${n}${t}`}function Ot(e,t={}){return{apikey:e.anonKey,authorization:`Bearer ${e.anonKey}`,"content-type":"application/json",...t}}function Zi({cart:e=[],total:t=0,data:a={},participantType:n="adult",language:i="en",waiverTemplate:o={},locationLike:l=typeof window<"u"?window.location:null}={}){return{participantType:n,language:i,totalCents:ha(t),successUrl:fa(l,"#confirmation"),cancelUrl:fa(l,"#cart"),customer:{name:a.name||a.guardianName||"",email:a.email||a.guardianEmail||"",phone:a.phone||a.guardianPhone||""},student:{fullName:a.name||"",birthDate:a.birthDate||"",phone:a.phone||a.guardianPhone||"",email:a.email||a.guardianEmail||"",address:a.address||"",primarySport:a.primarySport||"",experience:a.experience||"",preferredClassTime:a.preferredTime||"",medicalNotes:a.medicalNotes||"",photoConsent:a.photoConsent===!0||a.photoConsent==="on",marketingConsent:a.marketingConsent===!0||a.marketingConsent==="on"},guardian:n==="minor"?{name:a.guardianName||"",relation:a.guardianRelation||"",phone:a.guardianPhone||"",email:a.guardianEmail||""}:null,emergency:{name:a.emergency||"",phone:a.emergencyPhone||""},waiver:{templateId:o.id||"liability",templateVersion:o.version||"",title:o.title_en||o.title||"",signerName:a.signatureName||"",signerRelation:a.signatureRelation||a.guardianRelation||(n==="minor"?"Guardian":"Self")},items:e.map(c=>({kind:c.kind||"item",id:c.id||"",title:c.title||"",programId:c.programId||"",quantity:Number(c.quantity||1),credits:Number(c.credits||c.quantity||0),priceCents:ha(c.price),meta:c.meta||"",date:c.date||"",startTime:c.startTime||"",endTime:c.endTime||"",serviceId:c.serviceId||"",machinePosition:c.machinePosition||"",expiresAt:c.expiresAt||""}))}}async function Ut(e,t){const a=await e.text(),n=a?JSON.parse(a):{};if(!e.ok)throw new Error(n.error||t);return n}async function er({cart:e=[],total:t=0,data:a={},participantType:n="adult",language:i="en",waiverTemplate:o={},env:l=Pe(),fetchImpl:c=fetch,locationLike:d=typeof window<"u"?window.location:null}={}){const u=Re(l);if(!De(l))throw new Error("Production checkout is not configured.");const p=await c(Za("create-checkout-session",l),{method:"POST",headers:Ot(u),body:JSON.stringify(Zi({cart:e,total:t,data:a,participantType:n,language:i,waiverTemplate:o,locationLike:d}))}),$=await Ut(p,"Could not start secure checkout.");return{orderId:$.orderId||"",checkoutUrl:$.checkoutUrl||$.url||""}}async function tr({email:e,password:t,env:a=Pe(),fetchImpl:n=fetch}={}){const i=Re(a);if(!De(a))throw new Error("Production member login is not configured.");const o=await n(`${i.supabaseUrl}/auth/v1/token?grant_type=password`,{method:"POST",headers:Ot(i),body:JSON.stringify({email:e,password:t})}),l=await Ut(o,"Member login failed.");return{accessToken:l.access_token,refreshToken:l.refresh_token,user:l.user}}async function ar({accessToken:e,env:t=Pe(),fetchImpl:a=fetch}={}){const n=Re(t);if(!e)throw new Error("Member session is missing.");const i=await a(Za("member-account",t),{method:"GET",headers:Ot(n,{authorization:`Bearer ${e}`})});return Ut(i,"Could not load member account.")}const en=["main-full","main-half","shooting-machine"],nr=new Set(["volleyball-training","small-full","small-half-a","small-half-b","basketball-training"]),B="student-test-member",ir=e=>`/first-light-client-preview/${e.replace(/^\/+/,"")}`,rr=ir("shooting-machines-layout-2d.jpg"),or=2500,sr=12*1024*1024,It=9e5,tn=1600;let va=null;const Ht="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/image-high-c5s6nl.png?enable=upscale&enable-io=true&height=70",an="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/image-high-c5s6nl.png?enable=upscale&enable-io=true&height=140",_="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/image-high-9yub2i.png?crop=1.7424%3A1%2Coffset-x74&enable=upscale&enable-io=true&width=1600",lr="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/wechatimg223-standard.jpg",Me="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/2461777510886_-pic_hd-standard.jpg",Qe="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/2451777510883_-pic_hd-standard.jpg",ze="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/2431777510877_-pic_hd-standard.jpg",fe=["Jun 29-Jul 3","Jul 6-Jul 10","Jul 13-Jul 17","Jul 20-Jul 24","Jul 27-Jul 31","Aug 3-Aug 7","Aug 10-Aug 14","Aug 17-Aug 21","Aug 24-Aug 28","Aug 31-Sep 4"],ht={beginner:["May 11","May 18","Jun 1","Jun 8","Jun 15","Jun 22"],advanced:["May 12","May 14","May 19","May 21","May 26","May 28","Jun 2","Jun 4","Jun 11","Jun 18","Jun 25"],elite:["May 15","May 29","Jun 5","Jun 12","Jun 19","Jun 26"]},Fe="06:00",ct="15:00",nn=[{id:"visitor",label_en:"Visitor",label_zh:"Visitor",price:18},{id:"regular",label_en:"Regular Member",label_zh:"Regular Member",price:18},{id:"plus",label_en:"Member Plus",label_zh:"Member Plus",price:0}],Xe={en:{nav:["Home","Train Today","Programs","Coaches","Schedule","Contact"],cart:"Checkout",admin:"Admin",lang:"中文",learn:"Learn More",add:"Add to Cart",addedToCart:"Added to cart",spots:"spots left",sold:"Sold Out",member:"Member",regular:"Regular",checkout:"Checkout",waiver:"I have read and agree to the First Light waiver and release.",confirmation:"Booking confirmed. A confirmation email has been prepared for the customer.",back:"Back",home:"Home",basketball:"Basketball",volleyball:"Volleyball",conditioning:"Conditioning",courtRental:"Court Rental",openCourt:"OPEN GYM",privateTraining:"Private Training",league:"League",membership:"Membership",merchandise:"Merchandise",account:"Account",wishlist:"Wishlist",cartLabel:"Cart",bookingSystem:{eyebrow:"Booking System",title:"Book Court Time",description:"Half-hour scheduling with automatic conflict protection for main court, small court, and shooting machines.",mainCourt:"Main court",smallCourt:"Small court",date:"Date",duration:"Duration",machineSpots:"Machine spots",participants:"Participants",estimated:"Estimated",liveNote:"This schedule recalculates immediately after new bookings or cancellations.",empty:"No available times for this date.",footer:"Pick a time above, then continue to checkout.",selected:"Selected",available:"Available",left:"left",booking:"booking",spotsUnit:"spot(s)",conflictFallback:"This time is no longer available."},checkoutForm:{pageSubtitle:"Multiple courses, court slots, open gym, memberships, and merchandise can be checked out together.",selectedItems:"Selected items",emptyCart:"Your cart is empty.",total:"Total",orderSummary:"Order summary",subtotal:"Subtotal",taxes:"Taxes/fees: shown by real payment provider before launch.",confirmationDetails:"Waiver, customer contact, payment method, payment status, and lock status appear on confirmation.",participantType:"Who is this checkout for?",participantTypeAdult:"Adult / self checkout",participantTypeAdultHelp:"Use this for adult court rentals, adult courses, and adult membership purchases.",participantTypeMinor:"Child / minor with guardian",participantTypeMinorHelp:"Use this when a parent or guardian is registering a player under 19.",adultSectionTitle:"Adult participant",minorSectionTitle:"Child participant",fullName:"Full name",adultFullName:"Adult participant name",minorFullName:"Child participant name",phone:"Phone",email:"Email",birthDate:"Date of birth",address:"Address",primarySport:"Primary sport",basketball:"Basketball",volleyball:"Volleyball",both:"Both",experience:"Playing experience",experiencePlaceholder:"e.g. 2 years / beginner",preferredTime:"Preferred class time",emergencyContact:"Emergency contact",emergencyPhone:"Emergency phone",guardianName:"Parent/guardian name",guardianRelation:"Parent/guardian relationship",guardianRelationPlaceholder:"Mother / Father / Guardian",guardianPhone:"Parent/guardian phone",guardianEmail:"Parent/guardian email",medical:"Medical conditions / allergies / injuries",memberStatus:"Member status",nonMember:"Non-member",generalMember:"General Member",trainingBenefit:"Membership Plus",paymentNote:"Payment note",paymentPlaceholder:"Optional card payment note",signature:"Electronic signature",signaturePlaceholder:"Signer full legal name",signerRelation:"Signer relationship",signerRelationPlaceholder:"Self / Mother / Father / Guardian",adultSignerRelationPlaceholder:"Self",minorSignerRelationPlaceholder:"Mother / Father / Guardian",notes:"Notes",photoConsent:"Photo/video release for First Light media.",marketingConsent:"Send schedule, camp, and program updates by email.",adultWaiver:"I am the adult participant/renter and have read and agree to the First Light waiver and release.",minorWaiver:"I am the parent/guardian of the minor participant and have read and agree to the First Light waiver and release on their behalf.",confirm:"Confirm booking",qty:"Qty",validationPrefix:"Please complete student information:",bookingConflict:"Booking conflict:",noLongerAvailable:"is no longer available."},memberAccount:{loginTitle:"LOGIN TO YOUR ACCOUNT",loginSubtitle:"Access your First Light member account, courses, schedule, credits, and orders.",visitorTitle:"Visitor",regularTitle:"Regular Membership",plusTitle:"Membership Plus",visitorSummary:"No active membership purchase is connected to this account yet.",regularSummary:"Open gym access and basic member benefits are active on this account.",plusSummary:"Training member pricing, open gym benefits, and priority booking are active on this account.",levelExpires:"Expires",levelSource:"Source",buyRegular:"Buy Regular Membership",buyPlus:"Buy Membership Plus",upgradePlus:"Upgrade to Membership Plus",regularBenefits:"Regular benefits: open gym member pricing, account history, waiver records, and front desk support.",plusBenefits:"Membership Plus benefits: Regular benefits plus training member pricing, selected training discounts, and priority booking notes.",visitorBenefits:"Visitor access: view or create an account, then purchase a membership to unlock member benefits.",visitorNoBooking:"Purchase Regular Membership or Membership Plus before using member self-service reservations.",sameEmailHint:"Use the same email from checkout to see your membership automatically after login.",membershipNotAdded:"Membership not added",membershipAlreadyInCart:"A membership is already in your cart. Remove it before choosing another membership.",regularAlreadyActive:"Regular Membership is already active on this account.",plusAlreadyActive:"Membership Plus is already active on this account.",plusTrainingPrice:"Membership Plus training price",memberLogin:"Member Login",loginHelp:"Use the email connected to your First Light booking record. Contact us if you need account access.",emailAddress:"Email address",password:"Password",logIn:"Log in",needAccount:"Need an account?",forgotPassword:"Forgot password?",pageTitle:"MY FIRST LIGHT ACCOUNT",pageSubtitle:"Profile, programs, schedule, credits, membership benefits, orders, and waiver records.",loggedInAs:"Logged in as",age:"age",logout:"Log out",programs:"Programs",creditsLeft:"Credits left",scheduleItems:"Schedule items",orders:"Orders",profile:"Profile",birthDate:"Birth date",address:"Address",primarySport:"Primary sport",experience:"Experience",preferredTime:"Preferred time",guardianEmergency:"Guardian / Emergency",guardian:"Guardian",guardianEmail:"Guardian email",emergency:"Emergency",medical:"Medical",benefits:"Membership Benefits",schedule:"Schedule",courseCredits:"Course Credits",purchased:"Purchased",used:"Used",remaining:"Remaining",ordersPayment:"Orders / Payment",waivers:"Waiver Records",quickUpdate:"Quick Update",phone:"Phone",emergencyPhone:"Emergency phone",medicalNotes:"Medical notes",saveUpdates:"Save updates",bookMore:"Book more programs",viewSchedule:"View full schedule",contact:"Contact First Light",reminders:"Reminder Center",cancelPolicy:"Self-cancellation is available until 48 hours before the start time.",contactFrontDesk:"Contact front desk",myProducts:"My Courses / Packages",usableHint:"Choose an active package below to reserve a matching class, court, or shooting machine time.",noUsableProducts:"No usable package balance is available right now.",selfService:"Reserve / Use Now",selfServiceHelp:"Pick a purchased package first. Available times are filtered by matching program and live availability.",chooseProduct:"Choose package",noBookableTimes:"No matching bookable times are available for this package.",reserveUse:"Reserve and use 1 credit",memberCreditCost:"Member credits",cancelAndRefund:"Cancel / refund credit",contactToCancel:"Inside 48 hours. Please contact First Light to change this booking.",reservedNotice:"Reservation confirmed. One member credit was deducted.",cancelledNotice:"Reservation cancelled. One member credit was returned.",reserveFailed:"Reservation failed.",cancelWindowPassed:"This reservation is inside the 48-hour window. Please contact First Light.",notProvided:"Not provided",tbd:"TBD",selfManaged:"Adult/self managed",noneNoted:"None noted",memberBenefit:"Member pricing / account benefit"},adminStudents:{title:"Student Management",help:"New confirmed orders automatically create or update student profiles, enrollments, credit balances, and waiver evidence.",exportStudents:"Export students CSV",exportOrders:"Export orders CSV",exportCredits:"Export credit balances CSV",exportWaivers:"Export waivers CSV",search:"Search name / Email / phone",program:"Program",allPrograms:"All programs",status:"Status",allStudents:"All students",lowBalance:"Low balance",expiring:"Credits expiring soon",member:"Membership",missingWaiver:"Missing waiver",unpaid:"Unpaid order",filter:"Filter",clear:"Clear",checkIn:"Course credit use / Check-in",student:"Student",courseType:"Program type",units:"Units to deduct",staffId:"Staff ID",reason:"Reason",deduct:"Deduct one",students:"Students",confirmed:"Confirmed enrollments",remainingCredits:"Remaining credits",waiversSigned:"Waivers signed",empty:"No students match these filters. Completed checkouts will appear here automatically."},adminBookings:{title:"Orders and Bookings",help:"Phone or front-desk bookings can be entered here. After saving, available times recalculate immediately.",manualTitle:"Phone / front-desk booking",service:"Booking service",date:"Date",startTime:"Start time",duration:"Duration",quantity:"Participants / shooting machine spots",name:"Guest name",phone:"Phone",email:"Email",paymentMethod:"Payment method",notes:"Notes",create:"Create confirmed booking",export:"Export CSV",empty:"No orders yet.",order:"Order",noDetails:"No item details",reference:"Reference",noName:"No name",confirmPayment:"Confirm payment",cancel:"Cancel",paymentStatus:"payment status",lockStatus:"lock status"},paymentStatuses:{cancelled:"cancelled",paidLocked:"paid / locked",pendingManual:"pending payment / not locked",unknown:"unknown",notLocked:"not locked",paymentApproved:"VISA/Mastercard payment approved.",onlineApproved:"Online card payment approved."},alerts:{missingWaiver:"Missing waiver",lowCredits:"Low credits",creditsExpiringSoon:"Credits expiring soon",unpaidOrder:"Unpaid order",missingGuardian:"Missing guardian",allClear:"All clear"},emptyStates:{noPrograms:"No programs yet.",noMembership:"No membership benefit purchase is recorded yet.",noSchedule:"No upcoming classes, open gym, or court bookings yet.",noCredits:"No course package balance yet.",noOrders:"No orders yet.",noWaivers:"No waiver record yet.",noEnrollments:"No enrollments.",noPackages:"No packages.",noWaiver:"No waiver."},programsPage:{title:"Programs",subtitle:"Choose the program first. Details, prices, schedules, waiver, and checkout come next."},coachesPage:{title:"Coaches",subtitle:"Large coach profiles first, details after Learn More."},schedulePage:{title:"Schedule",subtitle:"Live-style schedule for training, open gym, and court rental.",trainingSessions:"Training Sessions",trainingBody:"All sessions display spots, member pricing, regular pricing, and waiver requirements before checkout.",courtRental:"Court Rental",courtSlots:"Court Slots"},contactPage:{title:"Train with us today",subtitle:"Have questions or ready to get started? Fill out the form and a coach will reach out.",firstName:"First Name",lastName:"Last Name",email:"Email",phone:"Phone",comments:"Comments",submit:"Submit form",connect:"Connect",scanQr:"Scan QR / Contact"},leaguePage:{title:"FirstLight Hoopers League",subtitle:"Competitive, organized adult basketball in a professional indoor facility.",heading:"Adult Basketball League",body1:"First Light Adult Basketball League is designed for players who want to enjoy competitive, organized, and high-quality basketball in a professional indoor facility.",body2:"Our league provides a structured game environment for adult players of different skill levels, from recreational teams to more competitive groups. Games will be played at First Light Training Center, featuring a full-size indoor court, quality flooring, and a clean, well-managed facility.",body3:"The league focuses on fair competition, teamwork, sportsmanship, and community. Teams will compete through a regular season format, followed by playoffs. Official rules, schedules, standings, and game results will be managed by First Light.",registration:"Registration",payment:"Registration is non-refundable. Please send E-transfer payment to",contact:"Contact Us"},aboutPage:{title:"About Us",subtitle:"Our story, our facility, and why First Light exists.",facilityAlt:"First Light facility"},wishlistPage:{title:"Wishlist",subtitle:"Save programs and products for later.",emptyTitle:"Your wishlist is empty.",emptyBody:"Browse basketball, volleyball, court rental, and league options, then come back when saved items are available.",button:"View Programs"},notFound:{title:"Not Found",subtitle:"This page does not exist."}},zh:{nav:["首页","立即训练","课程项目","教练","时间表","联系"],cart:"结账",admin:"后台",lang:"英文",learn:"了解更多",add:"加入购物车",addedToCart:"已添加到购物车",spots:"个名额",sold:"已满",member:"会员价",regular:"普通价",checkout:"结账",waiver:"我已阅读并同意 First Light 免责声明。",confirmation:"预订成功。系统已为客户生成确认邮件。",back:"返回",home:"首页",basketball:"篮球",volleyball:"排球",conditioning:"体能训练",courtRental:"场地租赁",openCourt:"开放球场",privateTraining:"私教训练",league:"联赛",membership:"会员",merchandise:"周边商品",account:"会员账户",wishlist:"收藏",cartLabel:"购物车",bookingSystem:{eyebrow:"预约系统",title:"预约场地",description:"按半小时显示时间，系统会自动避免主场、小场半场和投篮机预约冲突。",mainCourt:"主场",smallCourt:"小场",date:"日期",duration:"时长",machineSpots:"投篮机位置",participants:"人数",estimated:"预计费用",liveNote:"新的预约或取消后，时间表会立即重新计算。",empty:"这一天没有可预约时间。",footer:"选择上方时间后，可继续进入结账。",selected:"已选择",available:"可预约",left:"剩余",booking:"个预约",spotsUnit:"个位置",conflictFallback:"该时间已不可预约。"},checkoutForm:{pageSubtitle:"课程、场地、开放球场、会员和商品可以一起结账。",selectedItems:"已选择项目",emptyCart:"购物车为空。",total:"合计",orderSummary:"订单摘要",subtotal:"小计",taxes:"税费/手续费：付款提交前会显示。",confirmationDetails:"确认页会显示免责协议、客户联系方式、付款方式、付款状态和锁定状态。",participantType:"本次结账对象",participantTypeAdult:"成人本人结账",participantTypeAdultHelp:"适用于成人租场、成人课程和成人会员购买。",participantTypeMinor:"儿童/未成年由监护人报名",participantTypeMinorHelp:"适用于家长或监护人为 19 岁以下学员报名。",adultSectionTitle:"成人参与者",minorSectionTitle:"儿童/未成年学员",fullName:"姓名",adultFullName:"成人参与者姓名",minorFullName:"儿童/学员姓名",phone:"电话",email:"邮箱",birthDate:"出生日期",address:"地址",primarySport:"主要运动",basketball:"篮球",volleyball:"排球",both:"两项都参加",experience:"运动经验",experiencePlaceholder:"例如：2 年 / 初学者",preferredTime:"偏好上课时间",emergencyContact:"紧急联系人",emergencyPhone:"紧急联系人电话",guardianName:"家长/监护人姓名",guardianRelation:"家长/监护人与学员关系",guardianRelationPlaceholder:"母亲 / 父亲 / 监护人",guardianPhone:"家长/监护人电话",guardianEmail:"家长/监护人邮箱",medical:"健康情况 / 过敏 / 伤病",memberStatus:"会员状态",nonMember:"非会员",generalMember:"普通会员",trainingBenefit:"训练优惠会员",paymentNote:"付款备注",paymentPlaceholder:"可填写卡支付备注",signature:"电子签名",signaturePlaceholder:"签署人法定姓名",signerRelation:"签署人与学员关系",signerRelationPlaceholder:"本人 / 母亲 / 父亲 / 监护人",adultSignerRelationPlaceholder:"本人",minorSignerRelationPlaceholder:"母亲 / 父亲 / 监护人",notes:"备注",photoConsent:"同意 First Light 使用照片/视频用于媒体内容。",marketingConsent:"同意通过邮箱接收时间表、训练营和课程更新。",adultWaiver:"我是成人参与者/租场人，已阅读并同意 First Light 免责声明。",minorWaiver:"我是未成年学员的家长/监护人，已代表学员阅读并同意 First Light 免责声明。",confirm:"确认预约",qty:"数量",validationPrefix:"请补全学员信息：",bookingConflict:"预约冲突：",noLongerAvailable:"已不可预约。"},memberAccount:{loginTitle:"登录会员账户",loginSubtitle:"查看 First Light 会员账户、课程、时间表、课包次数和订单。",visitorTitle:"访客",regularTitle:"Regular Membership",plusTitle:"Membership Plus",visitorSummary:"当前账户还没有有效会员购买记录。",regularSummary:"该账户已开通开放球场和基础会员权益。",plusSummary:"该账户已开通训练会员价、开放球场权益和优先预约权益。",levelExpires:"到期",levelSource:"来源",buyRegular:"购买 Regular Membership",buyPlus:"购买 Membership Plus",upgradePlus:"升级到 Membership Plus",regularBenefits:"Regular 权益：开放球场会员价、账户记录、免责协议记录和前台支持。",plusBenefits:"Membership Plus 权益：包含 Regular 权益，并增加训练会员价、指定训练折扣和优先预约说明。",visitorBenefits:"访客权限：可查看或创建账户，购买会员后解锁会员权益。",visitorNoBooking:"请先购买 Regular Membership 或 Membership Plus，再使用会员自助预约。",sameEmailHint:"购买时填写的同一个邮箱登录后，系统会自动显示对应会员等级。",membershipNotAdded:"会员未加入购物车",membershipAlreadyInCart:"购物车里已经有一个会员商品。请先移除后再选择其他会员。",regularAlreadyActive:"该账户已经有有效的 Regular Membership。",plusAlreadyActive:"该账户已经有有效的 Membership Plus。",plusTrainingPrice:"Membership Plus 训练会员价",memberLogin:"会员登录",loginHelp:"请使用报名或订单记录中的邮箱登录。如需开通或找回账户，请联系 First Light。",emailAddress:"邮箱",password:"密码",logIn:"登录",needAccount:"需要开通账户？",forgotPassword:"忘记密码？",pageTitle:"我的 First Light 账户",pageSubtitle:"查看个人资料、课程、时间表、课包次数、会员权益、订单和免责协议记录。",loggedInAs:"当前登录",age:"年龄",logout:"退出登录",programs:"项目",creditsLeft:"剩余次数",scheduleItems:"时间表项目",orders:"订单",profile:"个人资料",birthDate:"出生日期",address:"地址",primarySport:"主要运动",experience:"经验",preferredTime:"偏好时间",guardianEmergency:"监护人 / 紧急联系人",guardian:"监护人",guardianEmail:"监护人邮箱",emergency:"紧急联系人",medical:"健康备注",benefits:"会员权益",schedule:"时间表",courseCredits:"课包次数",purchased:"已购买",used:"已使用",remaining:"剩余",ordersPayment:"订单 / 付款",waivers:"免责协议记录",quickUpdate:"快速更新",phone:"电话",emergencyPhone:"紧急联系人电话",medicalNotes:"健康备注",saveUpdates:"保存更新",bookMore:"继续预约项目",viewSchedule:"查看完整时间表",contact:"联系 First Light",reminders:"提醒中心",cancelPolicy:"开始时间 48 小时前可自助取消并退回课时。",contactFrontDesk:"联系前台",myProducts:"我的课程 / 课包",usableHint:"选择一个有余额的课包后，可预约对应课程、球场或投篮机时间。",noUsableProducts:"目前没有可使用的课包余额。",selfService:"立即预约 / 使用",selfServiceHelp:"先选择已购买的课包，系统会按项目和实时空闲情况显示可预约时间。",chooseProduct:"选择课包",noBookableTimes:"这个课包目前没有可预约时间。",reserveUse:"预约并扣 1 次",memberCreditCost:"扣除次数",cancelAndRefund:"取消 / 退回课时",contactToCancel:"已进入 48 小时内，请联系 First Light 改期或取消。",reservedNotice:"预约已确认，并已扣除 1 次课。",cancelledNotice:"预约已取消，并已退回 1 次课。",reserveFailed:"预约失败。",cancelWindowPassed:"该预约已进入 48 小时内，请联系 First Light 处理。",notProvided:"未填写",tbd:"待定",selfManaged:"成人/本人管理",noneNoted:"暂无记录",memberBenefit:"会员价格 / 账户权益"},adminStudents:{title:"学员管理",help:"新订单确认后会自动生成或更新学员档案，并记录报名、课包余额和免责协议签署证据。",exportStudents:"导出学员 CSV",exportOrders:"导出订单 CSV",exportCredits:"导出课包余额 CSV",exportWaivers:"导出免责协议 CSV",search:"搜索姓名 / 邮箱 / 电话",program:"项目",allPrograms:"全部项目",status:"状态",allStudents:"全部学员",lowBalance:"课包余额低",expiring:"课包即将过期",member:"会员",missingWaiver:"缺少免责协议",unpaid:"未付款订单",filter:"筛选",clear:"清除",checkIn:"课包扣次 / 签到",student:"学员",courseType:"课程类型",units:"扣除次数",staffId:"员工 ID",reason:"原因",deduct:"扣一次",students:"学员",confirmed:"已确认报名",remainingCredits:"剩余课包次数",waiversSigned:"已签免责协议",empty:"暂无符合条件的学员。完成一次结账后会自动出现在这里。"},adminBookings:{title:"订单和预约",help:"电话或现场预约可以在这里录入。保存后，可预约时间表会立刻重新计算。",manualTitle:"电话 / 现场预约",service:"预约项目",date:"日期",startTime:"开始时间",duration:"时长",quantity:"人数 / 投篮机位置",name:"客人姓名",phone:"电话",email:"邮箱",paymentMethod:"付款方式",notes:"备注",create:"创建已确认预约",export:"导出 CSV",empty:"暂无订单。",order:"订单",noDetails:"暂无项目详情",reference:"付款备注",noName:"未填写姓名",confirmPayment:"确认收款",cancel:"取消",paymentStatus:"付款状态",lockStatus:"锁定状态"},paymentStatuses:{cancelled:"已取消",paidLocked:"已付款 / 已锁定",pendingManual:"待付款 / 未锁定",unknown:"未知",notLocked:"未锁定",paymentApproved:"VISA/Mastercard 付款已通过。",onlineApproved:"线上银行卡付款已通过。"},alerts:{missingWaiver:"缺少免责协议",lowCredits:"课包余额低",creditsExpiringSoon:"课包即将过期",unpaidOrder:"未付款订单",missingGuardian:"缺少监护人信息",allClear:"状态正常"},emptyStates:{noPrograms:"暂无项目。",noMembership:"暂无会员权益购买记录。",noSchedule:"暂无即将开始的课程、开放球场或场地预约。",noCredits:"暂无课包余额。",noOrders:"暂无订单。",noWaivers:"暂无免责协议记录。",noEnrollments:"暂无报名。",noPackages:"暂无课包。",noWaiver:"暂无免责协议。"},programsPage:{title:"课程项目",subtitle:"请先选择项目，进入详情后可查看价格、时间、名额、免责协议和结账信息。"},coachesPage:{title:"教练团队",subtitle:"先查看教练卡片，再进入详情了解经历和负责项目。"},schedulePage:{title:"时间表",subtitle:"查看训练、开放球场和场地租赁的实时式时间表。",trainingSessions:"训练课程",trainingBody:"所有课程在结账前都会显示名额、会员价、普通价和免责协议要求。",courtRental:"场地租赁",courtSlots:"场地时间"},contactPage:{title:"今天就开始训练",subtitle:"有问题或准备开始？填写表单后，教练会联系你。",firstName:"名字",lastName:"姓氏",email:"邮箱",phone:"电话",comments:"留言",submit:"提交表单",connect:"联系方式",scanQr:"扫码 / 联系"},leaguePage:{title:"FirstLight Hoopers 联赛",subtitle:"在专业室内场馆参加有组织、有竞争性的成人篮球联赛。",heading:"成人篮球联赛",body1:"First Light 成人篮球联赛适合希望在专业室内场馆参加高质量、有组织、有竞争性篮球比赛的球员。",body2:"联赛为不同水平的成人球员提供结构化比赛环境，从休闲球队到更具竞争力的队伍都可以参加。比赛将在 First Light Training Center 进行，场馆包含标准室内全场、优质地板和干净有序的设施。",body3:"联赛重视公平竞争、团队合作、体育精神和社区氛围。球队会参加常规赛并进入季后赛，官方规则、赛程、排名和比赛结果由 First Light 管理。",registration:"报名费",payment:"报名费不可退款。请通过 E-transfer 付款至",contact:"联系我们"},aboutPage:{title:"关于我们",subtitle:"了解 First Light 的故事、场馆和创立原因。",facilityAlt:"First Light 场馆"},wishlistPage:{title:"收藏",subtitle:"保存课程和商品，方便之后查看。",emptyTitle:"收藏夹为空。",emptyBody:"浏览篮球、排球、场地租赁和联赛选项，之后可回到这里查看已保存内容。",button:"查看项目"},notFound:{title:"页面不存在",subtitle:"这个页面不存在。"}}},L={appVersion:13,dropdownCatalogVersion:3,language:"en",pages:{home:{title_en:"FIRST LIGHT",title_zh:"FIRST LIGHT",kicker_en:"The premier basketball and volleyball training center in Richmond BC",kicker_zh:"Richmond 专业篮球与排球训练中心",line1_en:"EVERY REP COUNTS.",line1_zh:"每一次训练都算数。",line2_en:"TRAIN WITH US.",line2_zh:"和我们一起训练。",subtitle_en:"Professional training, court rental, open gym, camps, league play, and athlete development for players who want to stack better days.",subtitle_zh:"为希望持续进步的运动员提供专业训练、场地租赁、开放球场、夏令营、联赛和长期发展计划。",image:_},about:{title_en:"Our story",title_zh:"我们的故事",body_en:`First Light began in 2023 in a 2,000-square-foot warehouse, hardly a traditional training facility. Like many early-stage startups, we worked with limited resources, so we took on most of the build-out and day-to-day operations ourselves. What started with just two athletes quickly grew into a community of more than 100 players in under two years.

At the heart of First Light is a simple mission shaped by our own journey. Having competed in basketball from childhood through university, we built First Light to give kids who truly love the game access to high-quality, professional coaching. We share the lessons and experiences we've gained along the way-helping athletes avoid the setbacks we faced, build the right habits early, unlock their potential, and pursue their basketball goals with confidence.

As demand outpaced our space and schedule, we reached a point where we simply couldn't welcome everyone who wanted to train with us. That constraint became our catalyst for expanding our facility and creating an environment where more athletes can develop, compete, and grow with First Light.`,body_zh:"First Light 于 2023 年从一个 2,000 平方英尺的仓库开始。最初只有两名学员，不到两年发展成超过 100 名球员的社区。我们希望让真正热爱运动的孩子接触高质量、专业的训练。"},scheduleOverview:{title_en:"Schedule Overview",title_zh:"时间总览",subtitle_en:"",subtitle_zh:""},openGymBooking:{heroTitle_en:"OPEN GYM",heroTitle_zh:"开放球场",eyebrow_en:"Drop-in Price + Open Times",eyebrow_zh:"Drop-in 价格 + 开放时间",title_en:"Open Gym Booking",title_zh:"开放球场预约",body_en:"Review open gym pricing and booking first, then see staff-managed drop-in availability below.",body_zh:"先查看开放球场价格和预约入口，下方时间表会同步显示后台维护的可 drop-in 时间。",scheduleTitle_en:"Live Drop-in Times",scheduleTitle_zh:"实时开放时间",scheduleBody_en:"Drop-in times change weekly. Check the live schedule below before adding to cart.",scheduleBody_zh:"Drop-in 时间会按周更新，请先查看下方实时开放时间表。"},courtBookingSystem:{eyebrow_en:"Booking System",eyebrow_zh:"预约系统",title_en:"Book Court Time",title_zh:"预约场地",body_en:"Half-hour scheduling with automatic conflict protection for main court, small court, and shooting machines.",body_zh:"半小时制预约，自动保护主场、小场和投篮机的冲突时间。",liveNote_en:"This schedule recalculates immediately after new bookings or cancellations.",liveNote_zh:"新的预约或取消后，时间表会立即重新计算。",footer_en:"Pick a time above, then continue to checkout.",footer_zh:"先选择上方时间，再继续结账。"}},globalImages:[{id:"nav-logo",group:"brand",label_en:"Navigation Logo",usage_en:"Header logo and footer logo.",image:Ht,imagePositionX:"center",imagePositionY:"center",active:!0,order:1},{id:"home-hero-logo",group:"brand",label_en:"Home Hero Logo",usage_en:"Large First Light logo inside the home hero headline.",image:an,imagePositionX:"left",imagePositionY:"top",active:!0,order:2},{id:"home-hero-background",group:"hero",label_en:"Home Hero Background",usage_en:"Full-screen home page hero background image.",image:_,imagePositionX:"center",imagePositionY:"center",active:!0,order:3},{id:"default-court",group:"defaults",label_en:"Default Court Image",usage_en:"Fallback image for program, catalog, merchandise, and page surfaces without their own image.",image:_,imagePositionX:"center",imagePositionY:"center",active:!0,order:4},{id:"court-full",group:"defaults",label_en:"Full Court Default",usage_en:"Default image for full-court rental cards.",image:Me,imagePositionX:"center",imagePositionY:"center",active:!0,order:5},{id:"court-half",group:"defaults",label_en:"Half Court Default",usage_en:"Default image for half-court rental cards.",image:Qe,imagePositionX:"center",imagePositionY:"center",active:!0,order:6},{id:"court-machine",group:"defaults",label_en:"Shooting Machine Default",usage_en:"Default image for shooting-machine rental cards.",image:ze,imagePositionX:"center",imagePositionY:"center",active:!0,order:7},{id:"about-gallery-1",group:"about-gallery",label_en:"About Gallery 1",usage_en:"About page facility gallery.",image:_,imagePositionX:"center",imagePositionY:"center",active:!0,order:8},{id:"about-gallery-2",group:"about-gallery",label_en:"About Gallery 2",usage_en:"About page facility gallery.",image:Me,imagePositionX:"center",imagePositionY:"center",active:!0,order:9},{id:"about-gallery-3",group:"about-gallery",label_en:"About Gallery 3",usage_en:"About page facility gallery.",image:Qe,imagePositionX:"center",imagePositionY:"center",active:!0,order:10},{id:"about-gallery-4",group:"about-gallery",label_en:"About Gallery 4",usage_en:"About page facility gallery.",image:ze,imagePositionX:"center",imagePositionY:"center",active:!0,order:11}],dropdownPages:[{id:"basketball-small-group",parentMenu:"basketball",label_en:"Small Group Training",label_zh:"篮球小组训练",title_en:"Basketball Small Group Training",title_zh:"篮球小组训练",subtitle_en:"Focused coaching, more repetitions, and direct feedback",subtitle_zh:"专注指导、更多练习次数和直接反馈",body_en:"Small group training gives athletes a more focused environment while keeping the pace and energy of a group session.",body_zh:"小组训练让学员在更专注的环境中训练，同时保留小组课程的节奏和互动。",productIntro_en:"Linked products below show the current small group schedule, prices, spots, and checkout actions.",productIntro_zh:"下方产品会显示当前小组训练时间、价格、名额和报名入口。",image:_,sessionIds:["bb-small-u10"],order:1,active:!0},{id:"basketball-private-training",parentMenu:"basketball",label_en:"Private Training",label_zh:"私教训练",title_en:"Basketball Private Training",title_zh:"篮球私教训练",subtitle_en:"One-on-one focus. Unlimited potential.",subtitle_zh:"一对一专注训练，释放更多潜力",body_en:"Private sessions are customized around age, skill level, position, goals, and schedule.",body_zh:"私教课程会根据年龄、水平、位置、目标和时间定制。",productIntro_en:"Linked products below show private training options, pricing, and request details.",productIntro_zh:"下方产品会显示私教训练选项、价格和咨询入口。",image:_,sessionIds:["private-training"],privatePricing:!0,privatePricingColumns:structuredClone($t),privatePricingRows:structuredClone(St),order:2,active:!0},{id:"basketball-film-to-floor",parentMenu:"basketball",label_en:"Basketball IQ Workshop",label_zh:"篮球 IQ 工作坊",title_en:"Basketball IQ Workshop",title_zh:"篮球 IQ 工作坊",subtitle_en:"Turn game film into smarter decisions",subtitle_zh:"把比赛录像转化为更聪明的场上决策",body_en:"Basketball IQ Workshop connects video review with live court work so athletes can understand decisions, spacing, timing, and execution.",body_zh:"篮球 IQ 工作坊结合视频复盘和场上练习，帮助球员理解决策、空间、时机和执行。",productIntro_en:"Linked products below can be updated by staff as film sessions and court sessions change.",productIntro_zh:"下方产品可由后台随时更新，用于展示视频复盘和场上训练安排。",image:_,sessionIds:["bb-film-floor"],order:3,active:!0},{id:"basketball-shooting-lab",parentMenu:"basketball",label_en:"Shooting Lab",label_zh:"投篮实验室",title_en:"Shooting Lab",title_zh:"投篮实验室",subtitle_en:"Mechanics, reps, tracking, and confidence",subtitle_zh:"动作机制、重复练习、追踪和自信",body_en:"Shooting Lab focuses on shooting mechanics, footwork, shot preparation, repeatable rhythm, and high-quality reps.",body_zh:"投篮实验室专注于投篮动作、脚步、出手准备、稳定节奏和高质量重复练习。",productIntro_en:"Linked products below show current shooting lab schedule and pricing.",productIntro_zh:"下方产品会显示当前投篮实验室时间和价格。",image:_,sessionIds:["bb-shooting-lab"],order:4,active:!0},{id:"basketball-camps",parentMenu:"basketball",label_en:"Camps",label_zh:"篮球训练营",title_en:"Basketball Camps",title_zh:"篮球训练营",subtitle_en:"Seasonal basketball camp options in one schedule",subtitle_zh:"集中查看篮球训练营选择",body_en:"Basketball camps bring together fundamentals, advanced training, and focused small group coaching.",body_zh:"篮球训练营包含基础训练、进阶训练和精品小组指导。",productIntro_en:"Choose one or more camp products below. Staff can change camp products, prices, and schedules from the admin dashboard.",productIntro_zh:"可在下方选择训练营产品。工作人员可在后台随时调整产品、价格和时间。",image:_,sessionIds:["bb-u7-single","bb-u14-single","bb-small-u10"],order:5,active:!0},{id:"basketball-open-gym",parentMenu:"basketball",label_en:"Open Gym",label_zh:"开放球场",title_en:"Open Gym",title_zh:"开放球场",subtitle_en:"Drop in, play, and stack extra reps",subtitle_zh:"Drop-in 约球和额外训练时间",body_en:"Open gym gives players scheduled access to the court for extra shooting, games, and skill work.",body_zh:"开放球场让球员预约时间用于投篮、比赛和额外技术训练。",productIntro_en:"Open the open gym page for drop-in prices and staff-managed availability.",productIntro_zh:"进入开放球场页面查看 drop-in 价格和后台维护的可用时间。",image:_,sessionIds:["open-gym"],targetRoute:"open-court",order:6,active:!0},{id:"basketball-shooting-machines-rental",parentMenu:"basketball",label_en:"Shooting Machines Rental",label_zh:"投篮机租赁",title_en:"Shooting Machines Rental",title_zh:"投篮机租赁",subtitle_en:"Reserve shooting machine time",subtitle_zh:"预约投篮机训练时间",body_en:"Reserve the shooting machines for focused reps, form work, and extra shot volume.",body_zh:"可预约投篮机用于投篮重复练习、动作训练和额外出手量。",productIntro_en:"Open the court rental page and select Shooting Machine to view current price and availability.",productIntro_zh:"进入场地租赁页面并选择投篮机，即可查看当前价格和可预约时间。",image:ze,sessionIds:[],targetRoute:"program:court-rental",order:7,active:!0},{id:"basketball-league",parentMenu:"basketball",label_en:"League",label_zh:"联赛",title_en:"FirstLight Hoopers League",title_zh:"FirstLight Hoopers 联赛",subtitle_en:"Competitive adult basketball in a professional indoor facility",subtitle_zh:"专业室内场馆中的成人篮球联赛",body_en:"Competitive, organized adult basketball in a professional indoor facility.",body_zh:"在专业室内场馆中进行有组织、有竞争性的成人篮球。",productIntro_en:"Open the league page for format, schedule, and team details.",productIntro_zh:"进入联赛页面查看赛制、时间和球队详情。",image:_,sessionIds:[],targetRoute:"league",order:8,active:!0},{id:"volleyball-skills-training",parentMenu:"volleyball",label_en:"Skills Training",label_zh:"排球技术训练",title_en:"Volleyball Skills Training",title_zh:"排球技术训练",subtitle_en:"Foundations, advanced skill work, and elite development",subtitle_zh:"基础、进阶技术和精英发展",body_en:"Skills training helps volleyball players build fundamentals, improve game confidence, and progress into more advanced play.",body_zh:"排球技术训练帮助球员建立基础、提升比赛自信，并逐步进入更高阶的比赛能力。",productIntro_en:"Linked products below show current skill training levels, prices, and schedules.",productIntro_zh:"下方产品会显示当前技术训练级别、价格和时间。",image:_,sessionIds:["vb-u8","vb-u12","vb-u15"],order:1,active:!0},{id:"volleyball-private-training",parentMenu:"volleyball",label_en:"Private Training",label_zh:"私教训练",title_en:"Volleyball Private Training",title_zh:"排球私教训练",subtitle_en:"Personalized coaching for faster individual improvement",subtitle_zh:"个性化指导，帮助个人更快提升",body_en:"Private training is designed for athletes who want more personalized coaching and faster individual improvement.",body_zh:"私教训练适合希望获得个性化指导、加快个人提升的运动员。",productIntro_en:"Linked products below show private training options, pricing, and request details.",productIntro_zh:"下方产品会显示私教训练选项、价格和咨询入口。",image:_,sessionIds:["private-training"],privatePricing:!0,privatePricingColumns:structuredClone($t),privatePricingRows:structuredClone(St),order:2,active:!0},{id:"volleyball-camps",parentMenu:"volleyball",label_en:"Camps",label_zh:"排球训练营",title_en:"Volleyball Camps",title_zh:"排球训练营",subtitle_en:"Seasonal camp options for volleyball athletes",subtitle_zh:"适合排球运动员的季节性训练营",body_en:"Volleyball camps help young athletes build a strong foundation through structured, age-appropriate coaching.",body_zh:"排球训练营通过结构化、适龄的训练帮助年轻球员建立扎实基础。",productIntro_en:"Linked camp products below show available dates, spots, pricing, and checkout actions.",productIntro_zh:"下方训练营产品会显示可选日期、名额、价格和报名入口。",image:_,sessionIds:["vb-summer-u8-single","vb-summer-u12-single","vb-summer-u15-single"],order:3,active:!0},{id:"volleyball-open-gym",parentMenu:"volleyball",label_en:"Open Gym",label_zh:"开放球场",title_en:"Volleyball Open Gym",title_zh:"排球开放球场",subtitle_en:"Flexible court access for reps and play",subtitle_zh:"灵活球场时间，用于练习和比赛",body_en:"Open gym gives volleyball players flexible court access outside structured training.",body_zh:"开放球场让排球学员在正式课程之外获得灵活场地时间。",productIntro_en:"Open the open gym page for drop-in prices and staff-managed availability.",productIntro_zh:"进入开放球场页面查看 drop-in 价格和后台维护的可用时间。",image:_,sessionIds:["open-gym"],targetRoute:"open-court",order:4,active:!0},{id:"court-rental-page",parentMenu:"court",label_en:"Court Rental",label_zh:"场地租赁",title_en:"Court Rental",title_zh:"场地租赁",subtitle_en:"Full court, half court, and shooting machine rental",subtitle_zh:"全场、半场和投篮机租赁",body_en:"Book court time for training, team practice, runs, filming, and private sessions.",body_zh:"可预约训练、球队练习、约球、拍摄和私教课程所需的场地时间。",productIntro_en:"Open the court rental page for live booking tools and current availability.",productIntro_zh:"进入租场页面查看实时预约工具和可用时间。",image:_,sessionIds:[],targetRoute:"program:court-rental",order:1,active:!0},{id:"court-open-gym-page",parentMenu:"court",label_en:"Open Gym",label_zh:"开放球场",title_en:"Open Gym",title_zh:"开放球场",subtitle_en:"Drop in, play, and stack extra reps",subtitle_zh:"Drop-in 约球和额外训练时间",body_en:"Open gym gives players scheduled access to the court for extra shooting, games, and skill work.",body_zh:"开放球场让球员预约时间用于投篮、比赛和额外技术训练。",productIntro_en:"Open the open gym page for drop-in prices and staff-managed availability.",productIntro_zh:"进入开放球场页面查看 drop-in 价格和后台维护的可用时间。",image:_,sessionIds:["open-gym"],targetRoute:"open-court",order:2,active:!0},{id:"membership-page",parentMenu:"membership",label_en:"Membership",label_zh:"会员",title_en:"Membership",title_zh:"会员",subtitle_en:"Training benefits, open gym access, and class discounts",subtitle_zh:"训练权益、开放球场和课程折扣",body_en:"Memberships support frequent athletes with open gym benefits, priority booking, and member pricing on selected training programs.",body_zh:"会员适合高频训练的运动员，可获得开放球场权益、优先预约和部分课程会员价。",productIntro_en:"Open the membership page to compare current membership options.",productIntro_zh:"进入会员页面查看当前会员选项。",image:_,sessionIds:["general-membership","training-benefit"],targetRoute:"program:membership",order:1,active:!0},{id:"merchandise-page",parentMenu:"merchandise",label_en:"Merchandise",label_zh:"周边商品",title_en:"Merchandise",title_zh:"周边商品",subtitle_en:"First Light apparel and gear",subtitle_zh:"First Light 服饰和装备",body_en:"Browse current First Light merchandise managed from the admin dashboard.",body_zh:"查看后台管理的 First Light 周边商品。",productIntro_en:"Open the merchandise page to view products, prices, and checkout options.",productIntro_zh:"进入商品页面查看产品、价格和结账选项。",image:_,sessionIds:[],targetRoute:"merchandise",order:1,active:!0},{id:"conditioning-page",parentMenu:"conditioning",label_en:"Conditioning",label_zh:"体能训练",title_en:"Conditioning Training",title_zh:"体能训练",subtitle_en:"Strength, agility, speed, and athletic performance",subtitle_zh:"力量、敏捷、速度和运动表现训练",body_en:"Conditioning helps athletes build strength, speed, mobility, agility, and movement quality for better long-term performance.",body_zh:"体能训练帮助运动员提升力量、速度、灵活性、敏捷性和动作质量，为长期运动表现打好基础。",productIntro_en:"Open the conditioning page to learn more and contact First Light for availability.",productIntro_zh:"进入体能训练页面了解详情，并联系 First Light 确认可预约时间。",image:_,sessionIds:[],targetRoute:"program:conditioning-training",order:1,active:!0}],programs:[{id:"basketball",type:"basketball",title_en:"Basketball",title_zh:"篮球训练",subtitle_en:"Skill development, camps, and small group training",subtitle_zh:"技术发展、夏令营和小组训练",detail_en:"From U7 fundamentals to U14+ advanced training, First Light helps players improve ball handling, shooting, passing, footwork, spacing, defense, decision-making, and competitive confidence.",detail_zh:"从 U7 基础到 U14+ 进阶训练，First Light 帮助球员提升控球、投篮、传球、脚步、空间、防守、决策和比赛自信。",audience_en:"Youth athletes, competitive players, and families looking for structured basketball development.",audience_zh:"适合青少年运动员、竞争型球员，以及希望获得系统篮球训练的家庭。",image:_,order:1,active:!0,featured:!0},{id:"volleyball",type:"volleyball",title_en:"Volleyball",title_zh:"排球训练",subtitle_en:"Beginner, advanced, elite, and private training",subtitle_zh:"初级、进阶、精英和私教训练",detail_en:"Volleyball programming includes beginner foundations, advanced skill development, elite-level competition prep, private training, and summer camp options.",detail_zh:"排球项目包含初级基础、进阶技术、精英比赛准备、私教训练和夏令营选择。",audience_en:"Players from U8 to U17 who want technical growth and more game-ready confidence.",audience_zh:"适合 U8 到 U17，希望提升技术和比赛能力的球员。",image:_,order:2,active:!0,featured:!0},{id:"conditioning-training",type:"conditioning",title_en:"Conditioning Training",title_zh:"体能训练",subtitle_en:"Strength, agility, speed, and athletic performance",subtitle_zh:"力量、敏捷、速度和运动表现训练",detail_en:"Conditioning Training helps athletes build the physical base they need to move better, train harder, and stay ready for basketball, volleyball, and competition. Sessions focus on strength, agility, footwork, speed, mobility, coordination, and sustainable athletic performance.",detail_zh:"体能训练帮助运动员建立更扎实的身体基础，更好地移动、更高质量训练，并为篮球、排球和比赛做好准备。课程重点包括力量、敏捷、脚步、速度、灵活性、协调性和长期运动表现。",audience_en:"Athletes who want better movement, strength, speed, injury resilience, and all-around performance.",audience_zh:"适合希望提升移动能力、力量、速度、抗伤能力和整体运动表现的运动员。",statusTitle_en:"COMING SOON",statusTitle_zh:"即将开放",statusBody_en:"",statusBody_zh:"",statusButton_en:"",statusButton_zh:"",statusRoute:"",image:_,order:3,active:!0,featured:!0},{id:"court-rental",type:"court",title_en:"Court Rental",title_zh:"场地租赁",subtitle_en:"Full court, half court, and shooting machine rental",subtitle_zh:"全场、半场和投篮机租赁",detail_en:"Book the full court, half court, or shooting machine for training, team practice, runs, filming, and private sessions. Rental bookings require waiver signing before checkout.",detail_zh:"可预订全场、半场或投篮机，用于训练、球队练习、约球、拍摄和私教课程。租场付款前必须签署免责声明。",audience_en:"Players, teams, trainers, clubs, and groups that need a professional indoor facility.",audience_zh:"适合球员、球队、教练、俱乐部和需要专业室内场地的团体。",image:_,order:4,active:!0,featured:!0},{id:"private-training",type:"training",title_en:"Private Training",title_zh:"私教训练",subtitle_en:"One-on-one focus. Unlimited potential.",subtitle_zh:"一对一专注训练，释放更多潜力",detail_en:"Private sessions are customized around age, skill level, position, goals, and schedule. Coaches focus on feedback, repetitions, and targeted growth.",detail_zh:"私教课程会根据年龄、水平、位置、目标和时间定制，教练专注于反馈、重复训练和针对性提升。",audience_en:"Athletes who want personalized development and direct coaching attention.",audience_zh:"适合希望获得个性化发展和直接指导的运动员。",image:_,order:5,active:!0,featured:!1},{id:"open-gym",type:"membership",title_en:"Open Gym",title_zh:"开放球场",subtitle_en:"Drop in, play, and stack extra reps",subtitle_zh:"Drop-in 约球和额外训练时间",detail_en:"Open gym gives members and non-members scheduled access to the court for extra shooting, games, and skill work.",detail_zh:"开放球场让会员和非会员都可以预约时间，用于投篮、比赛和额外技术训练。",audience_en:"Players who want flexible court time outside structured training.",audience_zh:"适合需要灵活球场时间的球员。",image:_,order:6,active:!0,featured:!0},{id:"membership",type:"membership",title_en:"Membership",title_zh:"会员",subtitle_en:"Training benefits, open gym access, and class discounts",subtitle_zh:"训练权益、开放球场和课程折扣",detail_en:"Memberships support frequent athletes with open gym benefits, priority booking, and member pricing on selected training programs.",detail_zh:"会员适合高频训练的运动员，可获得开放球场权益、优先预约和部分课程会员价。",audience_en:"Families and athletes planning to train regularly at First Light.",audience_zh:"适合计划长期在 First Light 训练的家庭和运动员。",image:_,order:7,active:!0,featured:!0}],coaches:[{id:"victor",name:"Coach Victor",role_en:"Basketball Skill Development",role_zh:"篮球技术发展",bio_en:"Coach Victor brings high-level experience from Team Canada U17, NCAA Division I, U SPORTS, and professional basketball in Europe. He earned BioSteel All-Canadian recognition, won a Big Sky Conference Championship with Eastern Washington University, competed in March Madness, and later continued at SFU and UBC.",bio_zh:"Victor 教练拥有加拿大 U17 国家队、NCAA Division I、U SPORTS 与欧洲职业篮球经验。他曾获得 BioSteel All-Canadian 荣誉，随 Eastern Washington University 赢得 Big Sky 冠军并参加 March Madness，之后继续在 SFU 与 UBC 打球。",image:_,portrait:_,programs:"basketball, private-training",order:1,active:!0,featured:!0},{id:"anthony",name:"Anthony Zhao",role_en:"Volleyball Coach",role_zh:"排球教练",bio_en:"Current Douglas Men's Volleyball player, Provincial All-Star selection, 1st place at BC Provincial, 1st place Best of West, and multiple years of coaching experience with school teams and beach volleyball.",bio_zh:"现役 Douglas 男排球员，省级全明星，BC Provincial 冠军，Best of West 冠军，并拥有多年校队与沙排执教经验。",image:_,portrait:_,programs:"volleyball, private-training",order:2,active:!0,featured:!0},{id:"steven",name:"Steven Yan",role_en:"Volleyball Coach",role_zh:"排球教练",bio_en:"Team BC Indoor Volleyball Captain, Canada Cup 18U All-Star selection, BC Provincial champion and MVP, BC Summer Beach Volleyball champion, and two-time National Beach Volleyball bronze medalist.",bio_zh:"Team BC 室内排球队长，Canada Cup 18U 全明星，BC Provincial 冠军与 MVP，BC Summer Beach Volleyball 冠军，两次全国沙排铜牌获得者。",image:_,portrait:_,programs:"volleyball, private-training",order:3,active:!0,featured:!0}],sessions:[{id:"bb-u7-single",programId:"basketball",type:"basketball",title_en:"Basketball U7-U12",title_zh:"篮球 U7-U12",desc_en:"Basketball fundamentals training for young athletes: ball handling, shooting mechanics, passing, footwork, body control, spacing, cutting, and defensive fundamentals.",desc_zh:"青少年篮球基础训练：控球、投篮机制、传球、脚步、身体控制、空间、切入和防守基础。",dates:"Jun 29-Jul 3, Jul 6-Jul 10, Jul 13-Jul 17, Jul 20-Jul 24, Jul 27-Jul 31, Aug 3-Aug 7, Aug 10-Aug 14, Aug 17-Aug 21, Aug 24-Aug 28, Aug 31-Sep 4",datesList:fe,dateSummary:"10 weekly options · Jun 29-Sep 4",dateSummary_zh:"10 个周次 · 6 月 29 日-9 月 4 日",time:"9:00 AM - 12:00 PM",regularPrice:245,memberPrice:220,packages:[["2 weeks",440],["3 weeks",650],["4 weeks",860]],capacity:24,booked:8,waiver:!0,active:!0},{id:"bb-u14-single",programId:"basketball",type:"basketball",title_en:"Basketball U14+",title_zh:"篮球 U14+",desc_en:"Advanced basketball skills training with higher intensity, game-focused drills, 1-on-1, 2-on-2, 3-on-3, decision-making, and competitive scenarios.",desc_zh:"高阶篮球技能训练，包含更高强度、比赛化训练、一对一、二对二、三对三、决策和竞争场景。",dates:"Summer 2026 weekly options",datesList:fe,dateSummary:"10 weekly options · Jun 29-Sep 4",dateSummary_zh:"2026 夏季 10 个周次 · 6 月 29 日-9 月 4 日",time:"12:00 PM - 3:00 PM",regularPrice:325,memberPrice:295,packages:[["2 weeks",590],["3 weeks",865],["4 weeks",1150],["Whole summer",1850]],capacity:20,booked:5,waiver:!0,active:!0},{id:"bb-small-u10",programId:"basketball",type:"basketball",title_en:"Basketball Small Group U10-U12",title_zh:"篮球小组 U10-U12",desc_en:"Premium small group training with max 6 players for focused coaching, more repetitions, and direct feedback.",desc_zh:"最多 6 人精品小组训练，提供更多重复练习、专注指导和直接反馈。",dates:"Summer 2026 weekly options",datesList:fe,dateSummary:"10 weekly options · Jun 29-Sep 4",dateSummary_zh:"2026 夏季 10 个周次 · 6 月 29 日-9 月 4 日",time:"2:00 PM - 4:00 PM",regularPrice:425,memberPrice:385,packages:[["2 weeks",770],["3 weeks",1150],["4 weeks",1500],["Whole summer",2900]],capacity:6,booked:2,waiver:!0,active:!0},{id:"bb-film-floor",programId:"basketball",type:"basketball",title_en:"Basketball IQ Workshop",title_zh:"篮球 IQ 工作坊",desc_en:"Video review connected to live court reps for decision-making, spacing, timing, and execution.",desc_zh:"结合视频复盘和场上练习，训练决策、空间、时机和执行。",dates:"By appointment",dateSummary_zh:"需预约",time:"Flexible",regularPrice:95,memberPrice:85,capacity:8,booked:0,waiver:!0,active:!0},{id:"bb-shooting-lab",programId:"basketball",type:"basketball",title_en:"Shooting Lab",title_zh:"投篮实验室",desc_en:"Shooting mechanics, footwork, shot preparation, rhythm, tracking, and high-quality repetitions.",desc_zh:"投篮动作、脚步、出手准备、节奏、追踪和高质量重复练习。",dates:"Tue / Thu",dateSummary_zh:"周二 / 周四",time:"5:00 PM - 6:30 PM",regularPrice:65,memberPrice:55,capacity:10,booked:3,waiver:!0,active:!0},{id:"vb-u8",programId:"volleyball",type:"volleyball",title_en:"U8-U12 Beginner Volleyball",title_zh:"U8-U12 初级排球",desc_en:"For players new to volleyball. Focuses on passing, serving, basic setting, footwork, and rules.",desc_zh:"适合排球初学者，重点训练垫球、发球、基础传球、脚步和规则理解。",dates:"May 11, May 18, June 1, June 8, June 15, June 22",datesList:ht.beginner,dateSummary:"6 Sunday sessions · May 11-Jun 22",dateSummary_zh:"6 节周日课程 · 5 月 11 日-6 月 22 日",time:"6:00 PM - 7:30 PM",regularPrice:45,memberPrice:39,capacity:18,booked:7,waiver:!0,active:!0},{id:"vb-u12",programId:"volleyball",type:"volleyball",title_en:"U12-U15 Advanced Volleyball",title_zh:"U12-U15 进阶排球",desc_en:"For players with solid fundamentals. Focuses on attacking, blocking, advanced defense, serve receive, transition play, and decision-making.",desc_zh:"适合有基础的球员，训练进攻、拦网、高阶防守、接发球、转换和比赛决策。",dates:"May 12, May 14, May 19, May 21, May 26, May 28, June 2, June 4, June 11, June 18, June 25",datesList:ht.advanced,dateSummary:"11 sessions · May 12-Jun 25",dateSummary_zh:"11 节课程 · 5 月 12 日-6 月 25 日",time:"6:00 PM - 8:00 PM",regularPrice:45,memberPrice:39,capacity:18,booked:11,waiver:!0,active:!0},{id:"vb-u15",programId:"volleyball",type:"volleyball",title_en:"U15-U17 Elite Volleyball",title_zh:"U15-U17 精英排球",desc_en:"High-intensity training for competitive players: position-specific training, advanced tactics, competitive drills, leadership, and performance under pressure.",desc_zh:"竞争型球员高强度训练：专项位置训练、高阶战术、竞技训练、领导力和压力下表现。",dates:"May 15, May 29, June 5, June 12, June 19, June 26",datesList:ht.elite,dateSummary:"6 Friday sessions · May 15-Jun 26",dateSummary_zh:"6 节周五课程 · 5 月 15 日-6 月 26 日",time:"6:00 PM - 8:00 PM",regularPrice:45,memberPrice:39,capacity:18,booked:14,waiver:!0,active:!0},{id:"vb-summer-u8-single",programId:"volleyball",type:"volleyball",title_en:"Volleyball U8-U11",title_zh:"排球 U8-U11",desc_en:"U8-U14 volleyball fundamentals camp for young athletes building passing, setting, serving, footwork, movement, hand-eye coordination, and basic hitting mechanics.",desc_zh:"U8-U14 排球基础夏令营，帮助年轻球员建立垫球、传球、发球、脚步、移动、手眼协调和基础扣球动作。",dates:"Summer 2026 weekly options",datesList:fe,dateSummary:"10 weekly options · Jun 29-Sep 4",dateSummary_zh:"2026 夏季 10 个周次 · 6 月 29 日-9 月 4 日",time:"9:00 AM - 11:30 AM",regularPrice:325,memberPrice:325,packages:[["2 weeks",590],["3 weeks",865],["4 weeks",1150]],capacity:18,booked:6,waiver:!0,active:!0},{id:"vb-summer-u12-single",programId:"volleyball",type:"volleyball",title_en:"Volleyball U12-U14",title_zh:"排球 U12-U14",desc_en:"Volleyball summer camp for athletes developing stronger fundamentals and court confidence.",desc_zh:"排球夏令营，适合希望提升基础技术和场上自信的运动员。",dates:"Summer 2026 weekly options",datesList:fe,dateSummary:"10 weekly options · Jun 29-Sep 4",dateSummary_zh:"2026 夏季 10 个周次 · 6 月 29 日-9 月 4 日",time:"3:00 PM - 6:00 PM",regularPrice:325,memberPrice:325,packages:[["2 weeks",590],["3 weeks",865],["4 weeks",1150]],capacity:18,booked:5,waiver:!0,active:!0},{id:"vb-summer-u15-single",programId:"volleyball",type:"volleyball",title_en:"Volleyball U15-U17",title_zh:"排球 U15-U17",desc_en:"Advanced volleyball summer training for athletes ready for higher-intensity skill development, match situations, and competitive game tempo.",desc_zh:"进阶排球暑期训练，适合准备接受更高强度技术发展、比赛场景和竞技节奏训练的运动员。",dates:"Summer 2026 weekly options",datesList:fe,dateSummary:"10 weekly options · Jun 29-Sep 4",dateSummary_zh:"2026 夏季 10 个周次 · 6 月 29 日-9 月 4 日",time:"6:00 PM - 8:00 PM",regularPrice:295,memberPrice:295,packages:[["2 weeks",590],["3 weeks",865],["4 weeks",1150]],capacity:18,booked:3,waiver:!0,active:!0},{id:"private-training",programId:"private-training",type:"training",title_en:"Private Training",title_zh:"私教训练",desc_en:"Customized private sessions based on the athlete's age, skill level, position, and personal goals.",desc_zh:"根据球员年龄、技术水平、位置和个人目标定制的私教课程。",dates:"By appointment",dateSummary_zh:"需预约",time:"Flexible",regularPrice:120,memberPrice:105,capacity:1,booked:0,waiver:!0,active:!0},{id:"open-gym",programId:"open-gym",type:"membership",title_en:"Open Gym Time",title_zh:"开放球场时间",desc_en:"Drop-in open gym time for members and non-members.",desc_zh:"会员和非会员均可预约的开放球场时间。",dates:"Mon/Wed/Fri",dateSummary_zh:"周一 / 周三 / 周五",time:"8:00 PM - 10:00 PM",regularPrice:18,memberPrice:0,openGymPricingTiers:[{id:"visitor",label_en:"Visitor",label_zh:"Visitor",price:18},{id:"regular",label_en:"Regular Member",label_zh:"Regular Member",price:18},{id:"plus",label_en:"Member Plus",label_zh:"Member Plus",price:0}],capacity:30,booked:9,waiver:!0,active:!0},{id:"general-membership",programId:"membership",type:"membership",membershipLevel:"regular",title_en:"Regular Membership",title_zh:"普通会员",desc_en:"No training included. Best for open gym and frequent drop-in use.",desc_zh:"不包含训练，适合开放球场和频繁 drop-in 使用。",benefits_en:"Regular benefits: open gym member pricing, account history, waiver records, and front desk support.",benefits_zh:"Regular benefits: open gym member pricing, account history, waiver records, and front desk support.",dates:"Monthly",dateSummary_zh:"按月",time:"Member access",regularPrice:49,memberPrice:49,capacity:200,booked:31,waiver:!0,active:!0},{id:"training-benefit",programId:"membership",type:"membership",membershipLevel:"plus",title_en:"Membership Plus",title_zh:"训练优惠会员",desc_en:"Member training discount, open gym benefits, and priority booking.",desc_zh:"享受课程会员价、开放球场权益和优先预约。",benefits_en:"Membership Plus benefits: Regular benefits plus training member pricing, selected training discounts, and priority booking notes.",benefits_zh:"Membership Plus benefits: Regular benefits plus training member pricing, selected training discounts, and priority booking notes.",dates:"Monthly",dateSummary_zh:"按月",time:"Member access",regularPrice:99,memberPrice:99,capacity:200,booked:24,waiver:!0,active:!0}],courtSlots:[{id:"full-1",programId:"court-rental",courtType:"Full Size Court",title_zh:"全场",date:"2026-06-01",time:"6:00 PM - 8:00 PM",price:175,capacity:20,booked:!1,minimum:"Minimum 2H",image:Me},{id:"full-2",programId:"court-rental",courtType:"Full Size Court",title_zh:"全场",date:"2026-06-02",time:"7:00 PM - 9:00 PM",price:175,capacity:20,booked:!0,minimum:"Minimum 2H",image:Me},{id:"half-1",programId:"court-rental",courtType:"Half Size Court",title_zh:"半场",date:"2026-06-01",time:"4:00 PM - 6:00 PM",price:95,capacity:12,booked:!1,minimum:"Minimum 2H",image:Qe},{id:"machine-1",programId:"court-rental",courtType:"Shooting Machine Rental",title_zh:"投篮机",date:"2026-06-03",time:"5:00 PM - 6:00 PM",price:105,capacity:3,booked:!1,minimum:"Minimum 1H",image:ze}],openCourtSlots:[{id:"open-wed",title_en:"Basketball Drop-In",title_zh:"篮球开放球场",date:"2026-05-27",startTime:"08:00",endTime:"10:30",spots:12,notes_en:"Main court drop-in",notes_zh:"主场 drop-in",active:!0},{id:"open-thu",title_en:"Basketball Drop-In",title_zh:"篮球开放球场",date:"2026-05-28",startTime:"08:30",endTime:"10:00",spots:10,notes_en:"Main court drop-in",notes_zh:"主场 drop-in",active:!0},{id:"open-fri",title_en:"Basketball Drop-In",title_zh:"篮球开放球场",date:"2026-05-29",startTime:"13:00",endTime:"14:30",spots:14,notes_en:"Afternoon drop-in",notes_zh:"下午 drop-in",active:!0},{id:"open-sat",title_en:"Basketball Drop-In",title_zh:"篮球开放球场",date:"2026-05-30",startTime:"10:00",endTime:"15:00",spots:18,notes_en:"Saturday drop-in",notes_zh:"周六开放",active:!0},{id:"open-hidden",title_en:"Hidden Drop-In",title_zh:"隐藏开放球场",date:"2026-05-26",startTime:"09:00",endTime:"10:00",spots:8,notes_en:"Inactive sample",notes_zh:"隐藏示例",active:!1}],bookingServices:rn(),products:[{id:"tee",title_en:"First Light T-shirt",title_zh:"First Light T恤",price:35,stock:40,sizes:"S, M, L, XL",image:_,order:1,active:!0},{id:"hoodie",title_en:"First Light Hoodie",title_zh:"First Light 连帽衫",price:68,stock:25,sizes:"S, M, L, XL",image:_,order:2,active:!0}],activities:[{id:"summer-camp-update",title_en:"Summer Camp Registration",title_zh:"夏令营报名",summary_en:"Add or update camp weeks, special events, and seasonal announcements from the admin dashboard.",summary_zh:"可在后台随时新增或更新夏令营、特别活动和季节公告。",dateLabel_en:"Summer 2026",dateLabel_zh:"2026 夏季",button_en:"View Programs",button_zh:"查看课程",route:"programs",image:_,order:1,active:!0,featured:!0}],social:{instagram:"https://www.instagram.com/firstlightvancouver",facebook:"https://www.facebook.com/firstlighttrainingcenter",tiktok:"",wechat:"firstlightvan",wechatQr:lr},emailTemplates:{en:"Your First Light booking is confirmed. Please review your selected sessions, waiver status, address, and contact information below.",zh:"您的 First Light 预订已确认。请查看以下课程/场地、免责声明、地址和联系方式。"},students:[{id:B,fullName:"Ryan Chen",email:"member@test.com",phone:"604-111-1111",birthDate:"2012-08-18",age:13,address:"165-13631 Vulcan Way, Richmond, BC V6V 1K4",primarySport:"Basketball",experience:"Intermediate",preferredClassTime:"Weekends after 10 AM",guardianName:"Maggie Chen",guardianRelation:"Mother",guardianPhone:"604-222-2222",guardianEmail:"parent@test.com",emergencyName:"David Chen",emergencyPhone:"604-333-3333",medicalNotes:"No major medical notes. Bring ankle brace for intense training.",allergies:"None noted",injuries:"Previous mild ankle sprain",staffNotes:"Test member account for front desk walkthrough.",source:"test account",createdAt:"2026-05-20T10:00:00.000Z",updatedAt:"2026-05-20T10:00:00.000Z"}],enrollments:[{id:"enroll-test-basketball-camp",orderId:"BK-TEST-MEMBER",studentId:B,courseSessionId:"bb-u7-single",title:"Basketball U7-U12",programId:"basketball",status:"confirmed",quantity:1,createdAt:"2026-05-20T10:00:00.000Z"},{id:"enroll-test-shooting-lab",orderId:"BK-TEST-MEMBER",studentId:B,courseSessionId:"bb-shooting-lab",title:"Shooting Lab",programId:"basketball",status:"confirmed",quantity:1,createdAt:"2026-05-20T10:00:00.000Z"}],creditPackages:[{id:"pkg-test-basketball-10",orderId:"BK-TEST-MEMBER",studentId:B,studentName:"Ryan Chen",programId:"basketball",title:"Basketball Training 10 Pack",originalCredits:10,balance:7,purchasedAt:"2026-05-20T10:00:00.000Z",expiresAt:"2026-09-30"},{id:"pkg-test-court-5",orderId:"BK-TEST-MEMBER",studentId:B,studentName:"Ryan Chen",programId:"court-rental",title:"Court & Shooting Machine 5 Pack",originalCredits:5,balance:3,purchasedAt:"2026-05-20T10:00:00.000Z",expiresAt:"2026-08-31"},{id:"pkg-test-open-gym-8",orderId:"BK-TEST-MEMBER",studentId:B,studentName:"Ryan Chen",programId:"open-gym",title:"Open Gym 8 Pack",originalCredits:8,balance:6,purchasedAt:"2026-05-20T10:00:00.000Z",expiresAt:"2026-08-31"},{id:"pkg-test-membership",orderId:"BK-TEST-MEMBER",studentId:B,studentName:"Ryan Chen",programId:"membership",title:"Membership Plus",originalCredits:1,balance:1,purchasedAt:"2026-05-20T10:00:00.000Z",expiresAt:"2026-06-30"}],creditTransactions:[{id:"tx-test-basketball-purchase",packageIds:["pkg-test-basketball-10"],studentId:B,programId:"basketball",type:"purchase",units:10,balanceAfter:10,reason:"purchase",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-20T10:00:00.000Z"},{id:"tx-test-basketball-usage",packageIds:["pkg-test-basketball-10"],studentId:B,programId:"basketball",type:"usage",units:-3,balanceAfter:7,reason:"member reservation",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-24T10:00:00.000Z"},{id:"tx-test-court-purchase",packageIds:["pkg-test-court-5"],studentId:B,programId:"court-rental",type:"purchase",units:5,balanceAfter:5,reason:"purchase",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-20T10:00:00.000Z"},{id:"tx-test-court-usage",packageIds:["pkg-test-court-5"],studentId:B,programId:"court-rental",type:"usage",units:-2,balanceAfter:3,reason:"member reservation",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-25T10:00:00.000Z"},{id:"tx-test-open-gym-purchase",packageIds:["pkg-test-open-gym-8"],studentId:B,programId:"open-gym",type:"purchase",units:8,balanceAfter:8,reason:"purchase",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-20T10:00:00.000Z"},{id:"tx-test-open-gym-usage",packageIds:["pkg-test-open-gym-8"],studentId:B,programId:"open-gym",type:"usage",units:-2,balanceAfter:6,reason:"member reservation",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-26T10:00:00.000Z"},{id:"tx-test-membership-purchase",packageIds:["pkg-test-membership"],studentId:B,programId:"membership",type:"purchase",units:1,balanceAfter:1,reason:"membership benefit",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-20T10:00:00.000Z"}],waiverSignatures:[{id:"waiver-test-member",studentId:B,orderId:"BK-TEST-MEMBER",templateVersion:"2026.06",signerName:"Maggie Chen",signerRelation:"Mother",participantType:"minor",templateAudience:"minor",signedAt:"2026-05-20T10:05:00.000Z"}],bookings:[{id:"BK-TEST-MEMBER",kind:"order",status:"confirmed",participantType:"minor",studentId:B,studentName:"Ryan Chen",customer:{name:"Maggie Chen",email:"parent@test.com",phone:"604-222-2222",participantName:"Ryan Chen",participantEmail:"member@test.com",participantType:"minor"},paymentMethod:"VISA / Mastercard",paymentStatus:"paid",lockStatus:"locked",paymentReference:"TEST-PAID",paymentMessage:"Test account payment approved.",paymentConfirmedAt:"2026-05-20T10:03:00.000Z",language:"en",items:[{kind:"session",id:"bb-u7-single",title:"Basketball U7-U12",programId:"basketball",meta:"Jun 29-Jul 3 / 9:00 AM - 12:00 PM",price:245},{kind:"package",id:"basketball-10-pack",title:"Basketball Training 10 Pack",programId:"basketball",credits:10,price:850},{kind:"package",id:"court-5-pack",title:"Court & Shooting Machine 5 Pack",programId:"court-rental",credits:5,price:500},{kind:"package",id:"open-gym-8-pack",title:"Open Gym 8 Pack",programId:"open-gym",credits:8,price:120},{kind:"session",id:"training-benefit",title:"Membership Plus",programId:"membership",meta:"Active through Jun 30",price:99}],total:1814,emailSent:"prepared",createdAt:"2026-05-20T10:00:00.000Z",waiverSignedAt:"2026-05-20T10:05:00.000Z",waiverSignatureId:"waiver-test-member"},{id:"BK-TEST-COURT-USAGE",kind:"resource",source:"member",serviceId:"main-half-a",serviceLabel_en:"Main Court Half A",serviceLabel_zh:"主场半场 A",studentId:B,studentName:"Ryan Chen",programId:"court-rental",title:"Main Court Half A",date:"2026-06-06",startTime:"16:00",endTime:"17:00",status:"confirmed",paymentMethod:"Member Credit",paymentStatus:"member-credit",lockStatus:"locked",memberUsage:!0,creditPackageId:"pkg-test-court-5",creditTransactionId:"tx-test-court-usage",startsAt:"2026-06-06T16:00:00.000",createdAt:"2026-05-25T10:00:00.000Z"},{id:"BK-TEST-OPEN-GYM-USAGE",kind:"open-gym",source:"member",serviceId:"open-sat",serviceLabel_en:"Basketball Drop-In",serviceLabel_zh:"篮球开放球场",openGymSlotId:"open-sat",studentId:B,studentName:"Ryan Chen",programId:"open-gym",title:"Basketball Drop-In",date:"2026-05-30",startTime:"10:00",endTime:"15:00",status:"confirmed",paymentMethod:"Member Credit",paymentStatus:"member-credit",lockStatus:"locked",memberUsage:!0,creditPackageId:"pkg-test-open-gym-8",creditTransactionId:"tx-test-open-gym-usage",startsAt:"2026-05-30T10:00:00.000",createdAt:"2026-05-26T10:00:00.000Z"}]};let r=cr(),z=JSON.parse(localStorage.getItem("firstlight_cart")||"[]"),I=location.hash.replace("#","")||"home",E={loading:!1,loaded:!1,error:"",submissions:[]};function cr(){const e=localStorage.getItem("firstlight_state");if(!e)return structuredClone(L);try{const t=JSON.parse(e);return t.appVersion!==L.appVersion?structuredClone(L):dr(t)}catch{return structuredClone(L)}}function dr(e){const t=cn(structuredClone(L),e);return delete t.pages.intro,t.dropdownPages=vr(e.dropdownPages||t.dropdownPages),t.globalImages=Sr(e.globalImages||t.globalImages,e),t.dropdownCatalogVersion=L.dropdownCatalogVersion,hr(t),pr(t),t.bookingServices=sn(e.bookingServices||t.bookingServices),gr(t),br(t),fr(t),mr(t),ur(t),yr(t),$r(t),t}function ur(e){const t=e.programs?.find(a=>a.id==="conditioning-training");return t?.statusTitle_zh==="COMING SOON"&&(t.statusTitle_zh="即将开放"),e}function mr(e){const t=["statusTitle_en","statusTitle_zh","statusBody_en","statusBody_zh","statusButton_en","statusButton_zh","statusRoute"];for(const a of L.programs||[]){const n=e.programs?.find(i=>i.id===a.id);if(n)for(const i of t)n[i]===void 0&&a[i]!==void 0&&(n[i]=a[i])}return e}function pr(e){const t=["vb-summer-u8-single","vb-summer-u12-single","vb-summer-u15-single"],a=["vb-summer-u8-multi","vb-summer-u12-multi","vb-summer-u15-multi"],n=["Single Week","Multi-Week Special"],i=e.dropdownPages?.find(l=>l.id==="volleyball-camps"),o=L.dropdownPages.find(l=>l.id==="volleyball-camps");i&&(i.sessionIds=["vb-summer-u8-single","vb-summer-u12-single","vb-summer-u15-single"],o&&(i.label_en=o.label_en,i.title_en=o.title_en,i.subtitle_en=o.subtitle_en,i.body_en=o.body_en,i.productIntro_en=o.productIntro_en,i.label_zh=o.label_zh,i.title_zh=o.title_zh,i.subtitle_zh=o.subtitle_zh,i.body_zh=o.body_zh,i.productIntro_zh=o.productIntro_zh)),e.sessions=(e.sessions||[]).filter(l=>!a.includes(l.id));for(const l of t){const c=L.sessions.find(u=>u.id===l);if(!c)continue;let d=e.sessions.find(u=>u.id===l);if(!d){e.sessions.push(structuredClone(c));continue}n.some(u=>d.title_en?.includes(u))&&(d.title_en=c.title_en),(d.title_zh?.includes("单周")||d.title_zh?.includes("多周"))&&(d.title_zh=c.title_zh),/single[- ]week|multi[- ]week/i.test(d.desc_en||"")&&(d.desc_en=c.desc_en),(d.desc_zh?.includes("单周")||d.desc_zh?.includes("多周"))&&(d.desc_zh=c.desc_zh),d.packages=structuredClone(c.packages),d.datesList=structuredClone(c.datesList),d.dateSummary=c.dateSummary,d.dateSummary_zh=c.dateSummary_zh}return e}function gr(e){const t=L.social.facebook.replace("firstlighttrainingcenter","firslighttrainingcenter");return e.social?.facebook===t&&(e.social.facebook=L.social.facebook),e}function br(e){const t="warehouse-hardly";return e.pages?.about?.body_en?.includes(t)&&(e.pages.about.body_en=e.pages.about.body_en.replace(t,"warehouse, hardly")),e}function hr(e){const t=L.dropdownPages.find(o=>o.id==="basketball-film-to-floor"),a=e.dropdownPages?.find(o=>o.id==="basketball-film-to-floor");t&&a&&(a.label_en==="Film-to-Floor Training"&&(a.label_en=t.label_en),a.title_en==="Film-to-Floor Training"&&(a.title_en=t.title_en),a.subtitle_en==="Turn game film into court habits"&&(a.subtitle_en=t.subtitle_en),a.body_en?.includes("Film-to-Floor Training")&&(a.body_en=a.body_en.replaceAll("Film-to-Floor Training","Basketball IQ Workshop")),a.label_zh==="录像到实战训练"&&(a.label_zh=t.label_zh),a.title_zh==="录像到实战训练"&&(a.title_zh=t.title_zh),a.subtitle_zh==="把比赛录像转化为场上习惯"&&(a.subtitle_zh=t.subtitle_zh));const n=L.sessions.find(o=>o.id==="bb-film-floor"),i=e.sessions?.find(o=>o.id==="bb-film-floor");return n&&i&&(i.title_en==="Film-to-Floor Training"&&(i.title_en=n.title_en),i.title_zh==="录像到实战训练"&&(i.title_zh=n.title_zh)),e}function fr(e){const t=a=>String(a||"").replaceAll("General Membership","Regular Membership").replaceAll("Training With Benefit","Membership Plus");for(const a of e.sessions||[])a.id==="general-membership"&&(a.title_en=t(a.title_en),a.title_zh=a.title_zh||a.title_en,a.membershipLevel=a.membershipLevel||"regular",a.benefits_en=a.benefits_en||ye("regular"),a.benefits_zh=a.benefits_zh||a.benefits_en,a.regularPrice=Number(a.regularPrice??49),a.memberPrice=Number(a.memberPrice??a.regularPrice??49),a.dates=a.dates||"Monthly",a.time=a.time||"Member access"),a.id==="training-benefit"&&(a.title_en=t(a.title_en),a.title_zh=a.title_zh||a.title_en,a.membershipLevel=a.membershipLevel||"plus",a.benefits_en=a.benefits_en||ye("plus"),a.benefits_zh=a.benefits_zh||a.benefits_en,a.regularPrice=Number(a.regularPrice??99),a.memberPrice=Number(a.memberPrice??a.regularPrice??99),a.dates=a.dates||"Monthly",a.time=a.time||"Member access"),a.programId==="membership"&&!["regular","plus"].includes(a.membershipLevel)&&(a.membershipLevel=ee(a)),a.programId==="membership"&&!a.benefits_en&&(a.benefits_en=ye(a.membershipLevel),a.benefits_zh=a.benefits_zh||a.benefits_en);for(const a of e.creditPackages||[])a.title=t(a.title),a.programId==="membership"&&!["regular","plus"].includes(a.membershipLevel)&&(a.membershipLevel=ee(a));for(const a of e.bookings||[])for(const n of a.items||[])n.title=t(n.title),n.programId==="membership"&&!["regular","plus"].includes(n.membershipLevel)&&(n.membershipLevel=ee(n));return e}function vr(e=[]){const t=structuredClone(e),a=new Set(t.map(n=>n.id));for(const n of L.dropdownPages)a.has(n.id)||t.push(structuredClone(n));for(const n of t)n.privatePricing&&Object.assign(n,_e(n));return t}function yr(e){return e.dropdownPages=(e.dropdownPages||[]).map(t=>t.privatePricing?{...t,..._e(t)}:t),e}function $r(e){return e.sessions=(e.sessions||[]).map(t=>t.id==="open-gym"?{...t,openGymPricingTiers:Oe(t)}:t),e}function Sr(e=[],t={}){const a=new Map((e||[]).map(l=>[l.id,l])),n=L.globalImages.map(l=>{const c=a.get(l.id),d=l.id==="home-hero-background"&&!c&&t.pages?.home?.image?{image:t.pages.home.image,imagePositionX:t.pages.home.imagePositionX,imagePositionY:t.pages.home.imagePositionY}:{};return Ee({...l,...d,...c||{}})}),i=new Set(L.globalImages.map(l=>l.id)),o=(e||[]).filter(l=>l.id&&!i.has(l.id)).map(l=>Ee(l));return[...n,...o].sort((l,c)=>Number(l.order||999)-Number(c.order||999))}function rn(){return tt.map(e=>on(e))}function on(e){const t=nr.has(e.id);return{...Ct(e),public:t?!1:e.public!==!1,active:t?!1:e.active!==!1}}function Ct(e={},t={}){const a=Number(e.nonMemberPrice??t.nonMemberPrice??e.price??t.price??0),n=Number(e.memberPrice??t.memberPrice??a);return{...e,price:a,nonMemberPrice:a,memberPrice:n}}function sn(e=[]){const t=new Map((e||[]).map(o=>[o.id,o])),a=rn().map(o=>{const l=t.get(o.id),c=l?Ct(l,o):{},d=l?{...o,...l,...c}:o;return on(d)}),n=new Set(tt.map(o=>o.id)),i=(e||[]).filter(o=>o.id&&!n.has(o.id)).map(o=>({...Ct(o),public:o.public!==!1,active:o.active!==!1}));return ln([...a,...i])}function ln(e=[]){const t=e.find(a=>a.id==="main-half");return t?e.map(a=>["main-half-a","main-half-b"].includes(a.id)?{...a,price:t.price,nonMemberPrice:t.nonMemberPrice,memberPrice:t.memberPrice,useLabel_en:t.useLabel_en,useLabel_zh:t.useLabel_zh,capacity:t.capacity,minDurationMinutes:t.minDurationMinutes,image:t.image,imageKey:t.imageKey,imagePositionX:t.imagePositionX,imagePositionY:t.imagePositionY}:a):e}function cn(e,t){for(const a of Object.keys(t||{}))t[a]&&typeof t[a]=="object"&&!Array.isArray(t[a])&&e[a]?cn(e[a],t[a]):e[a]=t[a];return e}function T(){try{return localStorage.setItem("firstlight_state",JSON.stringify(r)),!0}catch(e){const t=e?.name==="QuotaExceededError"||e?.code===22;return M(t?"Could not save because the browser storage is full. Upload a smaller image or remove older uploaded images.":`Could not save changes: ${e?.message||"browser storage failed"}`),!1}}function te(){localStorage.setItem("firstlight_cart",JSON.stringify(z))}function pe(e={},t=A("addedToCart")){const a=re(e)||e.title||s("cartLabel");sessionStorage.setItem("cartNotice",a),sessionStorage.setItem("cartNoticeLabel",t)}function kr(){const e=sessionStorage.getItem("cartNotice");if(!e)return"";const t=sessionStorage.getItem("cartNoticeLabel")||A("addedToCart");return sessionStorage.removeItem("cartNotice"),sessionStorage.removeItem("cartNoticeLabel"),`
    <div class="cartNotice" role="status" aria-live="polite">
      <span>${m(t)}</span>
      <strong>${m(e)}</strong>
      <button type="button" data-route="cart">${s("cartLabel")}</button>
    </div>
  `}function _r(){clearTimeout(va);const e=document.querySelector(".cartNotice");e&&(va=setTimeout(()=>{e.classList.add("isHiding"),window.setTimeout(()=>e.remove(),260)},or))}function A(e){return Xe[r.language][e]||e}function s(e){const t=String(e).split(".");let a=I==="admin"?Xe.en:Xe[r.language];for(const n of t)a=a?.[n];if(a!==void 0)return a;a=Xe.en;for(const n of t)a=a?.[n];return a??e}function h(e,t){return e[`${t}_${r.language}`]||e[`${t}_en`]||e[t]||""}function U(e,t,a=""){return h(r.pages?.[e]||{},t)||a}function et(e,t){return["left","center","right","top","bottom"].includes(e)?e:t}function Ee(e={}){return{...e,imagePositionX:et(e.imagePositionX,"center"),imagePositionY:et(e.imagePositionY,"center")}}function ve(e,t=""){const a=(r.globalImages||[]).find(n=>n.id===e&&n.active!==!1)||(L.globalImages||[]).find(n=>n.id===e)||null;return Ee(a||{id:e,image:t})}function Y(e,t=""){return ve(e,t).image||t}function wr(e){return(r.globalImages||L.globalImages||[]).filter(t=>t.group===e&&t.active!==!1).map(t=>Ee(t)).sort((t,a)=>Number(t.order||999)-Number(a.order||999))}function dn(e={},t="image"){const a=et(e[`${t}PositionX`]||e.imagePositionX,"center"),n=et(e[`${t}PositionY`]||e.imagePositionY,"center");return`${a} ${n}`}function ie(e={},t="image",a="",n="--tile"){const i=e?.[t]||a;return`${n}:url('${b(i)}');--image-position:${b(dn(e,t))}`}function qe(e={},t="image"){return`--image-position:${b(dn(e,t))}`}function ft(e="default"){return e==="machine"?ve("court-machine",ze):e==="half"?ve("court-half",Qe):e==="full"?ve("court-full",Me):ve("default-court",_)}function Pr(e){return m(String(e||"")).replace(/\s*[-–—]\s*/g,"&#8209;")}function Ie(e){const t=String(e||"").trim(),a=t.match(/^(.*\S)\s+(U\d+(?:\s*[-–—]\s*U?\d+|\+)?)$/i);return a?`${m(a[1])}<span class="titleAgeRange">${Pr(a[2])}</span>`:m(t).replace(/(U\d+)\s*[-–—]\s*(U?\d+)/gi,(n,i,o)=>`${i}&#8209;${o}`)}function se(e){return(r.dropdownPages||[]).filter(t=>t.parentMenu===e&&t.active!==!1).sort((t,a)=>Number(t.order||999)-Number(a.order||999))}function le(e){return e.targetRoute||`dropdown:${e.id}`}function V(e){return se(e).some(t=>le(t)===I)}function un(e){return{basketball:s("basketball"),volleyball:s("volleyball"),conditioning:s("conditioning"),court:s("courtRental"),membership:s("membership"),merchandise:s("merchandise")}[e]||s("basketball")}function w(e){return`CA$${Number(e).toLocaleString("en-CA",{minimumFractionDigits:0})}`}function xe(e){if(!e)return s("memberAccount.tbd");const t=new Date(e);return Number.isNaN(t.getTime())?String(e):t.toLocaleString("en-CA",{dateStyle:"medium",timeStyle:"short"})}function ya(e){return e||s("memberAccount.notProvided")}function ce(e="visitor"){return s(e==="plus"?"memberAccount.plusTitle":e==="regular"?"memberAccount.regularTitle":"memberAccount.visitorTitle")}function Ir(e="visitor"){return s(e==="plus"?"memberAccount.plusSummary":e==="regular"?"memberAccount.regularSummary":"memberAccount.visitorSummary")}function ye(e="regular"){return e==="plus"?"Membership Plus benefits: Regular benefits plus training member pricing, selected training discounts, and priority booking notes.":"Regular benefits: open gym member pricing, account history, waiver records, and front desk support."}function jt(e={}){return h(e,"benefits")||ye(ee(e))}function ee(e={}){if(["regular","plus"].includes(e.membershipLevel))return e.membershipLevel;const t=`${e.title_en||""} ${e.title||""}`.toLowerCase();return t.includes("plus")||t.includes("benefit")||t.includes("training")?"plus":(t.includes("regular")||t.includes("general")||t.includes("membership"),"regular")}function Gt(e={}){return String(e.dates||e.billingCycle||"Monthly").trim()||"Monthly"}function Cr(e={}){const t=Gt(e),a=t.toLowerCase().includes("month")?"month":t;return`${w(e.regularPrice)} / ${a}`}function Tr(e={}){return!["membership","open-gym","court-rental","merchandise"].includes(e.programId)}function Vt(){return he()?.membershipLevel||"visitor"}function Oe(e={}){const t=new Map((e.openGymPricingTiers||[]).map(a=>[a.id,a]));return nn.map(a=>{const n=t.get(a.id)||{};return{id:a.id,label_en:String(n.label_en||a.label_en),label_zh:String(n.label_zh||n.label_en||a.label_zh||a.label_en),price:Number(n.price??a.price)}})}function Ar(e="visitor"){return e==="plus"?"plus":e==="regular"?"regular":"visitor"}function Mr(e={},t=Vt()){const a=Ar(t),n=Oe(e).find(i=>i.id===a);return Number(n?.price??e.regularPrice??0)}function mn(e={}){const t=Vt();return e.programId==="open-gym"?Mr(e,t):t==="plus"&&Tr(e)?Number(e.memberPrice??e.regularPrice??0):Number(e.regularPrice??0)}function Ue(e){return r.language==="zh"&&e.dateSummary_zh?e.dateSummary_zh:e.dateSummary||e.dates}function He(e){return r.language!=="zh"?e:String(e).replaceAll("Jan","1月").replaceAll("Feb","2月").replaceAll("Mar","3月").replaceAll("Apr","4月").replaceAll("May","5月").replaceAll("Jun","6月").replaceAll("Jul","7月").replaceAll("Aug","8月").replaceAll("Sep","9月").replaceAll("Oct","10月").replaceAll("Nov","11月").replaceAll("Dec","12月")}function K(e){return r.language!=="zh"?e:String(e).replaceAll("AM","上午").replaceAll("PM","下午").replaceAll("Member access","会员使用").replaceAll("Flexible","灵活预约")}function Tt(e){return r.language!=="zh"?e:{"2 weeks":"2 周","3 weeks":"3 周","4 weeks":"4 周","Whole summer":"整个暑期","Multi-week special":"多周优惠"}[e]||e}function zr(e){return r.language!=="zh"?e||"Waiver required":e?String(e).replace("Minimum","最低").replace("H","小时"):"需要签署免责协议"}function x(e){return r.language!=="zh"?e||"":{confirmed:"已确认",waitlisted:"候补",cancelled:"已取消",paid:"已付款",locked:"已锁定",not_locked:"未锁定",customer:"客户",admin:"后台",resource:"场地",order:"订单",class:"课程",court:"场地",usage:"使用",purchase:"购买",adjustment:"调整",website:"网站"}[e]||e||""}function dt(e){return r.language!=="zh"?e||"":{"Manual Confirmed":"手动确认",Cash:"现金","E-transfer":"E-transfer","Credit Card":"信用卡","VISA / Mastercard":"VISA / Mastercard","WeChat Pay":"微信支付"}[e]||e||""}function pn(e){return r.language!=="zh"?e:{"Missing waiver":s("alerts.missingWaiver"),"Low credits":s("alerts.lowCredits"),"Credits expiring soon":s("alerts.creditsExpiringSoon"),"Unpaid order":s("alerts.unpaidOrder"),"Missing guardian":s("alerts.missingGuardian")}[e]||e}function re(e){return r.language==="zh"&&e.title_zh?e.title_zh:e.title}function Nr(e){const t=new Date(`${e}T12:00:00`);if(Number.isNaN(t.getTime()))return"";const a=new Date;let n=a.getUTCFullYear()-t.getUTCFullYear();const i=a.getUTCMonth()-t.getUTCMonth();return(i<0||i===0&&a.getUTCDate()<t.getUTCDate())&&(n-=1),n}function gn(e,t){const a=new Date(e);return Number.isNaN(a.getTime())?"":(a.setUTCMonth(a.getUTCMonth()+t),a.toISOString().slice(0,10))}function Lr(e){return e==="VISA / Mastercard"?{status:"confirmed",paymentStatus:"paid",lockStatus:"locked",paymentMessage:s("paymentStatuses.paymentApproved"),confirmedAt:new Date().toISOString()}:{status:"confirmed",paymentStatus:"paid",lockStatus:"locked",paymentMessage:s("paymentStatuses.onlineApproved"),confirmedAt:new Date().toISOString()}}function Wt(e){return e.status==="cancelled"?s("paymentStatuses.cancelled"):ue(e)?s("paymentStatuses.paidLocked"):e.paymentStatus==="pending_manual_confirmation"?s("paymentStatuses.pendingManual"):`${x(e.paymentStatus||s("paymentStatuses.unknown"))} / ${x(e.lockStatus||s("paymentStatuses.notLocked"))}`}function Ce(e){return Math.max(0,Number(e.capacity||0)-Number(e.booked||0)-Er(e.id))}function Er(e){return(r.enrollments||[]).filter(t=>t.courseSessionId===e&&t.status==="confirmed").reduce((t,a)=>t+Number(a.quantity||1),0)}function Jt(e,{featuredOnly:t=!1}={}){return(e||[]).filter(a=>a.active!==!1).filter(a=>!t||a.featured!==!1).sort((a,n)=>Number(a.order||999)-Number(n.order||999))}function bn(){return sn(r.bookingServices?.length?r.bookingServices:tt).filter(e=>e.public!==!1&&e.active!==!1)}function de(){return bn().filter(e=>en.includes(e.id))}function Kt(e="main-full"){const t=JSON.parse(sessionStorage.getItem("bookingDraft")||"{}"),a=de(),n=X(t.serviceId,a),i=X(e,a)||a[0],o=(n||i)?.id||e,l=X(o,a);return{serviceId:o,date:t.date||"2026-06-01",duration:ae(l,t.duration),quantity:l?.mode==="machine"?1:Number(t.quantity||1),machinePosition:t.machinePosition||"",selectedStartTime:t.selectedStartTime||""}}function Ne(e){sessionStorage.setItem("bookingDraft",JSON.stringify({...Kt(),...e}))}function N(e){return X(e,bn())}function ut(e){return e?.image?e:e?.imageKey==="machine"?ft("machine"):e?.imageKey==="half"?ft("half"):ft("full")}function Yt(e){return ut(e).image}function mt(e){return Number(e?.nonMemberPrice??e?.price??0)}function Qt(e){return Number(e?.memberPrice??e?.nonMemberPrice??e?.price??0)}function hn(e){const t=Qt(e),a=mt(e);return t===a?`<span class="servicePriceRows singlePrice"><b>${w(a)}/H</b></span>`:`
    <span class="servicePriceRows">
      <b>${r.language==="zh"?"会员":"Member"} ${w(t)}/H</b>
      <b>${r.language==="zh"?"非会员":"Non-member"} ${w(a)}/H</b>
    </span>
  `}function Br(e,t,a=1){const i=Number(t||60)/60,o=Math.round(Qt(e)*(Number(t||60)/60)*1),l=Math.round(mt(e)*i*1);return o===l?`<b>${w(l)}</b>`:`
    <span class="estimatedPriceRows">
      <b>${r.language==="zh"?"会员":"Member"} ${w(o)}</b>
      <b>${r.language==="zh"?"非会员":"Non-member"} ${w(l)}</b>
    </span>
  `}function Rr(e){const t=Qt(e),a=mt(e);return t===a?`${R(e,"en")} · ${w(a)}/H`:`${R(e,"en")} · Member ${w(t)}/H · Non-member ${w(a)}/H`}function Dr(e={},t){return Xa({records:j(),service:t,duration:e.duration,quantity:e.quantity,pricingMode:e.pricingMode,email:e.email,phone:e.phone,now:new Date().toISOString()})}function Fr(e="auto"){return[["auto","Auto Detect"],["member","Member"],["non_member","Non-member"]].map(([t,a])=>`<option value="${t}" ${e===t?"selected":""}>${a}</option>`).join("")}function fn(e={},t){const a=Dr(e,t),n=a.customerType==="member"?"Member":"Non-member",i=a.pricingSource==="manual"?"Manual override":"Auto detect",o=Number(a.duration||60)/60;return`
    <div class="adminPricingPreview ${a.warning?"warning":""}" data-admin-pricing-preview>
      <div>
        <span class="adminPricingBadge">${i}</span>
        <strong>${n} price: ${w(a.hourlyRate)}/H</strong>
      </div>
      <p>${m(a.message)}</p>
      <p>${o}H × ${w(a.hourlyRate)}/H = <b>${w(a.total)}</b></p>
    </div>
  `}function vn(e,t,a=1){return Math.round(mt(e)*(Number(t||60)/60)*1)}function je(e,t){return at(e).map(a=>`<option value="${a}" ${Number(t)===a?"selected":""}>${a/60}H</option>`).join("")}function At(e=-1){return z.map((t,a)=>({item:t,index:a})).filter(({item:t,index:a})=>t.kind==="booking"&&a!==e).map(({item:t})=>nt({id:t.cartId||t.id,source:"cart",service:N(t.serviceId),date:t.date,startTime:t.startTime,endTime:t.endTime,quantity:t.quantity,machinePosition:t.machinePosition,customer:{},paymentMethod:"Cart"}))}function qr(e,t,a=[]){return ne(e,t,[...r.bookings,...a])}function ge(e){if(r.language!=="zh"||!e)return e;const t={"Small court full is already booked.":"小场全场已被预约。","Small court has an overlapping half-court or machine booking.":"小场已有重叠的半场或投篮机预约。","This small half court is already booked.":"这个小场半场已被预约。","Small court machine/half capacity is full.":"小场投篮机/半场容量已满。","No shooting machine positions remain.":"投篮机位置已满。","Another booking already uses this court resource.":"已有其他预约占用该场地资源。","Service does not exist.":"预约项目不存在。","Date and time are required.":"请选择日期和时间。","End time must be after start time.":"结束时间必须晚于开始时间。","Selected time is outside booking hours.":"所选时间不在可预约时段内。"};return e.startsWith("Minimum booking is")?"未达到最低预约时长。":t[e]||e}function yn(e){const t=e.serviceId==="shooting-machine"?s("bookingSystem.spotsUnit"):s("bookingSystem.booking");return`${e.date} / ${e.startTime}-${e.endTime} / ${e.quantity||1} ${t}`}function $a(e){I=e,location.hash=e,$n(),g()}window.addEventListener("hashchange",()=>{I=location.hash.replace("#","")||"home",$n(),g()});function $n(){window.scrollTo({top:0,left:0,behavior:"auto"})}function xr(){const e=I==="program:basketball"||I.startsWith("dropdown:")&&V("basketball")||V("basketball"),t=I==="program:volleyball"||I.startsWith("dropdown:")&&V("volleyball")||V("volleyball"),a=I==="program:conditioning-training"||I.startsWith("dropdown:")&&V("conditioning")||V("conditioning"),n=I==="program:court-rental"||I==="program:open-gym"||I==="open-court"||I.startsWith("dropdown:")&&V("court")||V("court"),i=I==="program:membership"||I.startsWith("dropdown:")&&V("membership")||V("membership"),o=I==="merchandise"||I.startsWith("dropdown:")&&V("merchandise")||V("merchandise"),l=["account","wishlist"].includes(I);return`
    <header class="topbar">
      <button class="logoButton" data-route="home"><img src="${Y("nav-logo",Ht)}" alt="First Light logo" /></button>
      <nav class="nav">
        <button class="${I==="home"?"active":""}" data-route="home">${s("home")}</button>
        <div class="navDropdown">
          <button class="${e?"active":""}" type="button" data-dropdown-trigger="basketball">${s("basketball")} <span>▼</span></button>
          <div class="dropdownMenu">
            ${se("basketball").map(c=>`<button data-route="${le(c)}">${h(c,"label")}</button>`).join("")}
          </div>
        </div>
        <div class="navDropdown">
          <button class="${t?"active":""}" type="button" data-dropdown-trigger="volleyball">${s("volleyball")} <span>▼</span></button>
          <div class="dropdownMenu">
            ${se("volleyball").map(c=>`<button data-route="${le(c)}">${h(c,"label")}</button>`).join("")}
          </div>
        </div>
        <div class="navDropdown">
          <button class="${a?"active":""}" type="button" data-dropdown-trigger="conditioning">${r.language==="zh"?"体能":s("conditioning")} <span>▼</span></button>
          <div class="dropdownMenu">
            ${se("conditioning").map(c=>`<button data-route="${le(c)}">${h(c,"label")}</button>`).join("")}
          </div>
        </div>
        <div class="navDropdown">
          <button class="${n?"active":""}" type="button" data-dropdown-trigger="court">${s("courtRental")} <span>▼</span></button>
          <div class="dropdownMenu">
            ${se("court").map(c=>`<button data-route="${le(c)}">${h(c,"label")}</button>`).join("")}
          </div>
        </div>
        <div class="navDropdown">
          <button class="${i?"active":""}" type="button" data-dropdown-trigger="membership">${s("membership")} <span>▼</span></button>
          <div class="dropdownMenu">
            ${se("membership").map(c=>`<button data-route="${le(c)}">${h(c,"label")}</button>`).join("")}
          </div>
        </div>
        <div class="navDropdown">
          <button class="${o?"active":""}" type="button" data-dropdown-trigger="merchandise">${s("merchandise")} <span>▼</span></button>
          <div class="dropdownMenu">
            ${se("merchandise").map(c=>`<button data-route="${le(c)}">${h(c,"label")}</button>`).join("")}
          </div>
        </div>
      </nav>
      <div class="topActions">
        <div class="actionDropdown">
          <button class="contactMenuButton ${l?"active":""}" type="button" data-dropdown-trigger="account">${s("account")} <span>▼</span></button>
          <div class="actionMenu">
            <button data-route="account">${s("account")}</button>
            <button data-route="wishlist">${s("wishlist")}</button>
          </div>
        </div>
        <button class="cartBtn" data-route="cart" title="${s("cartLabel")}" aria-label="${s("cartLabel")}">🛒 <strong>${z.length}</strong></button>
        <button class="language" data-action="toggle-language">${A("lang")}</button>
      </div>
    </header>
  `}function Sa(){return`
    ${Or()}
    ${Sn({featuredOnly:!0})}
    ${Gr()}
    ${kn({featuredOnly:!0})}
    ${Wr()}
    ${Qr()}
  `}function Or(){const e=r.pages.home,t=ve("home-hero-background",e.image||_);return`
    <section class="hero stackHero" style="${ie(t,"image",e.image||_,"--hero")}">
      <div class="heroCopy">
        <p class="heroKicker">${h(e,"kicker")}</p>
        <h1>
          ${Ur(e)}
          <span>${h(e,"line1")}</span>
          <span>${h(e,"line2")}</span>
        </h1>
        <p>${h(e,"subtitle")}</p>
        <button class="blueCta" data-route="program:private-training">${r.language==="zh"?"立即预约训练":"Schedule a Training Today"}</button>
      </div>
    </section>
  `}function Ur(e){const t=h(e,"title");return String(t).trim().toUpperCase()!=="FIRST LIGHT"?`<span>${t}</span>`:`<span class="heroBrandLogo"><img src="${Y("home-hero-logo",an)}" alt="${b(t)}" /></span>`}function Sn({featuredOnly:e=!1}={}){const t=Jt(r.programs,{featuredOnly:e});return`
    <section class="stackSection" id="programs">
      <div class="centerHead">
        <h2>${r.language==="zh"?"训练项目":"Training Programs"}</h2>
        <p>${r.language==="zh"?"先选择项目，再进入详情查看费用、名额、时间和预约。":"Click a program to learn more before viewing prices, spots, schedules, and booking details."}</p>
      </div>
      <div class="programTileGrid">
        ${t.map(Hr).join("")}
      </div>
    </section>
  `}function Hr(e){return`
    <button class="programTile" data-route="${jr(e)}" style="${ie(e,"image",Y("default-court",_),"--tile")}">
      <span>${Ie(h(e,"title"))}</span>
      <small>${h(e,"subtitle")}</small>
    </button>
  `}function jr(e){return{basketball:"catalog:basketball",volleyball:"catalog:volleyball","conditioning-training":"catalog:conditioning","court-rental":"catalog:court",membership:"program:membership","private-training":"dropdown:basketball-private-training","open-gym":"open-court"}[e.id]||`program:${e.id}`}function kn({featuredOnly:e=!1}={}){const t=Jt(r.coaches,{featuredOnly:e});return`
    <section class="coachSection" id="coaches">
      <div class="centerHead">
        <h2>${r.language==="zh"?"认识教练":"Meet our coaches"}</h2>
        <p>${r.language==="zh"?"专业教练团队每天帮助球员积累力量、技术和自信。":"Meet the passionate leaders helping athletes stack strength, skill, and confidence every day."}</p>
      </div>
      <div class="coachPortraitGrid">
        ${t.map(a=>`
          <article class="coachPortrait">
            <button class="coachPhoto" data-route="coach:${a.id}"><img src="${a.portrait||a.image}" alt="${a.name}" style="${qe(a,a.portrait?"portrait":"image")}" /></button>
            <h3>${a.name}</h3>
            <p>${h(a,"role")}</p>
            <button class="pillButton" data-route="coach:${a.id}">${A("learn")}</button>
          </article>
        `).join("")}
      </div>
    </section>
  `}function Gr(){const e=Jt(r.activities,{featuredOnly:!0});return e.length?`
    <section class="activitySection">
      <div class="centerHead">
        <h2>${r.language==="zh"?"活动更新":"Activity Updates"}</h2>
        <p>${r.language==="zh"?"新的活动、训练营和公告会从后台自动更新到这里。":"New events, camps, and announcements appear here automatically from the admin dashboard."}</p>
      </div>
      <div class="activityGrid">
        ${e.map(Vr).join("")}
      </div>
    </section>
  `:""}function Vr(e){return`
    <article class="activityCard">
      <img src="${e.image||Y("default-court",_)}" alt="${h(e,"title")}" style="${qe(e)}" />
      <div>
        <span>${h(e,"dateLabel")}</span>
        <h3>${h(e,"title")}</h3>
        <p>${h(e,"summary")}</p>
        <button class="pillButton" data-route="${e.route||"contact"}">${h(e,"button")||A("learn")}</button>
      </div>
    </article>
  `}function Wr(){return`
    <section class="instagramSection">
      <h2>${r.language==="zh"?"关注我们的 Instagram":"Follow us on Instagram"}</h2>
      <p>${r.language==="zh"?"关注 First Light，查看训练日常、活动更新和 Richmond 运动社区。":"Follow First Light for training updates, game day moments, athlete development, and a look inside our Richmond sports community."}</p>
      <div class="socialCards">
        ${vt("Instagram","@firstlightvancouver",r.social.instagram,r.language==="zh"?"打开 Instagram":"Open Instagram")}
        ${vt("Facebook","First Light Training Center",r.social.facebook,r.language==="zh"?"打开 Facebook":"Open Facebook")}
        ${vt("WeChat",r.social.wechat,"#contact",s("contactPage.scanQr"))}
      </div>
    </section>
  `}function vt(e,t,a,n){const i=e==="WeChat";return`
    <a class="socialCard" href="${a}" aria-label="${n}" ${i?'data-route="contact"':'target="_blank" rel="noreferrer"'} >
      <span>${e}</span>
      <strong>${t}</strong>
      ${i?`<img src="${r.social.wechatQr}" alt="WeChat QR" />`:Jr(e)}
      <em>${n}</em>
    </a>
  `}function Jr(e){if(e==="Facebook")return Yr(r.social.facebook);const t=Kr(r.social.instagram);return`
    <div class="socialEmbedFrame">
      <iframe
        title="${e} latest posts"
        src="${t}"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    </div>
  `}function Kr(e){return`${String(e||L.social.instagram).split("?")[0].replace(/\/+$/,"")}/embed`}function Yr(e){return`
    <div class="socialEmbedFrame facebookPreviewMock" role="img" aria-label="Facebook preview for First Light Training Center">
      <div class="facebookMockTop">
        <b>f</b>
        <span>Facebook</span>
      </div>
      <div class="facebookMockPage">
        <strong>First Light Training Center</strong>
        <small>${r.language==="zh"?"点击按钮打开真实 Facebook 页面":"Open the real Facebook page for current posts"}</small>
      </div>
      <div class="facebookMockPost">
        <span>${r.language==="zh"?"最新动态预览":"Latest updates preview"}</span>
        <h4>Training updates and court news</h4>
        <small>${e||L.social.facebook}</small>
      </div>
    </div>
  `}function Qr(){return`
    <section class="bottomCta">
      <h2>${r.language==="zh"?"准备开始训练了吗？":"Ready to start stacking days?"}</h2>
      <p>${r.language==="zh"?"预约训练、租场、加入开放球场或联系我们了解最适合你的项目。":"Book training, rent a court, join open gym, or contact us to find the right program."}</p>
      <button class="blueCta" data-route="programs">${r.language==="zh"?"查看项目":"View Programs"}</button>
    </section>
  `}function Xr(){return`${q(s("programsPage.title"),s("programsPage.subtitle"))}${Sn()}`}function Zr(e){const a={basketball:{menu:"basketball",programId:"basketball"},volleyball:{menu:"volleyball",programId:"volleyball"},conditioning:{menu:"conditioning",programId:"conditioning-training"},court:{menu:"court",programId:"court-rental"},membership:{menu:"membership",programId:"membership"}}[e];if(!a)return Te();const n=r.programs.find(l=>l.id===a.programId),i=a.menu,o=se(i);return`
    <section class="stackSection" id="programs">
      <div class="centerHead">
        <h2>${n?h(n,"title"):un(i)}</h2>
        <p>${n?h(n,"subtitle"):r.language==="zh"?"选择项目查看详情。":"Choose an option to view details."}</p>
      </div>
      <div class="programTileGrid">
        ${o.map(eo).join("")}
      </div>
    </section>
  `}function eo(e){return`
    <button class="programTile" data-route="${le(e)}" style="${ie(e,"image",Y("default-court",_),"--tile")}">
      <span>${Ie(h(e,"label"))}</span>
      <small>${h(e,"subtitle")}</small>
    </button>
  `}function to(e){if(e==="open-gym")return Mn();if(e==="membership")return ao();const t=r.programs.find(i=>i.id===e);if(!t)return Te();const a=r.sessions.filter(i=>i.programId===e&&i.active),n=r.courtSlots.filter(i=>i.programId===e&&i.active!==!1);return`
    <section class="detailHero" style="${ie(t,"image",Y("default-court",_),"--hero")}">
      <div>
        <h1>${Ie(h(t,"title"))}</h1>
        <p>${h(t,"subtitle")}</p>
      </div>
    </section>
    <section class="detailLayout">
      <aside>
        <h2>${r.language==="zh"?"项目介绍":"Program Details"}</h2>
        <p>${h(t,"detail")}</p>
        <h3>${r.language==="zh"?"适合人群":"Best For"}</h3>
        <p>${h(t,"audience")}</p>
      </aside>
      <div>
        ${e==="court-rental"?`${Pn("main-full")}`:""}
        ${a.length?`${wn(a)}<h2>${r.language==="zh"?"可预约课程":"Available Sessions"}</h2><div class="detailCards">${a.map(Xt).join("")}</div>`:""}
        ${e!=="court-rental"&&n.length?`<h2>${r.language==="zh"?"实时租场时间表":"Live Court Schedule"}</h2><div class="slotGrid">${n.map(uo).join("")}</div>`:""}
        ${!a.length&&!n.length?_n(t):""}
      </div>
    </section>
  `}function ao(){const e=r.programs.find(a=>a.id==="membership");if(!e)return Te();const t=r.sessions.filter(a=>a.programId==="membership"&&a.active!==!1).sort((a,n)=>Se(a)-Se(n)||String(a.title_en||a.title||"").localeCompare(String(n.title_en||n.title||"")));return`
    <section class="detailHero membershipHero" style="${ie(e,"image",Y("default-court",_),"--hero")}">
      <div>
        <h1>${Ie(h(e,"title"))}</h1>
        <p>${h(e,"subtitle")}</p>
      </div>
    </section>
    <section class="membershipProgramPage">
      <div class="membershipIntro">
        <div>
          <div class="eyebrow">${r.language==="zh"?"会员计划":"Membership Plans"}</div>
          <h2>${r.language==="zh"?"选择适合你的月度会员":"Choose Your Monthly Membership"}</h2>
          <p>${h(e,"detail")}</p>
        </div>
      </div>
      <div class="membershipPlanGrid">
        ${t.length?t.map(no).join(""):_n(e)}
      </div>
    </section>
  `}function no(e){const t=Ce(e),a=ee(e);return`
    <article class="membershipPlanCard" data-membership-plan="${b(e.id)}">
      <div class="membershipPlanTop">
        <span>${ce(a)}</span>
        <b>${t>0?`${t} ${A("spots")}`:A("sold")}</b>
      </div>
      <h2>${h(e,"title")}</h2>
      <div class="membershipPlanPrice">${Cr(e)}</div>
      <p>${h(e,"desc")}</p>
      <dl class="membershipPlanMeta">
        <div><dt>${r.language==="zh"?"开放时间":"Access Time"}</dt><dd>${K(e.time)}</dd></div>
        <div><dt>${r.language==="zh"?"结算周期":"Billing Cycle"}</dt><dd>${m(Gt(e))}</dd></div>
        <div><dt>${r.language==="zh"?"权益内容":"Benefit Level"}</dt><dd>${m(jt(e))}</dd></div>
      </dl>
      <button type="button" data-add-session="${b(e.id)}" ${t>0?"":"disabled"}>${t>0?A("add"):A("sold")}</button>
    </article>
  `}function Se(e={}){return ee(e)==="regular"?1:2}function _n(e){const t=h(e,"statusTitle"),a=h(e,"statusBody"),n=h(e,"statusButton"),i=e.statusRoute||"contact";return!t&&!a&&!n?"":`
    <section class="panel detailEmpty">
      ${t?`<h2>${m(t)}</h2>`:""}
      ${a?`<p>${m(a)}</p>`:""}
      ${n?`<button class="blueCta" data-route="${b(i)}">${m(n)}</button>`:""}
    </section>
  `}function wn(e){const t=U("scheduleOverview","subtitle","");return`
    <section class="scheduleOverview">
      <h2>${U("scheduleOverview","title",r.language==="zh"?"时间总览":"Schedule Overview")}</h2>
      ${t?`<p>${m(t)}</p>`:""}
      <div>
        ${e.map(a=>`<article><strong>${h(a,"title")}</strong><span>${Ue(a)}</span><b>${K(a.time)}</b></article>`).join("")}
      </div>
    </section>
  `}function io(e,t){return e.kind!=="booking"?!1:(e.displayServiceId||e.serviceId)===t.id?!0:t.id==="main-half"&&["main-half-a","main-half-b"].includes(e.serviceId)}function Pn(e="main-full"){const t=Kt(e),a=de(),n=N(t.serviceId)||a[0];if(!n)return"";const i={...t,serviceId:n.id,duration:ae(n,t.duration)},o=At(),l=[...r.bookings,...o],c=Nt(i.duration);n.id;const d=a.map(S=>`
    <button class="bookingService ${S.id===n.id?"active":""}" type="button" data-booking-service="${S.id}" style="${ie(S.image?S:ut(S),"image",Yt(S),"--tile")}">
      <span>${R(S,r.language)}</span>
      ${hn(S)}
    </button>
  `).join(""),u=n.mode==="machine"?"":`
        <label>${s("bookingSystem.participants")}
          <input type="number" min="1" max="${n.capacity}" value="${i.quantity}" data-booking-draft="quantity" />
        </label>
  `,p=c.map(S=>{const y={date:i.date,startTime:S,endTime:ke(S,i.duration),quantity:i.quantity,machinePosition:i.machinePosition},f=`${S}-${y.endTime}`,C=i.selectedStartTime===S,G=n.mode==="machine"&&!i.machinePosition?{available:!1,reason:r.language==="zh"?"请先选择投篮机。":"Choose a shooting machine first."}:C?{available:!0}:ne(n,y,l);return`<button type="button" class="${["timeChip",C?"selected":"",G.available?"":"disabled"].filter(Boolean).join(" ")}" ${G.available?`data-booking-time="${S}"`:"disabled"} title="${b(C?s("bookingSystem.selected"):ge(G.reason)||s("bookingSystem.available"))}">${f}</button>`}).join(""),$=n.id==="main-full"?In(i):`
      ${n.mode==="machine"?Cn(i.machinePosition):""}
      <div class="bookingControls ${n.mode==="machine"?"machineControls":""}">
        <label>${s("bookingSystem.date")}<input type="date" name="date" value="${i.date}" min="2026-05-27" data-booking-draft="date" /></label>
        <label>${s("bookingSystem.duration")}
          <select name="duration" data-booking-draft="duration">
            ${je(n,i.duration)}
          </select>
        </label>
        ${u}
        <div class="bookingPrice">${Br(n,i.duration,i.quantity)}</div>
      </div>
      <div class="bookingLiveNote">${U("courtBookingSystem","liveNote",s("bookingSystem.liveNote"))}</div>
      <div class="timeGrid">${p||`<p class="empty">${s("bookingSystem.empty")}</p>`}</div>
      <div class="bookingFooter">
        <span>${U("courtBookingSystem","footer",s("bookingSystem.footer"))}</span>
        <button class="checkoutBelowTimes" type="button" data-add-booking-to-cart ${i.selectedStartTime?"":"disabled"}>${i.selectedStartTime?A("add"):r.language==="zh"?"选择时间":"Select a Time"}</button>
      </div>
  `;return`
    <section class="bookingSystem" id="booking-system">
      <div class="bookingHeader">
        <div>
          <div class="eyebrow">${U("courtBookingSystem","eyebrow",s("bookingSystem.eyebrow"))}</div>
          <h2>${U("courtBookingSystem","title",s("bookingSystem.title"))}</h2>
          <p>${U("courtBookingSystem","body",s("bookingSystem.description"))}</p>
        </div>
      </div>
      <div class="bookingServiceGrid">${d}</div>
      ${$}
    </section>
  `}function In(e,t={}){const a=N("main-full");return`
    <form class="panel fullCourtRequestForm" ${t.member?"data-member-full-court-request":"data-full-court-request"}>
      <h3>${r.language==="zh"?"留下定场信息":"Request Main Court Booking"}</h3>
      <p>${r.language==="zh"?"工作人员会根据场地情况协助确认，并通过电话或邮件回复。":"Staff will review court availability and reply by phone or email to help confirm the booking."}</p>
      <div class="formGrid">
        <label>${r.language==="zh"?"姓名":"Name"} *<input required name="name" /></label>
        <label>${r.language==="zh"?"订场日期":"Booking date"} *<input required type="date" name="date" value="${e.date}" min="2026-05-27" /></label>
        <label>${r.language==="zh"?"订场时间段":"Preferred time range"} *<input required name="preferredTimeRange" placeholder="18:00-20:00" /></label>
        <label>${r.language==="zh"?"订场时长":"Duration"} *
          <select required name="duration">${je(a,e.duration)}</select>
        </label>
        <label>${r.language==="zh"?"邮箱":"Email"} *<input required type="email" name="email" /></label>
        <label>${r.language==="zh"?"电话":"Phone"} *<input required name="phone" /></label>
        <label>${r.language==="zh"?"人数":"Participants"}<input type="number" min="1" max="20" name="participants" value="1" /></label>
        <label class="wide">${r.language==="zh"?"备注":"Notes"}<textarea name="notes"></textarea></label>
      </div>
      <button>${r.language==="zh"?"提交定场请求":"Submit Court Request"}</button>
    </form>
  `}function Cn(e="",t="data-machine-position"){const a=["machine-1","machine-2","machine-3"];return`
    <section class="machineSelector">
      <div>
        <h3>${r.language==="zh"?"选择投篮机":"Choose a Shooting Machine"}</h3>
        <p>${r.language==="zh"?"先选择一台机器，再选择下方时间。":"Select one machine, then choose a time below."}</p>
      </div>
      <div class="machineMap" style="--machine-layout:url('${rr}')">
        ${a.map((n,i)=>`
          <button type="button" class="machineSpot machineZone${i+1} ${e===n?"selected":""}" ${t}="${n}">
            <span>${r.language==="zh"?`投篮机 ${i+1}`:`Machine ${i+1}`}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `}function Xt(e){const t=Ce(e),a=ro(e),n=a?oo(e):null,i=a&&n.count>1,o=a?i?`
        <div><span>${r.language==="zh"?`${n.count} 周`:`${n.count} weeks`}</span><b>${w(n.price)}</b></div>
        <div><span>${r.language==="zh"?"时间":"Time"}</span><b>${K(e.time)}</b></div>
      `:`
        <div><span>${A("regular")}</span><b>${w(e.regularPrice)}</b></div>
        <div><span>${A("member")}</span><b>${w(e.memberPrice)}</b></div>
        <div><span>${r.language==="zh"?"时间":"Time"}</span><b>${K(e.time)}</b></div>
      `:`
      <div><span>${A("regular")}</span><b>${w(e.regularPrice)}</b></div>
      <div><span>${A("member")}</span><b>${w(e.memberPrice)}</b></div>
      <div><span>${r.language==="zh"?"时间":"Time"}</span><b>${K(e.time)}</b></div>
    `;return`
    <article class="detailCard">
      <div class="cardTop"><span>${t>0?`${t} ${A("spots")}`:A("sold")}</span><strong>${e.waiver?r.language==="zh"?"需要免责协议":"Waiver required":""}</strong></div>
      <h3>${Ie(h(e,"title"))}</h3>
      <p>${h(e,"desc")}</p>
      <div class="priceRows">
        ${o}
      </div>
      ${a?so(e,n):lo(e)}
      ${a?"":co(e)}
      <button ${t===0?"disabled":""} ${a?`data-add-selected-weeks="${e.id}"`:`data-add-session="${e.id}"`}>${A("add")}</button>
    </article>
  `}function ro(e){return["basketball","volleyball"].includes(e?.programId)&&Array.isArray(e.datesList)&&e.datesList.length>1&&Array.isArray(e.packages)&&e.packages.some(([t])=>/\d+\s*weeks?/i.test(String(t)))}function Tn(e,t){if(t<=1)return Number(e.regularPrice||0);const a=e.packages?.find(([n])=>Number(String(n).match(/\d+/)?.[0]||0)===t);return Number(a?.[1]||e.regularPrice*t||0)}function Zt(e){const t=e.datesList||be(e.dates);if(!t.length)return[];let a=[];try{a=JSON.parse(sessionStorage.getItem(`selectedWeeks:${e.id}`)||"[]")}catch{a=[]}const n=t.filter(i=>a.includes(i)).slice(0,4);return n.length?n:[t[0]]}function oo(e){const t=Zt(e),a=t.length;return{selectedWeeks:t,count:a,price:a>1?Tn(e,a):Number(e.regularPrice||0)}}function so(e,t){const a=e.datesList||be(e.dates);if(!a.length&&!e.dateSummary)return"";const n=sessionStorage.getItem(`dates:${e.id}`)==="open",i=n?a:a.slice(0,4),o=new Set(t.selectedWeeks);return`
    <div class="scheduleBlock selectableSchedule">
      <div class="scheduleHead">
        <span>${r.language==="zh"?"时间表":"Schedule"}</span>
        <strong>${r.language==="zh"?`已选择 ${t.count} 周 · 最多 4 周`:`${t.count} selected · max 4 weeks`}</strong>
      </div>
      <div class="dateChips">
        ${i.map((l,c)=>{const d=o.has(l),u=!d&&t.count>=4;return`<button type="button" class="${d?"selected":""}" data-toggle-week="${e.id}:${c}" ${u?"disabled":""}>${He(l)}</button>`}).join("")}
      </div>
      ${a.length>4?`<button class="textButton" data-toggle-dates="${e.id}">${n?r.language==="zh"?"收起日期":"Hide dates":r.language==="zh"?`查看全部 ${a.length} 个日期`:`View all ${a.length} dates`}</button>`:""}
    </div>
  `}function lo(e){const t=e.datesList||be(e.dates);if(!t.length&&!e.dateSummary)return"";const a=sessionStorage.getItem(`dates:${e.id}`)==="open",n=a?t:t.slice(0,4);return`
    <div class="scheduleBlock">
      <div class="scheduleHead">
        <span>${r.language==="zh"?"时间表":"Schedule"}</span>
        <strong>${Ue(e)||(r.language==="zh"?`${t.length} 个日期`:`${t.length} date${t.length===1?"":"s"}`)}</strong>
      </div>
      <div class="dateChips">
        ${n.map(i=>`<span>${He(i)}</span>`).join("")}
      </div>
      ${t.length>4?`<button class="textButton" data-toggle-dates="${e.id}">${a?r.language==="zh"?"收起日期":"Hide dates":r.language==="zh"?`查看全部 ${t.length} 个日期`:`View all ${t.length} dates`}</button>`:""}
    </div>
  `}function co(e){return e.packages?.length?`
    <div class="packageTable">
      <h4>${r.language==="zh"?"课包选择":"Package Options"}</h4>
      ${e.packages.map(([t,a],n)=>`<div><span>${Tt(t)}</span><b>${w(a)}</b><button type="button" data-add-package="${e.id}:${n}">${A("add")}</button></div>`).join("")}
    </div>
  `:""}function be(e){return!e||/weekly options|monthly|appointment|flexible/i.test(e)?[]:String(e).split(",").map(t=>t.trim().replace(/^June /,"Jun ")).filter(Boolean)}function uo(e){return`
    <article class="slot ${e.booked?"booked":""}">
      <span>${r.language==="zh"?e.title_zh:e.courtType}</span>
      <h3>${mo(e.date)}</h3>
      <p class="slotTime">${K(e.time)}</p>
      <b>${w(e.price)}/H</b>
      <small>${r.language==="zh"?`最多 ${e.capacity} 人`:`Up to ${e.capacity} people`} · ${zr(e.minimum)}</small>
      <button ${e.booked?"disabled":""} data-add-court="${e.id}">${e.booked?r.language==="zh"?"已被预约":"Booked":A("add")}</button>
    </article>
  `}function mo(e){const t=new Date(`${e}T12:00:00`);return Number.isNaN(t.getTime())?e:t.toLocaleDateString(r.language==="zh"?"zh-CN":"en-CA",{weekday:"short",month:"short",day:"numeric"})}function po(){return`${q(s("coachesPage.title"),s("coachesPage.subtitle"))}${kn()}`}function go(e){const t=(r.dropdownPages||[]).find(i=>i.id===e&&i.active!==!1);if(!t||t.targetRoute)return Te();const a=ho(t),n=un(t.parentMenu);return`
    <section class="detailHero" style="${ie(t,"image",Y("default-court",_),"--hero")}">
      <div>
        <h1>${Ie(h(t,"title"))}</h1>
        <p>${h(t,"subtitle")}</p>
      </div>
    </section>
    <section class="detailLayout">
      <aside>
        <h2>${n}</h2>
        <p>${h(t,"body")}</p>
        ${h(t,"productIntro")?`<h3>${r.language==="zh"?"产品介绍":"Product Introduction"}</h3><p>${h(t,"productIntro")}</p>`:""}
        ${t.privatePricing?`<button class="blueCta" data-route="contact">${r.language==="zh"?"咨询私教训练":"Request Private Training"}</button>`:""}
      </aside>
      <div>
        ${t.id==="basketball-film-to-floor"?bo():""}
        ${t.privatePricing?fo(t):""}
        ${a.length?`${wn(a)}<h2>${r.language==="zh"?"可预约课程":"Available Sessions"}</h2><div class="detailCards">${a.map(Xt).join("")}</div>`:""}
        ${!a.length&&!t.privatePricing?An():""}
      </div>
    </section>
  `}function bo(){const e=sessionStorage.getItem("filmReviewUploadNotice")||"",t=sessionStorage.getItem("filmReviewUploadProgress")||"",a=Be(),n=a;return`
    <section class="filmReviewPanel panel">
      <div class="filmReviewHead">
        <div>
          <div class="eyebrow">${r.language==="zh"?"一对一视频分析":"1:1 Video Review"}</div>
          <h2>${r.language==="zh"?"上传你的比赛视频":"Upload Your Game Film"}</h2>
          <p>${r.language==="zh"?"学员可直接上传打球视频，教练会根据视频内容准备一对一训练建议。":"Athletes can upload game footage here so a coach can prepare focused one-on-one training feedback."}</p>
        </div>
        <span>${r.language==="zh"?"MP4 / MOV / WEBM，最大 500MB":"MP4 / MOV / WEBM, max 500MB"}</span>
      </div>
      ${a?"":`<p class="formError">${r.language==="zh"?"视频上传暂未启用。请先配置 Supabase URL 和 Anon Key 后再接受真实上传。":"Video uploads are not enabled yet. Configure Supabase URL and anon key before accepting live uploads."}</p>`}
      ${e?`<div class="adminNotice">${m(e)}</div>`:""}
      ${t?`<div class="filmReviewProgress"><span style="width:${Number(t)}%"></span></div>`:""}
      <form class="filmReviewForm" data-film-review-upload>
        <div class="formGrid">
          <label>${r.language==="zh"?"学员姓名":"Student name"} *<input required name="studentName" /></label>
          <label>${r.language==="zh"?"电话":"Phone"} *<input required name="phone" /></label>
          <label>${r.language==="zh"?"邮箱":"Email"} *<input required type="email" name="email" /></label>
          <label>${r.language==="zh"?"年龄":"Age"}<input name="playerAge" inputmode="numeric" /></label>
          <label class="wide">${r.language==="zh"?"打球经验 / 所属球队":"Playing experience / team"} *<input required name="experience" placeholder="${r.language==="zh"?"例如：校队，两年经验":"e.g. school team, 2 years"}" /></label>
          <label class="wide">${r.language==="zh"?"希望教练重点分析什么？":"What should the coach focus on?"} *<textarea required name="goals" placeholder="${r.language==="zh"?"例如：决策、投篮选择、防守站位":"e.g. decisions, shot selection, defensive positioning"}"></textarea></label>
          <label class="wide">${r.language==="zh"?"补充说明":"Additional notes"}<textarea name="notes"></textarea></label>
          <label class="wide filmReviewFile">${r.language==="zh"?"上传视频":"Upload video"} *
            <input required type="file" name="video" accept="video/mp4,video/quicktime,video/webm,.mp4,.mov,.webm" />
          </label>
        </div>
        <button ${n?"":"disabled"}>${r.language==="zh"?"提交给教练":"Send to Coach"}</button>
      </form>
    </section>
  `}function ho(e){return(e.sessionIds||[]).map(a=>r.sessions.find(n=>n.id===a&&n.active)).filter(Boolean)}function An(e){return`
    <section class="panel detailEmpty">
      <h2>${r.language==="zh"?"请联系我们":"Please contact us"}</h2>
      <p>${r.language==="zh"?"这个项目的产品、价格和时间表可由后台随时更新。请联系 First Light 确认最新安排。":"Products, prices, and schedule for this catalog item can be updated from the admin dashboard at any time. Contact First Light for the latest availability."}</p>
      <button class="blueCta" data-route="contact">${r.language==="zh"?"联系咨询":"Contact Us"}</button>
    </section>
  `}function fo(e={}){const t=_e(e),a=`grid-template-columns:minmax(150px, 1.25fr) repeat(${t.privatePricingColumns.length}, minmax(120px, 1fr))`;return`
    <section class="priceMatrix">
      <h2>${r.language==="zh"?"私教价格":"Private Training Pricing"}</h2>
      <div class="matrixScroller">
        <div class="matrixHeader" style="${a}"><span>${r.language==="zh"?"项目":"Product"}</span>${t.privatePricingColumns.map(n=>`<span>${m(ka(n))}</span>`).join("")}</div>
        ${t.privatePricingRows.map(n=>`<div style="${a}"><strong>${m(ka(n))}</strong>${t.privatePricingColumns.map(i=>`<span>${w(n.prices[i.id])}</span>`).join("")}</div>`).join("")}
      </div>
      <form class="panel contactForm compactForm" data-contact>
        <h3>${r.language==="zh"?"咨询训练":"Request Training"}</h3>
        <label>${r.language==="zh"?"姓名":"Full Name"} *<input required name="name" /></label>
        <label>${r.language==="zh"?"邮箱":"Email address"} *<input required type="email" name="email" /></label>
        <label>${r.language==="zh"?"可训练时间":"Availability"} *<input required name="availability" /></label>
        <label>${r.language==="zh"?"主要训练目标":"Primary Training Goals"} *<textarea required name="goals"></textarea></label>
        <label>${r.language==="zh"?"是否已有训练伙伴？":"Do you already have a training partner?"} *<input required name="partner" /></label>
        <button>${s("contactPage.submit")}</button>
      </form>
    </section>
  `}function ka(e={}){return e.label_en||""}function vo(e){const t=r.coaches.find(n=>n.id===e);if(!t)return Te();const a=String(t.programs||"").split(",").map(n=>n.trim()).filter(Boolean).map(n=>r.programs.find(i=>i.id===n)).filter(Boolean);return`
    <section class="coachDetail">
      <button class="backButton" data-route="coaches">${A("back")}</button>
      <div class="coachDetailGrid">
        <img src="${t.portrait||t.image}" alt="${t.name}" style="${qe(t,t.portrait?"portrait":"image")}" />
        <div>
          <span>${h(t,"role")}</span>
          <h1>${t.name}</h1>
          <p>${h(t,"bio")}</p>
          <div class="linkedPrograms">
            ${a.map(n=>`<button class="pillButton" data-route="program:${n.id}">${h(n,"title")}</button>`).join("")}
          </div>
        </div>
      </div>
    </section>
  `}function yo(){return`
    ${q(s("schedulePage.title"),s("schedulePage.subtitle"))}
    <section class="detailLayout">
      <aside><h2>${s("schedulePage.trainingSessions")}</h2><p>${s("schedulePage.trainingBody")}</p></aside>
      <div class="detailCards">${r.sessions.filter(e=>e.active).map(Xt).join("")}</div>
    </section>
    <section class="stackSection"><h2>${s("schedulePage.courtRental")}</h2>${Pn("main-full")}</section>
  `}function $o(){return`
    ${q(s("contactPage.title"),s("contactPage.subtitle"))}
    <section class="contactLayout" id="contact">
      <form class="panel contactForm" data-contact>
        <label>${s("contactPage.firstName")} *<input required name="firstName" /></label>
        <label>${s("contactPage.lastName")} *<input required name="lastName" /></label>
        <label>${s("contactPage.email")} *<input required type="email" name="email" /></label>
        <label>${s("contactPage.phone")}<input name="phone" /></label>
        <label class="wide">${s("contactPage.comments")}<textarea name="message"></textarea></label>
        <button>${s("contactPage.submit")}</button>
      </form>
      <div class="contactInfo">
        <h2>${s("contactPage.connect")}</h2>
        <p>165-13631 Vulcan Way, Richmond, BC V6V 1K4</p>
        <p>info@firstlighttrainingcenter.ca</p>
        <p>WeChat: ${r.social.wechat}</p>
        <div class="footerSocials">
          <a href="${r.social.instagram}" target="_blank" rel="noreferrer">Instagram</a>
          <a href="${r.social.facebook}" target="_blank" rel="noreferrer">Facebook</a>
        </div>
        <img class="wechat" src="${r.social.wechatQr}" alt="WeChat QR" />
      </div>
    </section>
  `}function So(){return`
    ${q(s("leaguePage.title"),s("leaguePage.subtitle"))}
    <section class="leagueLayout">
      <div>
        <h2>${s("leaguePage.heading")}</h2>
        <p>${s("leaguePage.body1")}</p>
        <p>${s("leaguePage.body2")}</p>
        <p>${s("leaguePage.body3")}</p>
      </div>
      <aside class="registrationPanel">
        <span>${s("leaguePage.registration")}</span>
        <b>CA$1,700</b>
        <p>${s("leaguePage.payment")} <strong>Firstlightvan@outlook.com</strong>.</p>
        <button data-route="contact">${s("leaguePage.contact")}</button>
      </aside>
    </section>
  `}function ko(){const e=h(r.pages.about,"body").split(`

`).map(a=>`<p>${a}</p>`).join(""),t=wr("about-gallery");return`
    ${q(s("aboutPage.title"),s("aboutPage.subtitle"))}
    <section class="storyLayout">
      <div>
        <h2>${h(r.pages.about,"title")}</h2>
        ${e}
      </div>
      <div class="storyGallery">
        ${t.map(a=>`<img src="${b(a.image)}" alt="${s("aboutPage.facilityAlt")}" style="${qe(a)}" />`).join("")}
      </div>
    </section>
  `}function Mn(){const e=r.programs.find(a=>a.id==="open-gym"),t=r.sessions.find(a=>a.id==="open-gym"&&a.active);return!e||!t?Te():`
    ${q(U("openGymBooking","heroTitle",r.language==="zh"?"开放球场":"OPEN GYM"),h(e,"subtitle"))}
    <section class="openCourtPage openGymCourtPage">
      <div class="openCourtIntro">
        <div>
          <div class="eyebrow">${U("openGymBooking","eyebrow",r.language==="zh"?"Drop-in 价格 + 开放时间":"Drop-in Price + Open Times")}</div>
          <h2>${U("openGymBooking","title",r.language==="zh"?"开放球场预约":"Open Gym Booking")}</h2>
        </div>
        <p>${U("openGymBooking","body",r.language==="zh"?"先查看开放球场价格和预约入口，下方时间表会同步显示后台维护的可 drop-in 时间。":"Review open gym pricing and booking first, then see staff-managed drop-in availability below.")}</p>
      </div>
      <h2>${r.language==="zh"?"可预约课程":"Available Sessions"}</h2>
      <div class="detailCards openGymCourtCards">${_o(t)}</div>
      ${wo()}
    </section>
  `}function _o(e){const t=Ce(e),a=Oe(e);return`
    <article class="detailCard openGymPricingCard">
      <div class="cardTop"><span>${t>0?`${t} ${A("spots")}`:A("sold")}</span><strong>${e.waiver?r.language==="zh"?"需要免责协议":"Waiver required":""}</strong></div>
      <h3>${h(e,"title")}</h3>
      <p>${h(e,"desc")}</p>
      <div class="priceRows">
        ${a.map(n=>`<div><span>${m(h(n,"label"))}</span><b>${w(n.price)}</b></div>`).join("")}
      </div>
      <div class="openGymScheduleNote">
        <strong>${U("openGymBooking","scheduleTitle",r.language==="zh"?"实时开放时间":"Live Drop-in Times")}</strong>
        <p>${U("openGymBooking","scheduleBody",r.language==="zh"?"Drop-in 时间会按周更新，请先查看下方实时开放时间表。":"Drop-in times change weekly. Check the live schedule below before adding to cart.")}</p>
      </div>
      <button ${t===0?"disabled":""} data-add-session="${e.id}">${A("add")}</button>
    </article>
  `}function wo(){const e=Po(new Date),t=Io(r.openCourtSlots||[],e);return`
    <div class="openCourtIntro openCourtScheduleIntro">
      <div>
        <div class="eyebrow">${r.language==="zh"?"蓝色 = 可 Drop-in":"Blue = Drop-in Available"}</div>
        <h2>${r.language==="zh"?"未来 7 天开放球场时间":"Next 7 Days Open Gym"}</h2>
      </div>
      <p>${r.language==="zh"?"工作人员可在后台随时新增、修改或隐藏开放球场时间段。":"Staff can add, edit, or hide open gym availability from the admin dashboard at any time."}</p>
    </div>
    <div class="openCourtSummaryStrip">
      ${e.map(a=>To(a,_a(t,a))).join("")}
    </div>
    <div class="openCourtBoard">
      ${e.map(a=>Ao(a,_a(t,a))).join("")}
    </div>
    ${zo(e,t)}
  `}function Po(e){const t=new Date(e.getFullYear(),e.getMonth(),e.getDate());return Array.from({length:7},(a,n)=>{const i=new Date(t);return i.setDate(t.getDate()+n),i})}function me(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${n}`}function Io(e,t){const a=t.map(me);return e.filter(n=>n.active!==!1&&a.includes(n.date)&&Co(n)).sort((n,i)=>`${n.date} ${n.startTime}`.localeCompare(`${i.date} ${i.startTime}`))}function Co(e){const t=F(e.startTime),a=F(e.endTime),n=F(Fe),i=F(ct);return a>t&&a>n&&t<i}function _a(e,t){const a=me(t);return e.filter(n=>n.date===a).sort((n,i)=>F(n.startTime)-F(i.startTime))}function To(e,t){const a=me(e)===me(new Date),n=t.length?r.language==="zh"?`${t.length} 个开放时段`:`${t.length} open slot${t.length===1?"":"s"}`:r.language==="zh"?"暂无开放":"No times";return`
    <article class="openCourtSummaryDay ${a?"today":""}">
      <strong>${ta(e)}</strong>
      <span>${n}</span>
    </article>
  `}function Ao(e,t){return`
    <article class="openCourtDayCard">
      <div class="openCourtDayHead">
        <span>${ta(e)}</span>
        <strong>${t.length?r.language==="zh"?`${t.length} 个开放时段`:`${t.length} open`:r.language==="zh"?"暂无":"None"}</strong>
      </div>
      <div class="openCourtSlotList">
        ${t.length?t.map(Mo).join(""):`<p class="openCourtEmptyDay">${r.language==="zh"?"暂无开放时间":"No open gym times"}</p>`}
      </div>
    </article>
  `}function Mo(e){const t=h(e,"notes");return`
    <article class="openCourtSlotCard openCourtAvailable">
      <div>
        <strong>${h(e,"title")||s("openCourt")}</strong>
        <span>${ea(e)}</span>
      </div>
      <small>${r.language==="zh"?`${e.spots||0} 个 drop-in 空位`:`${e.spots||0} drop-in spots`}</small>
      ${t?`<em>${t}</em>`:""}
    </article>
  `}function zo(e,t){const a=Lo(),n=(F(ct)-F(Fe))/30;return`
    <section class="openCourtChartSection">
      <div class="openCourtChartHead">
        <div>
          <div class="eyebrow">${r.language==="zh"?"图表总览":"Chart View"}</div>
          <h2>${r.language==="zh"?"6am-3pm 时间表":"6am-3pm Schedule"}</h2>
        </div>
        <p>${r.language==="zh"?"下方图表和上方看板使用同一份后台开放球场数据。":"This chart uses the same Open Gym availability as the board above."}</p>
      </div>
      <div class="openCourtChartScroller">
        <div class="openCourtChartGrid" style="--open-court-chart-rows:${n}">
          <div class="openCourtChartCorner"></div>
          ${e.map((i,o)=>`<div class="openCourtChartDay" style="grid-column:${o+2};">${ta(i)}</div>`).join("")}
          ${a.map(i=>`<div class="openCourtChartTime" style="grid-row:${wa(`${String(i).padStart(2,"0")}:00`)} / span 2;">${Eo(i)}</div>`).join("")}
          ${a.slice(0,-1).flatMap(i=>e.map((o,l)=>`<div class="openCourtChartCell" style="grid-column:${l+2};grid-row:${wa(`${String(i).padStart(2,"0")}:00`)} / span 2;"></div>`)).join("")}
          ${t.map(i=>No(i,e)).join("")}
        </div>
      </div>
    </section>
  `}function No(e,t){const a=t.findIndex(u=>me(u)===e.date),n=F(Fe),i=F(ct),o=Math.max(F(e.startTime),n),l=Math.min(F(e.endTime),i);if(a<0||l<=o)return"";const c=2+Math.round((o-n)/30),d=Math.max(2,Math.round((l-o)/30));return`
    <article class="openCourtChartBlock openCourtAvailable" style="grid-column:${a+2};grid-row:${c} / span ${d};">
      <strong>${h(e,"title")||s("openCourt")}</strong>
      <span>${ea(e)}</span>
    </article>
  `}function Lo(){const e=Math.floor(F(Fe)/60),t=Math.floor(F(ct)/60);return Array.from({length:t-e+1},(a,n)=>e+n)}function wa(e){return 2+Math.round((F(e)-F(Fe))/30)}function F(e){const[t,a]=String(e||"0:00").split(":").map(n=>Number(n));return(Number.isFinite(t)?t:0)*60+(Number.isFinite(a)?a:0)}function ea(e){return`${Pa(e.startTime)} - ${Pa(e.endTime)}`}function Pa(e){const t=F(e),a=Math.floor(t/60),n=t%60,i=a>=12?"PM":"AM";return`${a%12||12}:${String(n).padStart(2,"0")} ${i}`}function Eo(e){const t=e>=12?"PM":"AM";return`${e%12||12}${t.toLowerCase()}`}function ta(e){return e.toLocaleDateString(r.language==="zh"?"zh-CN":"en-CA",{weekday:"short",month:"numeric",day:"numeric"})}function Bo(){const e=he();return e?.student?Fo(e):Ro(s("memberAccount.loginTitle"),s("memberAccount.loginSubtitle"))}function Ro(e=s("memberAccount.loginTitle"),t=s("memberAccount.loginSubtitle")){const a=sessionStorage.getItem("firstlight_member_login_error")||"";return`
    ${q(e,t)}
    <section class="memberAccount visitorAccount">
      ${zn({membershipLevel:"visitor",membership:{level:"visitor",title:ce("visitor"),source:"none",expiresAt:""}})}
      <div class="memberActionLayout">
        <article class="memberPanel">
          <h3>${s("memberAccount.benefits")}</h3>
          ${Nn()}
          <p>${s("memberAccount.sameEmailHint")}</p>
        </article>
      </div>
    </section>
    <section class="authLayout">
      <form class="panel" data-member-login>
        <h2>${s("memberAccount.memberLogin")}</h2>
        <p class="adminHelp">${s("memberAccount.loginHelp")}</p>
        ${a?`<div class="formError">${m(a)}</div>`:""}
        <label>${s("memberAccount.emailAddress")}<input required name="email" type="email" autocomplete="email" /></label>
        <label>${s("memberAccount.password")}<input required name="password" type="password" autocomplete="current-password" /></label>
        <button>${s("memberAccount.logIn")}</button>
        <div class="authLinks">
          <button type="button" data-route="contact">${s("memberAccount.needAccount")}</button>
          <button type="button" data-route="contact">${s("memberAccount.forgotPassword")}</button>
        </div>
      </form>
    </section>
  `}function j(){return{students:r.students||[],enrollments:r.enrollments||[],creditPackages:r.creditPackages||[],creditTransactions:r.creditTransactions||[],bookings:r.bookings||[],waiverSignatures:r.waiverSignatures||[],sessions:r.sessions||[],bookingServices:de(),openCourtSlots:r.openCourtSlots||[]}}function he(){const e=Do();if(e?.student)return e;const t=sessionStorage.getItem("firstlight_member_student_id");if(!t)return null;const a=ot(j(),t,{now:new Date().toISOString()});return a.student?a:(sessionStorage.removeItem("firstlight_member_student_id"),null)}function Do(){if(!De())return null;try{return JSON.parse(sessionStorage.getItem("firstlight_production_member_summary")||"null")}catch{return sessionStorage.removeItem("firstlight_production_member_summary"),null}}function Fo(e){const t=e.student,a=st(j(),t.id,{now:new Date().toISOString()}),n=e.membershipLevel||"visitor",i=Oo(a,n);return`
    ${q(s("memberAccount.pageTitle"),s("memberAccount.pageSubtitle"))}
    <section class="memberAccount">
      <div class="memberAccountHead">
        <div>
          <div class="eyebrow">${s("memberAccount.loggedInAs")}</div>
          <h2>${m(t.fullName)}</h2>
          <p>${m(t.email)} / ${m(t.phone)} / ${s("memberAccount.age")} ${t.age??Nr(t.birthDate)}</p>
        </div>
        <button type="button" class="secondaryButton" data-member-logout>${s("memberAccount.logout")}</button>
      </div>
      ${Xs()}
      ${zn(e)}
      <div class="memberMetricGrid">
        <article><strong>${e.programs.length}</strong><span>${s("memberAccount.programs")}</span></article>
        <article><strong>${e.creditTotals.remaining}</strong><span>${s("memberAccount.creditsLeft")}</span></article>
        <article><strong>${e.upcomingSchedule.length}</strong><span>${s("memberAccount.scheduleItems")}</span></article>
        <article><strong>${e.orders.length}</strong><span>${s("memberAccount.orders")}</span></article>
      </div>
      <div class="memberActionLayout">
        ${Ho(e)}
        ${jo(e,i)}
      </div>
      ${n==="visitor"?Uo():Go(e,i)}
      <div class="memberGrid">
        <article class="memberPanel">
          <h3>${s("memberAccount.profile")}</h3>
          ${Ia([[s("memberAccount.birthDate"),t.birthDate],[s("memberAccount.address"),ya(t.address)],[s("memberAccount.primarySport"),t.primarySport||s("memberAccount.tbd")],[s("memberAccount.experience"),t.experience||s("memberAccount.tbd")],[s("memberAccount.preferredTime"),t.preferredClassTime||s("memberAccount.tbd")]])}
        </article>
        <article class="memberPanel">
          <h3>${s("memberAccount.guardianEmergency")}</h3>
          ${Ia([[s("memberAccount.guardian"),t.guardianName?`${t.guardianName} / ${t.guardianRelation} / ${t.guardianPhone}`:s("memberAccount.selfManaged")],[s("memberAccount.guardianEmail"),ya(t.guardianEmail)],[s("memberAccount.emergency"),`${t.emergencyName||s("memberAccount.notProvided")} ${t.emergencyPhone||""}`],[s("memberAccount.medical"),t.medicalNotes||s("memberAccount.noneNoted")]])}
        </article>
        <article class="memberPanel">
          <h3>${s("memberAccount.programs")}</h3>
          ${e.programs.length?`<div class="chipList">${e.programs.map(o=>`<span>${m(o)}</span>`).join("")}</div>`:D(s("emptyStates.noPrograms"))}
        </article>
        <article class="memberPanel">
          <h3>${s("memberAccount.benefits")}</h3>
          ${Nn(e)}
        </article>
        <article class="memberPanel widePanel">
          <h3>${s("memberAccount.schedule")}</h3>
          ${Yo(e)}
        </article>
        <article class="memberPanel widePanel">
          <h3>${s("memberAccount.courseCredits")}</h3>
          <div class="creditSummary">
            <span>${s("memberAccount.purchased")} <b>${e.creditTotals.original}</b></span>
            <span>${s("memberAccount.used")} <b>${e.creditTotals.used}</b></span>
            <span>${s("memberAccount.remaining")} <b>${e.creditTotals.remaining}</b></span>
          </div>
          ${e.creditPackages.length?e.creditPackages.map(o=>`
            <div class="memberLine">
              <strong>${m(o.title)} / ${m(o.programId)}</strong>
              <span>${Number(o.originalCredits||0)} ${s("memberAccount.purchased")} / ${Math.max(0,Number(o.originalCredits||0)-Number(o.balance||0))} ${s("memberAccount.used")} / ${Number(o.balance||0)} ${s("memberAccount.remaining")} / ${r.language==="zh"?"到期":"expires"} ${m(o.expiresAt||s("memberAccount.tbd"))}</span>
            </div>
          `).join(""):D(s("emptyStates.noCredits"))}
          ${e.creditTransactions.length?`<div class="miniTimeline">${e.creditTransactions.slice(-6).reverse().map(o=>`<span>${m(o.createdAt||"")}: ${m(x(o.type||o.transactionType||"adjustment"))} ${Number(o.units||0)} / ${r.language==="zh"?"余额":"balance"} ${Number(o.balanceAfter||0)}</span>`).join("")}</div>`:""}
        </article>
        <article class="memberPanel widePanel">
          <h3>${s("memberAccount.ordersPayment")}</h3>
          ${e.orders.length?e.orders.map(es).join(""):D(s("emptyStates.noOrders"))}
        </article>
        <article class="memberPanel">
          <h3>${s("memberAccount.waivers")}</h3>
          ${e.waivers.length?e.waivers.map(o=>`
            <div class="memberLine">
              <strong>${m(o.templateVersion||(r.language==="zh"?"免责协议":"Waiver"))}</strong>
              <span>${m(o.signerName)} / ${m(o.signerRelation)} / ${xe(o.signedAt)}</span>
            </div>
          `).join(""):D(s("emptyStates.noWaivers"))}
        </article>
        <form class="memberPanel" data-member-profile>
          <h3>${s("memberAccount.quickUpdate")}</h3>
          <label>${s("memberAccount.phone")}<input name="phone" value="${b(t.phone)}" /></label>
          <label>${s("memberAccount.address")}<input name="address" value="${b(t.address)}" /></label>
          <label>${s("memberAccount.preferredTime")}<input name="preferredClassTime" value="${b(t.preferredClassTime)}" /></label>
          <label>${s("memberAccount.emergencyPhone")}<input name="emergencyPhone" value="${b(t.emergencyPhone)}" /></label>
          <label>${s("memberAccount.medicalNotes")}<textarea name="medicalNotes">${m(t.medicalNotes)}</textarea></label>
          <button>${s("memberAccount.saveUpdates")}</button>
        </form>
      </div>
      <div class="memberQuickActions">
        <button type="button" data-route="programs">${s("memberAccount.bookMore")}</button>
        <button type="button" data-route="schedule">${s("memberAccount.viewSchedule")}</button>
        <button type="button" data-route="contact">${s("memberAccount.contact")}</button>
      </div>
    </section>
  `}function zn(e={}){const t=e.membershipLevel||e.membership?.level||"visitor",a=e.membership||{},n=a.expiresAt||"",i=a.source||"none";return`
    <article class="membershipLevelCard" data-membership-level="${b(t)}">
      <div>
        <div class="eyebrow">${r.language==="zh"?"会员级别":"Membership Level"}</div>
        <h2>${ce(t)}</h2>
        <p>${Ir(t)}</p>
      </div>
      ${t!=="visitor"?`
        <div class="membershipLevelMeta">
          <span>${s("memberAccount.levelExpires")}: <b>${m(n||s("memberAccount.tbd"))}</b></span>
          <span>${s("memberAccount.levelSource")}: <b>${m(i)}</b></span>
        </div>
      `:""}
      ${qo(t)}
    </article>
  `}function qo(e="visitor"){return e==="plus"?"":`
    <div class="memberQuickActions compactActions">
      ${(e==="regular"?[{id:"training-benefit",label:s("memberAccount.upgradePlus")}]:[{id:"general-membership",label:s("memberAccount.buyRegular")},{id:"training-benefit",label:s("memberAccount.buyPlus")}]).map(a=>`<button type="button" data-add-session="${a.id}"><span>${m(a.label)}</span><strong>${xo(a.id)}</strong></button>`).join("")}
    </div>
  `}function xo(e){const t=r.sessions.find(a=>a.id===e);return t?`${w(t.regularPrice)} / ${r.language==="zh"?"月":"month"}`:""}function Oo(e=[],t="visitor"){return t==="visitor"?[]:t==="regular"?e.filter(a=>a.programId==="open-gym"):e}function Uo(){return`
    <section class="memberPanel memberBookingPanel visitorMemberPrompt">
      <h3>${s("memberAccount.selfService")}</h3>
      <p>${s("memberAccount.visitorNoBooking")}</p>
      <p>${s("memberAccount.sameEmailHint")}</p>
    </section>
  `}function Nn(e={}){const t=r.sessions.filter(a=>a.programId==="membership"&&a.active!==!1).sort((a,n)=>Se(a)-Se(n)||String(a.title_en||a.title||"").localeCompare(String(n.title_en||n.title||""))).map(a=>`
      <div class="memberLine">
        <strong>${m(h(a,"title"))}</strong>
        <span>${m(jt(a))}</span>
      </div>
    `);return e.memberships?.length&&t.push(...e.memberships.map(a=>`
      <div class="memberLine">
        <strong>${m(re(a))}</strong>
        <span>${m(a.meta||a.expiresAt||s("memberAccount.memberBenefit"))}</span>
      </div>
    `)),t.join("")}function Ia(e){return`<dl class="memberInfo">${e.map(([t,a])=>`<div><dt>${m(t)}</dt><dd>${m(a||s("memberAccount.notProvided"))}</dd></div>`).join("")}</dl>`}function Ho(e){const t=[...e.alerts.map(pn),s("memberAccount.cancelPolicy")],a=e.creditPackages.filter(n=>Number(n.balance||0)>0&&Number(n.balance||0)<=3).map(n=>`${n.title} · ${n.balance} ${s("memberAccount.remaining")}`);return`
    <article class="memberPanel memberReminderPanel">
      <h3>${s("memberAccount.reminders")}</h3>
      <div class="chipList">
        ${t.map(n=>`<span class="alertChip">${m(n)}</span>`).join("")}
        ${a.map(n=>`<span class="alertChip">${m(n)}</span>`).join("")}
      </div>
      <div class="memberQuickContact">
        <button type="button" data-route="contact">${s("memberAccount.contactFrontDesk")}</button>
        <span>WeChat: ${m(r.social.wechat)}</span>
        <span>info@firstlighttrainingcenter.ca</span>
      </div>
    </article>
  `}function jo(e,t){return`
    <article class="memberPanel">
      <h3>${s("memberAccount.myProducts")}</h3>
      ${e.creditPackages.length?e.creditPackages.map(a=>`
        <div class="memberLine">
          <strong>${m(a.title)} / ${m(a.programId)}</strong>
          <span>${Number(a.originalCredits||0)} ${s("memberAccount.purchased")} / ${Math.max(0,Number(a.originalCredits||0)-Number(a.balance||0))} ${s("memberAccount.used")} / ${Number(a.balance||0)} ${s("memberAccount.remaining")} / ${r.language==="zh"?"到期":"expires"} ${m(a.expiresAt||s("memberAccount.tbd"))}</span>
        </div>
      `).join(""):D(s("emptyStates.noCredits"))}
      ${t.length?`<p class="memberHint">${s("memberAccount.usableHint")}</p>`:D(s("memberAccount.noUsableProducts"))}
    </article>
  `}function Go(e,t){const a=aa(t);return`
    <section class="memberPanel memberBookingPanel">
      <div class="memberPanelHead">
        <div>
          <h3>${s("memberAccount.selfService")}</h3>
          <p>${s("memberAccount.selfServiceHelp")}</p>
        </div>
        ${t.length?`
          <label>${s("memberAccount.chooseProduct")}
            <select data-member-package-select>
              ${t.map(n=>`<option value="${n.id}" ${a?.id===n.id?"selected":""}>${m(n.title)} · ${n.programId} · ${n.balance} ${s("memberAccount.remaining")}</option>`).join("")}
            </select>
          </label>
        `:""}
      </div>
      ${a?Vo(e.student.id,a):D(s("memberAccount.noUsableProducts"))}
    </section>
  `}function aa(e){if(!e.length)return null;const t=sessionStorage.getItem("memberSelectedPackageId");return e.find(a=>a.id===t)||e[0]}function Vo(e,t){return t.programId==="court-rental"?Jo(t):t.programId==="open-gym"?Ko(e,t):Wo(e,t)}function Wo(e,t){const a=qt(j(),e,t.id,{now:new Date().toISOString()});return a.length?`
    <div class="memberOptionGrid">
      ${a.map(n=>{const i=n.session?.datesList||be(n.session?.dates);return i.length?`
            <article class="memberOptionCard">
              <strong>${m(h(n.session,"title")||n.title)}</strong>
              <span>${m(K(n.session?.time||n.time||s("memberAccount.tbd")))}</span>
              <div class="dateChips memberDateChips">
                ${i.slice(0,8).map((o,l)=>`<button type="button" data-member-reserve-class="${t.id}:${n.id}:${l}">${m(He(o))}</button>`).join("")}
              </div>
            </article>
          `:`
          <form class="memberOptionCard" data-member-reserve-custom-class>
            <input type="hidden" name="packageId" value="${b(t.id)}" />
            <input type="hidden" name="sessionId" value="${b(n.id)}" />
            <strong>${m(h(n.session,"title")||n.title)}</strong>
            <label>${s("bookingSystem.date")}<input required type="date" name="date" min="2026-05-27" /></label>
            <label>${s("adminBookings.startTime")}<input required type="time" name="startTime" value="18:00" step="1800" /></label>
            <button>${s("memberAccount.reserveUse")}</button>
          </form>
        `}).join("")}
    </div>
  `:D(s("memberAccount.noBookableTimes"))}function Jo(e){const t=na(),a=qt(j(),sessionStorage.getItem("firstlight_member_student_id"),e.id,{now:new Date().toISOString()}),n=N(t.serviceId)||N(a[0]?.serviceId);if(!n)return D(s("memberAccount.noBookableTimes"));const i={...t,serviceId:n.id,duration:ae(n,t.duration)},o=r.bookings||[],l=Nt(i.duration),c=n.mode==="machine"?"":`
        <label>${s("bookingSystem.participants")}
          <input type="number" min="1" max="${n.capacity}" value="${i.quantity}" data-member-booking-draft="quantity" />
        </label>
  `,d=l.map(p=>{const $={date:i.date,startTime:p,endTime:ke(p,i.duration),quantity:n.mode==="machine"?1:Math.max(1,i.quantity),machinePosition:n.mode==="machine"?i.machinePosition:""},y=n.mode==="machine"&&!i.machinePosition?{available:!1,reason:r.language==="zh"?"请先选择投篮机。":"Choose a shooting machine first."}:ne(n,$,o),f=i.selectedStartTime===p;return`<button type="button" class="${["timeChip",f?"selected":"",y.available?"":"disabled"].filter(Boolean).join(" ")}" ${y.available?`data-member-resource-time="${p}"`:"disabled"} title="${b(f?s("bookingSystem.selected"):ge(y.reason)||s("bookingSystem.available"))}">${p}-${$.endTime}</button>`}).join(""),u=n.id==="main-full"?In(i,{member:!0}):`
      ${n.mode==="machine"?Cn(i.machinePosition,"data-member-machine-position"):""}
      <div class="bookingControls">
        <label>${s("bookingSystem.date")}<input type="date" value="${i.date}" min="2026-05-27" data-member-booking-draft="date" /></label>
        <label>${s("bookingSystem.duration")}<select data-member-booking-draft="duration">${je(n,i.duration)}</select></label>
        ${c}
        <div class="bookingPrice"><span>${s("memberAccount.memberCreditCost")}</span><b>1</b></div>
      </div>
      <div class="bookingLiveNote">${s("bookingSystem.liveNote")}</div>
      <div class="timeGrid">${d||`<p class="empty">${s("bookingSystem.empty")}</p>`}</div>
      <div class="bookingFooter">
        <span>${r.language==="zh"?"选择时间后再确认预约。":"Select a time before confirming this use."}</span>
        <button class="checkoutBelowTimes" type="button" data-reserve-member-resource ${i.selectedStartTime?"":"disabled"}>${i.selectedStartTime?s("memberAccount.reserveUse"):r.language==="zh"?"选择时间":"Select a Time"}</button>
      </div>
  `;return`
    <div class="memberResourcePicker">
      <div class="bookingServiceGrid">
        ${a.map(p=>{const $=N(p.serviceId);return`
            <button class="bookingService ${$?.id===n.id?"active":""}" type="button" data-member-booking-service="${p.serviceId}" style="${ie($?.image?$:ut($),"image",Yt($),"--tile")}">
              <span>${R($,r.language)}</span>
              <small>${w($?.price||0)}/H</small>
            </button>
          `}).join("")}
      </div>
      ${u}
    </div>
  `}function Ko(e,t){const a=qt(j(),e,t.id,{now:new Date().toISOString()});return a.length?`
    <div class="memberOptionGrid">
      ${a.map(n=>`
        <article class="memberOptionCard">
          <strong>${m(r.language==="zh"?n.title_zh:n.title)}</strong>
          <span>${m(n.date)} / ${m(n.startTime)}-${m(n.endTime)} · ${n.remaining} ${s("bookingSystem.left")}</span>
          <button type="button" data-member-open-gym="${t.id}:${n.id}">${s("memberAccount.reserveUse")}</button>
        </article>
      `).join("")}
    </div>
  `:D(s("memberAccount.noBookableTimes"))}function na(){const e=JSON.parse(sessionStorage.getItem("memberBookingDraft")||"{}"),t=de(),n=X(e.serviceId,t)||t[0];return{serviceId:n?.id||"main-full",date:e.date||"2026-06-01",duration:ae(n,e.duration),quantity:n?.mode==="machine"?1:Number(e.quantity||1),machinePosition:e.machinePosition||"",selectedStartTime:e.selectedStartTime||""}}function Le(e){sessionStorage.setItem("memberBookingDraft",JSON.stringify({...na(),...e}))}function Yo(e){const t=[...e.enrollments.filter(a=>a.status!=="cancelled").map(a=>({...a,kind:"class"})),...e.courtBookings.filter(a=>a.status!=="cancelled")];return t.length?t.map(a=>`
    <div class="memberLine">
      <strong>${m(re(a))}</strong>
      <span>${m(x(a.kind))} / ${m(a.programId||(r.language==="zh"?"项目":"program"))} / ${m(x(a.status||"confirmed"))} / ${m(Qo(a))}</span>
      ${a.memberUsage?Xo(a):""}
    </div>
  `).join(""):D(s("emptyStates.noSchedule"))}function Qo(e){return e.date&&e.startTime&&e.endTime?`${e.date} ${e.startTime}-${e.endTime}`:e.startsAt||e.date||e.createdAt||s("memberAccount.tbd")}function Xo(e){const t=Zo(e);return t&&(t.getTime()-Date.now())/36e5<48?`<small>${s("memberAccount.contactToCancel")}</small>`:`<button type="button" class="secondaryButton miniButton" data-member-cancel-usage="${e.id}">${s("memberAccount.cancelAndRefund")}</button>`}function Zo(e){const t=e.startsAt||(e.date&&e.startTime?`${e.date}T${e.startTime}:00.000`:e.date);if(!t)return null;const a=new Date(t);return Number.isNaN(a.getTime())?null:a}function es(e){return`
    <div class="memberLine">
      <strong>${m(e.id)} / ${w(e.total||0)}</strong>
      <span>${m(dt(e.paymentMethod||""))} / ${m(x(e.paymentStatus||""))} / ${xe(e.createdAt)}</span>
      <small>${(e.items||[]).map(t=>m(re(t))).join(", ")}</small>
    </div>
  `}function D(e){return`<p class="empty">${e}</p>`}function ts(){return`
    ${q(s("wishlistPage.title"),s("wishlistPage.subtitle"))}
    <section class="emptyState">
      <h2>${s("wishlistPage.emptyTitle")}</h2>
      <p>${s("wishlistPage.emptyBody")}</p>
      <button class="blueCta" data-route="programs">${s("wishlistPage.button")}</button>
    </section>
  `}function as(){const e=(r.products||[]).filter(t=>t.active!==!1).sort((t,a)=>Number(t.order||999)-Number(a.order||999));return`
    ${q(s("merchandise"),r.language==="zh"?"First Light 服饰和装备":"First Light apparel and gear")}
    <section class="stackSection">
      <div class="sectionHead">
        <div>
          <div class="eyebrow">${r.language==="zh"?"可购买商品":"Available Products"}</div>
          <h2>${s("merchandise")}</h2>
        </div>
        <button class="blueCta" data-route="cart">${s("cartLabel")}</button>
      </div>
      <div class="productGrid">
        ${e.length?e.map(ns).join(""):An()}
      </div>
    </section>
  `}function ns(e){return`
    <article class="productCard">
      <img src="${b(e.image||Y("default-court",_))}" alt="${b(h(e,"title"))}" style="${qe(e)}" />
      <div>
        <span>${r.language==="zh"?"库存":"Stock"} ${Number(e.stock||0)}</span>
        <h3>${h(e,"title")}</h3>
        <p>${m(e.sizes||(r.language==="zh"?"尺码 / 选项请咨询前台":"Ask staff for sizes / options"))}</p>
        <b>${w(e.price||0)}</b>
        <button data-add-product="${e.id}" ${Number(e.stock||0)<=0?"disabled":""}>${A("add")}</button>
      </div>
    </article>
  `}function q(e,t){return`
    <section class="pageHero">
      <h1>${e}</h1>
      <p>${t}</p>
    </section>
  `}function is(e){return`
    <div class="paymentNotice wide">
      <strong>${r.language==="zh"?"付款确认后才会锁定名额或场地。":"Your spot is only reserved after payment is confirmed."}</strong>
      <span>${r.language==="zh"?"线上付款方式仅支持 VISA 或 Mastercard。提交前系统会再次检查名额/场地。":"Only VISA or Mastercard is accepted online. Availability is checked again before checkout."}</span>
    </div>
    <div class="cardPaymentBox wide">
      <div>
        <strong>VISA / Mastercard</strong>
        <span>${r.language==="zh"?"金额":"Amount"}: ${w(e)} · ${r.language==="zh"?"付款通过后会立即锁定所选名额或场地。":"Approved card payment locks the selected spot immediately."}</span>
      </div>
      <p>${r.language==="zh"?"银行卡付款确认后，First Light 会保留对应课程名额或场地时间。如付款未完成，请联系前台确认订单状态。":"First Light reserves the selected class spot or court time after card payment is confirmed. If payment is incomplete, contact the front desk to confirm order status."}</p>
      <p>${r.language==="zh"?"退款/改期：除非工作人员批准例外，报名费不可退款。改期申请应至少在预约前 24 小时提出；银行卡手续费可能无法退回。":"Refunds/rescheduling: registration is non-refundable unless staff approves an exception. Reschedule requests should be made at least 24 hours before the booking; card processing fees may not be refundable."}</p>
      <p>${r.language==="zh"?"问题咨询":"Questions"}: info@firstlighttrainingcenter.ca · WeChat ${r.social.wechat}</p>
    </div>
    <input type="hidden" name="paymentMethod" value="VISA / Mastercard" />
    <label class="wide">${s("checkoutForm.paymentNote")}<textarea name="paymentReference" placeholder="${s("checkoutForm.paymentPlaceholder")}"></textarea></label>
  `}function rs(){return`
    <section class="emptyState">
      <h2>${r.language==="zh"?"购物车为空":"Your cart is empty"}</h2>
      <p>${r.language==="zh"?"先选择课程、租场时间或商品，再回来完成报名和付款。":"Choose a program, court time, or product first, then return here to finish registration and payment."}</p>
      <div class="emptyActions">
        <button class="blueCta" data-route="programs">${r.language==="zh"?"查看课程项目":"Browse Programs"}</button>
        <button class="secondaryButton" data-route="program:court-rental">${r.language==="zh"?"预约场地":"Book Court"}</button>
        <button class="secondaryButton" data-route="contact">${r.language==="zh"?"联系咨询":"Contact Us"}</button>
      </div>
    </section>
  `}function os(){const e=z.reduce((a,n)=>a+n.price,0),t=Ln();return z.length===0?`
      ${q(A("checkout"),s("checkoutForm.pageSubtitle"))}
      ${t?Mt(t):""}
      ${rs()}
    `:`
    ${q(A("checkout"),s("checkoutForm.pageSubtitle"))}
    ${t?Mt(t):""}
    <section class="checkoutGrid">
      <div>
        <h2>${s("checkoutForm.selectedItems")}</h2>
        ${z.map((a,n)=>`
          <div class="cartItem">
            <div><strong>${re(a)}</strong><span>${a.meta}</span><small>${a.quantity?`${s("checkoutForm.qty")} ${a.quantity}`:`${s("checkoutForm.qty")} 1`}</small></div>
            <b>${w(a.price)}</b>
            <button class="iconBtn" data-remove-cart="${n}">×</button>
          </div>`).join("")}
        <div class="total"><span>${s("checkoutForm.total")}</span><b>${w(e)}</b></div>
        <div class="orderSummary">
          <p><strong>${s("checkoutForm.orderSummary")}</strong></p>
          <p>${s("checkoutForm.subtotal")}: ${w(e)} · ${s("checkoutForm.taxes")}</p>
          <p>${s("checkoutForm.confirmationDetails")}</p>
        </div>
      </div>
      <form class="panel" data-checkout>
        <h2>${A("checkout")}</h2>
        <div class="formGrid">
          <fieldset class="participantChooser wide">
            <legend>${s("checkoutForm.participantType")}</legend>
            <label>
              <input type="radio" name="participantType" value="adult" checked />
              <span><strong>${s("checkoutForm.participantTypeAdult")}</strong><small>${s("checkoutForm.participantTypeAdultHelp")}</small></span>
            </label>
            <label>
              <input type="radio" name="participantType" value="minor" />
              <span><strong>${s("checkoutForm.participantTypeMinor")}</strong><small>${s("checkoutForm.participantTypeMinorHelp")}</small></span>
            </label>
          </fieldset>
          <div class="checkoutParticipantFields wide" data-checkout-section="adult">
            <h3>${s("checkoutForm.adultSectionTitle")}</h3>
            <label>${s("checkoutForm.adultFullName")} *<input required name="name" /></label>
            <label>${s("checkoutForm.phone")} *<input required name="phone" /></label>
            <label>${s("checkoutForm.email")} *<input required type="email" name="email" /></label>
            <label>${s("checkoutForm.birthDate")} *<input required type="date" name="birthDate" /></label>
            <label class="wide">${s("checkoutForm.address")}<input name="address" /></label>
            <label>${s("checkoutForm.signature")} *<input required name="signatureName" placeholder="${s("checkoutForm.signaturePlaceholder")}" /></label>
            <label>${s("checkoutForm.signerRelation")} *<input required name="signatureRelation" placeholder="${s("checkoutForm.adultSignerRelationPlaceholder")}" value="${r.language==="zh"?"本人":"Self"}" /></label>
            <label class="waiver wide"><input type="checkbox" required name="waiver" /> ${s("checkoutForm.adultWaiver")}</label>
            <div class="waiverText wide">${h(J,"title")} v${J.version}: ${s("checkoutForm.adultWaiver")}</div>
          </div>
          <div class="checkoutParticipantFields wide" data-checkout-section="minor">
            <h3>${s("checkoutForm.minorSectionTitle")}</h3>
            <label>${s("checkoutForm.minorFullName")} *<input required name="name" /></label>
            <label>${s("checkoutForm.birthDate")} *<input required type="date" name="birthDate" /></label>
            <label>${s("checkoutForm.primarySport")}
              <select name="primarySport"><option value="Basketball">${s("checkoutForm.basketball")}</option><option value="Volleyball">${s("checkoutForm.volleyball")}</option><option value="Both">${s("checkoutForm.both")}</option></select>
            </label>
            <label>${s("checkoutForm.experience")}<input name="experience" placeholder="${s("checkoutForm.experiencePlaceholder")}" /></label>
            <label>${s("checkoutForm.guardianName")} *<input required name="guardianName" /></label>
            <label>${s("checkoutForm.guardianRelation")} *<input required name="guardianRelation" placeholder="${s("checkoutForm.guardianRelationPlaceholder")}" /></label>
            <label>${s("checkoutForm.guardianPhone")} *<input required name="guardianPhone" /></label>
            <label>${s("checkoutForm.guardianEmail")} *<input required type="email" name="guardianEmail" /></label>
            <label>${s("checkoutForm.preferredTime")}<input name="preferredTime" /></label>
            <label>${s("checkoutForm.emergencyContact")}<input name="emergency" /></label>
            <label>${s("checkoutForm.emergencyPhone")}<input name="emergencyPhone" /></label>
            <label class="wide">${s("checkoutForm.medical")}<textarea name="medicalNotes"></textarea></label>
            <label>${s("checkoutForm.signature")} *<input required name="signatureName" placeholder="${s("checkoutForm.signaturePlaceholder")}" /></label>
            <label>${s("checkoutForm.signerRelation")} *<input required name="signatureRelation" placeholder="${s("checkoutForm.minorSignerRelationPlaceholder")}" /></label>
            <label class="waiver wide"><input type="checkbox" required name="waiver" /> ${s("checkoutForm.minorWaiver")}</label>
            <div class="waiverText wide">${h(J,"title")} v${J.version}: ${s("checkoutForm.minorWaiver")}</div>
          </div>
          ${is(e)}
          <label class="wide">${s("checkoutForm.notes")}<textarea name="notes"></textarea></label>
          <label class="waiver wide"><input type="checkbox" name="photoConsent" /> ${s("checkoutForm.photoConsent")}</label>
          <label class="waiver wide"><input type="checkbox" name="marketingConsent" /> ${s("checkoutForm.marketingConsent")}</label>
        </div>
        <button>${s("checkoutForm.confirm")}</button>
      </form>
      <div id="emailPreview">${t?cl(t):""}</div>
    </section>
  `}function Ln(){const e=sessionStorage.getItem("lastConfirmedBookingId");return e&&(r.bookings||[]).find(t=>t.id===e&&t.kind==="order")||null}function Mt(e){const t=e.participantType==="minor",a=r.language==="zh"?t?"学员":"参与者":t?"Student":"Participant",n=r.language==="zh"?t?"家长/监护人":"联系人":t?"Parent/guardian":"Contact",i=(e.items||[]).map(o=>`
    <div class="confirmationItem">
      <strong>${m(re(o))}</strong>
      <span>${m(o.meta||"")}</span>
      <b>${w(o.price||0)}</b>
    </div>
  `).join("");return`
    <section class="confirmationSummary" data-confirmation-summary>
      <div class="confirmationHead">
        <div>
          <div class="eyebrow">${r.language==="zh"?"预约成功":"Booking Confirmed"}</div>
          <h2>${r.language==="zh"?"确认资料":"Confirmation Details"}</h2>
          <p>${r.language==="zh"?"请先核对以下预约、付款、免责协议和联系方式。":"Review your booking, payment, waiver, and contact information first."}</p>
        </div>
        <strong>${m(e.id)}</strong>
      </div>
      <div class="confirmationGrid">
        <article>
          <span>${a}</span>
          <b>${m(e.studentName||e.customer?.name||"")}</b>
          <p>${n}: ${m(e.customer?.name||"")} / ${m(e.customer?.email||"")} / ${m(e.customer?.phone||"")}</p>
        </article>
        <article>
          <span>${r.language==="zh"?"付款":"Payment"}</span>
          <b>${m(dt(e.paymentMethod||""))}</b>
          <p>${m(Wt(e))}</p>
        </article>
        <article>
          <span>${r.language==="zh"?"免责协议":"Waiver"}</span>
          <b>${r.language==="zh"?"已签署":"Signed"}</b>
          <p>${xe(e.waiverSignedAt)} · v${J.version}</p>
        </article>
        <article>
          <span>${r.language==="zh"?"场馆地址":"Facility Address"}</span>
          <b>First Light Training Center</b>
          <p>165-13631 Vulcan Way, Richmond, BC V6V 1K4</p>
        </article>
      </div>
      <div class="confirmationItems">
        ${i||D(r.language==="zh"?"暂无项目。":"No items.")}
      </div>
      ${e.paymentMessage?`<p class="confirmationMessage">${m(e.paymentMessage)}</p>`:""}
      <div class="confirmationActions">
        <button type="button" data-route="account">${r.language==="zh"?"进入会员账号":"Go to My Account"}</button>
        <button type="button" class="secondaryButton" data-route="programs">${r.language==="zh"?"继续预约":"Book More"}</button>
        <button type="button" class="secondaryButton" data-route="contact">${r.language==="zh"?"联系 First Light":"Contact First Light"}</button>
      </div>
    </section>
  `}function ss(){const e=sessionStorage.getItem("firstlight_pending_production_order_id")||"",t=Ln();return t?Mt(t):`
    ${q(r.language==="zh"?"付款已提交":"Payment Submitted",r.language==="zh"?"Stripe 会安全处理付款，First Light 会在付款确认后开通会员账号。":"Stripe processes the card payment securely. First Light opens the member account after payment is confirmed.")}
    <section class="confirmationSummary" data-confirmation-summary>
      <div class="confirmationHead">
        <div>
          <div class="eyebrow">${r.language==="zh"?"安全付款":"Secure Checkout"}</div>
          <h2>${r.language==="zh"?"下一步":"Next Steps"}</h2>
          <p>${r.language==="zh"?"如果付款已成功，你会收到账号开通或密码设置邮件。之后可用同一个邮箱登录会员中心查看会员等级、订单和课包。":"If payment succeeded, you will receive the account setup or password email. Use the same email to log in and view membership, orders, and package balances."}</p>
        </div>
        ${e?`<strong>${m(e)}</strong>`:""}
      </div>
      <div class="confirmationGrid">
        <article>
          <span>${r.language==="zh"?"付款状态":"Payment status"}</span>
          <b>${r.language==="zh"?"等待 Stripe 确认":"Waiting for Stripe confirmation"}</b>
          <p>${r.language==="zh"?"付款确认后会自动锁定名额/场地并发放会员权益。":"After payment is confirmed, spots or court time lock and membership benefits are provisioned automatically."}</p>
        </article>
        <article>
          <span>${r.language==="zh"?"会员登录":"Member login"}</span>
          <b>${r.language==="zh"?"使用 checkout 邮箱":"Use the checkout email"}</b>
          <p>${r.language==="zh"?"如未收到邮件，请联系前台确认订单。":"Contact the front desk if the account email does not arrive."}</p>
        </article>
      </div>
      <div class="confirmationActions">
        <button type="button" data-route="account">${r.language==="zh"?"进入会员账号":"Go to My Account"}</button>
        <button type="button" class="secondaryButton" data-route="contact">${r.language==="zh"?"联系 First Light":"Contact First Light"}</button>
      </div>
    </section>
  `}function ls(){return`
    <section class="adminHero">
      <div>
        <div class="eyebrow">Admin Dashboard</div>
        <h1>Content Manager</h1>
        <p>Add, edit, hide, or copy content. Saved updates automatically expand the public pages and live schedules.</p>
        ${us()}
      </div>
    </section>
    <section class="adminLayout">
      <aside>
        ${ds()}
      </aside>
      <div class="adminPanel">${ps(ia())}</div>
    </section>
  `}function cs(){return[{id:"main",items:[["sessions","Class Schedule"],["bookings","Bookings"],["openCourtSlots","Open Gym"],["students","Students"],["memberships","Memberships"],["products","Products"],["videoReviews","Basketball IQ Reviews"]]},{id:"pageEditing",label:"Page Editing",items:[["globalImages","Images"],["dropdownPages","Dropdown Pages"],["pages","Pages"],["programs","Programs"],["coaches","Coaches"],["bookingServices","Booking Services"],["activities","Activities"],["social","Social"],["emails","Emails"]]}]}function ds(){const e=ia();return cs().map(t=>{if(t.id==="main")return t.items.map(([i,o])=>Ca(i,o,e)).join("");const a=t.items.some(([i])=>i===e),n=a||sessionStorage.getItem(`adminGroup:${t.id}`)==="open";return`
      <div class="adminNavGroup ${n?"open":""}">
        <button type="button" class="adminGroupToggle ${a?"active":""}" data-admin-group-toggle="${t.id}" aria-expanded="${n?"true":"false"}">
          <span>${t.label}</span><b>${n?"▲":"▼"}</b>
        </button>
        <div class="adminGroupChildren ${n?"open":""}">
          ${t.items.map(([i,o])=>Ca(i,o,e,!0)).join("")}
        </div>
      </div>
    `}).join("")}function Ca(e,t,a,n=!1){return`<button data-admin-tab="${e}" ${n?'data-admin-group-child="pageEditing"':""} class="${a===e?"active":""}">${t}</button>`}function ia(){return sessionStorage.getItem("adminTab")||"sessions"}function us(){const e=sessionStorage.getItem("adminNotice");return e?`<div class="adminNotice">${e}</div>`:""}function M(e){sessionStorage.setItem("adminNotice",e)}function ms(e){return e==="courts"?kt.courtSlots:kt[e]}function ps(e){if(e==="videoReviews")return Dt(),Ta();if(e==="pages")return fs();if(e==="sessions")return Ms();if(e==="memberships")return gs();if(e==="openCourtSlots")return Ts();const t=ms(e);return t?Bs(t):e==="social"?`
      <h2>Social Links</h2>
      <p class="adminHelp">Update Instagram, Facebook, TikTok, WeChat, and the QR code image. Instagram and Facebook render as real public preview frames when the platform allows embedding; buttons still open the real social pages if a preview is blank.</p>
      <form class="adminForm" data-admin-social>
        ${Q({name:"instagram",label:"Instagram Link"},r.social.instagram,r.social)}
        ${Q({name:"facebook",label:"Facebook Link"},r.social.facebook,r.social)}
        ${Q({name:"tiktok",label:"TikTok Link"},r.social.tiktok,r.social)}
        ${Q({name:"wechat",label:"WeChat ID"},r.social.wechat,r.social)}
        ${Q({name:"wechatQr",label:"WeChat QR Code",type:"image",usage:"Contact page and footer WeChat QR display."},r.social.wechatQr,r.social)}
        <button>Save Social Links</button>
      </form>
    `:e==="students"?vs():e==="bookings"?ks():`
    <h2>Email Template</h2>
    <p class="adminHelp">Manage the English email template used for order confirmations and customer follow-up.</p>
    <form class="adminForm" data-admin-email>
      ${Q({name:"en",label:"Email Copy",type:"textarea"},r.emailTemplates.en,r.emailTemplates)}
      <button>Save Email Template</button>
    </form>
  `}function gs(){return`
    <div class="adminPanelHead">
      <div>
        <h2>Memberships</h2>
        <p class="adminHelp">Add or edit monthly membership plans. These cards appear on the public Membership page and still use the normal cart checkout flow.</p>
      </div>
      <button type="button" data-new-membership-plan>New Membership</button>
    </div>
    <div class="membershipAdminList">
      ${r.sessions.filter(t=>t.programId==="membership").sort((t,a)=>Se(t)-Se(a)||String(t.title_en||t.title||"").localeCompare(String(a.title_en||a.title||""))).map(bs).join("")||'<p class="adminHelp">No membership plans yet. Click New Membership to add one.</p>'}
    </div>
  `}function bs(e){const t=ee(e);return`
    <form class="adminForm membershipPlanAdminForm" data-admin-membership-plan="${b(e.id)}">
      <div class="adminItemHead">
        <span>${e.active===!1?"Hidden":"Visible"}</span>
        <h3>${m(e.title_en||e.title||"Membership Plan")}</h3>
      </div>
      <input type="hidden" name="id" value="${b(e.id)}" />
      <div class="formGrid">
        <label>Plan Name<input required name="title_en" value="${b(e.title_en||e.title||"")}" /></label>
        <label>Monthly Price<input type="number" min="0" step="1" name="regularPrice" value="${b(e.regularPrice??0)}" /></label>
        <label>Billing Cycle<input name="dates" value="${b(Gt(e))}" /></label>
        <label>Access Time<input name="time" value="${b(e.time||"")}" /></label>
        <label>Benefit Level
          <select name="membershipLevel">
            <option value="regular" ${t==="regular"?"selected":""}>Regular</option>
            <option value="plus" ${t==="plus"?"selected":""}>Plus</option>
          </select>
        </label>
        <label>Capacity<input type="number" min="0" step="1" name="capacity" value="${b(e.capacity??0)}" /></label>
        <label>Booked<input type="number" min="0" step="1" name="booked" value="${b(e.booked??0)}" /></label>
        <label>Waiver
          <select name="waiver">
            <option value="true" ${e.waiver!==!1?"selected":""}>Yes</option>
            <option value="false" ${e.waiver===!1?"selected":""}>No</option>
          </select>
        </label>
        <label>Show on Site
          <select name="active">
            <option value="true" ${e.active!==!1?"selected":""}>Yes</option>
            <option value="false" ${e.active===!1?"selected":""}>No</option>
          </select>
        </label>
        <label class="wide">Description<textarea name="desc_en">${m(e.desc_en||e.desc||"")}</textarea></label>
        <label class="wide">Benefits<textarea name="benefits_en">${m(jt(e))}</textarea></label>
      </div>
      <div class="adminActions">
        <button>Save Membership</button>
        <button type="button" class="dangerOutline" data-delete-membership-plan="${b(e.id)}">Delete Plan</button>
      </div>
    </form>
  `}function Ta(){const e=Rt();if(!Be())return`
      <div class="adminPanelHead">
        <div>
          <h2>Basketball IQ Reviews</h2>
          <p class="adminHelp">Supabase video reviews are not configured. Add the production Supabase URL and anon key before accepting customer uploads.</p>
        </div>
      </div>
      ${E.error?`<div class="formError">${m(E.error)}</div>`:""}
      <div class="videoReviewList">
        <p class="adminHelp">No production video inbox is available until Supabase is configured.</p>
      </div>
    `;if(!Dt())return`
      <h2>Basketball IQ Reviews</h2>
      <p class="adminHelp">Staff or admin Supabase login is required before Basketball IQ Workshop submissions and private video links are shown.</p>
      <form class="adminForm adminLoginForm" data-video-review-login>
        <label>Email<input required type="email" name="email" autocomplete="email" /></label>
        <label>Password<input required type="password" name="password" autocomplete="current-password" /></label>
        <button>Log In</button>
      </form>
    `;const a=E.submissions||[];return`
    <div class="adminPanelHead">
      <div>
        <h2>Basketball IQ Reviews</h2>
        <p class="adminHelp">Logged in as ${m(e?.email||"staff")}. Review Basketball IQ Workshop uploads, open private video links, and track coach follow-up.</p>
      </div>
      <div class="adminInlineActions">
        <button type="button" data-action="refresh-video-reviews">${E.loading?"Loading...":"Refresh"}</button>
        <button type="button" class="secondaryButton" data-action="video-review-logout">Log Out</button>
      </div>
    </div>
    ${E.error?`<div class="formError">${m(E.error)}</div>`:""}
    <div class="videoReviewList">
      ${a.length?a.map(hs).join(""):`<p class="adminHelp">${E.loaded?"No video submissions yet.":"Click Refresh to load video submissions."}</p>`}
    </div>
  `}function hs(e){const t=["submitted","reviewing","followed_up","archived"];return`
    <article class="videoReviewRow">
      <div>
        <span class="statusBadge">${m(e.status||"submitted")}</span>
        <h3>${m(e.student_name||e.studentName||"Student")}</h3>
        <p>${m(e.email||"")} / ${m(e.phone||"")} / ${e.player_age?`${m(e.player_age)} years old`:"age TBD"}</p>
        <p><strong>Experience:</strong> ${m(e.experience||"")}</p>
        <p><strong>Goal:</strong> ${m(e.goals||"")}</p>
        ${e.notes?`<p><strong>Notes:</strong> ${m(e.notes)}</p>`:""}
        <span>${xe(e.submitted_at||e.created_at)}</span>
      </div>
      <div>
        ${e.downloadUrl?`<a class="pillButton videoLinkButton" href="${b(e.downloadUrl)}" target="_blank" rel="noreferrer">Open Video</a>`:'<span class="adminHelp">Video link unavailable</span>'}
        <label>Status
          <select data-video-review-status="${b(e.id)}">
            ${t.map(a=>`<option value="${a}" ${a===e.status?"selected":""}>${x(a)}</option>`).join("")}
          </select>
        </label>
        <label>Coach notes<textarea data-video-review-notes="${b(e.id)}">${m(e.coach_notes||"")}</textarea></label>
        <button type="button" data-video-review-save="${b(e.id)}">Save Review</button>
      </div>
    </article>
  `}function fs(){const e=[{name:"title_en",label:"Title"},{name:"heroTitle_en",label:"Hero Title"},{name:"eyebrow_en",label:"Eyebrow"},{name:"kicker_en",label:"Kicker"},{name:"line1_en",label:"Hero Line 1"},{name:"line2_en",label:"Hero Line 2"},{name:"subtitle_en",label:"Subtitle",type:"textarea"},{name:"body_en",label:"Body",type:"textarea"},{name:"scheduleTitle_en",label:"Schedule Note Title"},{name:"scheduleBody_en",label:"Schedule Note Body",type:"textarea"},{name:"liveNote_en",label:"Live Note",type:"textarea"},{name:"footer_en",label:"Footer Text",type:"textarea"},{name:"image",label:"Page Image",type:"image",usage:"Page-level hero or content image where this page uses one."}],t={home:"Home Hero",about:"About Page",scheduleOverview:"Schedule Overview Section",openGymBooking:"Open Gym Booking Page",courtBookingSystem:"Court Booking System"};return`
    <h2>Pages</h2>
    <p class="adminHelp">Edit one English version. Saved English copy is mirrored internally so the current public language switch does not show stale content.</p>
    ${Object.entries(r.pages).filter(([n])=>n!=="intro").map(([n,i])=>`
      <form class="adminForm adminCard" data-admin-page="${n}">
        <div class="adminCardHead">
          <div>
            <span class="statusBadge">Page</span>
            <h3>${t[n]||n}</h3>
          </div>
        </div>
        <div class="adminFieldGrid">
          ${e.filter(o=>i[o.name]!==void 0).map(o=>Q(o,i[o.name],i)).join("")}
        </div>
        <div class="adminActions"><button>Save Page</button></div>
      </form>
    `).join("")}
  `}function vs(){const e=r.students||[],t=j(),a=il(),n=zi(e,t,{...a,now:new Date().toISOString()}),i=t.creditPackages,o=t.waiverSignatures,l=t.enrollments,c=rl(t);return`
    <h2>${s("adminStudents.title")}</h2>
    <p class="adminHelp">${s("adminStudents.help")}</p>
    <div class="adminExportBar">
      <button data-action="export-students">${s("adminStudents.exportStudents")}</button>
      <button data-action="export-orders">${s("adminStudents.exportOrders")}</button>
      <button data-action="export-credits">${s("adminStudents.exportCredits")}</button>
      <button data-action="export-waivers">${s("adminStudents.exportWaivers")}</button>
    </div>
    <form class="adminForm studentFilterBar" data-admin-student-filters>
      <label>${s("adminStudents.search")}<input name="query" value="${b(a.query)}" placeholder="${r.language==="zh"?"姓名 / 邮箱 / 电话":"Sam / email / phone"}" /></label>
      <label>${s("adminStudents.program")}
        <select name="programId">
          <option value="">${s("adminStudents.allPrograms")}</option>
          ${c.map(d=>`<option value="${b(d)}" ${a.programId===d?"selected":""}>${m(d)}</option>`).join("")}
        </select>
      </label>
      <label>${s("adminStudents.status")}
        <select name="status">
          ${[["",s("adminStudents.allStudents")],["lowBalance",s("adminStudents.lowBalance")],["expiring",s("adminStudents.expiring")],["member",s("adminStudents.member")],["visitor",ce("visitor")],["regular",ce("regular")],["plus",ce("plus")],["missingWaiver",s("adminStudents.missingWaiver")],["unpaid",s("adminStudents.unpaid")]].map(([d,u])=>`<option value="${d}" ${a.status===d?"selected":""}>${u}</option>`).join("")}
        </select>
      </label>
      <button>${s("adminStudents.filter")}</button>
      <button type="button" class="secondaryButton" data-action="clear-student-filters">${s("adminStudents.clear")}</button>
    </form>
    <form class="adminForm adminBookingForm" data-consume-credit>
      <h3>${s("adminStudents.checkIn")}</h3>
      <label>${s("adminStudents.student")}
        <select required name="studentId">${e.map(d=>`<option value="${d.id}">${d.fullName} · ${d.email}</option>`).join("")}</select>
      </label>
      <label>${s("adminStudents.courseType")}
        <select required name="programId">${[...new Set(i.map(d=>d.programId).filter(Boolean))].map(d=>`<option value="${d}">${d}</option>`).join("")}</select>
      </label>
      <label>${s("adminStudents.units")}<input required type="number" min="1" name="units" value="1" /></label>
      <label>${s("adminStudents.staffId")}<input name="staffId" placeholder="${r.language==="zh"?"员工姓名 / 缩写":"staff name / initials"}" /></label>
      <label class="wide">${s("adminStudents.reason")}<textarea name="reason">check-in</textarea></label>
      <button ${e.length&&i.length?"":"disabled"}>${s("adminStudents.deduct")}</button>
    </form>
    <div class="studentStats">
      <article><strong>${e.length}</strong><span>${s("adminStudents.students")}</span></article>
      <article><strong>${l.filter(d=>d.status==="confirmed").length}</strong><span>${s("adminStudents.confirmed")}</span></article>
      <article><strong>${i.reduce((d,u)=>d+Number(u.balance||0),0)}</strong><span>${s("adminStudents.remainingCredits")}</span></article>
      <article><strong>${o.length}</strong><span>${s("adminStudents.waiversSigned")}</span></article>
    </div>
    <div class="studentList">
      ${n.length?n.map(ys).join(""):`<p>${s("adminStudents.empty")}</p>`}
    </div>
  `}function ys(e){const t=j(),a=ot(t,e.id,{now:new Date().toISOString()}),n=a.creditPackages,i=a.enrollments,o=a.waivers,l=Ya(e,t,{now:new Date().toISOString()}),c=ce(a.membershipLevel),d=a.membership?.expiresAt||s("memberAccount.tbd"),u=e.guardianName?`${e.guardianName} / ${e.guardianRelation} / ${e.guardianPhone}`:s("memberAccount.selfManaged");return`
    <article class="studentRow">
      <div>
        <h3>${e.fullName}</h3>
        <p>${e.email} / ${e.phone} / ${s("memberAccount.age")} ${e.age??""}</p>
        <p><strong>${c}</strong> · ${s("memberAccount.levelExpires")} ${m(d)} · ${s("memberAccount.levelSource")} ${m(a.membership?.source||"none")}</p>
        <span>${e.primarySport||(r.language==="zh"?"运动项目待定":"Sport TBD")} · ${e.experience||(r.language==="zh"?"经验待定":"Experience TBD")} · ${r.language==="zh"?"偏好":"Preferred"}: ${e.preferredClassTime||s("memberAccount.tbd")}</span>
      </div>
      <div>
        <p><strong>${s("memberAccount.guardian")}:</strong> ${u}</p>
        <p><strong>${s("memberAccount.emergency")}:</strong> ${e.emergencyName||""} ${e.emergencyPhone||""}</p>
        <p><strong>${s("memberAccount.medical")}:</strong> ${e.medicalNotes||s("memberAccount.noneNoted")}</p>
      </div>
      <div>
        <b>${n.reduce((p,$)=>p+Number($.balance||0),0)} ${r.language==="zh"?"次":"credits"}</b>
        <p>${i.length} ${r.language==="zh"?"条报名":"enrollment(s)"} · ${o.length} ${r.language==="zh"?"份免责协议":"waiver(s)"}</p>
      </div>
      <div class="studentDetails">
        <div class="chipList">${l.length?l.map(p=>`<span class="alertChip">${m(pn(p))}</span>`).join(""):`<span>${s("alerts.allClear")}</span>`}</div>
        <details>
          <summary>${r.language==="zh"?"查看详情 / 管理":"View details / Manage"}</summary>
          <div class="studentDetailGrid">
            <section>
              <h4>${s("memberAccount.programs")}</h4>
              <div class="miniRow">
                <span>${r.language==="zh"?"会员级别":"Membership level"}</span>
                <b>${ce(a.membershipLevel)} / ${m(d)}</b>
              </div>
              ${a.programs.length?`<div class="chipList">${a.programs.map(p=>`<span>${m(p)}</span>`).join("")}</div>`:D(s("emptyStates.noPrograms"))}
              <h4>${r.language==="zh"?"报名记录":"Enrollments"}</h4>
              ${i.length?i.map(p=>`
                <div class="miniRow">
                  <span>${m(p.title||p.courseSessionId)}</span>
                  <b>${m(x(p.status))}</b>
                  ${p.status!=="cancelled"?`<button type="button" class="danger miniButton" data-cancel-enrollment="${p.id}">${s("adminBookings.cancel")}</button>`:""}
                </div>
              `).join(""):D(s("emptyStates.noEnrollments"))}
            </section>
            <section>
              <h4>${s("memberAccount.courseCredits")}</h4>
              ${n.length?n.map(p=>`
                <div class="miniRow">
                  <span>${m(p.title)} / ${m(p.programId)}</span>
                  <b>${r.language==="zh"?`剩余 ${Number(p.balance||0)} 次`:`${Number(p.balance||0)} left`}</b>
                </div>
              `).join(""):D(s("emptyStates.noPackages"))}
              <form class="miniForm" data-adjust-credit>
                <input type="hidden" name="studentId" value="${b(e.id)}" />
                <label>${s("adminStudents.program")}<input required name="programId" value="${b(n[0]?.programId||a.programs[0]||"")}" /></label>
                <label>${r.language==="zh"?"调整次数":"Adjust units"}<input required type="number" name="units" value="1" /></label>
                <label>${s("adminStudents.reason")}<input name="reason" value="manual adjustment" /></label>
                <button>${r.language==="zh"?"调整课包次数":"Adjust credits"}</button>
              </form>
            </section>
            <section>
              <h4>${s("memberAccount.ordersPayment")}</h4>
              ${a.orders.length?a.orders.map(p=>`
                <div class="miniRow">
                  <span>${m(p.id)} / ${w(p.total||0)} / ${m(x(p.paymentStatus||""))}</span>
                  ${p.status==="pending_payment"?`<button type="button" class="miniButton" data-confirm-payment="${p.id}">${s("adminBookings.confirmPayment")}</button>`:""}
                </div>
              `).join(""):D(s("emptyStates.noOrders"))}
              <h4>${s("memberAccount.waivers")}</h4>
              ${o.length?o.map(p=>`<p>${m(p.templateVersion||"")} / ${m(p.signerName||"")} / ${xe(p.signedAt)}</p>`).join(""):D(s("emptyStates.noWaiver"))}
            </section>
            <form class="miniForm" data-admin-student-notes>
              <input type="hidden" name="studentId" value="${b(e.id)}" />
              <label>${r.language==="zh"?"员工备注":"Staff notes"}<textarea name="staffNotes">${m(e.staffNotes)}</textarea></label>
              <button>Save notes</button>
            </form>
          </div>
        </details>
      </div>
    </article>
  `}function Ge(){let e={};try{e=JSON.parse(sessionStorage.getItem("adminScheduleBookingDraft")||"{}")}catch{e={}}const t=N(e.serviceId)||de()[0],a=ae(t,e.duration);return{serviceId:t?.id||"main-full",date:e.date||"2026-06-01",startTime:e.startTime||"",duration:a,quantity:Math.max(1,Number(e.quantity||1)),machinePosition:e.machinePosition||"",name:e.name||e.bookedFor||"",phone:e.phone||"",email:e.email||"",pricingMode:["auto","member","non_member"].includes(e.pricingMode)?e.pricingMode:"auto",paymentMethod:e.paymentMethod||"Manual Confirmed",notes:e.notes||""}}function Ze(e){sessionStorage.setItem("adminScheduleBookingDraft",JSON.stringify({...Ge(),...e}))}function $s(){const e=de(),t=Ge(),a=N(t.serviceId)||e[0];return a?`
    <section class="adminScheduleBooking">
      <div class="adminPanelHead">
        <div>
          <h3>Staff Schedule Booking</h3>
          <p class="adminHelp">Step 1: choose a court or machine. Step 2: fill the form below. Step 3: click a time to fill Start Time, then create the confirmed booking.</p>
        </div>
      </div>
      <div class="bookingServiceGrid adminScheduleServiceGrid">${e.map(i=>`
    <button class="bookingService ${i.id===a.id?"active":""}" type="button" data-admin-schedule-service="${i.id}" style="${ie(i.image?i:ut(i),"image",Yt(i),"--tile")}">
      <span>${R(i,"en")}</span>
      ${hn(i)}
    </button>
  `).join("")}</div>
    </section>
  `:""}function Ss(){const e=de(),t=Ge(),a=N(t.serviceId)||e[0];if(!a)return"";const n={...t,serviceId:a.id,duration:ae(a,t.duration)};return`
    <section class="adminScheduleTimes">
      <h3>Available Times</h3>
      <div class="timeGrid adminScheduleTimeGrid">${Nt(n.duration).map(l=>{const c={date:n.date,startTime:l,endTime:ke(l,n.duration),quantity:a.mode==="machine"?1:Math.max(1,n.quantity),machinePosition:a.mode==="machine"?n.machinePosition:""},u=a.mode==="machine"&&!n.machinePosition?{available:!1,reason:"Choose a shooting machine first."}:ne(a,c,r.bookings),p=`${l}-${c.endTime}`;return`<button type="button" class="${["timeChip",n.startTime===l?"selected":"",u.available?"":"disabled"].filter(Boolean).join(" ")}" ${u.available?`data-admin-schedule-time="${l}"`:"disabled"} title="${b(ge(u.reason)||"Available")}">${p}</button>`}).join("")}</div>
    </section>
  `}function ks(){const e=de(),t=Ge(),a=N(t.serviceId)||e[0],n=a?{...t,serviceId:a.id,duration:ae(a,t.duration)}:t,i=(r.bookings||[]).filter(d=>d.kind==="full_court_request"&&d.status!=="cancelled"),o=(r.bookings||[]).filter(d=>d.status!=="cancelled"),l=(r.bookings||[]).filter(d=>d.status==="cancelled"),c=r.language==="zh"?"已取消订单":"Cancelled Bookings";return`
    <h2>Bookings</h2>
    <p class="adminHelp">Create phone or front-desk bookings here. Saving a booking immediately recalculates the public schedule.</p>
    ${i.length?`<div class="adminNotice pendingRequestNotice">${i.length} pending Main Court request${i.length===1?"":"s"} need staff follow-up.</div>`:""}
    ${$s()}
    <form class="adminForm adminBookingForm" data-admin-booking>
      <h3>Phone / Front-Desk Booking</h3>
      <label>Service
        <select name="serviceId" data-admin-booking-service data-admin-schedule-draft="serviceId">${e.map(d=>`<option value="${d.id}" data-durations="${at(d).join(",")}" ${d.id===n.serviceId?"selected":""}>${Rr(d)}</option>`).join("")}</select>
      </label>
      ${_s(n.machinePosition,a?.mode==="machine")}
      <label>Date<input type="date" required name="date" value="${b(n.date)}" data-admin-schedule-draft="date" /></label>
      <label>Start Time<input type="time" required name="startTime" value="${b(n.startTime)}" step="1800" data-admin-schedule-draft="startTime" /></label>
      <label>Duration
        <select name="duration" data-admin-booking-duration data-admin-schedule-draft="duration">${je(a,n.duration)}</select>
      </label>
      <label>Participants<input type="number" required min="1" max="${a?.capacity||20}" name="quantity" value="${n.quantity}" data-admin-schedule-draft="quantity" /></label>
      <label>Customer Name<input name="name" value="${b(n.name)}" data-admin-schedule-draft="name" /></label>
      <label>Phone<input name="phone" value="${b(n.phone)}" data-admin-schedule-draft="phone" /></label>
      <label>Email<input type="email" name="email" value="${b(n.email)}" data-admin-schedule-draft="email" /></label>
      <label>Pricing Identity
        <select name="pricingMode" data-admin-pricing-control data-admin-schedule-draft="pricingMode">
          ${Fr(n.pricingMode)}
        </select>
      </label>
      ${fn(n,a)}
      <label>Payment Method
        <select name="paymentMethod" data-admin-schedule-draft="paymentMethod">
          ${["Manual Confirmed","Cash","E-transfer","Credit Card","WeChat Pay"].map(d=>`<option value="${d}" ${d===n.paymentMethod?"selected":""}>${d}</option>`).join("")}
        </select>
      </label>
      <label class="wide">Notes<textarea name="notes" data-admin-schedule-draft="notes">${m(n.notes)}</textarea></label>
      <button>Create Confirmed Booking</button>
    </form>
    ${Ss()}
    <button data-action="export-bookings">Export CSV</button>
    <div class="bookingList">
      ${o.length?o.map(Aa).join(""):"<p>No active bookings yet.</p>"}
    </div>
    ${l.length?`
      <details class="cancelledBookingArchive">
        <summary>${c} (${l.length})</summary>
        <div class="bookingList cancelledBookingList">
          ${l.map(Aa).join("")}
        </div>
      </details>
    `:""}
  `}function _s(e="",t=!1){return`
      <label>Shooting Machine
        <select name="machinePosition" data-admin-schedule-draft="machinePosition" ${t?"required":""}>
          <option value="">Required only for Shooting Machine</option>
          <option value="machine-1" ${e==="machine-1"?"selected":""}>Machine 1</option>
          <option value="machine-2" ${e==="machine-2"?"selected":""}>Machine 2</option>
          <option value="machine-3" ${e==="machine-3"?"selected":""}>Machine 3</option>
        </select>
      </label>
  `}function Aa(e){const t=e.kind==="full_court_request",a=e.kind==="resource"||e.serviceId,n=N(e.serviceId),i=e.customer||{},o=t?"Main Court Booking Request":a?Ps(e,n):`Order ${e.id}`,l=Is(e),c=ws(e),d=t?`${e.date} / ${e.preferredTimeRange||"time TBD"} / ${Number(e.duration||0)/60}H / ${e.quantity||1} people`:a?`${e.date} / ${e.startTime}-${e.endTime} / ${e.quantity||1}${l?` / ${l}`:""}`:(e.items||[]).map(re).join(", "),u=t?"Pending":e.total?w(e.total):n?w(vn(n,Cs(e),e.quantity)):"",p=e.status==="pending_payment";return`
    <article class="bookingRow ${e.status==="cancelled"?"cancelled":""} ${t?"fullCourtRequest":""}">
      <div>
        <h3>${o}</h3>
        <p>${d||"No item details"}</p>
        <span>${x(e.source||"customer")} / ${x(e.status||"confirmed")} / ${dt(e.paymentMethod||"")}</span>
        <span>Payment: ${x(e.paymentStatus||"")} / Lock: ${x(e.lockStatus||(ue(e)?"locked":"not_locked"))}</span>
        ${c}
        ${e.paymentReference?`<p>Reference: ${m(e.paymentReference)}</p>`:""}
        ${i.notes?`<p>Notes: ${m(i.notes)}</p>`:""}
      </div>
      <div>
        <b>${u}</b>
        <p>${i.name||"No name"} / ${i.phone||""} / ${i.email||""}</p>
        <p>${Wt(e)}</p>
      </div>
      <div class="bookingActions">
        ${p?`<button type="button" data-confirm-payment="${e.id}">Confirm Payment</button>`:""}
        <button class="danger" type="button" ${e.status==="cancelled"?"disabled":""} data-cancel-booking="${e.id}">Cancel</button>
      </div>
    </article>
  `}function ws(e={}){if(!e.customerType&&!e.hourlyRate&&!e.membershipLevel)return"";const t=e.customerType==="member"?"Member":"Non-member",a=e.pricingSource==="manual"?"Manual":"Auto",n=e.membershipLevel?` / ${x(e.membershipLevel)}`:"",i=e.hourlyRate?` / ${w(e.hourlyRate)}/H`:"",o=e.matchedStudentName?` / ${m(e.matchedStudentName)}`:"";return`<span>Pricing: ${a} ${t}${n}${i}${o}</span>`}function Ps(e,t){return e.displayTitle_en?e.displayTitle_en:["main-half-a","main-half-b"].includes(e.serviceId)?R(N("main-half"),"en")||"Main Half Court":R(t,"en")||e.serviceLabel_en||e.serviceLabel_zh||e.serviceId}function Is(e){return e.serviceId==="main-half-a"?"Assigned: Half A":e.serviceId==="main-half-b"?"Assigned: Half B":e.machinePosition?e.machinePosition.replace("machine-","Machine "):""}function Cs(e){const t=a=>{const[n,i="0"]=String(a||"0:00").split(":");return Number(n)*60+Number(i)};return Math.max(0,t(e.endTime)-t(e.startTime))}function En(){let e=r.sessions.find(t=>t.id==="open-gym");return e||(e=structuredClone(L.sessions.find(t=>t.id==="open-gym")),r.sessions.push(e)),e.openGymPricingTiers=Oe(e),e}function Ts(){Ul();const e=En(),t=Oe(e),a=[...r.openCourtSlots||[]].filter(n=>n.active!==!1&&!qn(n)).sort((n,i)=>`${n.date||""} ${n.startTime||""}`.localeCompare(`${i.date||""} ${i.startTime||""}`));return`
    <div class="adminPanelHead">
      <div>
        <h2>Open Gym</h2>
        <p class="adminHelp">Edit single drop-in pricing by shopper status. These prices feed the public Open Gym card, cart, and checkout totals.</p>
      </div>
    </div>
    <form class="adminForm openGymPricingEditor" data-open-gym-pricing-form>
      <div class="adminCardHead">
        <div>
          <span class="statusBadge">Pricing</span>
          <h3>Single Drop-in Prices</h3>
        </div>
      </div>
      <div class="openGymPricingRows">
        ${t.map(n=>`
          <div class="openGymPricingRow" data-open-gym-price-tier="${b(n.id)}">
            <input type="hidden" name="openGymTierId__${b(n.id)}" value="${b(n.id)}" />
            <label>Name<input name="openGymTierLabel__${b(n.id)}" value="${b(n.label_en)}" /></label>
            <label>Price<input type="number" min="0" step="1" name="openGymTierPrice__${b(n.id)}" value="${Number(n.price||0)}" /></label>
          </div>
        `).join("")}
      </div>
      <div class="adminActions">
        <button>Save Open Gym Pricing</button>
      </div>
    </form>
    <form class="adminForm openGymSlotForm" data-open-gym-slot-form>
      <div class="adminCardHead">
        <div>
          <span class="statusBadge">New Time</span>
          <h3>Add Open Gym Time</h3>
        </div>
      </div>
      <div class="adminFieldGrid">
        <label>Title<input name="title_en" value="Basketball Drop-In" /></label>
        <label>Date<input type="date" required name="date" value="${b(me(new Date))}" /></label>
        <label>Start Time<input type="time" required name="startTime" value="08:00" /></label>
        <label>End Time<input type="time" required name="endTime" value="10:00" /></label>
        <label>Drop-in Spots<input type="number" required min="0" step="1" name="spots" value="12" /></label>
        <label class="wide">Notes<textarea name="notes_en" placeholder="Simple internal note"></textarea></label>
      </div>
      <div class="adminActions">
        <button>Save Open Gym Time</button>
      </div>
    </form>
    <section class="openGymSlotList">
      <div class="adminPanelHead compactAdminHead">
        <div>
          <h3>Saved Open Gym Times</h3>
          <p class="adminHelp">Cancel removes the time from the public page and cancels related Open Gym bookings.</p>
        </div>
      </div>
      ${a.length?a.map(As).join(""):'<p class="adminHelp">No Open Gym times yet. Add one with the form above.</p>'}
    </section>
  `}function As(e){const t=Pt(e,r.bookings||[]),a=h(e,"notes")||"";return`
    <article class="openGymSlotRecord">
      <div>
        <span class="statusBadge ${e.active===!1?"mutedBadge":""}">${e.active===!1?"Hidden":"Visible"}</span>
        <strong>${m(h(e,"title")||"Basketball Drop-In")}</strong>
        <small>${m(e.date||"")} / ${m(ea(e))}</small>
      </div>
      <div>
        <span>${Number(e.spots||0)} spots</span>
        <b>${t} remaining</b>
      </div>
      <p>${m(a||"No note")}</p>
      <button type="button" class="dangerOutline" data-cancel-open-gym-slot="${b(e.id)}">Cancel</button>
    </article>
  `}function Ms(){const e=r.programs||[],t=sessionStorage.getItem("classScheduleProgram")||"basketball",a=e.some(y=>y.id===t)?t:e[0]?.id||"",n=Ua(a,r.dropdownPages||[],e),i=sessionStorage.getItem("classScheduleType")||"",o=n.some(y=>y.id===i)?i:n[0]?.id||"",l=n.find(y=>y.id===o),c=Ns(o),d=sessionStorage.getItem("classScheduleEditing")||"",u=c.find(y=>y.id===d)||null,p=u||Ls(a,o),$=u?Bn(u)||o:"",S=kt.sessions.fields.filter(y=>!["programId","type"].includes(y.name));return`
    <div class="adminPanelHead">
      <div>
        <h2>Class Schedule</h2>
        <p class="adminHelp">Choose a program, choose a front navigation class type, then add or edit one class at a time.</p>
      </div>
      <button type="button" data-class-session-new>New Class</button>
    </div>
    <section class="classScheduleWorkbench">
      <div class="classSchedulePicker">
        <label>Program
          <select data-class-schedule-program>
            ${e.map(y=>`<option value="${b(y.id)}" ${y.id===a?"selected":""}>${m(y.title_en||y.title_zh||y.id)}</option>`).join("")}
          </select>
        </label>
        <label>Class Type
          <select data-class-schedule-type ${n.length?"":"disabled"}>
            ${n.map(y=>`<option value="${b(y.id)}" ${y.id===o?"selected":""}>${m(y.label_en||y.title_en||y.id)}</option>`).join("")}
          </select>
        </label>
        ${l?.targetRoute?`<p class="adminHelp compactHelp">This menu item keeps its current public navigation route: ${m(l.targetRoute)}.</p>`:""}
        <div class="classSessionList">
          ${c.length?c.map(y=>Es(y,u?.id)).join(""):'<p class="adminHelp">No classes linked to this class type yet.</p>'}
        </div>
      </div>
      <div class="classScheduleMain">
        ${l?.privatePricing?zs(l):""}
        <form class="adminForm classScheduleForm" data-class-session-form>
          <input type="hidden" name="id" value="${b(u?.id||"__new")}" />
          <input type="hidden" name="programId" value="${b(a)}" />
          <input type="hidden" name="type" value="${b(o)}" />
          <input type="hidden" name="previousClassType" value="${b($)}" />
          <div class="adminCardHead">
            <div>
              <span class="statusBadge ${p.active===!1?"mutedBadge":""}">${u?"Editing":"New Class"}</span>
              <h3>${m(ra(p))}</h3>
            </div>
            <div class="classTypeBadge">${m(l?.label_en||o||"No Class Type")}</div>
          </div>
          <div class="adminFieldGrid">
            ${S.map(y=>Q(y,p[y.name],p)).join("")}
          </div>
          <div class="adminActions">
            <button ${o?"":"disabled"}>Save Class</button>
            ${u?`<button type="button" class="danger" data-delete-class-session="${b(u.id)}">Delete Class</button>`:""}
          </div>
        </form>
      </div>
    </section>
  `}function zs(e){const t=_e(e);return`
    <form class="adminForm privatePricingEditor" data-private-pricing-form data-page-id="${b(e.id)}">
      <div class="adminCardHead">
        <div>
          <span class="statusBadge">Private Training</span>
          <h3>Pricing Matrix</h3>
          <p class="adminHelp">Edit columns, products, and prices for this program's Private Training page.</p>
        </div>
        <div class="classTypeBadge">${m(e.parentMenu||"")}</div>
      </div>
      <section class="privatePricingColumns">
        ${t.privatePricingColumns.map(a=>`
          <div class="privatePricingColumn" data-private-pricing-column="${b(a.id)}">
            <input type="hidden" name="privatePricingColumnId" value="${b(a.id)}" />
            <label>Column English<input name="privatePricingColumnLabelEn" value="${b(a.label_en)}" required /></label>
            <button type="button" class="danger" data-delete-private-pricing-column="${b(a.id)}">Delete Column</button>
          </div>
        `).join("")}
      </section>
      <div class="privatePricingTable" style="--pricing-columns:${t.privatePricingColumns.length}">
        <div class="privatePricingHead">
          <span>Product</span>
          ${t.privatePricingColumns.map(a=>`<span>${m(a.label_en)}</span>`).join("")}
          <span>Action</span>
        </div>
        ${t.privatePricingRows.map(a=>`
          <div class="privatePricingRow" data-private-pricing-row="${b(a.id)}">
            <input type="hidden" name="privatePricingRowId" value="${b(a.id)}" />
            <input name="privatePricingRowLabelEn" value="${b(a.label_en)}" required />
            ${t.privatePricingColumns.map(n=>`<input type="number" min="0" step="1" name="privatePricingPrice__${b(a.id)}__${b(n.id)}" value="${Number(a.prices[n.id]||0)}" aria-label="${b(`${a.label_en} ${n.label_en}`)}" />`).join("")}
            <button type="button" class="danger" data-delete-private-pricing-row="${b(a.id)}">Delete Row</button>
          </div>
        `).join("")}
      </div>
      <div class="adminActions">
        <button type="submit">Save Pricing</button>
        <button type="button" class="secondaryButton" data-add-private-pricing-row>Add Row</button>
        <button type="button" class="secondaryButton" data-add-private-pricing-column>Add Column</button>
      </div>
    </form>
  `}function Ns(e){return e?(r.sessions||[]).filter(t=>Bn(t)===e).sort((t,a)=>String(t.title_en||t.id).localeCompare(String(a.title_en||a.id))):[]}function Bn(e){return ei(e,r.dropdownPages||[])}function Ls(e,t){return{id:"__new",programId:e,type:t,title_en:"New Class",desc_en:"",dates:"By appointment",datesList:[],dateSummary:"",time:"TBD",regularPrice:0,memberPrice:0,capacity:12,booked:0,waiver:!0,active:!0}}function Es(e,t){return`
    <article class="classSessionRow ${e.id===t?"active":""}">
      <button type="button" data-class-session-edit="${b(e.id)}">
        <strong>${m(h(e,"title")||e.title_en||e.id)}</strong>
        <span>${m([Ue(e)||e.dates,e.time].filter(Boolean).join(" / "))}</span>
      </button>
    </article>
  `}function Bs(e){const t=e.collectionKey,n=[...t==="bookingServices"?(r[t]||[]).filter(i=>en.includes(i.id)):r[t]||[]].sort((i,o)=>Number(i.order||999)-Number(o.order||999));return`
    <div class="adminPanelHead">
      <div>
        <h2>${e.title}</h2>
        <p class="adminHelp">${e.description}</p>
      </div>
      ${e.canAdd===!1?"":`<button data-add-row="${t}">${e.addLabel}</button>`}
    </div>
    <div class="adminCardGrid">
      ${n.map(i=>`
      <form class="adminForm adminCard" data-admin-collection="${t}" data-id="${i.id}">
        <div class="adminCardHead">
          <div>
            <span class="statusBadge ${i.active===!1?"mutedBadge":""}">${i.active===!1?"Hidden":"Visible"}</span>
            <h3>${ra(i)}</h3>
          </div>
          ${Rs(i,e)}
        </div>
        <div class="adminFieldGrid">
          ${e.fields.map(o=>Q(o,i[o.name],i)).join("")}
        </div>
        <div class="adminActions">
          <button>Save</button>
          ${e.canCopy===!1?"":`<button type="button" class="secondaryButton" data-copy-row="${t}:${i.id}">${e.copyLabel}</button>`}
          ${e.canDelete===!1?"":`<button type="button" class="danger" data-delete-row="${t}:${i.id}">Delete</button>`}
        </div>
      </form>`).join("")}
    </div>
  `}function ra(e){return e.title_en||e.label_en||e.name||e.courtType||e.title_zh||e.id}function Rs(e,t){const a=t.imageFields?.find(i=>e[i]),n=a?e[a]:"";return n?`<img class="adminThumb" src="${n}" alt="${b(ra(e))}" />`:'<div class="adminThumb placeholder">No image</div>'}function Ma(e,t="center"){return(e==="x"?["left","center","right"]:["top","center","bottom"]).map(n=>`<option value="${n}" ${t===n?"selected":""}>${n}</option>`).join("")}function Ds(e={},t={}){return e.usage||t.usage_en||t.usage||""}function Q(e,t,a={}){const n=e.name,i=t??"",o=e.help?`<small>${e.help}</small>`:"";if(e.type==="textarea")return`<label>${e.label}${o}<textarea name="${n}" ${e.required?"required":""}>${m(i)}</textarea></label>`;if(e.type==="boolean")return`<label>${e.label}${o}<select name="${n}"><option value="true" ${t!==!1?"selected":""}>Yes</option><option value="false" ${t===!1?"selected":""}>No</option></select></label>`;if(e.type==="select"){const d=e.options||[];return`<label>${e.label}${o}<select name="${n}" ${e.required?"required":""}>${d.map(([u,p])=>`<option value="${b(u)}" ${t===u?"selected":""}>${m(p)}</option>`).join("")}</select></label>`}if(e.type==="programSelect")return`<label>${e.label}${o}<select name="${n}">${r.programs.map(d=>`<option value="${d.id}" ${t===d.id?"selected":""}>${d.title_en||d.title_zh||d.id} (${d.id})</option>`).join("")}</select></label>`;if(e.type==="sessionMultiSelect"){const d=new Set(Array.isArray(t)?t:String(t||"").split(/[\n,]/).map(p=>p.trim()).filter(Boolean)),u=r.sessions.map(p=>{const $=`${h(p,"title")} (${p.id}) · ${p.programId} · ${w(p.regularPrice||0)} · ${Ue(p)||p.dates||""} ${p.time||""}`;return`<option value="${b(p.id)}" ${d.has(p.id)?"selected":""}>${m($)}</option>`}).join("");return`
      <label>${e.label}${o}
        <select name="${n}" multiple size="8">${u}</select>
        <small>Hold Ctrl/Command to select multiple products.</small>
        <textarea name="sessionIdsManual" placeholder="Advanced: optional class IDs, one per line">${m([...d].filter(p=>!r.sessions.some($=>$.id===p)).join(`
`))}</textarea>
      </label>
    `}if(e.type==="image"){const d=`${n}PositionX`,u=`${n}PositionY`,p=a[d]||"center",$=a[u]||"center",S=Ds(e,a);return`
      <div class="adminImageField">
        <label>${e.label}${o}${S?`<small><strong>Frontend use:</strong> ${m(S)}</small>`:""}<input name="${n}" data-image-value="${n}" value="${b(i)}" placeholder="Paste an image link or upload below" /></label>
        <div class="adminImagePreviewFrame" data-image-preview="${n}">
          ${i?`<img class="adminImagePreview" src="${b(i)}" alt="${e.label}" />`:'<div class="adminImagePreview emptyPreview">No image selected</div>'}
        </div>
        <small class="adminImageStatus" data-image-status="${n}" aria-live="polite"></small>
        <label class="uploadButton">Upload Image<input type="file" accept="image/*" data-image-upload data-image-target="${n}" /></label>
        <div class="adminImageFocus">
          <label>Horizontal Focus
            <select name="${n}PositionX">${Ma("x",p)}</select>
          </label>
          <label>Vertical Focus
            <select name="${n}PositionY">${Ma("y",$)}</select>
          </label>
        </div>
      </div>
    `}if(e.type==="list"){const d=Array.isArray(t)?t.join(`
`):i;return`<label>${e.label}${o}<textarea name="${n}" placeholder="One date per line">${m(d)}</textarea></label>`}const l=e.type==="number"?"number":e.type==="date"?"date":e.type==="time"?"time":"text",c=l==="number"?' min="0" step="1"':"";return`<label>${e.label}${o}<input type="${l}" name="${n}" value="${b(i)}" ${e.required?"required":""}${c} /></label>`}function m(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function b(e){return m(e).replaceAll('"',"&quot;")}function Te(){return q(s("notFound.title"),s("notFound.subtitle"))}function Fs(e={}){if(e.programId!=="membership")return"";const t=o=>(pe({title:o},s("memberAccount.membershipNotAdded")),o);if(z.find(o=>o.programId==="membership"))return t(s("memberAccount.membershipAlreadyInCart"));const n=Vt(),i=ee(e);return n==="plus"?t(s("memberAccount.plusAlreadyActive")):n==="regular"&&i==="regular"?t(s("memberAccount.regularAlreadyActive")):""}function qs(e){const t=r.sessions.find(o=>o.id===e);if(!t||Ce(t)<=0)return;const a=Zt(t),n=a.length>1?Tn(t,a.length):mn(t),i={kind:a.length===1?"session":"package",id:a.length===1?t.id:`${t.id}-selected-${a.length}`,programId:t.programId,title:a.length===1?h(t,"title"):`${h(t,"title")} · ${r.language==="zh"?`${a.length} 周`:`${a.length} weeks`}`,title_zh:a.length===1?t.title_zh:`${t.title_zh||t.title_en} · ${a.length} 周`,meta:`${a.map(He).join(", ")} / ${K(t.time)}`,credits:a.length>1?a.length:void 0,price:n};z.push(i),pe(i),te(),g()}function xs(e){const t=r.sessions.find(o=>o.id===e);if(!t||Ce(t)<=0)return;if(Fs(t)){g();return}const n=t.programId==="membership"?gn(new Date().toISOString(),1):"",i={kind:"session",id:e,programId:t.programId,title:h(t,"title"),title_zh:t.title_zh,membershipLevel:t.programId==="membership"?ee(t):void 0,meta:t.programId==="membership"?r.language==="zh"?`有效至 ${n}`:`Active through ${n}`:`${r.language==="zh"?He(Ue(t)):t.dates} / ${K(t.time)}`,expiresAt:n,price:mn(t)};z.push(i),pe(i),te(),g()}function Os(e){const[t,a]=String(e).split(":"),n=r.sessions.find(p=>p.id===t),i=n?.packages?.[Number(a)];if(!n||!i)return;const[o,l]=i,c=String(o).match(/\d+/),d=c?Number(c[0]):Math.max(1,(n.datesList||be(n.dates)).length||1),u={kind:"package",id:`${n.id}-package-${a}`,programId:n.programId,title:`${h(n,"title")} · ${Tt(o)}`,title_zh:`${n.title_zh||n.title_en} · ${Tt(o)}`,meta:r.language==="zh"?`${d} 次 · 12 个月后到期`:`${d} credit${d===1?"":"s"} · expires in 12 months`,credits:d,price:l};z.push(u),pe(u),te(),g()}function Us(e){const t=r.products.find(n=>n.id===e&&n.active!==!1);if(!t||Number(t.stock||0)<=0)return;const a={kind:"product",id:e,title:h(t,"title"),title_zh:t.title_zh,meta:t.sizes||(r.language==="zh"?"周边商品":"Merchandise"),quantity:1,price:Number(t.price||0)};z.push(a),pe(a),te(),g()}function Hs(e){const t=r.courtSlots.find(n=>n.id===e);if(!t||t.booked)return;const a={kind:"court",id:e,programId:t.programId,title:r.language==="zh"?t.title_zh:t.courtType,title_zh:t.title_zh,meta:`${t.date} / ${K(t.time)}`,price:t.price};z.push(a),pe(a),te(),g()}function js(e){const t=Kt(),a=N(t.serviceId);if(!a)return;const n=t.selectedStartTime||e;if(!n){alert(r.language==="zh"?"请先选择时间。":"Select a time first."),g();return}const i={date:t.date,startTime:n,endTime:ke(n,t.duration),quantity:a.mode==="machine"?1:Math.max(1,t.quantity),machinePosition:a.mode==="machine"?t.machinePosition:""};if(a.mode==="machine"&&!i.machinePosition){alert(r.language==="zh"?"请先选择投篮机。":"Choose a shooting machine first.");return}const o=z.findIndex(p=>io(p,a)&&p.date===i.date&&p.startTime===i.startTime&&p.endTime===i.endTime&&(!i.machinePosition||p.machinePosition===i.machinePosition));if(o>=0){z.splice(o,1),te(),g();return}const l=qr(a,i,At());if(!l.available){alert(ge(l.reason)||s("bookingSystem.conflictFallback")),g();return}const c=Lt(a,i,[...r.bookings,...At()]),d=vn(a,t.duration,i.quantity),u={kind:"booking",cartId:`CART-${Date.now()}`,serviceId:c.id,displayServiceId:a.id,programId:"court-rental",title:R(a,r.language),title_zh:R(a,"zh"),date:i.date,startTime:i.startTime,endTime:i.endTime,quantity:i.quantity,machinePosition:i.machinePosition,meta:`${i.date} / ${i.startTime}-${i.endTime}${i.machinePosition?` / ${i.machinePosition.replace("machine-","Machine ")}`:""}`,price:d};z.push(u),pe(u),Ne({selectedStartTime:""}),te(),g()}function Gs(e){const t=H(e),a=N("main-full"),n={id:`REQ-${Date.now()}`,kind:"full_court_request",status:"pending_request",source:"customer",serviceId:"main-full",serviceLabel_en:R(a,"en"),serviceLabel_zh:R(a,"zh"),date:t.date,preferredTimeRange:t.preferredTimeRange,duration:Number(t.duration||120),quantity:Number(t.participants||1),customer:{name:t.name,phone:t.phone,email:t.email,notes:t.notes},paymentMethod:"Staff follow-up",paymentStatus:"pending",lockStatus:"not_locked",createdAt:new Date().toISOString()};r.bookings.unshift(n),T();const i=Rn(n);sessionStorage.setItem("fullCourtRequestNotice",r.language==="zh"?"定场请求已提交，邮件草稿已打开。":"Court request submitted. An email draft has been opened."),window.location.href=i,g()}function Vs(e){const t=he();if(!t?.student)return;const a=st(j(),t.student.id,{now:new Date().toISOString()}),n=aa(a),i=H(e),o=N("main-full"),l={id:`REQ-${Date.now()}`,kind:"full_court_request",status:"pending_request",source:"member",serviceId:"main-full",serviceLabel_en:R(o,"en"),serviceLabel_zh:R(o,"zh"),studentId:t.student.id,studentName:t.student.fullName,membershipLevel:t.membershipLevel||"visitor",creditPackageId:n?.programId==="court-rental"?n.id:"",date:i.date,preferredTimeRange:i.preferredTimeRange,duration:Number(i.duration||120),quantity:Number(i.participants||1),customer:{name:i.name||t.student.fullName,phone:i.phone||t.student.phone,email:i.email||t.student.email,notes:i.notes},paymentMethod:"Staff follow-up",paymentStatus:"pending",lockStatus:"not_locked",createdAt:new Date().toISOString()};r.bookings.unshift(l),T();const c=Rn(l);sessionStorage.setItem("memberAccountNotice",r.language==="zh"?"定场请求已提交，邮件草稿已打开。工作人员确认前不会扣除会员次数。":"Court request submitted. An email draft has been opened. No member credit was deducted before staff confirmation."),window.location.href=c,g()}function Rn(e){const t=e.customer||{},a=`Main Court Booking Request - ${e.date}`,n=["New Main Court booking request","",e.studentName?`Member account: ${e.studentName} (${e.studentId||""})`:"",e.membershipLevel?`Membership level: ${e.membershipLevel}`:"",e.creditPackageId?`Member court package: ${e.creditPackageId}`:"",(e.studentName||e.membershipLevel||e.creditPackageId,""),`Name: ${t.name||""}`,`Phone: ${t.phone||""}`,`Email: ${t.email||""}`,`Booking date: ${e.date||""}`,`Preferred time range: ${e.preferredTimeRange||""}`,`Duration: ${Number(e.duration||0)/60}H`,`Participants: ${e.quantity||1}`,`Notes: ${t.notes||""}`].join(`
`);return`mailto:info@firstlighttrainingcenter.ca?subject=${encodeURIComponent(a)}&body=${encodeURIComponent(n)}`}function Ws(){const e=[];for(const t of z.filter(a=>a.kind==="booking")){const a=N(t.serviceId),n={date:t.date,startTime:t.startTime,endTime:t.endTime,quantity:t.quantity,machinePosition:t.machinePosition},i=ne(a,n,[...r.bookings,...e]);if(!i.available)return{ok:!1,item:t,reason:i.reason};e.push(nt({id:`BK-${Date.now()}-${e.length+1}`,source:"customer",service:a,...n,customer:{},paymentMethod:"Credit Card",machinePosition:t.machinePosition}))}return{ok:!0,bookings:e}}function za(e){const t=e.querySelector("input[name='participantType']:checked")?.value||"adult";e.querySelectorAll("[data-checkout-section]").forEach(a=>{const n=a.dataset.checkoutSection===t;a.hidden=!n,a.querySelectorAll("input, select, textarea").forEach(i=>{i.disabled=!n})})}async function Js(e){const t=Object.fromEntries(new FormData(e).entries()),a=t.participantType==="minor"?"minor":"adult";t.photoConsent=t.photoConsent==="on",t.marketingConsent=t.marketingConsent==="on";const n=Ks(t,a),i=wi(n,{asOf:new Date().toISOString(),participantType:a});if(!i.valid){alert(`${s("checkoutForm.validationPrefix")} ${i.errors.join("; ")}`);return}const o=Ws();if(!o.ok){alert(`${s("checkoutForm.bookingConflict")} ${o.item.title} ${yn(o.item)} ${s("checkoutForm.noLongerAvailable")} ${o.reason||""}`),g();return}if(De()){try{const y=await er({cart:z,total:z.reduce((f,C)=>f+C.price,0),data:t,participantType:a,language:r.language,waiverTemplate:J});if(!y.checkoutUrl)throw new Error("Stripe checkout URL was not returned.");sessionStorage.setItem("firstlight_pending_production_order_id",y.orderId||""),window.location.assign(y.checkoutUrl)}catch(y){alert(y.message||(r.language==="zh"?"无法启动安全付款，请联系前台。":"Secure checkout could not start. Please contact the front desk."))}return}const l=Ci(r.students||[],n,{now:new Date().toISOString()});r.students=l.students,sessionStorage.setItem("firstlight_member_student_id",l.student.id);const c=a==="minor"||Ft(n)?t.signatureRelation||t.guardianRelation||"Guardian":t.signatureRelation||"Self",d={...t,...Ii(n,a),participantType:a},u=Lr(t.paymentMethod),p={id:`BK-${Date.now()}`,kind:"order",status:u.status,participantType:a,studentId:l.student.id,studentName:l.student.fullName,customer:d,paymentMethod:t.paymentMethod,paymentStatus:u.paymentStatus,lockStatus:u.lockStatus,paymentReference:t.paymentReference||"",paymentMessage:u.paymentMessage,paymentConfirmedAt:u.confirmedAt,language:r.language,items:z,total:z.reduce((y,f)=>y+f.price,0),emailSent:"prepared",createdAt:new Date().toISOString()},$=Ti({studentId:l.student.id,orderId:p.id,template:J,signerName:t.signatureName,signerRelation:c,participantType:a,templateAudience:a,userAgent:navigator.userAgent,now:p.createdAt});if(p.waiverSignedAt=$.signedAt,p.waiverSignatureId=$.id,r.waiverSignatures=[$,...r.waiverSignatures||[]],ue(p)){for(const y of z)if(y.kind==="court"){const f=r.courtSlots.find(C=>C.id===y.id);f&&(f.booked=!0)}}const S=Ja({records:{enrollments:r.enrollments||[],creditPackages:r.creditPackages||[],creditTransactions:r.creditTransactions||[]},order:p,now:p.createdAt});if(r.enrollments=S.enrollments,r.creditPackages=S.creditPackages,r.creditTransactions=S.creditTransactions,ue(p))for(const y of o.bookings)r.bookings.unshift({...y,status:"confirmed",paymentStatus:u.paymentStatus,lockStatus:u.lockStatus,orderId:p.id,studentId:l.student.id,studentName:l.student.fullName,customer:d,participantType:a,paymentMethod:t.paymentMethod,language:r.language});r.bookings.unshift(p),z=[],sessionStorage.setItem("lastConfirmedBookingId",p.id),T(),te(),g(),setTimeout(()=>{document.querySelector("[data-confirmation-summary]")?.scrollIntoView({behavior:"smooth",block:"start"})})}function Ks(e,t="adult"){const a=t==="minor";return{fullName:e.name,birthDate:e.birthDate,phone:a?e.guardianPhone:e.phone,email:a?e.guardianEmail:e.email,participantType:t,address:e.address,primarySport:e.primarySport,experience:e.experience,preferredClassTime:e.preferredTime,notes:e.notes,source:"website checkout",signatureName:e.signatureName,guardian:a?{name:e.guardianName,relation:e.guardianRelation,phone:e.guardianPhone,email:e.guardianEmail}:{},emergency:{name:e.emergency,phone:e.emergencyPhone},medicalNotes:e.medicalNotes,photoConsent:e.photoConsent,marketingConsent:e.marketingConsent}}async function Ys(e){const t=Object.fromEntries(new FormData(e).entries());if(De()){try{const n=await tr({email:t.email,password:t.password}),i=await ar({accessToken:n.accessToken});sessionStorage.setItem("firstlight_production_member_access_token",n.accessToken),sessionStorage.setItem("firstlight_production_member_summary",JSON.stringify(i)),i?.student?.id&&sessionStorage.setItem("firstlight_member_student_id",i.student.id),sessionStorage.removeItem("firstlight_member_login_error")}catch(n){sessionStorage.setItem("firstlight_member_login_error",n.message||(r.language==="zh"?"登录失败，请检查邮箱和密码。":"Login failed. Check your email and password."))}g();return}const a=Ai(r.students||[],t);if(!a){sessionStorage.setItem("firstlight_member_login_error",r.language==="zh"?"未找到账户。请使用已完成预约订单中的邮箱，或联系前台。":"Account not found. Please use the email from a completed booking or contact the front desk."),g();return}sessionStorage.setItem("firstlight_member_student_id",a.id),sessionStorage.removeItem("firstlight_member_login_error"),g()}function Qs(e){const t=he();if(!t?.student)return;const a=Object.fromEntries(new FormData(e).entries());Object.assign(t.student,{phone:a.phone,address:a.address,preferredClassTime:a.preferredClassTime,emergencyPhone:a.emergencyPhone,medicalNotes:a.medicalNotes,updatedAt:new Date().toISOString()}),T(),g()}function Dn(e,t=""){r.enrollments=e.enrollments||r.enrollments,r.bookings=e.bookings||r.bookings,r.creditPackages=e.creditPackages||r.creditPackages,r.creditTransactions=e.creditTransactions||r.creditTransactions,e.openCourtSlots&&(r.openCourtSlots=e.openCourtSlots),T(),t&&sessionStorage.setItem("memberAccountNotice",t),g()}function Xs(){const e=sessionStorage.getItem("memberAccountNotice");return e?(sessionStorage.removeItem("memberAccountNotice"),`<div class="adminNotice">${m(e)}</div>`):""}function Zs(e){const[t,a,n]=String(e).split(":"),i=r.sessions.find(d=>d.id===a),l=(i?.datesList||be(i?.dates))?.[Number(n)];if(!i||!l)return;const c={kind:"class",id:i.id,title:h(i,"title"),title_zh:i.title_zh,programId:i.programId,date:l,time:i.time,startsAt:l};pt(t,c)}function el(e){const t=Object.fromEntries(new FormData(e).entries()),a=r.sessions.find(n=>n.id===t.sessionId);a&&pt(t.packageId,{kind:"class",id:a.id,title:h(a,"title"),title_zh:a.title_zh,programId:a.programId,date:t.date,time:t.startTime,startsAt:`${t.date}T${t.startTime}:00.000`})}function tl(e){const t=he(),a=t?st(j(),t.student.id,{now:new Date().toISOString()}):[],n=aa(a);if(!t?.student||!n)return;const i=na(),o=N(i.serviceId);if(!o)return;if(o.id==="main-full"){alert(r.language==="zh"?"全场需要先提交定场请求，由工作人员确认。":"Main Court Full requires a request form and staff confirmation."),g();return}const l=i.selectedStartTime||e;if(!l){alert(r.language==="zh"?"请先选择时间。":"Select a time first."),g();return}const c={date:i.date,startTime:l,endTime:ke(l,i.duration),quantity:o.mode==="machine"?1:Math.max(1,i.quantity),machinePosition:o.mode==="machine"?i.machinePosition:""};if(o.mode==="machine"&&!c.machinePosition){alert(r.language==="zh"?"请先选择投篮机。":"Choose a shooting machine first."),g();return}const d=ne(o,c,r.bookings);if(!d.available){alert(ge(d.reason)||s("bookingSystem.conflictFallback")),g();return}const u=Lt(o,c,r.bookings);Le({selectedStartTime:""}),pt(n.id,{kind:"resource",id:u.id,serviceId:u.id,title:R(o,r.language),title_zh:R(o,"zh"),programId:"court-rental",date:c.date,startTime:c.startTime,endTime:c.endTime,startsAt:`${c.date}T${c.startTime}:00.000`,quantity:c.quantity,machinePosition:c.machinePosition,resources:u.resources||[],service:u})}function al(e){const[t,a]=String(e).split(":"),n=(r.openCourtSlots||[]).find(i=>i.id===a);n&&pt(t,{kind:"openGym",id:n.id,title:h(n,"title"),title_zh:n.title_zh,programId:"open-gym",date:n.date,startTime:n.startTime,endTime:n.endTime,startsAt:`${n.date}T${n.startTime}:00.000`,quantity:1})}function pt(e,t){const a=he();if(a?.student)try{const n=Ni({records:j(),studentId:a.student.id,packageId:e,option:t,now:new Date().toISOString()});Dn(n,s("memberAccount.reservedNotice"))}catch(n){alert(n.message||s("memberAccount.reserveFailed"))}}function nl(e){const t=he();if(!t?.student)return;const a=Li({records:j(),studentId:t.student.id,usageId:e,now:new Date().toISOString(),cutoffHours:48});if(!a.cancelled){alert(a.reason==="Cancellation window has passed"?s("memberAccount.cancelWindowPassed"):a.reason);return}Dn(a,s("memberAccount.cancelledNotice"))}function il(){try{return JSON.parse(sessionStorage.getItem("adminStudentFilters")||"{}")}catch{return{}}}function rl(e){return[...new Set([...(e.enrollments||[]).map(t=>t.programId),...(e.creditPackages||[]).map(t=>t.programId),...(e.bookings||[]).flatMap(t=>(t.items||[]).map(a=>a.programId))].filter(Boolean))].sort()}function ol(e){const t=Object.fromEntries(new FormData(e).entries()),a=(r.students||[]).find(n=>n.id===t.studentId);a&&(a.staffNotes=t.staffNotes,a.updatedAt=new Date().toISOString(),T(),M("Student notes saved."),g())}function sl(e){const t=Object.fromEntries(new FormData(e).entries()),a=Number(t.units||0);if(!t.studentId||!t.programId||a===0)return;const n=new Date().toISOString();try{if(a<0){const i=Ka({creditPackages:r.creditPackages||[],creditTransactions:r.creditTransactions||[],studentId:t.studentId,programId:t.programId,units:Math.abs(a),reason:t.reason||"manual adjustment",staffId:"admin",now:n});r.creditPackages=i.creditPackages,r.creditTransactions=i.creditTransactions}else{const i=(r.students||[]).find(c=>c.id===t.studentId),o={id:`credit-adjustment-${Date.now()}`,orderId:"manual-adjustment",studentId:t.studentId,studentName:i?.fullName||"",programId:t.programId,title:t.reason||"Manual credit adjustment",originalCredits:0,balance:a,purchasedAt:n,expiresAt:gn(n,12)},l=(r.creditPackages||[]).filter(c=>c.studentId===t.studentId&&c.programId===t.programId).reduce((c,d)=>c+Number(d.balance||0),a);r.creditPackages=[o,...r.creditPackages||[]],r.creditTransactions=[{id:`credit-adjustment-tx-${Date.now()}`,packageIds:[o.id],studentId:t.studentId,programId:t.programId,type:"adjustment",units:a,balanceAfter:l,reason:t.reason||"manual adjustment",staffId:"admin",orderId:"",createdAt:n},...r.creditTransactions||[]]}T(),M("Credit package adjustment saved and logged."),g()}catch(i){alert(i.message||(r.language==="zh"?"课包调整失败。":"Credit adjustment failed."))}}function ll(e){const t=(r.enrollments||[]).find(a=>a.id===e);t&&(t.status="cancelled",t.cancelledAt=new Date().toISOString(),T(),M("Enrollment status changed to cancelled."),g())}function cl(e){const t=e.participantType==="minor",a=r.language==="zh"?t?"学员档案":"参与者档案":t?"Student record":"Participant record",n=r.language==="zh"?t?"家长/监护人":"联系人":t?"Parent/guardian":"Contact";return`
    <article class="emailPreview">
      <div class="eyebrow">${A("confirmation")}</div>
      <h2>${r.language==="zh"?"邮件预览":"Email preview"} / ${e.id}</h2>
      <p>${r.emailTemplates[e.language]}</p>
      <p><strong>${n}: ${e.customer.name}</strong> / ${e.customer.email} / ${e.customer.phone}</p>
      <ul>${e.items.map(i=>`<li>${re(i)} - ${i.meta} - ${w(i.price)}</li>`).join("")}</ul>
      <p>${r.language==="zh"?"付款":"Payment"}: ${dt(e.paymentMethod)} / ${Wt(e)}</p>
      <p>${e.paymentMessage||""}</p>
      <p>${r.language==="zh"?"地址":"Address"}: 165-13631 Vulcan Way, Richmond, BC V6V 1K4</p>
      <p>${r.language==="zh"?"免责协议已签署":"Waiver signed"}: ${new Date(e.waiverSignedAt).toLocaleString(r.language==="zh"?"zh-CN":void 0)} · ${h(J,"title")} v${J.version}</p>
      <p>${a}: ${e.studentName} · ${e.studentId}</p>
    </article>
  `}function dl(){return I==="home"?"":`
    <div class="pageBackWrap">
      <button class="pageBackButton" type="button" data-action="page-back">${r.language==="zh"?"← 返回":"← Back"}</button>
    </div>
  `}function g(){let e;I.startsWith("dropdown:")?e=go(I.split(":")[1]):I.startsWith("catalog:")?e=Zr(I.split(":")[1]):I.startsWith("program:")?e=to(I.split(":")[1]):I.startsWith("coach:")?e=vo(I.split(":")[1]):e=({home:Sa,programs:Xr,coaches:po,schedule:yo,contact:$o,league:So,about:ko,"open-court":Mn,account:Bo,confirmation:ss,wishlist:ts,merchandise:as,cart:os,admin:ls}[I]||Sa)(),document.querySelector("#app").innerHTML=`${xr()}${kr()}<main>${dl()}${e}</main>${ul()}`,ml(),_r()}function ul(){return`
    <footer>
      <img src="${Y("nav-logo",Ht)}" alt="First Light" />
      <span>165-13631 Vulcan Way, Richmond, BC V6V 1K4</span>
      <span>info@firstlighttrainingcenter.ca</span>
      <a href="${r.social.instagram}" target="_blank" rel="noreferrer">Instagram</a>
      <a href="${r.social.facebook}" target="_blank" rel="noreferrer">Facebook</a>
      <span>WeChat: ${r.social.wechat}</span>
      <button class="footerAdminLink" data-route="admin">${s("admin")}</button>
    </footer>
  `}function ml(){document.querySelectorAll("[data-route]").forEach(t=>t.addEventListener("click",a=>{a.preventDefault(),$a(t.dataset.route)})),document.querySelectorAll("[data-dropdown-trigger]").forEach(t=>t.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const n=t.closest(".navDropdown")||t.closest(".actionDropdown");document.querySelectorAll(".navDropdown.open, .actionDropdown.open").forEach(o=>{o!==n&&o.classList.remove("open")}),n?.classList.toggle("open")})),document.addEventListener("click",()=>{document.querySelectorAll(".navDropdown.open").forEach(t=>t.classList.remove("open")),document.querySelectorAll(".actionDropdown.open").forEach(t=>t.classList.remove("open"))},{once:!0}),document.querySelectorAll("[data-action='toggle-language']").forEach(t=>t.addEventListener("click",()=>{r.language=r.language==="en"?"zh":"en",T(),g()})),document.querySelector("[data-action='page-back']")?.addEventListener("click",()=>{history.length>1?history.back():$a("home")}),document.querySelectorAll("[data-toggle-week]").forEach(t=>t.addEventListener("click",()=>{const[a,n]=t.dataset.toggleWeek.split(":"),i=r.sessions.find(u=>u.id===a),o=i?.datesList||be(i?.dates),l=o?.[Number(n)];if(!i||!l)return;const c=Zt(i);let d=c.includes(l)?c.filter(u=>u!==l):[...c,l];d.length||(d=[l]),d=o.filter(u=>d.includes(u)).slice(0,4),sessionStorage.setItem(`selectedWeeks:${i.id}`,JSON.stringify(d)),g()})),document.querySelectorAll("[data-add-selected-weeks]").forEach(t=>t.addEventListener("click",()=>qs(t.dataset.addSelectedWeeks))),document.querySelectorAll("[data-add-session]").forEach(t=>t.addEventListener("click",()=>xs(t.dataset.addSession))),document.querySelectorAll("[data-add-package]").forEach(t=>t.addEventListener("click",()=>Os(t.dataset.addPackage))),document.querySelectorAll("[data-add-court]").forEach(t=>t.addEventListener("click",()=>Hs(t.dataset.addCourt))),document.querySelectorAll("[data-add-product]").forEach(t=>t.addEventListener("click",()=>Us(t.dataset.addProduct))),document.querySelectorAll("[data-booking-service]").forEach(t=>t.addEventListener("click",()=>{Ne({serviceId:t.dataset.bookingService,quantity:1,machinePosition:"",selectedStartTime:""}),g()})),document.querySelectorAll("[data-booking-draft]").forEach(t=>t.addEventListener("change",()=>{Ne({[t.dataset.bookingDraft]:t.value,selectedStartTime:""}),g()})),document.querySelectorAll("[data-machine-position]").forEach(t=>t.addEventListener("click",()=>{Ne({machinePosition:t.dataset.machinePosition,selectedStartTime:""}),g()})),document.querySelectorAll("[data-booking-time]").forEach(t=>t.addEventListener("click",()=>{Ne({selectedStartTime:t.dataset.bookingTime}),g()})),document.querySelector("[data-add-booking-to-cart]")?.addEventListener("click",()=>js()),document.querySelector("[data-full-court-request]")?.addEventListener("submit",t=>{t.preventDefault(),Gs(t.currentTarget)}),document.querySelectorAll("[data-remove-cart]").forEach(t=>t.addEventListener("click",()=>{z.splice(Number(t.dataset.removeCart),1),te(),g()})),document.querySelectorAll("[data-toggle-dates]").forEach(t=>t.addEventListener("click",()=>{const a=`dates:${t.dataset.toggleDates}`;sessionStorage.setItem(a,sessionStorage.getItem(a)==="open"?"closed":"open"),g()}));const e=document.querySelector("[data-checkout]");e&&(za(e),e.querySelectorAll("input[name='participantType']").forEach(t=>{t.addEventListener("change",()=>za(e))}),e.addEventListener("submit",t=>{t.preventDefault(),Js(t.currentTarget)})),document.querySelector("[data-member-login]")?.addEventListener("submit",t=>{t.preventDefault(),Ys(t.currentTarget)}),document.querySelector("[data-member-logout]")?.addEventListener("click",()=>{sessionStorage.removeItem("firstlight_member_student_id"),sessionStorage.removeItem("firstlight_production_member_access_token"),sessionStorage.removeItem("firstlight_production_member_summary"),g()}),document.querySelector("[data-member-profile]")?.addEventListener("submit",t=>{t.preventDefault(),Qs(t.currentTarget)}),document.querySelector("[data-member-package-select]")?.addEventListener("change",t=>{sessionStorage.setItem("memberSelectedPackageId",t.currentTarget.value),g()}),document.querySelectorAll("[data-member-reserve-class]").forEach(t=>t.addEventListener("click",()=>{Zs(t.dataset.memberReserveClass)})),document.querySelectorAll("[data-member-reserve-custom-class]").forEach(t=>t.addEventListener("submit",a=>{a.preventDefault(),el(a.currentTarget)})),document.querySelectorAll("[data-member-booking-service]").forEach(t=>t.addEventListener("click",()=>{Le({serviceId:t.dataset.memberBookingService,quantity:1,machinePosition:"",selectedStartTime:""}),g()})),document.querySelectorAll("[data-member-booking-draft]").forEach(t=>t.addEventListener("change",()=>{Le({[t.dataset.memberBookingDraft]:t.value,selectedStartTime:""}),g()})),document.querySelectorAll("[data-member-machine-position]").forEach(t=>t.addEventListener("click",()=>{Le({machinePosition:t.dataset.memberMachinePosition,selectedStartTime:""}),g()})),document.querySelectorAll("[data-member-resource-time]").forEach(t=>t.addEventListener("click",()=>{Le({selectedStartTime:t.dataset.memberResourceTime}),g()})),document.querySelector("[data-reserve-member-resource]")?.addEventListener("click",()=>tl()),document.querySelector("[data-member-full-court-request]")?.addEventListener("submit",t=>{t.preventDefault(),Vs(t.currentTarget)}),document.querySelectorAll("[data-member-open-gym]").forEach(t=>t.addEventListener("click",()=>{al(t.dataset.memberOpenGym)})),document.querySelectorAll("[data-member-cancel-usage]").forEach(t=>t.addEventListener("click",()=>{nl(t.dataset.memberCancelUsage)})),document.querySelector("[data-contact]")?.addEventListener("submit",t=>{t.preventDefault(),alert(r.language==="zh"?"信息已提交。":"Message submitted.")}),document.querySelector("[data-film-review-upload]")?.addEventListener("submit",t=>{t.preventDefault(),gl(t.currentTarget)}),pl()}function pl(){document.querySelectorAll("[data-admin-tab]").forEach(e=>e.addEventListener("click",()=>{sessionStorage.setItem("adminTab",e.dataset.adminTab),g()})),document.querySelectorAll("[data-admin-group-toggle]").forEach(e=>e.addEventListener("click",()=>{const t=`adminGroup:${e.dataset.adminGroupToggle}`;sessionStorage.setItem(t,sessionStorage.getItem(t)==="open"?"closed":"open"),g()})),document.querySelectorAll("[data-admin-page]").forEach(e=>e.addEventListener("submit",t=>{t.preventDefault(),Object.assign(r.pages[e.dataset.adminPage],$e(H(t.currentTarget))),T(),M("Page content saved."),g()})),document.querySelector("[data-open-gym-pricing-form]")?.addEventListener("submit",e=>{e.preventDefault(),Vl(e.currentTarget)}),document.querySelector("[data-open-gym-slot-form]")?.addEventListener("submit",e=>{e.preventDefault(),Hl(e.currentTarget)}),document.querySelectorAll("[data-cancel-open-gym-slot]").forEach(e=>e.addEventListener("click",()=>{confirm("Cancel this Open Gym time? The time will be removed from the public page.")&&Gl(e.dataset.cancelOpenGymSlot)})),document.querySelectorAll("[data-admin-collection]").forEach(e=>e.addEventListener("submit",t=>{t.preventDefault();const a=e.dataset.adminCollection,n=r[a].find(o=>o.id===e.dataset.id),i=$e(H(t.currentTarget));Object.assign(n,i),a==="bookingServices"&&(r.bookingServices=ln(r.bookingServices)),T(),M("Content saved. Public pages have been updated."),g()})),document.querySelector("[data-class-schedule-program]")?.addEventListener("change",e=>{const t=e.currentTarget.value,a=Ua(t,r.dropdownPages||[],r.programs||[]);sessionStorage.setItem("classScheduleProgram",t),sessionStorage.setItem("classScheduleType",a[0]?.id||""),sessionStorage.removeItem("classScheduleEditing"),g()}),document.querySelector("[data-class-schedule-type]")?.addEventListener("change",e=>{sessionStorage.setItem("classScheduleType",e.currentTarget.value),sessionStorage.removeItem("classScheduleEditing"),g()}),document.querySelector("[data-class-session-new]")?.addEventListener("click",()=>{sessionStorage.removeItem("classScheduleEditing"),g()}),document.querySelectorAll("[data-class-session-edit]").forEach(e=>e.addEventListener("click",()=>{sessionStorage.setItem("classScheduleEditing",e.dataset.classSessionEdit),g()})),document.querySelector("[data-class-session-form]")?.addEventListener("submit",e=>{e.preventDefault(),ql(e.currentTarget)}),document.querySelector("[data-delete-class-session]")?.addEventListener("click",e=>{confirm("Deleting is permanent. You can usually hide a class by setting Show on Site to No. Delete anyway?")&&xl(e.currentTarget.dataset.deleteClassSession)}),document.querySelector("[data-private-pricing-form]")?.addEventListener("submit",e=>{e.preventDefault(),We(e.currentTarget)}),document.querySelector("[data-add-private-pricing-row]")?.addEventListener("click",e=>{Bl(e.currentTarget.closest("form"))}),document.querySelector("[data-add-private-pricing-column]")?.addEventListener("click",e=>{Rl(e.currentTarget.closest("form"))}),document.querySelectorAll("[data-delete-private-pricing-row]").forEach(e=>e.addEventListener("click",()=>{Dl(e.closest("form"),e.dataset.deletePrivatePricingRow)})),document.querySelectorAll("[data-delete-private-pricing-column]").forEach(e=>e.addEventListener("click",()=>{Fl(e.closest("form"),e.dataset.deletePrivatePricingColumn)})),document.querySelector("[data-new-membership-plan]")?.addEventListener("click",zl),document.querySelectorAll("[data-admin-membership-plan]").forEach(e=>e.addEventListener("submit",t=>{t.preventDefault(),Nl(t.currentTarget)})),document.querySelectorAll("[data-delete-membership-plan]").forEach(e=>e.addEventListener("click",()=>{confirm("Deleting is permanent. You can usually hide a membership by setting Show on Site to No. Delete anyway?")&&Ll(e.dataset.deleteMembershipPlan)})),document.querySelector("[data-admin-social]")?.addEventListener("submit",e=>{e.preventDefault(),r.social=H(e.currentTarget),T(),M("Social links saved."),g()}),document.querySelector("[data-admin-email]")?.addEventListener("submit",e=>{e.preventDefault(),r.emailTemplates=$e(H(e.currentTarget)),T(),M("Email template saved."),g()}),document.querySelector("[data-admin-booking]")?.addEventListener("submit",e=>{e.preventDefault(),Il(e.currentTarget)}),document.querySelectorAll("[data-admin-schedule-service]").forEach(e=>e.addEventListener("click",()=>{Ze({serviceId:e.dataset.adminScheduleService,quantity:1,machinePosition:"",startTime:""}),g()})),document.querySelectorAll("[data-admin-schedule-draft]").forEach(e=>{const t=()=>{const a=e.dataset.adminScheduleDraft,n={[a]:e.value};a==="serviceId"&&(n.machinePosition="",n.startTime="",n.quantity=1),Ze(n),["phone","email","pricingMode"].includes(a)&&Pl(e.closest("form")),["serviceId","date","duration","quantity","machinePosition","startTime"].includes(a)&&g()};e.addEventListener("input",t),e.addEventListener("change",t)}),document.querySelectorAll("[data-admin-schedule-time]").forEach(e=>e.addEventListener("click",()=>{Ze({startTime:e.dataset.adminScheduleTime}),g()})),document.querySelector("[data-admin-booking-service]")?.addEventListener("change",e=>{wl(e.currentTarget)}),document.querySelector("[data-video-review-login]")?.addEventListener("submit",e=>{e.preventDefault(),bl(e.currentTarget)}),document.querySelector("[data-action='video-review-logout']")?.addEventListener("click",()=>{fi(),E={loading:!1,loaded:!1,error:"",submissions:[]},g()}),document.querySelector("[data-action='refresh-video-reviews']")?.addEventListener("click",()=>{zt()}),document.querySelectorAll("[data-video-review-status]").forEach(e=>e.addEventListener("change",()=>{const t=e.dataset.videoReviewStatus,a=E.submissions.find(n=>n.id===t);a&&(a.status=e.value)})),document.querySelectorAll("[data-video-review-save]").forEach(e=>e.addEventListener("click",()=>{const t=e.dataset.videoReviewSave,a=document.querySelector(`[data-video-review-status='${CSS.escape(t)}']`)?.value||"submitted",n=document.querySelector(`[data-video-review-notes='${CSS.escape(t)}']`)?.value||"";hl(t,{status:a,coach_notes:n})})),I==="admin"&&ia()==="videoReviews"&&Be()&&Dt()&&!E.loaded&&!E.loading&&zt(),document.querySelector("[data-consume-credit]")?.addEventListener("submit",e=>{e.preventDefault(),Ml(e.currentTarget)}),document.querySelector("[data-admin-student-filters]")?.addEventListener("submit",e=>{e.preventDefault(),sessionStorage.setItem("adminStudentFilters",JSON.stringify(H(e.currentTarget))),g()}),document.querySelector("[data-action='clear-student-filters']")?.addEventListener("click",()=>{sessionStorage.removeItem("adminStudentFilters"),g()}),document.querySelectorAll("[data-admin-student-notes]").forEach(e=>e.addEventListener("submit",t=>{t.preventDefault(),ol(t.currentTarget)})),document.querySelectorAll("[data-adjust-credit]").forEach(e=>e.addEventListener("submit",t=>{t.preventDefault(),sl(t.currentTarget)})),document.querySelectorAll("[data-cancel-enrollment]").forEach(e=>e.addEventListener("click",()=>{ll(e.dataset.cancelEnrollment)})),document.querySelectorAll("[data-cancel-booking]").forEach(e=>e.addEventListener("click",()=>{confirm("Cancel this booking? The schedule will immediately reopen available times.")&&Al(e.dataset.cancelBooking)})),document.querySelectorAll("[data-confirm-payment]").forEach(e=>e.addEventListener("click",()=>{Tl(e.dataset.confirmPayment)})),document.querySelectorAll("[data-add-row]").forEach(e=>e.addEventListener("click",()=>{const t=e.dataset.addRow;r[t].unshift(ni(t,{existingItems:r[t],programs:r.programs,defaultImage:_})),T(),M("New item added. Fill it in and click Save."),g()})),document.querySelectorAll("[data-copy-row]").forEach(e=>e.addEventListener("click",()=>{const[t,a]=e.dataset.copyRow.split(":"),n=r[t].find(i=>i.id===a);n&&(r[t].unshift(ii(t,n,{existingItems:r[t]})),T(),M("Item copied. Edit it and click Save."),g())})),document.querySelectorAll("[data-delete-row]").forEach(e=>e.addEventListener("click",()=>{const[t,a]=e.dataset.deleteRow.split(":");confirm("Deleting is permanent. You can usually hide content by setting Show on Site to No. Delete anyway?")&&(r[t]=r[t].filter(n=>n.id!==a),T(),M("Content deleted."),g())})),document.querySelectorAll("[data-image-upload]").forEach(e=>e.addEventListener("change",()=>{fl(e)})),document.querySelector("[data-action='export-bookings']")?.addEventListener("click",Ql),document.querySelector("[data-action='export-students']")?.addEventListener("click",Wl),document.querySelector("[data-action='export-orders']")?.addEventListener("click",Jl),document.querySelector("[data-action='export-credits']")?.addEventListener("click",Kl),document.querySelector("[data-action='export-waivers']")?.addEventListener("click",Yl)}async function gl(e){const t=H(e),a=e.querySelector("input[type='file']")?.files?.[0],n=Ga(t,a);if(!n.ok){alert(pi(n.errors,r.language).join(`
`));return}sessionStorage.setItem("filmReviewUploadNotice",r.language==="zh"?"视频正在上传，请不要关闭页面。":"Uploading video. Please keep this page open."),sessionStorage.setItem("filmReviewUploadProgress","5"),g();try{if(!Be())throw new Error(r.language==="zh"?"视频上传暂未启用，请联系 First Light。":"Video uploads are not enabled yet. Please contact First Light.");await bi({fields:t,file:a,onProgress:i=>{sessionStorage.setItem("filmReviewUploadProgress",String(i))}}),sessionStorage.setItem("filmReviewUploadNotice",r.language==="zh"?"教练已收到你的视频，会用于一对一训练评估。":"Your video has been received. A coach will use it for one-on-one training review."),sessionStorage.removeItem("filmReviewUploadProgress")}catch(i){sessionStorage.setItem("filmReviewUploadNotice",i.message||(r.language==="zh"?"视频上传失败，请稍后再试。":"Video upload failed. Please try again.")),sessionStorage.removeItem("filmReviewUploadProgress")}g()}async function bl(e){const t=H(e);try{await hi(t.email,t.password),M("Video review staff login confirmed."),E={loading:!1,loaded:!1,error:"",submissions:[]},g()}catch(a){alert(a.message||"Staff login failed.")}}async function zt(){if(!Be()){E={loading:!1,loaded:!0,submissions:[],error:"Supabase video reviews are not configured."},g();return}E={...E,loading:!0,error:""},g();try{E={loading:!1,loaded:!0,error:"",submissions:(await vi()).submissions||[]}}catch(e){E={...E,loading:!1,loaded:!0,error:e.message||"Could not load video reviews."}}g()}async function hl(e,t){try{await yi(e,t),M("Video review saved."),E.loaded=!1,await zt()}catch(a){alert(a.message||"Could not save video review.")}}async function fl(e){const t=e.files?.[0];if(!t)return;const a=e.dataset.imageTarget,n=e.closest("form"),i=n?.querySelector(`[data-image-value='${CSS.escape(a)}']`)||n?.querySelector(`input[name='${CSS.escape(a)}']`);if(i)try{vl(t),Na(e,"Processing image...");const o=await yl(t);i.value=o,kl(e,o),Na(e,"Image selected. Click Save to publish this update.")}catch(o){e.value="",_l(e,o?.message||"Could not upload this image.")}}function vl(e){if(!e.type?.startsWith("image/"))throw new Error("Please choose a local image file.");if(e.size>sr)throw new Error("This image is too large. Please choose an image under 12MB.")}async function yl(e){const t=await Xl(e),a=await $l(t);if((e.type==="image/png"||e.type==="image/gif"||e.type==="image/webp")&&t.length<=It||t.length<=It&&Math.max(a.naturalWidth||a.width,a.naturalHeight||a.height)<=tn)return t;if(!document.createElement("canvas").getContext)throw new Error("This browser cannot resize images. Please choose a smaller image.");return Sl(a)}function $l(e){return new Promise((t,a)=>{const n=new Image;n.onload=()=>t(n),n.onerror=()=>a(new Error("This image could not be read. Please choose another local image.")),n.src=e})}function Sl(e){const t=document.createElement("canvas"),a=t.getContext("2d");if(!a)throw new Error("This browser cannot resize images. Please choose a smaller image.");const n=e.naturalWidth||e.width||1,i=e.naturalHeight||e.height||1;let o=Math.min(1,tn/Math.max(n,i)),l=.82;for(let c=0;c<8;c+=1){t.width=Math.max(1,Math.round(n*o)),t.height=Math.max(1,Math.round(i*o)),a.clearRect(0,0,t.width,t.height),a.drawImage(e,0,0,t.width,t.height);const d=t.toDataURL("image/jpeg",l);if(d.length<=It)return d;l>.5?l-=.12:o*=.82}throw new Error("This image is still too large after compression. Please choose a smaller image.")}function kl(e,t){const a=e.dataset.imageTarget,n=e.closest(".adminImageField")?.querySelector(`[data-image-preview='${CSS.escape(a)}']`);n&&(n.innerHTML=`<img class="adminImagePreview" src="${b(t)}" alt="Uploaded image preview" />`)}function Na(e,t){const a=e.dataset.imageTarget,n=e.closest(".adminImageField")?.querySelector(`[data-image-status='${CSS.escape(a)}']`);n&&(n.textContent=t,n.classList.remove("error"))}function _l(e,t){const a=e.dataset.imageTarget,n=e.closest(".adminImageField")?.querySelector(`[data-image-status='${CSS.escape(a)}']`);n&&(n.textContent=t,n.classList.add("error"))}function H(e){const t=new FormData(e),a={};for(const n of new Set(t.keys())){const i=t.getAll(n);a[n]=i.length>1?i:i[0]}return a}function wl(e){const t=e.closest("form")?.querySelector("[data-admin-booking-duration]"),a=N(e.value);!t||!a||(t.innerHTML=je(a,at(a)[0]))}function Pl(e){const t=e?.querySelector("[data-admin-pricing-preview]");if(!t)return;const a=Object.fromEntries(new FormData(e).entries()),n=N(a.serviceId);if(!n)return;const i={...Ge(),...a,duration:ae(n,a.duration),quantity:Number(a.quantity||1)};t.outerHTML=fn(i,n)}function Il(e){const t=Object.fromEntries(new FormData(e).entries()),a=N(t.serviceId),n=ae(a,t.duration),i=a?.mode==="machine"?t.machinePosition:"";if(!a||!t.startTime)return;if(a?.mode==="machine"&&!i){alert("Select Machine 1, Machine 2, or Machine 3 before creating a shooting machine booking.");return}const o={date:t.date,startTime:t.startTime,endTime:ke(t.startTime,n),quantity:a?.mode==="machine"?1:Number(t.quantity||1),machinePosition:i},l=ne(a,o,r.bookings);if(!l.available){alert(ge(l.reason)||(r.language==="zh"?"该预约与现有预约冲突。":"This booking conflicts with an existing booking."));return}const c=Lt(a,o,r.bookings),d=Xa({records:j(),service:a,duration:n,quantity:o.quantity,pricingMode:t.pricingMode,email:t.email,phone:t.phone,now:new Date().toISOString()}),u=nt({id:`BK-${Date.now()}`,source:"admin",service:c,...o,customer:{name:t.name,phone:t.phone,email:t.email,notes:t.notes},paymentMethod:t.paymentMethod});Object.assign(u,{paymentStatus:"paid",lockStatus:"locked",paymentConfirmedAt:new Date().toISOString(),customerType:d.customerType,pricingSource:d.pricingSource,pricingMode:d.pricingMode,pricingWarning:d.warning,pricingMessage:d.message,membershipLevel:d.membershipLevel,membershipTitle:d.membershipTitle,studentId:d.matchedStudentId||"",matchedStudentId:d.matchedStudentId,matchedStudentName:d.matchedStudentName,matchedStudentEmail:d.matchedStudentEmail,matchedStudentPhone:d.matchedStudentPhone,hourlyRate:d.hourlyRate,total:d.total}),a.id==="main-half"&&(u.displayServiceId="main-half",u.displayTitle_en=R(a,"en"),u.displayTitle_zh=R(a,"zh")),r.bookings.unshift(u),Ze({startTime:"",name:"",phone:"",email:"",pricingMode:"auto",notes:""}),T(),M("Booking created. The public schedule has updated automatically."),g()}function Cl(e){const t=[];for(const a of e.items||[]){if(a.kind==="session"){const n=r.sessions.find(i=>i.id===a.id);if(!n||Ce(n)<Number(a.quantity||1))return{ok:!1,reason:`${a.title} no longer has enough spots.`}}if(a.kind==="court"){const n=r.courtSlots.find(i=>i.id===a.id);if(!n||n.booked)return{ok:!1,reason:`${a.title} is no longer available.`}}if(a.kind==="booking"){const n=N(a.serviceId),i={date:a.date,startTime:a.startTime,endTime:a.endTime,quantity:a.quantity,machinePosition:a.machinePosition},o=ne(n,i,[...r.bookings,...t]);if(!o.available)return{ok:!1,reason:`${re(a)} ${yn(a)} ${s("checkoutForm.noLongerAvailable")} ${ge(o.reason)||""}`};t.push(nt({id:`${e.id}-${t.length+1}`,source:"customer",service:n,...i,customer:e.customer,paymentMethod:e.paymentMethod,machinePosition:a.machinePosition,status:"confirmed",createdAt:new Date().toISOString()}))}}return{ok:!0,bookings:t}}function Tl(e){const t=r.bookings.find(o=>o.id===e);if(!t||t.status!=="pending_payment")return;const a=Cl(t);if(!a.ok){alert(`Cannot confirm payment: ${a.reason}`);return}const n=new Date().toISOString();t.status="confirmed",t.paymentStatus="paid",t.lockStatus="locked",t.paymentConfirmedAt=n,t.paymentMessage=r.language==="zh"?"工作人员已手动确认收款。":"Payment manually confirmed by staff.";for(const o of t.items||[])if(o.kind==="court"){const l=r.courtSlots.find(c=>c.id===o.id);l&&(l.booked=!0)}const i=Ja({records:{enrollments:r.enrollments||[],creditPackages:r.creditPackages||[],creditTransactions:r.creditTransactions||[]},order:t,now:n});r.enrollments=i.enrollments,r.creditPackages=i.creditPackages,r.creditTransactions=i.creditTransactions;for(const o of a.bookings||[])r.bookings.unshift({...o,orderId:t.id,studentId:t.studentId,studentName:t.studentName,paymentStatus:"paid",lockStatus:"locked",paymentConfirmedAt:n,language:t.language});T(),M("Payment confirmed. Spots and court time are locked."),g()}function Al(e){const t=r.bookings.find(a=>a.id===e);if(!(!t||t.status==="cancelled")){if(t.status="cancelled",t.cancelledAt=new Date().toISOString(),t.kind==="order"){for(const a of r.bookings.filter(n=>n.orderId===t.id))a.status="cancelled",a.cancelledAt=t.cancelledAt;for(const a of t.items||[])if(a.kind==="court"){const n=r.courtSlots.find(i=>i.id===a.id);n&&(n.booked=!1)}for(const a of r.enrollments||[])a.orderId===t.id&&(a.status="cancelled")}T(),M("Booking cancelled. Available times have reopened on the public schedule."),g()}}function Ml(e){const t=Object.fromEntries(new FormData(e).entries());try{const a=Ka({creditPackages:r.creditPackages||[],creditTransactions:r.creditTransactions||[],studentId:t.studentId,programId:t.programId,units:Number(t.units||1),reason:t.reason||"check-in",staffId:t.staffId,now:new Date().toISOString()});r.creditPackages=a.creditPackages,r.creditTransactions=a.creditTransactions,T(),M("Credit package usage saved and logged."),g()}catch(a){alert(a.message||"Credit check-in failed.")}}function zl(){const e=El();r.sessions.unshift({id:e,programId:"membership",type:"membership",membershipLevel:"regular",title_en:"New Membership",title_zh:"New Membership",desc_en:"Add membership details.",desc_zh:"Add membership details.",benefits_en:"Add membership benefits.",benefits_zh:"Add membership benefits.",dates:"Monthly",dateSummary_zh:"Monthly",time:"Member access",regularPrice:0,memberPrice:0,capacity:200,booked:0,waiver:!0,active:!0}),T(),M("New membership plan added. Fill it in and click Save."),g()}function Nl(e){const t=e?.dataset.adminMembershipPlan||"",a=r.sessions.find(o=>o.id===t);if(!a)return;const n=$e(H(e)),i=["regular","plus"].includes(n.membershipLevel)?n.membershipLevel:"regular";Object.assign(a,{...n,id:t,programId:"membership",type:"membership",membershipLevel:i,benefits_en:n.benefits_en||ye(i),benefits_zh:n.benefits_zh||n.benefits_en||ye(i),memberPrice:Number(n.regularPrice??0),dateSummary:n.dates||"",dateSummary_zh:n.dates||""}),T(),M("Membership plan saved. Public Membership page has been updated."),g()}function Ll(e){r.sessions=(r.sessions||[]).filter(t=>t.id!==e),r.dropdownPages=ja(r.dropdownPages||[],e),T(),M("Membership plan deleted."),g()}function El(){const e=new Set((r.sessions||[]).map(n=>n.id));let t=`membership-${Date.now()}`,a=1;for(;e.has(t);)t=`membership-${Date.now()}-${a}`,a+=1;return t}function Ve(e){const t=H(e),a=Ye(t.privatePricingColumnId),n=Ye(t.privatePricingColumnLabelEn),i=Ye(t.privatePricingRowId),o=Ye(t.privatePricingRowLabelEn),l=a.map((d,u)=>({id:d,label_en:n[u]||"",label_zh:"",order:u+1})),c=i.map((d,u)=>{const p={};for(const $ of a)p[$]=Number(t[`privatePricingPrice__${d}__${$}`]||0);return{id:d,label_en:o[u]||"",label_zh:"",prices:p,order:u+1}});return _e({privatePricingColumns:l,privatePricingRows:c})}function We(e,t=Ve(e),a="Private training pricing saved."){const n=e?.dataset.pageId||"";n&&(r.dropdownPages=ai(r.dropdownPages||[],n,t),T(),M(a),g())}function Bl(e){if(!e)return;const t=Ve(e),a=Fn("row",t.privatePricingRows.map(n=>n.id));t.privatePricingRows.push({id:a,label_en:"New item",label_zh:"",prices:Object.fromEntries(t.privatePricingColumns.map(n=>[n.id,0])),order:t.privatePricingRows.length+1}),We(e,t,"Private training pricing row added.")}function Rl(e){if(!e)return;const t=Ve(e),a=Fn("package",t.privatePricingColumns.map(n=>n.id));t.privatePricingColumns.push({id:a,label_en:"New package",label_zh:"",order:t.privatePricingColumns.length+1}),t.privatePricingRows=t.privatePricingRows.map(n=>({...n,prices:{...n.prices,[a]:0}})),We(e,t,"Private training pricing column added.")}function Dl(e,t){if(!e||!t)return;const a=Ve(e);if(a.privatePricingRows.length<=1){M("Keep at least one pricing row."),g();return}a.privatePricingRows=a.privatePricingRows.filter(n=>n.id!==t),We(e,a,"Private training pricing row deleted.")}function Fl(e,t){if(!e||!t)return;const a=Ve(e);if(a.privatePricingColumns.length<=1){M("Keep at least one pricing column."),g();return}a.privatePricingColumns=a.privatePricingColumns.filter(n=>n.id!==t),a.privatePricingRows=a.privatePricingRows.map(n=>{const i={...n.prices};return delete i[t],{...n,prices:i}}),We(e,a,"Private training pricing column deleted.")}function Fn(e,t=[]){const a=new Set(t);let n=`${e}-${Date.now()}`,i=1;for(;a.has(n);)n=`${e}-${Date.now()}-${i}`,i+=1;return n}function Ye(e){return e===void 0?[]:Array.isArray(e)?e:[e]}function ql(e){const t=H(e),a=t.id,n=t.previousClassType||"";delete t.previousClassType;const i=$e(t),o=i.type||"";if(a==="__new"){const l={...i,id:`session-${Date.now()}`};r.sessions.unshift(l),r.dropdownPages=Ha(r.dropdownPages||[],l.id,o),sessionStorage.setItem("classScheduleEditing",l.id)}else{const l=r.sessions.find(c=>c.id===a);if(!l)return;Object.assign(l,i,{id:a}),r.dropdownPages=ti(r.dropdownPages||[],a,n,o),sessionStorage.setItem("classScheduleEditing",a)}T(),M("Class saved and linked to the selected class type."),g()}function xl(e){e&&(r.sessions=(r.sessions||[]).filter(t=>t.id!==e),r.dropdownPages=ja(r.dropdownPages||[],e),sessionStorage.removeItem("classScheduleEditing"),T(),M("Class deleted and removed from linked class types."),g())}function Ol(e={}){if(!e.date||!e.endTime)return null;const[t="0",a="0"]=String(e.endTime).split(":"),[n,i,o]=String(e.date).split("-").map(Number),l=new Date(n,Number(i||1)-1,Number(o||1),Number(t||0),Number(a||0),0,0);return Number.isNaN(l.getTime())?null:l}function qn(e={},t=new Date){const a=Ol(e);return!!(a&&a.getTime()<t.getTime())}function Ul(e=new Date){const t=(r.openCourtSlots||[]).length;r.openCourtSlots=(r.openCourtSlots||[]).filter(a=>!qn(a,e)),r.openCourtSlots.length!==t&&T()}function Hl(e){const t=$e(H(e));r.openCourtSlots=r.openCourtSlots||[],r.openCourtSlots.unshift({id:jl(),title_en:t.title_en||"Basketball Drop-In",title_zh:t.title_zh||t.title_en||"Basketball Drop-In",date:t.date||me(new Date),startTime:t.startTime||"08:00",endTime:t.endTime||"10:00",spots:Number(t.spots||0),notes_en:t.notes_en||"",notes_zh:t.notes_zh||t.notes_en||"",active:!0}),T(),M("Open Gym time saved. Add the next time with the same form."),g()}function jl(){const e=new Set((r.openCourtSlots||[]).map(n=>n.id));let t=`open-gym-${Date.now()}`,a=1;for(;e.has(t);)t=`open-gym-${Date.now()}-${a}`,a+=1;return t}function Gl(e){if(!e)return;r.openCourtSlots=(r.openCourtSlots||[]).filter(a=>a.id!==e);const t=new Date().toISOString();for(const a of r.bookings||[])a.openGymSlotId===e&&a.status!=="cancelled"&&(a.status="cancelled",a.cancelledAt=t);T(),M("Open Gym time cancelled and removed from the public page."),g()}function Vl(e){const t=new FormData(e),a=En();a.openGymPricingTiers=nn.map(n=>{const i=String(t.get(`openGymTierLabel__${n.id}`)||n.label_en).trim();return{id:n.id,label_en:i||n.label_en,label_zh:i||n.label_zh,price:Number(t.get(`openGymTierPrice__${n.id}`)||0)}}),T(),M("Open Gym pricing saved. Public Open Gym prices and checkout totals have been updated."),g()}function $e(e){return ri(e)}function Wl(){Je("firstlight-students.csv",Ei(r.students||[]))}function Jl(){const e=(r.bookings||[]).filter(t=>t.kind==="order");Je("firstlight-orders.csv",Bi(e))}function Kl(){Je("firstlight-credit-balances.csv",Di(r.creditPackages||[]))}function Yl(){Je("firstlight-waivers.csv",Ri(r.waiverSignatures||[]))}function Ql(){const e=[["id","kind","status","paymentStatus","lockStatus","source","service","date","startTime","endTime","quantity","name","email","phone","items","customerType","pricingSource","membershipLevel","matchedStudentId","matchedStudentName","hourlyRate","total","language","paymentMethod","paymentReference","paymentConfirmedAt","createdAt","cancelledAt"]];for(const t of r.bookings){const a=N(t.serviceId);e.push([t.id,t.kind||"",t.status||"confirmed",t.paymentStatus||"",t.lockStatus||(ue(t)?"locked":"not_locked"),t.source||"",R(a,"en")||t.serviceLabel_en||"",t.date||"",t.startTime||"",t.endTime||"",t.quantity||"",t.customer?.name||"",t.customer?.email||"",t.customer?.phone||"",(t.items||[]).map(n=>n.title).join("; "),t.customerType||"",t.pricingSource||"",t.membershipLevel||"",t.matchedStudentId||t.studentId||"",t.matchedStudentName||"",t.hourlyRate||"",t.total||"",t.language||"",t.paymentMethod||"",t.paymentReference||"",t.paymentConfirmedAt||"",t.createdAt||"",t.cancelledAt||""])}Je("firstlight-bookings.csv",e.map(t=>t.map(a=>`"${String(a||"").replaceAll('"','""')}"`).join(",")).join(`
`))}function Je(e,t){const a=new Blob([t],{type:"text/csv"}),n=document.createElement("a");n.href=URL.createObjectURL(a),n.download=e,n.click()}function Xl(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result),n.onerror=a,n.readAsDataURL(e)})}g();
