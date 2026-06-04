(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function a(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=a(i);fetch(i.href,o)}})();const pa="06:00",ga="24:00",un=30,pt=60,ne=120,mn=60,pn=new Set(["paid","confirmed"]),Ve=[{id:"main-full",label_en:"Main Court Full",label_zh:"主场全场",group:"main",sport:"basketball-volleyball",mode:"full",resources:["main-left","main-right"],price:175,nonMemberPrice:175,memberPrice:175,useLabel_en:"Basketball and Volleyball",capacity:20,minDurationMinutes:ne,imageKey:"full"},{id:"main-half",label_en:"Main Half Court",label_zh:"主场半场",group:"main",sport:"basketball",mode:"main-half",resources:["main-left","main-right"],price:120,nonMemberPrice:120,memberPrice:105,useLabel_en:"Main court",capacity:12,minDurationMinutes:ne,imageKey:"half"},{id:"main-half-a",label_en:"Main Court Half A",label_zh:"主场半场 A",group:"main",sport:"basketball",mode:"half",resources:["main-left"],price:120,nonMemberPrice:120,memberPrice:105,useLabel_en:"Main court",capacity:12,minDurationMinutes:ne,imageKey:"half"},{id:"main-half-b",label_en:"Main Court Half B",label_zh:"主场半场 B",group:"main",sport:"basketball",mode:"half",resources:["main-right"],price:120,nonMemberPrice:120,memberPrice:105,useLabel_en:"Main court",capacity:12,minDurationMinutes:ne,imageKey:"half"},{id:"volleyball-training",label_en:"Volleyball Training / Rental",label_zh:"排球训练 / 租场",group:"main",sport:"volleyball",mode:"full",resources:["main-left","main-right"],price:175,nonMemberPrice:175,memberPrice:175,capacity:20,minDurationMinutes:ne,imageKey:"full",public:!1,active:!1},{id:"basketball-training",label_en:"Basketball Training",label_zh:"篮球训练",group:"main",sport:"basketball",mode:"half",resources:["main-left"],price:120,nonMemberPrice:120,memberPrice:105,capacity:12,public:!1,imageKey:"half"},{id:"small-full",label_en:"Small Court Full",label_zh:"小场全场",group:"small",sport:"basketball",mode:"small-full",resources:["small-half-a","small-half-b"],price:120,nonMemberPrice:120,memberPrice:120,capacity:10,minDurationMinutes:ne,imageKey:"full"},{id:"small-half-a",label_en:"Small Court Half A",label_zh:"小场半场 A",group:"small",sport:"basketball",mode:"small-half",smallHalf:"a",resources:["small-half-a"],price:65,nonMemberPrice:65,memberPrice:65,capacity:5,minDurationMinutes:ne,imageKey:"half"},{id:"small-half-b",label_en:"Small Court Half B",label_zh:"小场半场 B",group:"small",sport:"basketball",mode:"small-half",smallHalf:"b",resources:["small-half-b"],price:65,nonMemberPrice:65,memberPrice:65,capacity:5,minDurationMinutes:ne,imageKey:"half"},{id:"shooting-machine",label_en:"Shooting Machine",label_zh:"投篮机",group:"small",sport:"basketball",mode:"machine",resources:["shooting-machine"],price:120,nonMemberPrice:120,memberPrice:105,useLabel_en:"Shooting machine",capacity:3,minDurationMinutes:mn,imageKey:"machine"}];function Y(e,t=Ve){return t.find(a=>a.id===e&&a.public!==!1)}function D(e,t="en"){return e?e[`label_${t}`]||e.label_en||e.id:""}function ba(e){return e?Number(e.minDurationMinutes||pt):pt}function Ge(e){const t=ba(e);return[t,t+60,t+120]}function Z(e,t){const a=Ge(e),n=Number(t||a[0]);return a.includes(n)?n:a[0]}function G(e){const[t,a="0"]=String(e).split(":"),n=Number(t),i=Number(a);return!Number.isFinite(n)||!Number.isFinite(i)?NaN:n*60+i}function ha(e){const t=Math.floor(e/60),a=e%60;return`${String(t).padStart(2,"0")}:${String(a).padStart(2,"0")}`}function fe(e,t){return ha(G(e)+Number(t||0))}function kt(e,t=pa,a=ga){const n=G(t),o=G(a)-Number(e||pt),l=[];for(let c=n;c<=o;c+=un)l.push(ha(c));return l}function gn(e,t){return e.date!==t.date?!1:G(e.startTime)<G(t.endTime)&&G(t.startTime)<G(e.endTime)}function fa(e,t){return(e||[]).filter(a=>bn(a)&&gn(a,t))}function bn(e={}){const t=e.status||"confirmed";return pn.has(t)}function va(e){return e.service||Y(e.serviceId)||e}function hn(e,t){const a={smallFull:0,smallHalves:new Set,machineCount:0,machinePositions:new Set};for(const n of fa(e,t)){const i=va(n);i.group==="small"&&(i.mode==="small-full"&&(a.smallFull+=1),i.mode==="small-half"&&a.smallHalves.add(i.smallHalf||i.resources?.[0]),i.mode==="machine"&&(n.machinePosition?a.machinePositions.add(n.machinePosition):a.machineCount+=Number(n.quantity||1)))}return a}function fn(e,t,a){const n=hn(a,t);if(n.smallFull>0)return{available:!1,remaining:0,reason:"Small court full is already booked."};const i=n.smallHalves.size,o=n.machineCount+n.machinePositions.size,l=i+o,c=i>=2?0:Math.max(0,3-l);if(e.mode==="small-full"){const d=i===0&&o===0;return{available:d,remaining:d?1:0,reason:d?"":"Small court has an overlapping half-court or machine booking."}}if(e.mode==="small-half"){if(n.smallHalves.has(e.smallHalf))return{available:!1,remaining:0,reason:"This small half court is already booked."};const d=l<3;return{available:d,remaining:d?1:0,reason:d?"":"Small court machine/half capacity is full."}}if(e.mode==="machine"){if(t.machinePosition&&n.machinePositions.has(t.machinePosition))return{available:!1,remaining:c,reason:"This shooting machine is already booked."};const d=Number(t.quantity||1),u=c>=d;return{available:u,remaining:c,reason:u?"":"No shooting machine positions remain."}}return{available:!0,remaining:1,reason:""}}function ya(){return[Y("main-half-a"),Y("main-half-b")].filter(Boolean)}function vn(e,t){const a=ya().filter(n=>$a(n,e,t).available);return{available:a.length>0,remaining:a.length,reason:a.length?"":"Both main half courts are already booked."}}function $a(e,t,a){for(const n of fa(a,t)){const o=va(n).resources||[];if((e.resources||[]).some(l=>o.includes(l)))return{available:!1,remaining:0,reason:"Another booking already uses this court resource."}}return{available:!0,remaining:1,reason:""}}function ee(e,t,a=[]){if(!e)return{available:!1,remaining:0,reason:"Service does not exist."};if(!t?.date||!t?.startTime||!t?.endTime)return{available:!1,remaining:0,reason:"Date and time are required."};const n=G(t.startTime),i=G(t.endTime);if(!Number.isFinite(n)||!Number.isFinite(i)||i<=n)return{available:!1,remaining:0,reason:"End time must be after start time."};const o=ba(e);return i-n<o?{available:!1,remaining:0,reason:`Minimum booking is ${o/60} hour${o===60?"":"s"}.`}:n<G(pa)||i>G(ga)?{available:!1,remaining:0,reason:"Selected time is outside booking hours."}:e.mode==="main-half"?vn(t,a):e.group==="small"?fn(e,t,a):$a(e,t,a)}function wt(e,t,a=[]){return e?.mode!=="main-half"?e:ya().find(n=>ee(n,t,a).available)||e}function We({id:e,source:t,service:a,serviceId:n,date:i,startTime:o,endTime:l,quantity:c=1,machinePosition:d="",customer:u={},paymentMethod:m="Credit Card",status:y="confirmed",createdAt:v}){const _=a||Y(n);return{id:e||`BK-${Date.now()}`,kind:"resource",status:y,source:t||"customer",serviceId:_?.id||n,serviceLabel_en:_?.label_en||"",serviceLabel_zh:_?.label_zh||"",date:i,startTime:o,endTime:l,quantity:Number(c||1),machinePosition:d,resources:_?.resources||[],customer:u,paymentMethod:m,createdAt:v||new Date().toISOString(),cancelledAt:""}}const yn=new Set(["regularPrice","memberPrice","nonMemberPrice","capacity","booked","price","stock","discount","order","spots","minDurationMinutes"]),$n=new Set(["active","featured","waiver","public"]),Sn={title_en:"title_zh",subtitle_en:"subtitle_zh",detail_en:"detail_zh",audience_en:"audience_zh",statusTitle_en:"statusTitle_zh",statusBody_en:"statusBody_zh",statusButton_en:"statusButton_zh",heroTitle_en:"heroTitle_zh",eyebrow_en:"eyebrow_zh",scheduleTitle_en:"scheduleTitle_zh",scheduleBody_en:"scheduleBody_zh",liveNote_en:"liveNote_zh",footer_en:"footer_zh",role_en:"role_zh",bio_en:"bio_zh",desc_en:"desc_zh",summary_en:"summary_zh",dateLabel_en:"dateLabel_zh",button_en:"button_zh",notes_en:"notes_zh",body_en:"body_zh",kicker_en:"kicker_zh",line1_en:"line1_zh",line2_en:"line2_zh",label_en:"label_zh",useLabel_en:"useLabel_zh",productIntro_en:"productIntro_zh",en:"zh"},kn=[["openCourtSlots","Open Court"],["globalImages","Images"],["dropdownPages","Dropdown Pages"],["pages","Pages"],["programs","Programs"],["coaches","Coaches"],["sessions","Class Schedule"],["bookingServices","Booking Services"],["activities","Activities"],["products","Products"],["social","Social"],["bookings","Bookings"],["emails","Emails"]],jt={programs:{title:"Programs",description:"Home page Training Programs blocks and detail pages. Visible and featured programs automatically appear as clickable home page cards.",addLabel:"Add Home Program Block",copyLabel:"Copy Program",collectionKey:"programs",imageFields:["image"],fields:[{name:"title_en",label:"Title",required:!0},{name:"type",label:"Program Type"},{name:"subtitle_en",label:"Short Description",type:"textarea"},{name:"detail_en",label:"Program Details",type:"textarea"},{name:"audience_en",label:"Best For",type:"textarea"},{name:"statusTitle_en",label:"Status Title"},{name:"statusBody_en",label:"Status Body",type:"textarea"},{name:"statusButton_en",label:"Status Button Text"},{name:"statusRoute",label:"Status Button Route"},{name:"image",label:"Main Image",type:"image",usage:"Home program card and program detail hero."},{name:"order",label:"Display Order",type:"number"},{name:"active",label:"Show on Site",type:"boolean"},{name:"featured",label:"Show on Home Page",type:"boolean"}]},coaches:{title:"Coaches",description:"Coach cards automatically expand on the home page and coaches page.",addLabel:"Add Coach",copyLabel:"Copy Coach",collectionKey:"coaches",imageFields:["portrait","image"],fields:[{name:"name",label:"Coach Name",required:!0},{name:"role_en",label:"Role",type:"textarea"},{name:"bio_en",label:"Coach Bio",type:"textarea"},{name:"programs",label:"Linked Programs",help:"Use commas for multiple programs, for example: basketball, volleyball"},{name:"portrait",label:"Portrait Photo",type:"image",usage:"Coach card and coach detail portrait."},{name:"image",label:"Backup Image",type:"image",usage:"Fallback coach image if portrait is empty."},{name:"order",label:"Display Order",type:"number"},{name:"active",label:"Show on Site",type:"boolean"},{name:"featured",label:"Show on Home Page",type:"boolean"}]},sessions:{title:"Class Schedule",description:"Classes automatically appear on their program page and the public schedule page.",addLabel:"Add Class",copyLabel:"Copy Class",collectionKey:"sessions",fields:[{name:"programId",label:"Program",type:"programSelect",required:!0},{name:"type",label:"Class Type"},{name:"title_en",label:"Class Title",required:!0},{name:"desc_en",label:"Class Description",type:"textarea"},{name:"dates",label:"Date Description"},{name:"datesList",label:"Date List",type:"list",help:"Enter one date per line, or separate dates with commas."},{name:"dateSummary",label:"Date Summary"},{name:"time",label:"Class Time"},{name:"regularPrice",label:"Regular Price",type:"number"},{name:"memberPrice",label:"Member Price",type:"number"},{name:"capacity",label:"Capacity",type:"number"},{name:"booked",label:"Booked Spots",type:"number"},{name:"waiver",label:"Waiver Required",type:"boolean"},{name:"active",label:"Show on Site",type:"boolean"}]},bookingServices:{title:"Booking Services",description:"Public court rental service labels, images, and member / non-member hourly prices. Resource rules stay locked in the booking engine.",addLabel:"Add Booking Service",copyLabel:"Copy Booking Service",collectionKey:"bookingServices",canAdd:!1,canCopy:!1,canDelete:!1,imageFields:["image"],fields:[{name:"label_en",label:"Service Label",required:!0},{name:"useLabel_en",label:"Service Subtitle"},{name:"nonMemberPrice",label:"Non-member Hourly Price",type:"number"},{name:"memberPrice",label:"Member Hourly Price",type:"number"},{name:"capacity",label:"Capacity",type:"number"},{name:"minDurationMinutes",label:"Minimum Duration Minutes",type:"number"},{name:"image",label:"Service Image",type:"image",usage:"Court rental service cards, booking selector, and admin schedule cards."},{name:"imageKey",label:"Display Image",type:"select",options:[["full","Full Court"],["half","Half Court"],["machine","Shooting Machine"]]},{name:"public",label:"Show to Customers",type:"boolean"},{name:"active",label:"Active",type:"boolean"}]},courtSlots:{title:"Court Slots",description:"Manual court slot cards appear on the court rental and schedule pages.",addLabel:"Add Court Slot",copyLabel:"Copy Court Slot",collectionKey:"courtSlots",imageFields:["image"],fields:[{name:"programId",label:"Program",type:"programSelect"},{name:"courtType",label:"Court Type"},{name:"date",label:"Date",type:"date"},{name:"time",label:"Time"},{name:"price",label:"Hourly Price",type:"number"},{name:"capacity",label:"Capacity",type:"number"},{name:"minimum",label:"Minimum Booking"},{name:"image",label:"Court Image",type:"image",usage:"Legacy court slot card image when manual court slots are displayed."},{name:"booked",label:"Booked",type:"boolean"},{name:"active",label:"Show on Site",type:"boolean"}]},openCourtSlots:{title:"Open Court",description:"Manage basketball drop-in availability. Active slots appear on the Open Court page.",addLabel:"Add Open Court Slot",copyLabel:"Copy Open Court Slot",collectionKey:"openCourtSlots",fields:[{name:"title_en",label:"Title",required:!0},{name:"date",label:"Date",type:"date",required:!0},{name:"startTime",label:"Start Time",type:"time",required:!0},{name:"endTime",label:"End Time",type:"time",required:!0},{name:"spots",label:"Drop-in Spots",type:"number"},{name:"notes_en",label:"Notes",type:"textarea"},{name:"active",label:"Show on Site",type:"boolean"}]},activities:{title:"Activities",description:"Activities automatically appear on the home page when visible and featured.",addLabel:"Add Activity",copyLabel:"Copy Activity",collectionKey:"activities",imageFields:["image"],fields:[{name:"title_en",label:"Activity Title",required:!0},{name:"summary_en",label:"Activity Summary",type:"textarea"},{name:"dateLabel_en",label:"Date Label"},{name:"button_en",label:"Button Text"},{name:"route",label:"Button Route"},{name:"image",label:"Activity Image",type:"image",usage:"Home activity update card."},{name:"order",label:"Display Order",type:"number"},{name:"active",label:"Show on Site",type:"boolean"},{name:"featured",label:"Show on Home Page",type:"boolean"}]},products:{title:"Products",description:"Product data is available for merchandise display and orders.",addLabel:"Add Product",copyLabel:"Copy Product",collectionKey:"products",imageFields:["image"],fields:[{name:"title_en",label:"Product Name",required:!0},{name:"price",label:"Price",type:"number"},{name:"stock",label:"Stock",type:"number"},{name:"sizes",label:"Sizes / Options"},{name:"image",label:"Product Image",type:"image",usage:"Merchandise product card."},{name:"order",label:"Display Order",type:"number"},{name:"active",label:"Show on Site",type:"boolean"}]},dropdownPages:{title:"Dropdown Pages",description:"Top navigation dropdown items. Visible items automatically appear in their menu and generate a detail page.",addLabel:"Add Dropdown Page",copyLabel:"Copy Dropdown Page",collectionKey:"dropdownPages",imageFields:["image"],fields:[{name:"parentMenu",label:"Parent Menu",type:"select",options:[["basketball","Basketball"],["volleyball","Volleyball"],["conditioning","Conditioning"],["court","Court Rental"],["membership","Membership"],["merchandise","Merchandise"]],required:!0},{name:"label_en",label:"Dropdown Label",required:!0},{name:"title_en",label:"Page Title",required:!0},{name:"subtitle_en",label:"Page Subtitle",type:"textarea"},{name:"body_en",label:"Page Introduction",type:"textarea"},{name:"productIntro_en",label:"Product Introduction",type:"textarea"},{name:"image",label:"Page Image",type:"image",usage:"Catalog tile and dropdown detail hero."},{name:"sessionIds",label:"Linked Products / Classes",type:"sessionMultiSelect",help:"Select products from Class Schedule. Advanced users can also enter class IDs manually."},{name:"order",label:"Display Order",type:"number"},{name:"active",label:"Show on Site",type:"boolean"}]},globalImages:{title:"Images",description:"Global public image assets. Upload replacements and adjust crop focus for logos, default court images, and About gallery photos.",addLabel:"Add Image",copyLabel:"Copy Image",collectionKey:"globalImages",canAdd:!1,canCopy:!1,canDelete:!1,imageFields:["image"],fields:[{name:"label_en",label:"Image Name",required:!0},{name:"usage_en",label:"Frontend Usage",type:"textarea"},{name:"image",label:"Image",type:"image",help:"Paste an image link or upload a local image. Use the focus controls to adjust public cropping."},{name:"active",label:"Show on Site",type:"boolean"}]}};function Sa(e=[]){return e.reduce((t,a)=>Math.max(t,Number(a.order||0)),0)+1}function _t(e){const t={...e};for(const[a,n]of Object.entries(Sn))Object.hasOwn(t,a)&&(t[n]=t[a]);return Object.hasOwn(t,"courtType")&&!Object.hasOwn(t,"title_en")&&(t.title_zh=t.courtType),t}function wn(e,t={}){const a=t.now||Date.now(),n=t.programs?.[0]?.id||"basketball",i=Sa(t.existingItems||t.programs||[]),o=t.defaultImage||"",l={programs:{id:`program-${a}`,type:"training",title_en:"New Program",subtitle_en:"Short program description",detail_en:"Add program details here.",audience_en:"Who this program is best for.",statusTitle_en:"",statusBody_en:"",statusButton_en:"",statusRoute:"",image:o,order:i,active:!0,featured:!0},coaches:{id:`coach-${a}`,name:"New Coach",role_en:"Coach Role",bio_en:"Add coach bio here.",image:o,portrait:o,programs:n,order:i,active:!0,featured:!0},sessions:{id:`session-${a}`,programId:n,type:"training",title_en:"New Class",desc_en:"Add class description here.",dates:"By appointment",datesList:[],dateSummary:"New schedule",time:"TBD",regularPrice:0,memberPrice:0,capacity:12,booked:0,waiver:!0,active:!0},courtSlots:{id:`court-${a}`,programId:"court-rental",courtType:"Full Size Court",date:"2026-06-01",time:"6:00 PM - 8:00 PM",price:0,capacity:12,booked:!1,minimum:"Minimum 1H",image:o,active:!0},openCourtSlots:{id:`open-court-${a}`,title_en:"Basketball Drop-In",date:"2026-05-30",startTime:"20:00",endTime:"22:00",spots:12,notes_en:"Drop-in basketball court time",active:!0},activities:{id:`activity-${a}`,title_en:"New Activity",summary_en:"Add activity details here.",dateLabel_en:"New date",button_en:"Learn More",route:"contact",image:o,order:i,active:!0,featured:!0},products:{id:`product-${a}`,title_en:"New Product",price:0,stock:0,sizes:"",image:o,order:i,active:!0},globalImages:{id:`global-image-${a}`,group:"custom",label_en:"New Global Image",usage_en:"Describe where this image appears on the public site.",image:o,imagePositionX:"center",imagePositionY:"center",order:i,active:!0},dropdownPages:{id:`dropdown-${a}`,parentMenu:"basketball",label_en:"New Dropdown Page",title_en:"New Dropdown Page",subtitle_en:"Short page subtitle",body_en:"Add page introduction here.",productIntro_en:"Add product or program details here.",image:o,sessionIds:[],order:i,active:!0}};return _t(l[e]||{id:`${e}-${a}`,active:!0})}function _n(e,t,a={}){const n=a.now||Date.now(),i=structuredClone(t);return i.id=`${e}-copy-${n}`,i.order=Sa(a.existingItems||[]),i.title_en&&(i.title_en=`${i.title_en} Copy`),i.name&&(i.name=`${i.name} Copy`),_t(i)}function Pn(e){const t={...e},a=Ht(t.sessionIdsManual);delete t.sessionIdsManual;for(const n of Object.keys(t)){if(n==="datesList"||n==="sessionIds"){t[n]=Ht(t[n]);continue}if($n.has(n)){t[n]=t[n]==="true";continue}if(n==="booked"&&(t[n]==="true"||t[n]==="false")){t[n]=t[n]==="true";continue}yn.has(n)&&(t[n]=Number(t[n]||0))}return a.length&&(t.sessionIds=[...new Set([...t.sessionIds||[],...a])]),_t(t)}function Ht(e){return(Array.isArray(e)?e:[e]).flatMap(t=>String(t||"").split(/[\n,]/)).map(t=>t.trim()).filter(Boolean)}const In="modulepreload",Tn=function(e){return"/first-light-client-preview/"+e},Vt={},Cn=function(t,a,n){let i=Promise.resolve();if(a&&a.length>0){let d=function(u){return Promise.all(u.map(m=>Promise.resolve(m).then(y=>({status:"fulfilled",value:y}),y=>({status:"rejected",reason:y}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");i=d(a.map(u=>{if(u=Tn(u),u in Vt)return;Vt[u]=!0;const m=u.endsWith(".css"),y=m?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${u}"]${y}`))return;const v=document.createElement("link");if(v.rel=m?"stylesheet":In,m||(v.as="script"),v.crossOrigin="",v.href=u,c&&v.setAttribute("nonce",c),document.head.appendChild(v),m)return new Promise((_,g)=>{v.addEventListener("load",_),v.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${u}`)))})}))}function o(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return i.then(l=>{for(const c of l||[])c.status==="rejected"&&o(c.reason);return t().catch(o)})},Gt={BASE_URL:"/first-light-client-preview/",DEV:!1,MODE:"production",PROD:!0,SSR:!1},An="film-to-floor-videos",Mn=["video/mp4","video/quicktime","video/webm"],zn=500*1024*1024,Pt="firstlight_film_review_staff_session",Nn="firstlight_film_review_local",je="submissions";function ve(){return typeof import.meta<"u"&&Gt?Gt:{}}function gt(e,t){return e?.[t]||""}function Ln(e,t){return`${String(e||"").replace(/\/+$/,"")}/functions/v1/${t}`}function Je(e=ve()){return{url:gt(e,"VITE_SUPABASE_URL"),anonKey:gt(e,"VITE_SUPABASE_ANON_KEY")}}function ye(e=ve()){const t=Je(e);return!!(t.url&&t.anonKey)}function It(e={},t,a={}){const n=Number(a.maxBytes||zn),i=[];return String(e.studentName||"").trim()||i.push("Student name is required."),String(e.phone||"").trim()||i.push("Phone is required."),String(e.email||"").trim()||i.push("Email is required."),String(e.experience||"").trim()||i.push("Playing experience is required."),String(e.goals||"").trim()||i.push("Training goal is required."),t?(Mn.includes(t.type)||i.push("Upload an MP4, MOV, or WEBM video."),Number(t.size||0)>n&&i.push(`Video must be ${Math.round(n/1024/1024)} MB or smaller.`)):i.push("Video file is required."),{ok:i.length===0,errors:i}}function Bn(e,t="en"){if(t!=="zh")return e;const a={"Student name is required.":"请输入学员姓名。","Phone is required.":"请输入电话。","Email is required.":"请输入邮箱。","Playing experience is required.":"请输入打球经验。","Training goal is required.":"请输入训练目标。","Video file is required.":"请上传视频文件。","Upload an MP4, MOV, or WEBM video.":"请上传 MP4、MOV 或 WEBM 视频。"};return e.map(n=>a[n]||n.replace("Video must be","视频大小不能超过").replace(/\s*or smaller\./,"。"))}function ka(e=globalThis.indexedDB){return!!e?.open}function Ke(e=globalThis.indexedDB){return ka(e)?new Promise((t,a)=>{const n=e.open(Nn,1);n.onupgradeneeded=()=>{const i=n.result;if(!i.objectStoreNames.contains(je)){const o=i.createObjectStore(je,{keyPath:"id"});o.createIndex("created_at","created_at"),o.createIndex("status","status")}},n.onsuccess=()=>t(n.result),n.onerror=()=>a(n.error||new Error("Could not open local video review storage."))}):Promise.reject(new Error("Local video review storage is not available in this browser."))}function Pe(e,t="readonly"){return e.transaction(je,t).objectStore(je)}function Ie(e){return new Promise((t,a)=>{e.onsuccess=()=>t(e.result),e.onerror=()=>a(e.error||new Error("Local video review storage failed."))})}function Ye(e){typeof e?.close=="function"&&e.close()}async function En({fields:e={},file:t,indexedDBImpl:a=globalThis.indexedDB}={}){const n=It(e,t);if(!n.ok)throw new Error(n.errors.join(" "));const i=await Ke(a),o=new Date().toISOString(),l={id:`LOCAL-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,source:"local",student_name:String(e.studentName||"").trim(),phone:String(e.phone||"").trim(),email:String(e.email||"").trim(),player_age:String(e.playerAge||"").trim(),experience:String(e.experience||"").trim(),goals:String(e.goals||"").trim(),notes:String(e.notes||"").trim(),original_file_name:t.name,file_size:t.size,file_type:t.type,videoBlob:t,status:"submitted",coach_notes:"",created_at:o,submitted_at:o,updated_at:o};try{return await Ie(Pe(i,"readwrite").add(l)),{submissionId:l.id,submission:l}}finally{Ye(i)}}async function Dn({indexedDBImpl:e=globalThis.indexedDB}={}){const t=await Ke(e);try{return{submissions:(await Ie(Pe(t).getAll())||[]).sort((i,o)=>String(o.created_at||"").localeCompare(String(i.created_at||""))).map(({videoBlob:i,...o})=>({...o,localVideo:!0,downloadUrl:""}))}}finally{Ye(t)}}async function Fn(e,t={},{indexedDBImpl:a=globalThis.indexedDB}={}){const n=await Ke(a);try{const i=await Ie(Pe(n).get(e));if(!i)throw new Error("Local video review not found.");const o={...i,status:t.status||i.status,coach_notes:t.coach_notes??t.coachNotes??i.coach_notes??"",updated_at:new Date().toISOString()};await Ie(Pe(n,"readwrite").put(o));const{videoBlob:l,...c}=o;return{submission:{...c,localVideo:!0,downloadUrl:""}}}finally{Ye(n)}}async function Rn(e,{indexedDBImpl:t=globalThis.indexedDB}={}){const a=await Ke(t);try{const n=await Ie(Pe(a).get(e));if(!n?.videoBlob)throw new Error("Local video file not found.");return{blob:n.videoBlob,fileName:n.original_file_name||"basketball-iq-video",fileType:n.file_type||n.videoBlob.type||"application/octet-stream"}}finally{Ye(a)}}async function qn(e=ve()){const{url:t,anonKey:a}=Je(e);if(!t||!a)throw new Error("Supabase video upload is not configured.");const{createClient:n}=await Cn(async()=>{const{createClient:i}=await import("./index-DdZWAXjq.js");return{createClient:i}},[]);return n(t,a)}async function xn({fields:e,file:t,env:a=ve(),onProgress:n}={}){const i=It(e,t,{maxBytes:Number(gt(a,"VITE_FILM_REVIEW_MAX_MB")||500)*1024*1024});if(!i.ok)throw new Error(i.errors.join(" "));const o=await qn(a);n?.(10);const{data:l,error:c}=await o.functions.invoke("create-film-review-upload",{body:{...e,fileName:t.name,fileSize:t.size,fileType:t.type}});if(c)throw new Error(c.message||"Could not prepare upload.");n?.(35);const{submissionId:d,path:u,token:m,bucket:y=An}=l||{};if(!d||!u||!m)throw new Error("Upload preparation response is incomplete.");const{error:v}=await o.storage.from(y).uploadToSignedUrl(u,m,t,{contentType:t.type});if(v)throw new Error(v.message||"Video upload failed.");n?.(85);const{data:_,error:g}=await o.functions.invoke("complete-film-review-upload",{body:{submissionId:d,path:u}});if(g)throw new Error(g.message||"Could not finish upload.");return n?.(100),_||{submissionId:d}}function Tt(){if(typeof localStorage>"u")return null;try{return JSON.parse(localStorage.getItem(Pt)||"null")}catch{return null}}function wa(e){try{const t=String(e||"").split(".")[1];if(!t)return{};const a=atob(t.replace(/-/g,"+").replace(/_/g,"/"));return JSON.parse(decodeURIComponent(escape(a)))}catch{return{}}}function Ct(){const e=Tt(),t=e?.role||wa(e?.accessToken).app_metadata?.role;return["staff","admin"].includes(t)}async function On(e,t,a=ve(),n=fetch){const{url:i,anonKey:o}=Je(a);if(!i||!o)throw new Error("Supabase staff login is not configured.");const l=await n(`${i.replace(/\/+$/,"")}/auth/v1/token?grant_type=password`,{method:"POST",headers:{apikey:o,"content-type":"application/json"},body:JSON.stringify({email:e,password:t})}),c=await l.json().catch(()=>({}));if(!l.ok)throw new Error(c.error_description||c.msg||"Staff login failed.");const d=wa(c.access_token),u=c.user?.app_metadata?.role||d.app_metadata?.role||"";if(!["staff","admin"].includes(u))throw new Error("This account is not authorized for video reviews.");const m={accessToken:c.access_token,email:c.user?.email||e,role:u};return localStorage.setItem(Pt,JSON.stringify(m)),m}function Un(){typeof localStorage<"u"&&localStorage.removeItem(Pt)}async function _a(e="",{method:t="GET",body:a,env:n=ve(),fetchImpl:i=fetch}={}){const{url:o,anonKey:l}=Je(n),c=Tt();if(!o||!l)throw new Error("Supabase video reviews are not configured.");if(!c?.accessToken)throw new Error("Please log in as staff.");const d=await i(`${Ln(o,"admin-film-review")}${e}`,{method:t,headers:{apikey:l,authorization:`Bearer ${c.accessToken}`,"content-type":"application/json"},body:a?JSON.stringify(a):void 0}),u=await d.json().catch(()=>({}));if(!d.ok)throw new Error(u.error||u.message||"Video review request failed.");return u}function jn(e={}){return _a("",e)}function Hn(e,t,a={}){return _a(`/${encodeURIComponent(e)}`,{...a,method:"PATCH",body:t})}const bt=19,K={id:"firstlight-waiver",version:"2026.06",title:"First Light Waiver and Release",title_zh:"First Light 免责协议与责任豁免",body:"I understand that basketball, volleyball, training, open gym, court rental, and related activities involve physical risk. I confirm the participant is medically able to participate and agree to the First Light waiver and release terms.",body_zh:"我理解篮球、排球、训练、开放球场、场地租赁及相关活动存在身体风险。我确认参与者身体状况适合参加活动，并同意 First Light 的免责协议与责任豁免条款。"},Vn=new Set(["paid","confirmed"]),Gn=["id","fullName","email","phone","birthDate","age","primarySport","experience","preferredClassTime","guardianName","guardianRelation","guardianEmail","guardianPhone","emergencyName","emergencyPhone","medicalNotes","photoConsent","marketingConsent","source","staffNotes","createdAt","updatedAt"],Wn=["id","status","studentId","studentName","email","phone","items","total","paymentMethod","paymentStatus","lockStatus","paymentReference","paymentConfirmedAt","waiverSignatureId","createdAt"],Jn=["id","studentId","orderId","templateId","templateVersion","participantType","templateAudience","signerName","signerRelation","signedAt","ipAddress","userAgent"];function Qe(e,t=new Date){const a=new Date(`${e}T12:00:00`),n=new Date(t);if(Number.isNaN(a.getTime())||Number.isNaN(n.getTime()))return null;let i=n.getUTCFullYear()-a.getUTCFullYear();const o=n.getUTCMonth()-a.getUTCMonth();return(o<0||o===0&&n.getUTCDate()<a.getUTCDate())&&(i-=1),i}function At(e,t={}){const a=Qe(e?.birthDate,t.asOf);return a===null?!1:a<bt}function Kn(e={},t={}){const a=[],n=$(t.participantType||e.participantType),i=Qe(e.birthDate,t.asOf),o=[["fullName","fullName is required"],["birthDate","birthDate is required"],["phone","phone is required"],["email","email is required"]];for(const[c,d]of o)String(e[c]||"").trim()||a.push(d);if(e.email&&!String(e.email).includes("@")&&a.push("email must be valid"),n==="adult"&&i!==null&&i<bt&&a.push("adult participant must be 19 or older"),n==="minor"&&i!==null&&i>=bt&&a.push("minor participant must be under 19"),n==="minor"||!n&&At(e,t)){const c=e.guardian||{};String(c.name||"").trim()||a.push("guardian.name is required for students under 19"),String(c.relation||"").trim()||a.push("guardian.relation is required for students under 19"),String(c.phone||"").trim()||a.push("guardian.phone is required for students under 19"),String(c.email||"").trim()||a.push("guardian.email is required for students under 19")}else String(e.signatureName||e.fullName||"").trim()||a.push("signatureName is required");return{valid:a.length===0,errors:a}}function Yn(e={},t={}){const a=t.now||new Date().toISOString(),n=e.guardian||{},i=e.emergency||{};return{id:e.id||Q("student",e.email||e.fullName||a),fullName:$(e.fullName),birthDate:$(e.birthDate),age:Qe(e.birthDate,t.asOf||a),phone:$(e.phone),email:$(e.email).toLowerCase(),participantType:$(e.participantType),address:$(e.address),primarySport:$(e.primarySport),experience:$(e.experience),preferredClassTime:$(e.preferredClassTime),notes:$(e.notes),source:$(e.source||"website"),staffNotes:$(e.staffNotes),guardianName:$(n.name),guardianRelation:$(n.relation),guardianPhone:$(n.phone),guardianEmail:$(n.email).toLowerCase(),emergencyName:$(i.name),emergencyPhone:$(i.phone),emergencyRelation:$(i.relation),medicalNotes:$(e.medicalNotes),allergies:$(e.allergies),injuries:$(e.injuries),photoConsent:!!e.photoConsent,marketingConsent:!!e.marketingConsent,createdAt:e.createdAt||a,updatedAt:a}}function Qn(e={},t="adult"){const a=e.guardian||{};return t==="minor"?{name:$(a.name),phone:$(a.phone),email:$(a.email).toLowerCase(),participantName:$(e.fullName),participantEmail:$(e.email).toLowerCase(),participantPhone:$(e.phone),guardianName:$(a.name),guardianRelation:$(a.relation),guardianPhone:$(a.phone),guardianEmail:$(a.email).toLowerCase()}:{name:$(e.fullName),phone:$(e.phone),email:$(e.email).toLowerCase(),participantName:$(e.fullName),participantEmail:$(e.email).toLowerCase(),participantPhone:$(e.phone)}}function Xn(e=[],t={},a={}){const n=Yn(t,a),i=e.findIndex(o=>n.email&&o.email?.toLowerCase()===n.email);if(i>=0){const o=[...e];return o[i]={...o[i],...n,id:o[i].id,createdAt:o[i].createdAt||n.createdAt},{students:o,student:o[i]}}return{students:[n,...e],student:n}}function Zn({studentId:e,orderId:t,template:a=K,signerName:n,signerRelation:i,participantType:o="",templateAudience:l="",ipAddress:c="",userAgent:d="",now:u=new Date().toISOString()}={}){return{id:Q("waiver-signature",`${e}:${t}:${a.version}:${u}`),studentId:e,orderId:t,templateId:a.id,templateVersion:a.version,participantType:$(o),templateAudience:$(l||o),signerName:$(n),signerRelation:$(i),signedAt:u,ipAddress:c,userAgent:d}}function Pa({records:e={},order:t={},now:a=new Date().toISOString()}={}){const n=[...e.enrollments||[]],i=[...e.creditPackages||[]],o=[...e.creditTransactions||[]];if(!de(t))return{...e,enrollments:n,creditPackages:i,creditTransactions:o};for(const l of t.items||[])if((l.kind==="session"||l.kind==="court"||l.kind==="booking"||l.kind==="waitlist")&&n.push({id:Q("enrollment",`${t.id}:${l.id||l.cartId}:${l.kind}`),orderId:t.id,studentId:t.studentId,courseSessionId:l.id||l.serviceId,title:l.title,programId:l.programId||l.serviceId||"",status:l.kind==="waitlist"?"waitlisted":"confirmed",quantity:Number(l.quantity||1),createdAt:a}),l.kind==="package"){const c={id:Q("credit-package",`${t.id}:${l.id}:${a}`),orderId:t.id,studentId:t.studentId,studentName:t.studentName||"",programId:l.programId,title:l.title,originalCredits:Number(l.credits||0),balance:Number(l.credits||0),purchasedAt:a,expiresAt:l.expiresAt||hi(a,12)};i.push(c),o.push({id:Q("credit-transaction",`${c.id}:purchase`),packageIds:[c.id],studentId:t.studentId,programId:l.programId,type:"purchase",units:c.originalCredits,balanceAfter:c.balance,reason:"purchase",orderId:t.id,createdAt:a})}return{...e,enrollments:n,creditPackages:i,creditTransactions:o}}function de(e={}){return Vn.has(e.status||"confirmed")}function Ia({creditPackages:e=[],creditTransactions:t=[],studentId:a,programId:n,units:i=1,reason:o="check-in",staffId:l="",now:c=new Date().toISOString()}={}){let d=Number(i||0);const u=e.map(g=>({...g})),m=u.filter(g=>g.studentId===a&&g.programId===n&&Number(g.balance||0)>0).sort((g,T)=>String(g.expiresAt||"").localeCompare(String(T.expiresAt||""))),y=[];for(const g of m){if(d<=0)break;const T=Math.min(Number(g.balance||0),d);g.balance=Number(g.balance||0)-T,d-=T,y.push(g.id)}if(d>0)throw new Error("Insufficient course credits");const v=u.filter(g=>g.studentId===a&&g.programId===n).reduce((g,T)=>g+Number(T.balance||0),0),_={id:Q("credit-transaction",`${a}:${n}:${i}:${c}:${o}`),packageIds:y,studentId:a,programId:n,type:"usage",units:-Math.abs(Number(i||0)),balanceAfter:v,reason:o,staffId:l,createdAt:c};return{creditPackages:u,creditTransactions:[...t,_]}}function ei(e=[],t={}){const a=$(t.email).toLowerCase();return!a||!$(t.password)?null:e.find(n=>$(n.email).toLowerCase()===a)||null}function Xe(e={},t,a={}){const n=(e.students||[]).find(b=>b.id===t)||null,i=(e.enrollments||[]).filter(b=>b.studentId===t),o=(e.creditPackages||[]).filter(b=>b.studentId===t),l=o.filter(b=>b.programId!=="membership"),c=(e.creditTransactions||[]).filter(b=>b.studentId===t),d=(e.bookings||[]).filter(b=>b.studentId===t&&b.status!=="cancelled"),u=d.filter(b=>b.kind==="order"),m=d.filter(b=>b.kind==="resource"||b.serviceId&&b.kind!=="order"),y=(e.waiverSignatures||[]).filter(b=>b.studentId===t),v=u.flatMap(b=>(b.items||[]).filter(O=>O.programId==="membership"||/membership/i.test(O.title||"")).map(O=>({...O,orderId:b.id,purchasedAt:b.createdAt}))),_=o.filter(b=>b.programId==="membership"||/membership/i.test(b.title||"")).map(b=>({...b,kind:"membership-package",orderId:b.orderId||"",purchasedAt:b.purchasedAt})),g=[...v,..._],T=ti({creditPackages:o,orders:u},a),P=l.reduce((b,O)=>b+Number(O.originalCredits||0),0),H=l.reduce((b,O)=>b+Number(O.balance||0),0),$e=Math.max(0,P-H),st=[...new Set([...i.map(b=>b.programId),...o.map(b=>b.programId),...u.flatMap(b=>(b.items||[]).map(O=>O.programId))].filter(Boolean))],qe=[...i.map(b=>({id:b.id,kind:"class",title:b.title||b.courseSessionId,programId:b.programId,status:b.status,date:b.startsAt||b.createdAt||""})),...m.map(b=>({id:b.id,kind:"court",title:b.serviceLabel_en||b.serviceId||"Court booking",title_zh:b.serviceLabel_zh||b.serviceLabel_en||b.serviceId||"场地预约",programId:b.programId||"court-rental",status:b.status||"confirmed",date:[b.date,b.startTime&&b.endTime?`${b.startTime}-${b.endTime}`:""].filter(Boolean).join(" ")}))];return{student:n,enrollments:i,programs:st,creditPackages:l,membershipPackages:_,creditTransactions:c,creditTotals:{original:P,used:$e,remaining:H},memberships:g,membership:T,membershipLevel:T.level,orders:u,courtBookings:m,waivers:y,upcomingSchedule:qe,pastSchedule:[],emptyStates:{enrollments:i.length===0,credits:o.length===0,orders:u.length===0,waivers:y.length===0,schedule:qe.length===0},alerts:n?Ta(n,e,a):[]}}function ti(e={},t={}){const a=t.now||new Date().toISOString(),o=[...(e.creditPackages||[]).filter(l=>l.programId==="membership"||/membership/i.test(l.title||"")).map(l=>({id:l.id,source:"creditPackage",title:l.title||"",expiresAt:l.expiresAt||"",purchasedAt:l.purchasedAt||"",active:Number(l.balance??1)>0,item:l})),...(e.orders||e.bookings||[]).filter(l=>l.kind==="order"&&de(l)).flatMap(l=>(l.items||[]).filter(c=>c.programId==="membership"||/membership/i.test(c.title||"")).map(c=>({id:`${l.id}:${c.id||c.title}`,source:"order",title:c.title||"",expiresAt:c.expiresAt||"",purchasedAt:l.createdAt||"",active:!0,item:{...c,orderId:l.id}})))].filter(l=>l.active&&(!l.expiresAt||zt(l.expiresAt,a)>=0)).map(l=>({...l,level:ui(l.title)})).filter(l=>l.level!=="visitor").sort((l,c)=>Wt(c.level)-Wt(l.level)||String(c.expiresAt||"").localeCompare(String(l.expiresAt||"")))[0];return o?{level:o.level,title:o.level==="plus"?"Membership Plus":"Regular Membership",expiresAt:o.expiresAt,source:o.source,purchasedAt:o.purchasedAt,item:o.item}:{level:"visitor",title:"Visitor",expiresAt:"",source:"none",purchasedAt:"",item:null}}function Ta(e={},t={},a={}){const n=di(e.id,t),i=[];return n.waiverCount===0&&i.push("Missing waiver"),n.lowestBalance!==null&&n.lowestBalance<=3&&i.push("Low credits"),n.nextExpiry&&zt(n.nextExpiry,a.now||new Date().toISOString())<=45&&i.push("Credits expiring soon"),n.unpaidOrderCount>0&&i.push("Unpaid order"),At(e,{asOf:a.now})&&!$(e.guardianName)&&i.push("Missing guardian"),i}function ai(e=[],t={},a={}){const n=$(a.query).toLowerCase();return e.filter(i=>{const o=Xe(t,i.id,{now:a.now}),l=o.alerts,c=[i.fullName,i.email,i.phone,i.guardianName].map($).join(" ").toLowerCase();return!(n&&!c.includes(n)||a.programId&&!o.programs.includes(a.programId)||a.status==="lowBalance"&&!l.includes("Low credits")||a.status==="member"&&o.membershipLevel==="visitor"||["visitor","regular","plus"].includes(a.status)&&o.membershipLevel!==a.status||a.status==="missingWaiver"&&!l.includes("Missing waiver")||a.status==="unpaid"&&!l.includes("Unpaid order")||a.status==="expiring"&&!l.includes("Credits expiring soon"))})}function Ze(e={},t,a={}){const n=a.now||new Date().toISOString();return(e.creditPackages||[]).filter(i=>i.studentId===t).filter(i=>i.programId!=="membership").filter(i=>Number(i.balance||0)>0).filter(i=>!i.expiresAt||zt(i.expiresAt,n)>=0).map(i=>({...i,used:Math.max(0,Number(i.originalCredits||0)-Number(i.balance||0)),remaining:Number(i.balance||0),canBook:!0})).sort((i,o)=>String(i.expiresAt||"9999-12-31").localeCompare(String(o.expiresAt||"9999-12-31")))}function Mt(e={},t,a,n={}){const i=Ze(e,t,n).find(o=>o.id===a);return i?i.programId==="court-rental"?(e.bookingServices||[]).filter(o=>o.public!==!1).map(o=>({kind:"resource",id:o.id,serviceId:o.id,title:o.label_en||o.id,title_zh:o.label_zh||o.label_en||o.id,programId:"court-rental",service:o})):i.programId==="open-gym"?(e.openCourtSlots||[]).filter(o=>o.active!==!1).filter(o=>Jt(o,e.bookings||[])>0).map(o=>({kind:"openGym",id:o.id,title:o.title_en||o.id,title_zh:o.title_zh||o.title_en||o.id,programId:"open-gym",date:o.date,startTime:o.startTime,endTime:o.endTime,startsAt:pi(o),remaining:Jt(o,e.bookings||[])})):(e.sessions||[]).filter(o=>o.active!==!1).filter(o=>o.programId===i.programId).map(o=>({kind:"class",id:o.id,title:o.title_en||o.title||o.id,title_zh:o.title_zh||o.title_en||o.title||o.id,programId:o.programId,date:o.date||o.dates||o.dateSummary||"",time:o.time||"",startsAt:o.startsAt||o.date||"",session:o})):[]}function ni({records:e={},studentId:t,packageId:a,option:n={},now:i=new Date().toISOString()}={}){const o=(e.creditPackages||[]).map(g=>({...g})),l=[...e.creditTransactions||[]],c=[...e.enrollments||[]],d=[...e.bookings||[]],u=(e.openCourtSlots||[]).map(g=>({...g})),m=o.find(g=>g.id===a&&g.studentId===t);if(!m||Number(m.balance||0)<=0)throw new Error("No usable member credit package");if(!mi(m,n))throw new Error("Selected time does not match this package");m.balance=Number(m.balance||0)-1;const y=o.filter(g=>g.studentId===t&&g.programId===m.programId).reduce((g,T)=>g+Number(T.balance||0),0),v={id:Q("credit-transaction",`${t}:${a}:${n.kind}:${n.id}:${i}:member-reservation`),packageIds:[a],studentId:t,programId:m.programId,type:"usage",units:-1,balanceAfter:y,reason:"member reservation",orderId:"",createdAt:i};l.push(v);const _={id:Q("member-usage",`${t}:${a}:${n.kind}:${n.id}:${i}`),studentId:t,programId:m.programId,title:n.title||n.title_en||n.id,title_zh:n.title_zh||n.title||n.id,status:"confirmed",memberUsage:!0,creditPackageId:a,creditTransactionId:v.id,createdAt:i,startsAt:n.startsAt||n.date||""};if(n.kind==="class")c.push({..._,orderId:"",courseSessionId:n.id,quantity:1});else{const g={..._,kind:n.kind==="openGym"?"open-gym":"resource",source:"member",serviceId:n.serviceId||n.id,serviceLabel_en:n.title||n.id,serviceLabel_zh:n.title_zh||n.title||n.id,openGymSlotId:n.kind==="openGym"?n.id:"",date:n.date||"",startTime:n.startTime||"",endTime:n.endTime||"",quantity:Number(n.quantity||1),machinePosition:n.machinePosition||"",resources:n.resources||n.service?.resources||[],customer:{},paymentMethod:"Member Credit",paymentStatus:"member-credit",lockStatus:"locked"};if(d.unshift(g),n.kind==="openGym"){const T=u.find(P=>P.id===n.id);T&&(T.spots=Math.max(0,Number(T.spots||0)-1))}}return{...e,enrollments:c,bookings:d,creditPackages:o,creditTransactions:l,openCourtSlots:e.openCourtSlots?u:e.openCourtSlots}}function ii({records:e={},studentId:t,usageId:a,now:n=new Date().toISOString(),cutoffHours:i=48}={}){const o=(e.enrollments||[]).map(P=>({...P})),l=(e.bookings||[]).map(P=>({...P})),c=(e.creditPackages||[]).map(P=>({...P})),d=[...e.creditTransactions||[]],u=(e.openCourtSlots||[]).map(P=>({...P})),m=o.find(P=>P.id===a&&P.studentId===t&&P.memberUsage),y=l.find(P=>P.id===a&&P.studentId===t&&P.memberUsage),v=m||y;if(!v)return{...e,cancelled:!1,reason:"Member usage not found"};if(v.status==="cancelled")return{...e,cancelled:!1,reason:"Already cancelled"};const _=gi(v);if(_&&bi(_,n)<i)return{...e,cancelled:!1,reason:"Cancellation window has passed"};v.status="cancelled",v.cancelledAt=n;const g=c.find(P=>P.id===v.creditPackageId&&P.studentId===t);g&&(g.balance=Number(g.balance||0)+1);const T=c.filter(P=>P.studentId===t&&P.programId===v.programId).reduce((P,H)=>P+Number(H.balance||0),0);if(d.push({id:Q("credit-transaction",`${t}:${a}:${n}:member-cancellation`),packageIds:v.creditPackageId?[v.creditPackageId]:[],studentId:t,programId:v.programId,type:"adjustment",units:1,balanceAfter:T,reason:"member cancellation",orderId:"",createdAt:n}),y?.openGymSlotId){const P=u.find(H=>H.id===y.openGymSlotId);P&&(P.spots=Number(P.spots||0)+1)}return{...e,cancelled:!0,enrollments:o,bookings:l,creditPackages:c,creditTransactions:d,openCourtSlots:e.openCourtSlots?u:e.openCourtSlots}}function ri(e=[],t={}){return et(Gn,e.map(a=>({...a,age:a.age??Qe(a.birthDate,t.asOf||new Date)})))}function oi(e=[]){return et(Wn,e.map(t=>({...t,items:(t.items||[]).map(a=>a.title||a.id).join("; ")})))}function si(e=[]){return et(Jn,e)}function li(e=[]){const t=new Map;for(const a of e){const n=`${a.studentId}|${a.programId}`,i=t.get(n)||{studentId:a.studentId,studentName:a.studentName||"",programId:a.programId,balance:0,firstExpiry:a.expiresAt||"",lastExpiry:a.expiresAt||""};i.studentName=i.studentName||a.studentName||"",i.balance+=Number(a.balance||0),a.expiresAt&&(!i.firstExpiry||a.expiresAt<i.firstExpiry)&&(i.firstExpiry=a.expiresAt),a.expiresAt&&(!i.lastExpiry||a.expiresAt>i.lastExpiry)&&(i.lastExpiry=a.expiresAt),t.set(n,i)}return et(["studentId","studentName","programId","balance","firstExpiry","lastExpiry"],[...t.values()])}function et(e,t){return[e.join(","),...t.map(a=>e.map(n=>ci(a[n])).join(","))].join(`
`)}function ci(e){const t=String(e??"");return/[",\n\r]/.test(t)?`"${t.replaceAll('"','""')}"`:t}function $(e){return String(e||"").trim()}function di(e,t={}){const a=(t.creditPackages||[]).filter(c=>c.studentId===e&&c.programId!=="membership"),n=(t.waiverSignatures||[]).filter(c=>c.studentId===e),i=(t.bookings||[]).filter(c=>c.kind==="order"&&c.studentId===e),o=a.map(c=>Number(c.balance||0)),l=a.map(c=>c.expiresAt).filter(Boolean).sort();return{waiverCount:n.length,lowestBalance:o.length?Math.min(...o):null,nextExpiry:l[0]||"",unpaidOrderCount:i.filter(c=>!["paid","paid-demo"].includes(c.paymentStatus||"")).length}}function zt(e,t){const a=new Date(`${String(e).slice(0,10)}T12:00:00.000Z`),n=new Date(t);return Number.isNaN(a.getTime())||Number.isNaN(n.getTime())?1/0:Math.ceil((a.getTime()-n.getTime())/864e5)}function ui(e=""){const t=$(e).toLowerCase();return t?t.includes("plus")||t.includes("training benefit")?"plus":t.includes("regular")||t.includes("general")||t.includes("membership")?"regular":"visitor":"visitor"}function Wt(e){return e==="plus"?2:e==="regular"?1:0}function mi(e={},t={}){return e.programId==="court-rental"?t.kind==="resource"&&(t.programId||"court-rental")==="court-rental":e.programId==="open-gym"?t.kind==="openGym"&&(t.programId||"open-gym")==="open-gym":t.kind==="class"&&t.programId===e.programId}function Jt(e={},t=[]){const a=t.filter(n=>n.openGymSlotId===e.id&&n.status!=="cancelled").reduce((n,i)=>n+Number(i.quantity||1),0);return Math.max(0,Number(e.spots||0)-a)}function pi(e={}){return!e.date||!e.startTime?e.date||"":`${e.date}T${e.startTime}:00.000`}function gi(e={}){const t=e.startsAt||(e.date&&e.startTime?`${e.date}T${e.startTime}:00.000`:e.date);if(!t)return null;const a=new Date(t);return Number.isNaN(a.getTime())?null:a}function bi(e,t){const a=e instanceof Date?e:new Date(e),n=new Date(t);return Number.isNaN(a.getTime())||Number.isNaN(n.getTime())?1/0:(a.getTime()-n.getTime())/36e5}function Q(e,t){let a=0;const n=String(t||`${Date.now()}-${Math.random()}`);for(let i=0;i<n.length;i+=1)a=(a<<5)-a+n.charCodeAt(i)|0;return`${e}-${Math.abs(a).toString(36)}`}function hi(e,t){const a=new Date(e);return Number.isNaN(a.getTime())?"":(a.setUTCMonth(a.getUTCMonth()+t),a.toISOString().slice(0,10))}const fi=["auto","member","non_member"];function Ca(e){return String(e||"").trim()}function Kt(e){return Ca(e).toLowerCase()}function Yt(e){return Ca(e).replace(/\D/g,"")}function vi(e,t){return!e||!t?!1:e===t?!0:e.length>=10&&t.length>=10&&e.slice(-10)===t.slice(-10)}function yi(e){return Number(e?.memberPrice??e?.nonMemberPrice??e?.price??0)}function $i(e){return Number(e?.nonMemberPrice??e?.price??0)}function Si(e){return fi.includes(e)?e:"auto"}function Qt(e={}){const t=e.membership?.title||"";return/plus/i.test(t)||e.membershipLevel==="plus"?"Membership Plus":/regular/i.test(t)||e.membershipLevel==="regular"?"Regular Membership":"Visitor"}function lt(e){const t=new Set;return e.filter(a=>!a?.id||t.has(a.id)?!1:(t.add(a.id),!0))}function ki(e={},{email:t="",phone:a=""}={}){const n=Kt(t),i=Yt(a),o=e.students||[],l=n?o.filter(d=>[d.email,d.guardianEmail].some(u=>Kt(u)===n)):[],c=i?o.filter(d=>[d.phone,d.guardianPhone].some(u=>vi(Yt(u),i))):[];return{emailMatches:lt(l),phoneMatches:lt(c),allMatches:lt([...l,...c])}}function Aa({records:e={},service:t,duration:a=60,quantity:n=1,pricingMode:i="auto",email:o="",phone:l="",now:c=new Date().toISOString()}={}){const d=Si(i),u=ki(e,{email:o,phone:l}),m=u.emailMatches[0]||null,y=u.phoneMatches[0]||null,v=m&&y&&m.id!==y.id,_=v?null:m||y||u.allMatches[0]||null,g=_?Xe(e,_.id,{now:c}):null,T=["regular","plus"].includes(g?.membershipLevel),P=d==="member"?"member":d==="non_member"?"non_member":T&&!v?"member":"non_member",H=d==="auto"?"auto":"manual",$e=P==="member"?yi(t):$i(t),st=Math.round($e*(Number(a||60)/60)*1),qe=g?.membershipLevel||"visitor";let b="No member match yet. Non-member rate is selected.",O="";return v?(O="contact_conflict",b="Email and phone match different accounts. Confirm the customer, then choose Member or Non-member manually."):g?.student&&T?b=`Detected: ${Qt(g)} - ${g.student.fullName||g.student.email||g.student.id}`:g?.student?b=`No active membership found for ${g.student.fullName||g.student.email||g.student.id}.`:d!=="auto"&&(b="Manual pricing selected. No member account match is required."),d==="member"&&!T?b="Manual member rate selected. No active member match is connected to this booking.":d==="non_member"&&g?.student&&(b=`Manual non-member rate selected for ${g.student.fullName||g.student.email||g.student.id}.`),{pricingMode:d,pricingSource:H,customerType:P,hourlyRate:$e,total:st,quantity:Number(n||1),duration:Number(a||60),matchedStudentId:g?.student?.id||"",matchedStudentName:g?.student?.fullName||"",matchedStudentEmail:g?.student?.email||"",matchedStudentPhone:g?.student?.phone||"",membershipLevel:qe,membershipTitle:g?.membership?.title||Qt(g||{}),message:b,warning:O}}const Ma=["main-full","main-half","shooting-machine"],wi=new Set(["volleyball-training","small-full","small-half-a","small-half-b","basketball-training"]),B="student-test-member",_i=e=>`/first-light-client-preview/${e.replace(/^\/+/,"")}`,Pi=_i("shooting-machines-layout-2d.jpg"),Ii=2500,Ti=12*1024*1024,ht=9e5,za=1600;let Xt=null;const Nt="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/image-high-c5s6nl.png?enable=upscale&enable-io=true&height=70",Na="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/image-high-c5s6nl.png?enable=upscale&enable-io=true&height=140",S="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/image-high-9yub2i.png?crop=1.7424%3A1%2Coffset-x74&enable=upscale&enable-io=true&width=1600",Ci="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/wechatimg223-standard.jpg",Se="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/2461777510886_-pic_hd-standard.jpg",xe="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/2451777510883_-pic_hd-standard.jpg",ke="https://primary.jwwb.nl/public/u/h/q/temp-vnatcpwanznufbojkthg/2431777510877_-pic_hd-standard.jpg",be=["Jun 29-Jul 3","Jul 6-Jul 10","Jul 13-Jul 17","Jul 20-Jul 24","Jul 27-Jul 31","Aug 3-Aug 7","Aug 10-Aug 14","Aug 17-Aug 21","Aug 24-Aug 28","Aug 31-Sep 4"],ct={beginner:["May 11","May 18","Jun 1","Jun 8","Jun 15","Jun 22"],advanced:["May 12","May 14","May 19","May 21","May 26","May 28","Jun 2","Jun 4","Jun 11","Jun 18","Jun 25"],elite:["May 15","May 29","Jun 5","Jun 12","Jun 19","Jun 26"]},Ae="06:00",tt="15:00",Oe={en:{nav:["Home","Train Today","Programs","Coaches","Schedule","Contact"],cart:"Checkout",admin:"Admin",lang:"中文",learn:"Learn More",add:"Add to Cart",addedToCart:"Added to cart",spots:"spots left",sold:"Sold Out",member:"Member",regular:"Regular",checkout:"Checkout",waiver:"I have read and agree to the First Light waiver and release.",confirmation:"Booking confirmed. A confirmation email has been prepared for the customer.",back:"Back",home:"Home",basketball:"Basketball",volleyball:"Volleyball",conditioning:"Conditioning",courtRental:"Court Rental",openCourt:"OPEN GYM",privateTraining:"Private Training",league:"League",membership:"Membership",merchandise:"Merchandise",account:"Account",wishlist:"Wishlist",cartLabel:"Cart",bookingSystem:{eyebrow:"Booking System",title:"Book Court Time",description:"Half-hour scheduling with automatic conflict protection for main court, small court, and shooting machines.",mainCourt:"Main court",smallCourt:"Small court",date:"Date",duration:"Duration",machineSpots:"Machine spots",participants:"Participants",estimated:"Estimated",liveNote:"This schedule recalculates immediately after new bookings or cancellations.",empty:"No available times for this date.",footer:"Pick a time above, then continue to checkout.",selected:"Selected",available:"Available",left:"left",booking:"booking",spotsUnit:"spot(s)",conflictFallback:"This time is no longer available."},checkoutForm:{pageSubtitle:"Multiple courses, court slots, open gym, memberships, and merchandise can be checked out together.",selectedItems:"Selected items",emptyCart:"Your cart is empty.",total:"Total",orderSummary:"Order summary",subtotal:"Subtotal",taxes:"Taxes/fees: shown by real payment provider before launch.",confirmationDetails:"Waiver, customer contact, payment method, payment status, and lock status appear on confirmation.",participantType:"Who is this checkout for?",participantTypeAdult:"Adult / self checkout",participantTypeAdultHelp:"Use this for adult court rentals, adult courses, and adult membership purchases.",participantTypeMinor:"Child / minor with guardian",participantTypeMinorHelp:"Use this when a parent or guardian is registering a player under 19.",adultSectionTitle:"Adult participant",minorSectionTitle:"Child participant",fullName:"Full name",adultFullName:"Adult participant name",minorFullName:"Child participant name",phone:"Phone",email:"Email",birthDate:"Date of birth",address:"Address",primarySport:"Primary sport",basketball:"Basketball",volleyball:"Volleyball",both:"Both",experience:"Playing experience",experiencePlaceholder:"e.g. 2 years / beginner",preferredTime:"Preferred class time",emergencyContact:"Emergency contact",emergencyPhone:"Emergency phone",guardianName:"Parent/guardian name",guardianRelation:"Parent/guardian relationship",guardianRelationPlaceholder:"Mother / Father / Guardian",guardianPhone:"Parent/guardian phone",guardianEmail:"Parent/guardian email",medical:"Medical conditions / allergies / injuries",memberStatus:"Member status",nonMember:"Non-member",generalMember:"General Member",trainingBenefit:"Membership Plus",paymentNote:"Payment note",paymentPlaceholder:"Optional card payment note",signature:"Electronic signature",signaturePlaceholder:"Signer full legal name",signerRelation:"Signer relationship",signerRelationPlaceholder:"Self / Mother / Father / Guardian",adultSignerRelationPlaceholder:"Self",minorSignerRelationPlaceholder:"Mother / Father / Guardian",notes:"Notes",photoConsent:"Photo/video release for First Light media.",marketingConsent:"Send schedule, camp, and program updates by email.",adultWaiver:"I am the adult participant/renter and have read and agree to the First Light waiver and release.",minorWaiver:"I am the parent/guardian of the minor participant and have read and agree to the First Light waiver and release on their behalf.",confirm:"Confirm booking",qty:"Qty",validationPrefix:"Please complete student information:",bookingConflict:"Booking conflict:",noLongerAvailable:"is no longer available."},memberAccount:{loginTitle:"LOGIN TO YOUR ACCOUNT",loginSubtitle:"Access your First Light member account, courses, schedule, credits, and orders.",visitorTitle:"Visitor",regularTitle:"Regular Membership",plusTitle:"Membership Plus",visitorSummary:"No active membership purchase is connected to this account yet.",regularSummary:"Open gym access and basic member benefits are active on this account.",plusSummary:"Training member pricing, open gym benefits, and priority booking are active on this account.",levelExpires:"Expires",levelSource:"Source",buyRegular:"Buy Regular Membership",buyPlus:"Buy Membership Plus",upgradePlus:"Upgrade to Membership Plus",regularBenefits:"Regular benefits: open gym member pricing, account history, waiver records, and front desk support.",plusBenefits:"Membership Plus benefits: Regular benefits plus training member pricing, selected training discounts, and priority booking notes.",visitorBenefits:"Visitor access: view or create an account, then purchase a membership to unlock member benefits.",visitorNoBooking:"Purchase Regular Membership or Membership Plus before using member self-service reservations.",sameEmailHint:"Use the same email from checkout to see your membership automatically after login.",membershipNotAdded:"Membership not added",membershipAlreadyInCart:"A membership is already in your cart. Remove it before choosing another membership.",regularAlreadyActive:"Regular Membership is already active on this account.",plusAlreadyActive:"Membership Plus is already active on this account.",plusTrainingPrice:"Membership Plus training price",memberLogin:"Member Login",demoLogin:"Use the email connected to your First Light booking record. Contact us if you need account access.",testAccountHint:"Test account: member@test.com / password: test",useTestAccount:"Use test account",emailAddress:"Email address",password:"Password",logIn:"Log in",needAccount:"Need an account?",forgotPassword:"Forgot password?",pageTitle:"MY FIRST LIGHT ACCOUNT",pageSubtitle:"Profile, programs, schedule, credits, membership benefits, orders, and waiver records.",loggedInAs:"Logged in as",age:"age",logout:"Log out",programs:"Programs",creditsLeft:"Credits left",scheduleItems:"Schedule items",orders:"Orders",profile:"Profile",birthDate:"Birth date",address:"Address",primarySport:"Primary sport",experience:"Experience",preferredTime:"Preferred time",guardianEmergency:"Guardian / Emergency",guardian:"Guardian",guardianEmail:"Guardian email",emergency:"Emergency",medical:"Medical",benefits:"Membership Benefits",schedule:"Schedule",courseCredits:"Course Credits",purchased:"Purchased",used:"Used",remaining:"Remaining",ordersPayment:"Orders / Payment",waivers:"Waiver Records",quickUpdate:"Quick Update",phone:"Phone",emergencyPhone:"Emergency phone",medicalNotes:"Medical notes",saveUpdates:"Save updates",bookMore:"Book more programs",viewSchedule:"View full schedule",contact:"Contact First Light",reminders:"Reminder Center",cancelPolicy:"Self-cancellation is available until 48 hours before the start time.",contactFrontDesk:"Contact front desk",myProducts:"My Courses / Packages",usableHint:"Choose an active package below to reserve a matching class, court, or shooting machine time.",noUsableProducts:"No usable package balance is available right now.",selfService:"Reserve / Use Now",selfServiceHelp:"Pick a purchased package first. Available times are filtered by matching program and live availability.",chooseProduct:"Choose package",noBookableTimes:"No matching bookable times are available for this package.",reserveUse:"Reserve and use 1 credit",memberCreditCost:"Member credits",cancelAndRefund:"Cancel / refund credit",contactToCancel:"Inside 48 hours. Please contact First Light to change this booking.",reservedNotice:"Reservation confirmed. One member credit was deducted.",cancelledNotice:"Reservation cancelled. One member credit was returned.",reserveFailed:"Reservation failed.",cancelWindowPassed:"This reservation is inside the 48-hour window. Please contact First Light.",notProvided:"Not provided",tbd:"TBD",selfManaged:"Adult/self managed",noneNoted:"None noted",memberBenefit:"Member pricing / account benefit"},adminStudents:{title:"Student Management",help:"New confirmed orders automatically create or update student profiles, enrollments, credit balances, and waiver evidence.",exportStudents:"Export students CSV",exportOrders:"Export orders CSV",exportCredits:"Export credit balances CSV",exportWaivers:"Export waivers CSV",search:"Search name / Email / phone",program:"Program",allPrograms:"All programs",status:"Status",allStudents:"All students",lowBalance:"Low balance",expiring:"Credits expiring soon",member:"Membership",missingWaiver:"Missing waiver",unpaid:"Unpaid order",filter:"Filter",clear:"Clear",checkIn:"Course credit use / Check-in",student:"Student",courseType:"Program type",units:"Units to deduct",staffId:"Staff ID",reason:"Reason",deduct:"Deduct one",students:"Students",confirmed:"Confirmed enrollments",remainingCredits:"Remaining credits",waiversSigned:"Waivers signed",empty:"No students match these filters. Completed checkouts will appear here automatically."},adminBookings:{title:"Orders and Bookings",help:"Phone or front-desk bookings can be entered here. After saving, available times recalculate immediately.",manualTitle:"Phone / front-desk booking",service:"Booking service",date:"Date",startTime:"Start time",duration:"Duration",quantity:"Participants / shooting machine spots",name:"Guest name",phone:"Phone",email:"Email",paymentMethod:"Payment method",notes:"Notes",create:"Create confirmed booking",export:"Export CSV",empty:"No orders yet.",order:"Order",noDetails:"No item details",reference:"Reference",noName:"No name",confirmPayment:"Confirm payment",cancel:"Cancel",paymentStatus:"payment status",lockStatus:"lock status"},paymentStatuses:{cancelled:"cancelled",paidLocked:"paid / locked",pendingManual:"pending payment / not locked",unknown:"unknown",notLocked:"not locked",paymentApproved:"VISA/Mastercard demo payment approved. Replace with Stripe Checkout before launch.",onlineApproved:"Online card payment approved."},alerts:{missingWaiver:"Missing waiver",lowCredits:"Low credits",creditsExpiringSoon:"Credits expiring soon",unpaidOrder:"Unpaid order",missingGuardian:"Missing guardian",allClear:"All clear"},emptyStates:{noPrograms:"No programs yet.",noMembership:"No membership benefit purchase is recorded yet.",noSchedule:"No upcoming classes, open gym, or court bookings yet.",noCredits:"No course package balance yet.",noOrders:"No orders yet.",noWaivers:"No waiver record yet.",noEnrollments:"No enrollments.",noPackages:"No packages.",noWaiver:"No waiver."},programsPage:{title:"Programs",subtitle:"Choose the program first. Details, prices, schedules, waiver, and checkout come next."},coachesPage:{title:"Coaches",subtitle:"Large coach profiles first, details after Learn More."},schedulePage:{title:"Schedule",subtitle:"Live-style schedule for training, open gym, and court rental.",trainingSessions:"Training Sessions",trainingBody:"All sessions display spots, member pricing, regular pricing, and waiver requirements before checkout.",courtRental:"Court Rental",courtSlots:"Court Slots"},contactPage:{title:"Train with us today",subtitle:"Have questions or ready to get started? Fill out the form and a coach will reach out.",firstName:"First Name",lastName:"Last Name",email:"Email",phone:"Phone",comments:"Comments",submit:"Submit form",connect:"Connect",scanQr:"Scan QR / Contact"},leaguePage:{title:"FirstLight Hoopers League",subtitle:"Competitive, organized adult basketball in a professional indoor facility.",heading:"Adult Basketball League",body1:"First Light Adult Basketball League is designed for players who want to enjoy competitive, organized, and high-quality basketball in a professional indoor facility.",body2:"Our league provides a structured game environment for adult players of different skill levels, from recreational teams to more competitive groups. Games will be played at First Light Training Center, featuring a full-size indoor court, quality flooring, and a clean, well-managed facility.",body3:"The league focuses on fair competition, teamwork, sportsmanship, and community. Teams will compete through a regular season format, followed by playoffs. Official rules, schedules, standings, and game results will be managed by First Light.",registration:"Registration",payment:"Registration is non-refundable. Please send E-transfer payment to",contact:"Contact Us"},aboutPage:{title:"About Us",subtitle:"Our story, our facility, and why First Light exists.",facilityAlt:"First Light facility"},wishlistPage:{title:"Wishlist",subtitle:"Save programs and products for later.",emptyTitle:"Your wishlist is empty.",emptyBody:"Browse basketball, volleyball, court rental, and league options, then come back when saved items are available.",button:"View Programs"},notFound:{title:"Not Found",subtitle:"This page does not exist."}},zh:{nav:["首页","立即训练","课程项目","教练","时间表","联系"],cart:"结账",admin:"后台",lang:"英文",learn:"了解更多",add:"加入购物车",addedToCart:"已添加到购物车",spots:"个名额",sold:"已满",member:"会员价",regular:"普通价",checkout:"结账",waiver:"我已阅读并同意 First Light 免责声明。",confirmation:"预订成功。系统已为客户生成确认邮件。",back:"返回",home:"首页",basketball:"篮球",volleyball:"排球",conditioning:"体能训练",courtRental:"场地租赁",openCourt:"开放球场",privateTraining:"私教训练",league:"联赛",membership:"会员",merchandise:"周边商品",account:"会员账户",wishlist:"收藏",cartLabel:"购物车",bookingSystem:{eyebrow:"预约系统",title:"预约场地",description:"按半小时显示时间，系统会自动避免主场、小场半场和投篮机预约冲突。",mainCourt:"主场",smallCourt:"小场",date:"日期",duration:"时长",machineSpots:"投篮机位置",participants:"人数",estimated:"预计费用",liveNote:"新的预约或取消后，时间表会立即重新计算。",empty:"这一天没有可预约时间。",footer:"选择上方时间后，可继续进入结账。",selected:"已选择",available:"可预约",left:"剩余",booking:"个预约",spotsUnit:"个位置",conflictFallback:"该时间已不可预约。"},checkoutForm:{pageSubtitle:"课程、场地、开放球场、会员和商品可以一起结账。",selectedItems:"已选择项目",emptyCart:"购物车为空。",total:"合计",orderSummary:"订单摘要",subtotal:"小计",taxes:"税费/手续费：付款提交前会显示。",confirmationDetails:"确认页会显示免责协议、客户联系方式、付款方式、付款状态和锁定状态。",participantType:"本次结账对象",participantTypeAdult:"成人本人结账",participantTypeAdultHelp:"适用于成人租场、成人课程和成人会员购买。",participantTypeMinor:"儿童/未成年由监护人报名",participantTypeMinorHelp:"适用于家长或监护人为 19 岁以下学员报名。",adultSectionTitle:"成人参与者",minorSectionTitle:"儿童/未成年学员",fullName:"姓名",adultFullName:"成人参与者姓名",minorFullName:"儿童/学员姓名",phone:"电话",email:"邮箱",birthDate:"出生日期",address:"地址",primarySport:"主要运动",basketball:"篮球",volleyball:"排球",both:"两项都参加",experience:"运动经验",experiencePlaceholder:"例如：2 年 / 初学者",preferredTime:"偏好上课时间",emergencyContact:"紧急联系人",emergencyPhone:"紧急联系人电话",guardianName:"家长/监护人姓名",guardianRelation:"家长/监护人与学员关系",guardianRelationPlaceholder:"母亲 / 父亲 / 监护人",guardianPhone:"家长/监护人电话",guardianEmail:"家长/监护人邮箱",medical:"健康情况 / 过敏 / 伤病",memberStatus:"会员状态",nonMember:"非会员",generalMember:"普通会员",trainingBenefit:"训练优惠会员",paymentNote:"付款备注",paymentPlaceholder:"可填写卡支付备注",signature:"电子签名",signaturePlaceholder:"签署人法定姓名",signerRelation:"签署人与学员关系",signerRelationPlaceholder:"本人 / 母亲 / 父亲 / 监护人",adultSignerRelationPlaceholder:"本人",minorSignerRelationPlaceholder:"母亲 / 父亲 / 监护人",notes:"备注",photoConsent:"同意 First Light 使用照片/视频用于媒体内容。",marketingConsent:"同意通过邮箱接收时间表、训练营和课程更新。",adultWaiver:"我是成人参与者/租场人，已阅读并同意 First Light 免责声明。",minorWaiver:"我是未成年学员的家长/监护人，已代表学员阅读并同意 First Light 免责声明。",confirm:"确认预约",qty:"数量",validationPrefix:"请补全学员信息：",bookingConflict:"预约冲突：",noLongerAvailable:"已不可预约。"},memberAccount:{loginTitle:"登录会员账户",loginSubtitle:"查看 First Light 会员账户、课程、时间表、课包次数和订单。",visitorTitle:"访客",regularTitle:"Regular Membership",plusTitle:"Membership Plus",visitorSummary:"当前账户还没有有效会员购买记录。",regularSummary:"该账户已开通开放球场和基础会员权益。",plusSummary:"该账户已开通训练会员价、开放球场权益和优先预约权益。",levelExpires:"到期",levelSource:"来源",buyRegular:"购买 Regular Membership",buyPlus:"购买 Membership Plus",upgradePlus:"升级到 Membership Plus",regularBenefits:"Regular 权益：开放球场会员价、账户记录、免责协议记录和前台支持。",plusBenefits:"Membership Plus 权益：包含 Regular 权益，并增加训练会员价、指定训练折扣和优先预约说明。",visitorBenefits:"访客权限：可查看或创建账户，购买会员后解锁会员权益。",visitorNoBooking:"请先购买 Regular Membership 或 Membership Plus，再使用会员自助预约。",sameEmailHint:"购买时填写的同一个邮箱登录后，系统会自动显示对应会员等级。",membershipNotAdded:"会员未加入购物车",membershipAlreadyInCart:"购物车里已经有一个会员商品。请先移除后再选择其他会员。",regularAlreadyActive:"该账户已经有有效的 Regular Membership。",plusAlreadyActive:"该账户已经有有效的 Membership Plus。",plusTrainingPrice:"Membership Plus 训练会员价",memberLogin:"会员登录",demoLogin:"请使用报名或订单记录中的邮箱登录。如需开通或找回账户，请联系 First Light。",testAccountHint:"测试账号：member@test.com / 密码：test",useTestAccount:"使用测试账号",emailAddress:"邮箱",password:"密码",logIn:"登录",needAccount:"需要开通账户？",forgotPassword:"忘记密码？",pageTitle:"我的 First Light 账户",pageSubtitle:"查看个人资料、课程、时间表、课包次数、会员权益、订单和免责协议记录。",loggedInAs:"当前登录",age:"年龄",logout:"退出登录",programs:"项目",creditsLeft:"剩余次数",scheduleItems:"时间表项目",orders:"订单",profile:"个人资料",birthDate:"出生日期",address:"地址",primarySport:"主要运动",experience:"经验",preferredTime:"偏好时间",guardianEmergency:"监护人 / 紧急联系人",guardian:"监护人",guardianEmail:"监护人邮箱",emergency:"紧急联系人",medical:"健康备注",benefits:"会员权益",schedule:"时间表",courseCredits:"课包次数",purchased:"已购买",used:"已使用",remaining:"剩余",ordersPayment:"订单 / 付款",waivers:"免责协议记录",quickUpdate:"快速更新",phone:"电话",emergencyPhone:"紧急联系人电话",medicalNotes:"健康备注",saveUpdates:"保存更新",bookMore:"继续预约项目",viewSchedule:"查看完整时间表",contact:"联系 First Light",reminders:"提醒中心",cancelPolicy:"开始时间 48 小时前可自助取消并退回课时。",contactFrontDesk:"联系前台",myProducts:"我的课程 / 课包",usableHint:"选择一个有余额的课包后，可预约对应课程、球场或投篮机时间。",noUsableProducts:"目前没有可使用的课包余额。",selfService:"立即预约 / 使用",selfServiceHelp:"先选择已购买的课包，系统会按项目和实时空闲情况显示可预约时间。",chooseProduct:"选择课包",noBookableTimes:"这个课包目前没有可预约时间。",reserveUse:"预约并扣 1 次",memberCreditCost:"扣除次数",cancelAndRefund:"取消 / 退回课时",contactToCancel:"已进入 48 小时内，请联系 First Light 改期或取消。",reservedNotice:"预约已确认，并已扣除 1 次课。",cancelledNotice:"预约已取消，并已退回 1 次课。",reserveFailed:"预约失败。",cancelWindowPassed:"该预约已进入 48 小时内，请联系 First Light 处理。",notProvided:"未填写",tbd:"待定",selfManaged:"成人/本人管理",noneNoted:"暂无记录",memberBenefit:"会员价格 / 账户权益"},adminStudents:{title:"学员管理",help:"新订单确认后会自动生成或更新学员档案，并记录报名、课包余额和免责协议签署证据。",exportStudents:"导出学员 CSV",exportOrders:"导出订单 CSV",exportCredits:"导出课包余额 CSV",exportWaivers:"导出免责协议 CSV",search:"搜索姓名 / 邮箱 / 电话",program:"项目",allPrograms:"全部项目",status:"状态",allStudents:"全部学员",lowBalance:"课包余额低",expiring:"课包即将过期",member:"会员",missingWaiver:"缺少免责协议",unpaid:"未付款订单",filter:"筛选",clear:"清除",checkIn:"课包扣次 / 签到",student:"学员",courseType:"课程类型",units:"扣除次数",staffId:"员工 ID",reason:"原因",deduct:"扣一次",students:"学员",confirmed:"已确认报名",remainingCredits:"剩余课包次数",waiversSigned:"已签免责协议",empty:"暂无符合条件的学员。完成一次结账后会自动出现在这里。"},adminBookings:{title:"订单和预约",help:"电话或现场预约可以在这里录入。保存后，可预约时间表会立刻重新计算。",manualTitle:"电话 / 现场预约",service:"预约项目",date:"日期",startTime:"开始时间",duration:"时长",quantity:"人数 / 投篮机位置",name:"客人姓名",phone:"电话",email:"邮箱",paymentMethod:"付款方式",notes:"备注",create:"创建已确认预约",export:"导出 CSV",empty:"暂无订单。",order:"订单",noDetails:"暂无项目详情",reference:"付款备注",noName:"未填写姓名",confirmPayment:"确认收款",cancel:"取消",paymentStatus:"付款状态",lockStatus:"锁定状态"},paymentStatuses:{cancelled:"已取消",paidLocked:"已付款 / 已锁定",pendingManual:"待付款 / 未锁定",unknown:"未知",notLocked:"未锁定",paymentApproved:"VISA/Mastercard 付款已通过。",onlineApproved:"线上银行卡付款已通过。"},alerts:{missingWaiver:"缺少免责协议",lowCredits:"课包余额低",creditsExpiringSoon:"课包即将过期",unpaidOrder:"未付款订单",missingGuardian:"缺少监护人信息",allClear:"状态正常"},emptyStates:{noPrograms:"暂无项目。",noMembership:"暂无会员权益购买记录。",noSchedule:"暂无即将开始的课程、开放球场或场地预约。",noCredits:"暂无课包余额。",noOrders:"暂无订单。",noWaivers:"暂无免责协议记录。",noEnrollments:"暂无报名。",noPackages:"暂无课包。",noWaiver:"暂无免责协议。"},programsPage:{title:"课程项目",subtitle:"请先选择项目，进入详情后可查看价格、时间、名额、免责协议和结账信息。"},coachesPage:{title:"教练团队",subtitle:"先查看教练卡片，再进入详情了解经历和负责项目。"},schedulePage:{title:"时间表",subtitle:"查看训练、开放球场和场地租赁的实时式时间表。",trainingSessions:"训练课程",trainingBody:"所有课程在结账前都会显示名额、会员价、普通价和免责协议要求。",courtRental:"场地租赁",courtSlots:"场地时间"},contactPage:{title:"今天就开始训练",subtitle:"有问题或准备开始？填写表单后，教练会联系你。",firstName:"名字",lastName:"姓氏",email:"邮箱",phone:"电话",comments:"留言",submit:"提交表单",connect:"联系方式",scanQr:"扫码 / 联系"},leaguePage:{title:"FirstLight Hoopers 联赛",subtitle:"在专业室内场馆参加有组织、有竞争性的成人篮球联赛。",heading:"成人篮球联赛",body1:"First Light 成人篮球联赛适合希望在专业室内场馆参加高质量、有组织、有竞争性篮球比赛的球员。",body2:"联赛为不同水平的成人球员提供结构化比赛环境，从休闲球队到更具竞争力的队伍都可以参加。比赛将在 First Light Training Center 进行，场馆包含标准室内全场、优质地板和干净有序的设施。",body3:"联赛重视公平竞争、团队合作、体育精神和社区氛围。球队会参加常规赛并进入季后赛，官方规则、赛程、排名和比赛结果由 First Light 管理。",registration:"报名费",payment:"报名费不可退款。请通过 E-transfer 付款至",contact:"联系我们"},aboutPage:{title:"关于我们",subtitle:"了解 First Light 的故事、场馆和创立原因。",facilityAlt:"First Light 场馆"},wishlistPage:{title:"收藏",subtitle:"保存课程和商品，方便之后查看。",emptyTitle:"收藏夹为空。",emptyBody:"浏览篮球、排球、场地租赁和联赛选项，之后可回到这里查看已保存内容。",button:"查看项目"},notFound:{title:"页面不存在",subtitle:"这个页面不存在。"}}},L={appVersion:13,dropdownCatalogVersion:3,language:"en",pages:{home:{title_en:"FIRST LIGHT",title_zh:"FIRST LIGHT",kicker_en:"The premier basketball and volleyball training center in Richmond BC",kicker_zh:"Richmond 专业篮球与排球训练中心",line1_en:"EVERY REP COUNTS.",line1_zh:"每一次训练都算数。",line2_en:"TRAIN WITH US.",line2_zh:"和我们一起训练。",subtitle_en:"Professional training, court rental, open gym, camps, league play, and athlete development for players who want to stack better days.",subtitle_zh:"为希望持续进步的运动员提供专业训练、场地租赁、开放球场、夏令营、联赛和长期发展计划。",image:S},about:{title_en:"Our story",title_zh:"我们的故事",body_en:`First Light began in 2023 in a 2,000-square-foot warehouse, hardly a traditional training facility. Like many early-stage startups, we worked with limited resources, so we took on most of the build-out and day-to-day operations ourselves. What started with just two athletes quickly grew into a community of more than 100 players in under two years.

At the heart of First Light is a simple mission shaped by our own journey. Having competed in basketball from childhood through university, we built First Light to give kids who truly love the game access to high-quality, professional coaching. We share the lessons and experiences we've gained along the way-helping athletes avoid the setbacks we faced, build the right habits early, unlock their potential, and pursue their basketball goals with confidence.

As demand outpaced our space and schedule, we reached a point where we simply couldn't welcome everyone who wanted to train with us. That constraint became our catalyst for expanding our facility and creating an environment where more athletes can develop, compete, and grow with First Light.`,body_zh:"First Light 于 2023 年从一个 2,000 平方英尺的仓库开始。最初只有两名学员，不到两年发展成超过 100 名球员的社区。我们希望让真正热爱运动的孩子接触高质量、专业的训练。"},scheduleOverview:{title_en:"Schedule Overview",title_zh:"时间总览",subtitle_en:"",subtitle_zh:""},openGymBooking:{heroTitle_en:"OPEN GYM",heroTitle_zh:"开放球场",eyebrow_en:"Drop-in Price + Open Times",eyebrow_zh:"Drop-in 价格 + 开放时间",title_en:"Open Gym Booking",title_zh:"开放球场预约",body_en:"Review open gym pricing and booking first, then see staff-managed drop-in availability below.",body_zh:"先查看开放球场价格和预约入口，下方时间表会同步显示后台维护的可 drop-in 时间。",scheduleTitle_en:"Live Drop-in Times",scheduleTitle_zh:"实时开放时间",scheduleBody_en:"Drop-in times change weekly. Check the live schedule below before adding to cart.",scheduleBody_zh:"Drop-in 时间会按周更新，请先查看下方实时开放时间表。"},courtBookingSystem:{eyebrow_en:"Booking System",eyebrow_zh:"预约系统",title_en:"Book Court Time",title_zh:"预约场地",body_en:"Half-hour scheduling with automatic conflict protection for main court, small court, and shooting machines.",body_zh:"半小时制预约，自动保护主场、小场和投篮机的冲突时间。",liveNote_en:"This schedule recalculates immediately after new bookings or cancellations.",liveNote_zh:"新的预约或取消后，时间表会立即重新计算。",footer_en:"Pick a time above, then continue to checkout.",footer_zh:"先选择上方时间，再继续结账。"}},globalImages:[{id:"nav-logo",group:"brand",label_en:"Navigation Logo",usage_en:"Header logo and footer logo.",image:Nt,imagePositionX:"center",imagePositionY:"center",active:!0,order:1},{id:"home-hero-logo",group:"brand",label_en:"Home Hero Logo",usage_en:"Large First Light logo inside the home hero headline.",image:Na,imagePositionX:"left",imagePositionY:"top",active:!0,order:2},{id:"home-hero-background",group:"hero",label_en:"Home Hero Background",usage_en:"Full-screen home page hero background image.",image:S,imagePositionX:"center",imagePositionY:"center",active:!0,order:3},{id:"default-court",group:"defaults",label_en:"Default Court Image",usage_en:"Fallback image for program, catalog, merchandise, and page surfaces without their own image.",image:S,imagePositionX:"center",imagePositionY:"center",active:!0,order:4},{id:"court-full",group:"defaults",label_en:"Full Court Default",usage_en:"Default image for full-court rental cards.",image:Se,imagePositionX:"center",imagePositionY:"center",active:!0,order:5},{id:"court-half",group:"defaults",label_en:"Half Court Default",usage_en:"Default image for half-court rental cards.",image:xe,imagePositionX:"center",imagePositionY:"center",active:!0,order:6},{id:"court-machine",group:"defaults",label_en:"Shooting Machine Default",usage_en:"Default image for shooting-machine rental cards.",image:ke,imagePositionX:"center",imagePositionY:"center",active:!0,order:7},{id:"about-gallery-1",group:"about-gallery",label_en:"About Gallery 1",usage_en:"About page facility gallery.",image:S,imagePositionX:"center",imagePositionY:"center",active:!0,order:8},{id:"about-gallery-2",group:"about-gallery",label_en:"About Gallery 2",usage_en:"About page facility gallery.",image:Se,imagePositionX:"center",imagePositionY:"center",active:!0,order:9},{id:"about-gallery-3",group:"about-gallery",label_en:"About Gallery 3",usage_en:"About page facility gallery.",image:xe,imagePositionX:"center",imagePositionY:"center",active:!0,order:10},{id:"about-gallery-4",group:"about-gallery",label_en:"About Gallery 4",usage_en:"About page facility gallery.",image:ke,imagePositionX:"center",imagePositionY:"center",active:!0,order:11}],dropdownPages:[{id:"basketball-small-group",parentMenu:"basketball",label_en:"Small Group Training",label_zh:"篮球小组训练",title_en:"Basketball Small Group Training",title_zh:"篮球小组训练",subtitle_en:"Focused coaching, more repetitions, and direct feedback",subtitle_zh:"专注指导、更多练习次数和直接反馈",body_en:"Small group training gives athletes a more focused environment while keeping the pace and energy of a group session.",body_zh:"小组训练让学员在更专注的环境中训练，同时保留小组课程的节奏和互动。",productIntro_en:"Linked products below show the current small group schedule, prices, spots, and checkout actions.",productIntro_zh:"下方产品会显示当前小组训练时间、价格、名额和报名入口。",image:S,sessionIds:["bb-small-u10"],order:1,active:!0},{id:"basketball-private-training",parentMenu:"basketball",label_en:"Private Training",label_zh:"私教训练",title_en:"Basketball Private Training",title_zh:"篮球私教训练",subtitle_en:"One-on-one focus. Unlimited potential.",subtitle_zh:"一对一专注训练，释放更多潜力",body_en:"Private sessions are customized around age, skill level, position, goals, and schedule.",body_zh:"私教课程会根据年龄、水平、位置、目标和时间定制。",productIntro_en:"Linked products below show private training options, pricing, and request details.",productIntro_zh:"下方产品会显示私教训练选项、价格和咨询入口。",image:S,sessionIds:["private-training"],privatePricing:!0,order:2,active:!0},{id:"basketball-film-to-floor",parentMenu:"basketball",label_en:"Basketball IQ Workshop",label_zh:"篮球 IQ 工作坊",title_en:"Basketball IQ Workshop",title_zh:"篮球 IQ 工作坊",subtitle_en:"Turn game film into smarter decisions",subtitle_zh:"把比赛录像转化为更聪明的场上决策",body_en:"Basketball IQ Workshop connects video review with live court work so athletes can understand decisions, spacing, timing, and execution.",body_zh:"篮球 IQ 工作坊结合视频复盘和场上练习，帮助球员理解决策、空间、时机和执行。",productIntro_en:"Linked products below can be updated by staff as film sessions and court sessions change.",productIntro_zh:"下方产品可由后台随时更新，用于展示视频复盘和场上训练安排。",image:S,sessionIds:["bb-film-floor"],order:3,active:!0},{id:"basketball-shooting-lab",parentMenu:"basketball",label_en:"Shooting Lab",label_zh:"投篮实验室",title_en:"Shooting Lab",title_zh:"投篮实验室",subtitle_en:"Mechanics, reps, tracking, and confidence",subtitle_zh:"动作机制、重复练习、追踪和自信",body_en:"Shooting Lab focuses on shooting mechanics, footwork, shot preparation, repeatable rhythm, and high-quality reps.",body_zh:"投篮实验室专注于投篮动作、脚步、出手准备、稳定节奏和高质量重复练习。",productIntro_en:"Linked products below show current shooting lab schedule and pricing.",productIntro_zh:"下方产品会显示当前投篮实验室时间和价格。",image:S,sessionIds:["bb-shooting-lab"],order:4,active:!0},{id:"basketball-camps",parentMenu:"basketball",label_en:"Camps",label_zh:"篮球训练营",title_en:"Basketball Camps",title_zh:"篮球训练营",subtitle_en:"Seasonal basketball camp options in one schedule",subtitle_zh:"集中查看篮球训练营选择",body_en:"Basketball camps bring together fundamentals, advanced training, and focused small group coaching.",body_zh:"篮球训练营包含基础训练、进阶训练和精品小组指导。",productIntro_en:"Choose one or more camp products below. Staff can change camp products, prices, and schedules from the admin dashboard.",productIntro_zh:"可在下方选择训练营产品。工作人员可在后台随时调整产品、价格和时间。",image:S,sessionIds:["bb-u7-single","bb-u14-single","bb-small-u10"],order:5,active:!0},{id:"basketball-open-gym",parentMenu:"basketball",label_en:"Open Gym",label_zh:"开放球场",title_en:"Open Gym",title_zh:"开放球场",subtitle_en:"Drop in, play, and stack extra reps",subtitle_zh:"Drop-in 约球和额外训练时间",body_en:"Open gym gives players scheduled access to the court for extra shooting, games, and skill work.",body_zh:"开放球场让球员预约时间用于投篮、比赛和额外技术训练。",productIntro_en:"Open the open gym page for drop-in prices and staff-managed availability.",productIntro_zh:"进入开放球场页面查看 drop-in 价格和后台维护的可用时间。",image:S,sessionIds:["open-gym"],targetRoute:"open-court",order:6,active:!0},{id:"basketball-shooting-machines-rental",parentMenu:"basketball",label_en:"Shooting Machines Rental",label_zh:"投篮机租赁",title_en:"Shooting Machines Rental",title_zh:"投篮机租赁",subtitle_en:"Reserve shooting machine time",subtitle_zh:"预约投篮机训练时间",body_en:"Reserve the shooting machines for focused reps, form work, and extra shot volume.",body_zh:"可预约投篮机用于投篮重复练习、动作训练和额外出手量。",productIntro_en:"Open the court rental page and select Shooting Machine to view current price and availability.",productIntro_zh:"进入场地租赁页面并选择投篮机，即可查看当前价格和可预约时间。",image:ke,sessionIds:[],targetRoute:"program:court-rental",order:7,active:!0},{id:"basketball-league",parentMenu:"basketball",label_en:"League",label_zh:"联赛",title_en:"FirstLight Hoopers League",title_zh:"FirstLight Hoopers 联赛",subtitle_en:"Competitive adult basketball in a professional indoor facility",subtitle_zh:"专业室内场馆中的成人篮球联赛",body_en:"Competitive, organized adult basketball in a professional indoor facility.",body_zh:"在专业室内场馆中进行有组织、有竞争性的成人篮球。",productIntro_en:"Open the league page for format, schedule, and team details.",productIntro_zh:"进入联赛页面查看赛制、时间和球队详情。",image:S,sessionIds:[],targetRoute:"league",order:8,active:!0},{id:"volleyball-skills-training",parentMenu:"volleyball",label_en:"Skills Training",label_zh:"排球技术训练",title_en:"Volleyball Skills Training",title_zh:"排球技术训练",subtitle_en:"Foundations, advanced skill work, and elite development",subtitle_zh:"基础、进阶技术和精英发展",body_en:"Skills training helps volleyball players build fundamentals, improve game confidence, and progress into more advanced play.",body_zh:"排球技术训练帮助球员建立基础、提升比赛自信，并逐步进入更高阶的比赛能力。",productIntro_en:"Linked products below show current skill training levels, prices, and schedules.",productIntro_zh:"下方产品会显示当前技术训练级别、价格和时间。",image:S,sessionIds:["vb-u8","vb-u12","vb-u15"],order:1,active:!0},{id:"volleyball-private-training",parentMenu:"volleyball",label_en:"Private Training",label_zh:"私教训练",title_en:"Volleyball Private Training",title_zh:"排球私教训练",subtitle_en:"Personalized coaching for faster individual improvement",subtitle_zh:"个性化指导，帮助个人更快提升",body_en:"Private training is designed for athletes who want more personalized coaching and faster individual improvement.",body_zh:"私教训练适合希望获得个性化指导、加快个人提升的运动员。",productIntro_en:"Linked products below show private training options, pricing, and request details.",productIntro_zh:"下方产品会显示私教训练选项、价格和咨询入口。",image:S,sessionIds:["private-training"],privatePricing:!0,order:2,active:!0},{id:"volleyball-camps",parentMenu:"volleyball",label_en:"Camps",label_zh:"排球训练营",title_en:"Volleyball Camps",title_zh:"排球训练营",subtitle_en:"Seasonal camp options for volleyball athletes",subtitle_zh:"适合排球运动员的季节性训练营",body_en:"Volleyball camps help young athletes build a strong foundation through structured, age-appropriate coaching.",body_zh:"排球训练营通过结构化、适龄的训练帮助年轻球员建立扎实基础。",productIntro_en:"Linked camp products below show available dates, spots, pricing, and checkout actions.",productIntro_zh:"下方训练营产品会显示可选日期、名额、价格和报名入口。",image:S,sessionIds:["vb-summer-u8-single","vb-summer-u12-single","vb-summer-u15-single"],order:3,active:!0},{id:"volleyball-open-gym",parentMenu:"volleyball",label_en:"Open Gym",label_zh:"开放球场",title_en:"Volleyball Open Gym",title_zh:"排球开放球场",subtitle_en:"Flexible court access for reps and play",subtitle_zh:"灵活球场时间，用于练习和比赛",body_en:"Open gym gives volleyball players flexible court access outside structured training.",body_zh:"开放球场让排球学员在正式课程之外获得灵活场地时间。",productIntro_en:"Open the open gym page for drop-in prices and staff-managed availability.",productIntro_zh:"进入开放球场页面查看 drop-in 价格和后台维护的可用时间。",image:S,sessionIds:["open-gym"],targetRoute:"open-court",order:4,active:!0},{id:"court-rental-page",parentMenu:"court",label_en:"Court Rental",label_zh:"场地租赁",title_en:"Court Rental",title_zh:"场地租赁",subtitle_en:"Full court, half court, and shooting machine rental",subtitle_zh:"全场、半场和投篮机租赁",body_en:"Book court time for training, team practice, runs, filming, and private sessions.",body_zh:"可预约训练、球队练习、约球、拍摄和私教课程所需的场地时间。",productIntro_en:"Open the court rental page for live booking tools and current availability.",productIntro_zh:"进入租场页面查看实时预约工具和可用时间。",image:S,sessionIds:[],targetRoute:"program:court-rental",order:1,active:!0},{id:"court-open-gym-page",parentMenu:"court",label_en:"Open Gym",label_zh:"开放球场",title_en:"Open Gym",title_zh:"开放球场",subtitle_en:"Drop in, play, and stack extra reps",subtitle_zh:"Drop-in 约球和额外训练时间",body_en:"Open gym gives players scheduled access to the court for extra shooting, games, and skill work.",body_zh:"开放球场让球员预约时间用于投篮、比赛和额外技术训练。",productIntro_en:"Open the open gym page for drop-in prices and staff-managed availability.",productIntro_zh:"进入开放球场页面查看 drop-in 价格和后台维护的可用时间。",image:S,sessionIds:["open-gym"],targetRoute:"open-court",order:2,active:!0},{id:"membership-page",parentMenu:"membership",label_en:"Membership",label_zh:"会员",title_en:"Membership",title_zh:"会员",subtitle_en:"Training benefits, open gym access, and class discounts",subtitle_zh:"训练权益、开放球场和课程折扣",body_en:"Memberships support frequent athletes with open gym benefits, priority booking, and member pricing on selected training programs.",body_zh:"会员适合高频训练的运动员，可获得开放球场权益、优先预约和部分课程会员价。",productIntro_en:"Open the membership page to compare current membership options.",productIntro_zh:"进入会员页面查看当前会员选项。",image:S,sessionIds:["general-membership","training-benefit"],targetRoute:"program:membership",order:1,active:!0},{id:"merchandise-page",parentMenu:"merchandise",label_en:"Merchandise",label_zh:"周边商品",title_en:"Merchandise",title_zh:"周边商品",subtitle_en:"First Light apparel and gear",subtitle_zh:"First Light 服饰和装备",body_en:"Browse current First Light merchandise managed from the admin dashboard.",body_zh:"查看后台管理的 First Light 周边商品。",productIntro_en:"Open the merchandise page to view products, prices, and checkout options.",productIntro_zh:"进入商品页面查看产品、价格和结账选项。",image:S,sessionIds:[],targetRoute:"merchandise",order:1,active:!0},{id:"conditioning-page",parentMenu:"conditioning",label_en:"Conditioning",label_zh:"体能训练",title_en:"Conditioning Training",title_zh:"体能训练",subtitle_en:"Strength, agility, speed, and athletic performance",subtitle_zh:"力量、敏捷、速度和运动表现训练",body_en:"Conditioning helps athletes build strength, speed, mobility, agility, and movement quality for better long-term performance.",body_zh:"体能训练帮助运动员提升力量、速度、灵活性、敏捷性和动作质量，为长期运动表现打好基础。",productIntro_en:"Open the conditioning page to learn more and contact First Light for availability.",productIntro_zh:"进入体能训练页面了解详情，并联系 First Light 确认可预约时间。",image:S,sessionIds:[],targetRoute:"program:conditioning-training",order:1,active:!0}],programs:[{id:"basketball",type:"basketball",title_en:"Basketball",title_zh:"篮球训练",subtitle_en:"Skill development, camps, and small group training",subtitle_zh:"技术发展、夏令营和小组训练",detail_en:"From U7 fundamentals to U14+ advanced training, First Light helps players improve ball handling, shooting, passing, footwork, spacing, defense, decision-making, and competitive confidence.",detail_zh:"从 U7 基础到 U14+ 进阶训练，First Light 帮助球员提升控球、投篮、传球、脚步、空间、防守、决策和比赛自信。",audience_en:"Youth athletes, competitive players, and families looking for structured basketball development.",audience_zh:"适合青少年运动员、竞争型球员，以及希望获得系统篮球训练的家庭。",image:S,order:1,active:!0,featured:!0},{id:"volleyball",type:"volleyball",title_en:"Volleyball",title_zh:"排球训练",subtitle_en:"Beginner, advanced, elite, and private training",subtitle_zh:"初级、进阶、精英和私教训练",detail_en:"Volleyball programming includes beginner foundations, advanced skill development, elite-level competition prep, private training, and summer camp options.",detail_zh:"排球项目包含初级基础、进阶技术、精英比赛准备、私教训练和夏令营选择。",audience_en:"Players from U8 to U17 who want technical growth and more game-ready confidence.",audience_zh:"适合 U8 到 U17，希望提升技术和比赛能力的球员。",image:S,order:2,active:!0,featured:!0},{id:"conditioning-training",type:"conditioning",title_en:"Conditioning Training",title_zh:"体能训练",subtitle_en:"Strength, agility, speed, and athletic performance",subtitle_zh:"力量、敏捷、速度和运动表现训练",detail_en:"Conditioning Training helps athletes build the physical base they need to move better, train harder, and stay ready for basketball, volleyball, and competition. Sessions focus on strength, agility, footwork, speed, mobility, coordination, and sustainable athletic performance.",detail_zh:"体能训练帮助运动员建立更扎实的身体基础，更好地移动、更高质量训练，并为篮球、排球和比赛做好准备。课程重点包括力量、敏捷、脚步、速度、灵活性、协调性和长期运动表现。",audience_en:"Athletes who want better movement, strength, speed, injury resilience, and all-around performance.",audience_zh:"适合希望提升移动能力、力量、速度、抗伤能力和整体运动表现的运动员。",statusTitle_en:"COMING SOON",statusTitle_zh:"即将开放",statusBody_en:"",statusBody_zh:"",statusButton_en:"",statusButton_zh:"",statusRoute:"",image:S,order:3,active:!0,featured:!0},{id:"court-rental",type:"court",title_en:"Court Rental",title_zh:"场地租赁",subtitle_en:"Full court, half court, and shooting machine rental",subtitle_zh:"全场、半场和投篮机租赁",detail_en:"Book the full court, half court, or shooting machine for training, team practice, runs, filming, and private sessions. Rental bookings require waiver signing before checkout.",detail_zh:"可预订全场、半场或投篮机，用于训练、球队练习、约球、拍摄和私教课程。租场付款前必须签署免责声明。",audience_en:"Players, teams, trainers, clubs, and groups that need a professional indoor facility.",audience_zh:"适合球员、球队、教练、俱乐部和需要专业室内场地的团体。",image:S,order:4,active:!0,featured:!0},{id:"private-training",type:"training",title_en:"Private Training",title_zh:"私教训练",subtitle_en:"One-on-one focus. Unlimited potential.",subtitle_zh:"一对一专注训练，释放更多潜力",detail_en:"Private sessions are customized around age, skill level, position, goals, and schedule. Coaches focus on feedback, repetitions, and targeted growth.",detail_zh:"私教课程会根据年龄、水平、位置、目标和时间定制，教练专注于反馈、重复训练和针对性提升。",audience_en:"Athletes who want personalized development and direct coaching attention.",audience_zh:"适合希望获得个性化发展和直接指导的运动员。",image:S,order:5,active:!0,featured:!1},{id:"open-gym",type:"membership",title_en:"Open Gym",title_zh:"开放球场",subtitle_en:"Drop in, play, and stack extra reps",subtitle_zh:"Drop-in 约球和额外训练时间",detail_en:"Open gym gives members and non-members scheduled access to the court for extra shooting, games, and skill work.",detail_zh:"开放球场让会员和非会员都可以预约时间，用于投篮、比赛和额外技术训练。",audience_en:"Players who want flexible court time outside structured training.",audience_zh:"适合需要灵活球场时间的球员。",image:S,order:6,active:!0,featured:!0},{id:"membership",type:"membership",title_en:"Membership",title_zh:"会员",subtitle_en:"Training benefits, open gym access, and class discounts",subtitle_zh:"训练权益、开放球场和课程折扣",detail_en:"Memberships support frequent athletes with open gym benefits, priority booking, and member pricing on selected training programs.",detail_zh:"会员适合高频训练的运动员，可获得开放球场权益、优先预约和部分课程会员价。",audience_en:"Families and athletes planning to train regularly at First Light.",audience_zh:"适合计划长期在 First Light 训练的家庭和运动员。",image:S,order:7,active:!0,featured:!0}],coaches:[{id:"victor",name:"Coach Victor",role_en:"Basketball Skill Development",role_zh:"篮球技术发展",bio_en:"Coach Victor brings high-level experience from Team Canada U17, NCAA Division I, U SPORTS, and professional basketball in Europe. He earned BioSteel All-Canadian recognition, won a Big Sky Conference Championship with Eastern Washington University, competed in March Madness, and later continued at SFU and UBC.",bio_zh:"Victor 教练拥有加拿大 U17 国家队、NCAA Division I、U SPORTS 与欧洲职业篮球经验。他曾获得 BioSteel All-Canadian 荣誉，随 Eastern Washington University 赢得 Big Sky 冠军并参加 March Madness，之后继续在 SFU 与 UBC 打球。",image:S,portrait:S,programs:"basketball, private-training",order:1,active:!0,featured:!0},{id:"anthony",name:"Anthony Zhao",role_en:"Volleyball Coach",role_zh:"排球教练",bio_en:"Current Douglas Men's Volleyball player, Provincial All-Star selection, 1st place at BC Provincial, 1st place Best of West, and multiple years of coaching experience with school teams and beach volleyball.",bio_zh:"现役 Douglas 男排球员，省级全明星，BC Provincial 冠军，Best of West 冠军，并拥有多年校队与沙排执教经验。",image:S,portrait:S,programs:"volleyball, private-training",order:2,active:!0,featured:!0},{id:"steven",name:"Steven Yan",role_en:"Volleyball Coach",role_zh:"排球教练",bio_en:"Team BC Indoor Volleyball Captain, Canada Cup 18U All-Star selection, BC Provincial champion and MVP, BC Summer Beach Volleyball champion, and two-time National Beach Volleyball bronze medalist.",bio_zh:"Team BC 室内排球队长，Canada Cup 18U 全明星，BC Provincial 冠军与 MVP，BC Summer Beach Volleyball 冠军，两次全国沙排铜牌获得者。",image:S,portrait:S,programs:"volleyball, private-training",order:3,active:!0,featured:!0}],sessions:[{id:"bb-u7-single",programId:"basketball",type:"basketball",title_en:"Basketball U7-U12",title_zh:"篮球 U7-U12",desc_en:"Basketball fundamentals training for young athletes: ball handling, shooting mechanics, passing, footwork, body control, spacing, cutting, and defensive fundamentals.",desc_zh:"青少年篮球基础训练：控球、投篮机制、传球、脚步、身体控制、空间、切入和防守基础。",dates:"Jun 29-Jul 3, Jul 6-Jul 10, Jul 13-Jul 17, Jul 20-Jul 24, Jul 27-Jul 31, Aug 3-Aug 7, Aug 10-Aug 14, Aug 17-Aug 21, Aug 24-Aug 28, Aug 31-Sep 4",datesList:be,dateSummary:"10 weekly options · Jun 29-Sep 4",dateSummary_zh:"10 个周次 · 6 月 29 日-9 月 4 日",time:"9:00 AM - 12:00 PM",regularPrice:245,memberPrice:220,packages:[["2 weeks",440],["3 weeks",650],["4 weeks",860]],capacity:24,booked:8,waiver:!0,active:!0},{id:"bb-u14-single",programId:"basketball",type:"basketball",title_en:"Basketball U14+",title_zh:"篮球 U14+",desc_en:"Advanced basketball skills training with higher intensity, game-focused drills, 1-on-1, 2-on-2, 3-on-3, decision-making, and competitive scenarios.",desc_zh:"高阶篮球技能训练，包含更高强度、比赛化训练、一对一、二对二、三对三、决策和竞争场景。",dates:"Summer 2026 weekly options",datesList:be,dateSummary:"10 weekly options · Jun 29-Sep 4",dateSummary_zh:"2026 夏季 10 个周次 · 6 月 29 日-9 月 4 日",time:"12:00 PM - 3:00 PM",regularPrice:325,memberPrice:295,packages:[["2 weeks",590],["3 weeks",865],["4 weeks",1150],["Whole summer",1850]],capacity:20,booked:5,waiver:!0,active:!0},{id:"bb-small-u10",programId:"basketball",type:"basketball",title_en:"Basketball Small Group U10-U12",title_zh:"篮球小组 U10-U12",desc_en:"Premium small group training with max 6 players for focused coaching, more repetitions, and direct feedback.",desc_zh:"最多 6 人精品小组训练，提供更多重复练习、专注指导和直接反馈。",dates:"Summer 2026 weekly options",datesList:be,dateSummary:"10 weekly options · Jun 29-Sep 4",dateSummary_zh:"2026 夏季 10 个周次 · 6 月 29 日-9 月 4 日",time:"2:00 PM - 4:00 PM",regularPrice:425,memberPrice:385,packages:[["2 weeks",770],["3 weeks",1150],["4 weeks",1500],["Whole summer",2900]],capacity:6,booked:2,waiver:!0,active:!0},{id:"bb-film-floor",programId:"basketball",type:"basketball",title_en:"Basketball IQ Workshop",title_zh:"篮球 IQ 工作坊",desc_en:"Video review connected to live court reps for decision-making, spacing, timing, and execution.",desc_zh:"结合视频复盘和场上练习，训练决策、空间、时机和执行。",dates:"By appointment",dateSummary_zh:"需预约",time:"Flexible",regularPrice:95,memberPrice:85,capacity:8,booked:0,waiver:!0,active:!0},{id:"bb-shooting-lab",programId:"basketball",type:"basketball",title_en:"Shooting Lab",title_zh:"投篮实验室",desc_en:"Shooting mechanics, footwork, shot preparation, rhythm, tracking, and high-quality repetitions.",desc_zh:"投篮动作、脚步、出手准备、节奏、追踪和高质量重复练习。",dates:"Tue / Thu",dateSummary_zh:"周二 / 周四",time:"5:00 PM - 6:30 PM",regularPrice:65,memberPrice:55,capacity:10,booked:3,waiver:!0,active:!0},{id:"vb-u8",programId:"volleyball",type:"volleyball",title_en:"U8-U12 Beginner Volleyball",title_zh:"U8-U12 初级排球",desc_en:"For players new to volleyball. Focuses on passing, serving, basic setting, footwork, and rules.",desc_zh:"适合排球初学者，重点训练垫球、发球、基础传球、脚步和规则理解。",dates:"May 11, May 18, June 1, June 8, June 15, June 22",datesList:ct.beginner,dateSummary:"6 Sunday sessions · May 11-Jun 22",dateSummary_zh:"6 节周日课程 · 5 月 11 日-6 月 22 日",time:"6:00 PM - 7:30 PM",regularPrice:45,memberPrice:39,capacity:18,booked:7,waiver:!0,active:!0},{id:"vb-u12",programId:"volleyball",type:"volleyball",title_en:"U12-U15 Advanced Volleyball",title_zh:"U12-U15 进阶排球",desc_en:"For players with solid fundamentals. Focuses on attacking, blocking, advanced defense, serve receive, transition play, and decision-making.",desc_zh:"适合有基础的球员，训练进攻、拦网、高阶防守、接发球、转换和比赛决策。",dates:"May 12, May 14, May 19, May 21, May 26, May 28, June 2, June 4, June 11, June 18, June 25",datesList:ct.advanced,dateSummary:"11 sessions · May 12-Jun 25",dateSummary_zh:"11 节课程 · 5 月 12 日-6 月 25 日",time:"6:00 PM - 8:00 PM",regularPrice:45,memberPrice:39,capacity:18,booked:11,waiver:!0,active:!0},{id:"vb-u15",programId:"volleyball",type:"volleyball",title_en:"U15-U17 Elite Volleyball",title_zh:"U15-U17 精英排球",desc_en:"High-intensity training for competitive players: position-specific training, advanced tactics, competitive drills, leadership, and performance under pressure.",desc_zh:"竞争型球员高强度训练：专项位置训练、高阶战术、竞技训练、领导力和压力下表现。",dates:"May 15, May 29, June 5, June 12, June 19, June 26",datesList:ct.elite,dateSummary:"6 Friday sessions · May 15-Jun 26",dateSummary_zh:"6 节周五课程 · 5 月 15 日-6 月 26 日",time:"6:00 PM - 8:00 PM",regularPrice:45,memberPrice:39,capacity:18,booked:14,waiver:!0,active:!0},{id:"vb-summer-u8-single",programId:"volleyball",type:"volleyball",title_en:"Volleyball U8-U11",title_zh:"排球 U8-U11",desc_en:"U8-U14 volleyball fundamentals camp for young athletes building passing, setting, serving, footwork, movement, hand-eye coordination, and basic hitting mechanics.",desc_zh:"U8-U14 排球基础夏令营，帮助年轻球员建立垫球、传球、发球、脚步、移动、手眼协调和基础扣球动作。",dates:"Summer 2026 weekly options",datesList:be,dateSummary:"10 weekly options · Jun 29-Sep 4",dateSummary_zh:"2026 夏季 10 个周次 · 6 月 29 日-9 月 4 日",time:"9:00 AM - 11:30 AM",regularPrice:325,memberPrice:325,packages:[["2 weeks",590],["3 weeks",865],["4 weeks",1150]],capacity:18,booked:6,waiver:!0,active:!0},{id:"vb-summer-u12-single",programId:"volleyball",type:"volleyball",title_en:"Volleyball U12-U14",title_zh:"排球 U12-U14",desc_en:"Volleyball summer camp for athletes developing stronger fundamentals and court confidence.",desc_zh:"排球夏令营，适合希望提升基础技术和场上自信的运动员。",dates:"Summer 2026 weekly options",datesList:be,dateSummary:"10 weekly options · Jun 29-Sep 4",dateSummary_zh:"2026 夏季 10 个周次 · 6 月 29 日-9 月 4 日",time:"3:00 PM - 6:00 PM",regularPrice:325,memberPrice:325,packages:[["2 weeks",590],["3 weeks",865],["4 weeks",1150]],capacity:18,booked:5,waiver:!0,active:!0},{id:"vb-summer-u15-single",programId:"volleyball",type:"volleyball",title_en:"Volleyball U15-U17",title_zh:"排球 U15-U17",desc_en:"Advanced volleyball summer training for athletes ready for higher-intensity skill development, match situations, and competitive game tempo.",desc_zh:"进阶排球暑期训练，适合准备接受更高强度技术发展、比赛场景和竞技节奏训练的运动员。",dates:"Summer 2026 weekly options",datesList:be,dateSummary:"10 weekly options · Jun 29-Sep 4",dateSummary_zh:"2026 夏季 10 个周次 · 6 月 29 日-9 月 4 日",time:"6:00 PM - 8:00 PM",regularPrice:295,memberPrice:295,packages:[["2 weeks",590],["3 weeks",865],["4 weeks",1150]],capacity:18,booked:3,waiver:!0,active:!0},{id:"private-training",programId:"private-training",type:"training",title_en:"Private Training",title_zh:"私教训练",desc_en:"Customized private sessions based on the athlete's age, skill level, position, and personal goals.",desc_zh:"根据球员年龄、技术水平、位置和个人目标定制的私教课程。",dates:"By appointment",dateSummary_zh:"需预约",time:"Flexible",regularPrice:120,memberPrice:105,capacity:1,booked:0,waiver:!0,active:!0},{id:"open-gym",programId:"open-gym",type:"membership",title_en:"Open Gym Time",title_zh:"开放球场时间",desc_en:"Drop-in open gym time for members and non-members.",desc_zh:"会员和非会员均可预约的开放球场时间。",dates:"Mon/Wed/Fri",dateSummary_zh:"周一 / 周三 / 周五",time:"8:00 PM - 10:00 PM",regularPrice:18,memberPrice:0,capacity:30,booked:9,waiver:!0,active:!0},{id:"general-membership",programId:"membership",type:"membership",title_en:"Regular Membership",title_zh:"普通会员",desc_en:"No training included. Best for open gym and frequent drop-in use.",desc_zh:"不包含训练，适合开放球场和频繁 drop-in 使用。",dates:"Monthly",dateSummary_zh:"按月",time:"Member access",regularPrice:49,memberPrice:49,capacity:200,booked:31,waiver:!0,active:!0},{id:"training-benefit",programId:"membership",type:"membership",title_en:"Membership Plus",title_zh:"训练优惠会员",desc_en:"Member training discount, open gym benefits, and priority booking.",desc_zh:"享受课程会员价、开放球场权益和优先预约。",dates:"Monthly",dateSummary_zh:"按月",time:"Member access",regularPrice:99,memberPrice:99,capacity:200,booked:24,waiver:!0,active:!0}],courtSlots:[{id:"full-1",programId:"court-rental",courtType:"Full Size Court",title_zh:"全场",date:"2026-06-01",time:"6:00 PM - 8:00 PM",price:175,capacity:20,booked:!1,minimum:"Minimum 2H",image:Se},{id:"full-2",programId:"court-rental",courtType:"Full Size Court",title_zh:"全场",date:"2026-06-02",time:"7:00 PM - 9:00 PM",price:175,capacity:20,booked:!0,minimum:"Minimum 2H",image:Se},{id:"half-1",programId:"court-rental",courtType:"Half Size Court",title_zh:"半场",date:"2026-06-01",time:"4:00 PM - 6:00 PM",price:95,capacity:12,booked:!1,minimum:"Minimum 2H",image:xe},{id:"machine-1",programId:"court-rental",courtType:"Shooting Machine Rental",title_zh:"投篮机",date:"2026-06-03",time:"5:00 PM - 6:00 PM",price:105,capacity:3,booked:!1,minimum:"Minimum 1H",image:ke}],openCourtSlots:[{id:"open-wed",title_en:"Basketball Drop-In",title_zh:"篮球开放球场",date:"2026-05-27",startTime:"08:00",endTime:"10:30",spots:12,notes_en:"Main court drop-in",notes_zh:"主场 drop-in",active:!0},{id:"open-thu",title_en:"Basketball Drop-In",title_zh:"篮球开放球场",date:"2026-05-28",startTime:"08:30",endTime:"10:00",spots:10,notes_en:"Main court drop-in",notes_zh:"主场 drop-in",active:!0},{id:"open-fri",title_en:"Basketball Drop-In",title_zh:"篮球开放球场",date:"2026-05-29",startTime:"13:00",endTime:"14:30",spots:14,notes_en:"Afternoon drop-in",notes_zh:"下午 drop-in",active:!0},{id:"open-sat",title_en:"Basketball Drop-In",title_zh:"篮球开放球场",date:"2026-05-30",startTime:"10:00",endTime:"15:00",spots:18,notes_en:"Saturday drop-in",notes_zh:"周六开放",active:!0},{id:"open-hidden",title_en:"Hidden Drop-In",title_zh:"隐藏开放球场",date:"2026-05-26",startTime:"09:00",endTime:"10:00",spots:8,notes_en:"Inactive sample",notes_zh:"隐藏示例",active:!1}],bookingServices:La(),products:[{id:"tee",title_en:"First Light T-shirt",title_zh:"First Light T恤",price:35,stock:40,sizes:"S, M, L, XL",image:S,order:1,active:!0},{id:"hoodie",title_en:"First Light Hoodie",title_zh:"First Light 连帽衫",price:68,stock:25,sizes:"S, M, L, XL",image:S,order:2,active:!0}],activities:[{id:"summer-camp-update",title_en:"Summer Camp Registration",title_zh:"夏令营报名",summary_en:"Add or update camp weeks, special events, and seasonal announcements from the admin dashboard.",summary_zh:"可在后台随时新增或更新夏令营、特别活动和季节公告。",dateLabel_en:"Summer 2026",dateLabel_zh:"2026 夏季",button_en:"View Programs",button_zh:"查看课程",route:"programs",image:S,order:1,active:!0,featured:!0}],social:{instagram:"https://www.instagram.com/firstlightvancouver",facebook:"https://www.facebook.com/firstlighttrainingcenter",tiktok:"",wechat:"firstlightvan",wechatQr:Ci},emailTemplates:{en:"Your First Light booking is confirmed. Please review your selected sessions, waiver status, address, and contact information below.",zh:"您的 First Light 预订已确认。请查看以下课程/场地、免责声明、地址和联系方式。"},students:[{id:B,fullName:"Ryan Chen",email:"member@test.com",phone:"604-111-1111",birthDate:"2012-08-18",age:13,address:"165-13631 Vulcan Way, Richmond, BC V6V 1K4",primarySport:"Basketball",experience:"Intermediate",preferredClassTime:"Weekends after 10 AM",guardianName:"Maggie Chen",guardianRelation:"Mother",guardianPhone:"604-222-2222",guardianEmail:"parent@test.com",emergencyName:"David Chen",emergencyPhone:"604-333-3333",medicalNotes:"No major medical notes. Bring ankle brace for intense training.",allergies:"None noted",injuries:"Previous mild ankle sprain",staffNotes:"Test member account for front desk walkthrough.",source:"test account",createdAt:"2026-05-20T10:00:00.000Z",updatedAt:"2026-05-20T10:00:00.000Z"}],enrollments:[{id:"enroll-test-basketball-camp",orderId:"BK-TEST-MEMBER",studentId:B,courseSessionId:"bb-u7-single",title:"Basketball U7-U12",programId:"basketball",status:"confirmed",quantity:1,createdAt:"2026-05-20T10:00:00.000Z"},{id:"enroll-test-shooting-lab",orderId:"BK-TEST-MEMBER",studentId:B,courseSessionId:"bb-shooting-lab",title:"Shooting Lab",programId:"basketball",status:"confirmed",quantity:1,createdAt:"2026-05-20T10:00:00.000Z"}],creditPackages:[{id:"pkg-test-basketball-10",orderId:"BK-TEST-MEMBER",studentId:B,studentName:"Ryan Chen",programId:"basketball",title:"Basketball Training 10 Pack",originalCredits:10,balance:7,purchasedAt:"2026-05-20T10:00:00.000Z",expiresAt:"2026-09-30"},{id:"pkg-test-court-5",orderId:"BK-TEST-MEMBER",studentId:B,studentName:"Ryan Chen",programId:"court-rental",title:"Court & Shooting Machine 5 Pack",originalCredits:5,balance:3,purchasedAt:"2026-05-20T10:00:00.000Z",expiresAt:"2026-08-31"},{id:"pkg-test-open-gym-8",orderId:"BK-TEST-MEMBER",studentId:B,studentName:"Ryan Chen",programId:"open-gym",title:"Open Gym 8 Pack",originalCredits:8,balance:6,purchasedAt:"2026-05-20T10:00:00.000Z",expiresAt:"2026-08-31"},{id:"pkg-test-membership",orderId:"BK-TEST-MEMBER",studentId:B,studentName:"Ryan Chen",programId:"membership",title:"Membership Plus",originalCredits:1,balance:1,purchasedAt:"2026-05-20T10:00:00.000Z",expiresAt:"2026-06-30"}],creditTransactions:[{id:"tx-test-basketball-purchase",packageIds:["pkg-test-basketball-10"],studentId:B,programId:"basketball",type:"purchase",units:10,balanceAfter:10,reason:"purchase",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-20T10:00:00.000Z"},{id:"tx-test-basketball-usage",packageIds:["pkg-test-basketball-10"],studentId:B,programId:"basketball",type:"usage",units:-3,balanceAfter:7,reason:"member reservation",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-24T10:00:00.000Z"},{id:"tx-test-court-purchase",packageIds:["pkg-test-court-5"],studentId:B,programId:"court-rental",type:"purchase",units:5,balanceAfter:5,reason:"purchase",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-20T10:00:00.000Z"},{id:"tx-test-court-usage",packageIds:["pkg-test-court-5"],studentId:B,programId:"court-rental",type:"usage",units:-2,balanceAfter:3,reason:"member reservation",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-25T10:00:00.000Z"},{id:"tx-test-open-gym-purchase",packageIds:["pkg-test-open-gym-8"],studentId:B,programId:"open-gym",type:"purchase",units:8,balanceAfter:8,reason:"purchase",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-20T10:00:00.000Z"},{id:"tx-test-open-gym-usage",packageIds:["pkg-test-open-gym-8"],studentId:B,programId:"open-gym",type:"usage",units:-2,balanceAfter:6,reason:"member reservation",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-26T10:00:00.000Z"},{id:"tx-test-membership-purchase",packageIds:["pkg-test-membership"],studentId:B,programId:"membership",type:"purchase",units:1,balanceAfter:1,reason:"membership benefit",orderId:"BK-TEST-MEMBER",createdAt:"2026-05-20T10:00:00.000Z"}],waiverSignatures:[{id:"waiver-test-member",studentId:B,orderId:"BK-TEST-MEMBER",templateVersion:"2026.06",signerName:"Maggie Chen",signerRelation:"Mother",participantType:"minor",templateAudience:"minor",signedAt:"2026-05-20T10:05:00.000Z"}],bookings:[{id:"BK-TEST-MEMBER",kind:"order",status:"confirmed",participantType:"minor",studentId:B,studentName:"Ryan Chen",customer:{name:"Maggie Chen",email:"parent@test.com",phone:"604-222-2222",participantName:"Ryan Chen",participantEmail:"member@test.com",participantType:"minor"},paymentMethod:"VISA / Mastercard",paymentStatus:"paid-demo",lockStatus:"locked",paymentReference:"TEST-PAID",paymentMessage:"Test account payment approved.",paymentConfirmedAt:"2026-05-20T10:03:00.000Z",language:"en",items:[{kind:"session",id:"bb-u7-single",title:"Basketball U7-U12",programId:"basketball",meta:"Jun 29-Jul 3 / 9:00 AM - 12:00 PM",price:245},{kind:"package",id:"basketball-10-pack",title:"Basketball Training 10 Pack",programId:"basketball",credits:10,price:850},{kind:"package",id:"court-5-pack",title:"Court & Shooting Machine 5 Pack",programId:"court-rental",credits:5,price:500},{kind:"package",id:"open-gym-8-pack",title:"Open Gym 8 Pack",programId:"open-gym",credits:8,price:120},{kind:"session",id:"training-benefit",title:"Membership Plus",programId:"membership",meta:"Active through Jun 30",price:99}],total:1814,emailSent:"demo-prepared",createdAt:"2026-05-20T10:00:00.000Z",waiverSignedAt:"2026-05-20T10:05:00.000Z",waiverSignatureId:"waiver-test-member"},{id:"BK-TEST-COURT-USAGE",kind:"resource",source:"member",serviceId:"main-half-a",serviceLabel_en:"Main Court Half A",serviceLabel_zh:"主场半场 A",studentId:B,studentName:"Ryan Chen",programId:"court-rental",title:"Main Court Half A",date:"2026-06-06",startTime:"16:00",endTime:"17:00",status:"confirmed",paymentMethod:"Member Credit",paymentStatus:"member-credit",lockStatus:"locked",memberUsage:!0,creditPackageId:"pkg-test-court-5",creditTransactionId:"tx-test-court-usage",startsAt:"2026-06-06T16:00:00.000",createdAt:"2026-05-25T10:00:00.000Z"},{id:"BK-TEST-OPEN-GYM-USAGE",kind:"open-gym",source:"member",serviceId:"open-sat",serviceLabel_en:"Basketball Drop-In",serviceLabel_zh:"篮球开放球场",openGymSlotId:"open-sat",studentId:B,studentName:"Ryan Chen",programId:"open-gym",title:"Basketball Drop-In",date:"2026-05-30",startTime:"10:00",endTime:"15:00",status:"confirmed",paymentMethod:"Member Credit",paymentStatus:"member-credit",lockStatus:"locked",memberUsage:!0,creditPackageId:"pkg-test-open-gym-8",creditTransactionId:"tx-test-open-gym-usage",startsAt:"2026-05-30T10:00:00.000",createdAt:"2026-05-26T10:00:00.000Z"}]};let r=Ai(),M=JSON.parse(localStorage.getItem("firstlight_cart")||"[]"),I=location.hash.replace("#","")||"home",A={loading:!1,loaded:!1,error:"",submissions:[]};function Ai(){const e=localStorage.getItem("firstlight_state");if(!e)return structuredClone(L);try{const t=JSON.parse(e);return t.appVersion!==L.appVersion?structuredClone(L):Mi(t)}catch{return structuredClone(L)}}function Mi(e){const t=Fa(structuredClone(L),e);return delete t.pages.intro,t.dropdownPages=Ri(e.dropdownPages||t.dropdownPages),t.globalImages=qi(e.globalImages||t.globalImages,e),t.dropdownCatalogVersion=L.dropdownCatalogVersion,Di(t),Li(t),t.bookingServices=Ea(e.bookingServices||t.bookingServices),Bi(t),Ei(t),Fi(t),Ni(t),zi(t),t}function zi(e){const t=e.programs?.find(a=>a.id==="conditioning-training");return t?.statusTitle_zh==="COMING SOON"&&(t.statusTitle_zh="即将开放"),e}function Ni(e){const t=["statusTitle_en","statusTitle_zh","statusBody_en","statusBody_zh","statusButton_en","statusButton_zh","statusRoute"];for(const a of L.programs||[]){const n=e.programs?.find(i=>i.id===a.id);if(n)for(const i of t)n[i]===void 0&&a[i]!==void 0&&(n[i]=a[i])}return e}function Li(e){const t=["vb-summer-u8-single","vb-summer-u12-single","vb-summer-u15-single"],a=["vb-summer-u8-multi","vb-summer-u12-multi","vb-summer-u15-multi"],n=["Single Week","Multi-Week Special"],i=e.dropdownPages?.find(l=>l.id==="volleyball-camps"),o=L.dropdownPages.find(l=>l.id==="volleyball-camps");i&&(i.sessionIds=["vb-summer-u8-single","vb-summer-u12-single","vb-summer-u15-single"],o&&(i.label_en=o.label_en,i.title_en=o.title_en,i.subtitle_en=o.subtitle_en,i.body_en=o.body_en,i.productIntro_en=o.productIntro_en,i.label_zh=o.label_zh,i.title_zh=o.title_zh,i.subtitle_zh=o.subtitle_zh,i.body_zh=o.body_zh,i.productIntro_zh=o.productIntro_zh)),e.sessions=(e.sessions||[]).filter(l=>!a.includes(l.id));for(const l of t){const c=L.sessions.find(u=>u.id===l);if(!c)continue;let d=e.sessions.find(u=>u.id===l);if(!d){e.sessions.push(structuredClone(c));continue}n.some(u=>d.title_en?.includes(u))&&(d.title_en=c.title_en),(d.title_zh?.includes("单周")||d.title_zh?.includes("多周"))&&(d.title_zh=c.title_zh),/single[- ]week|multi[- ]week/i.test(d.desc_en||"")&&(d.desc_en=c.desc_en),(d.desc_zh?.includes("单周")||d.desc_zh?.includes("多周"))&&(d.desc_zh=c.desc_zh),d.packages=structuredClone(c.packages),d.datesList=structuredClone(c.datesList),d.dateSummary=c.dateSummary,d.dateSummary_zh=c.dateSummary_zh}return e}function Bi(e){const t=L.social.facebook.replace("firstlighttrainingcenter","firslighttrainingcenter");return e.social?.facebook===t&&(e.social.facebook=L.social.facebook),e}function Ei(e){const t="warehouse-hardly";return e.pages?.about?.body_en?.includes(t)&&(e.pages.about.body_en=e.pages.about.body_en.replace(t,"warehouse, hardly")),e}function Di(e){const t=L.dropdownPages.find(o=>o.id==="basketball-film-to-floor"),a=e.dropdownPages?.find(o=>o.id==="basketball-film-to-floor");t&&a&&(a.label_en==="Film-to-Floor Training"&&(a.label_en=t.label_en),a.title_en==="Film-to-Floor Training"&&(a.title_en=t.title_en),a.subtitle_en==="Turn game film into court habits"&&(a.subtitle_en=t.subtitle_en),a.body_en?.includes("Film-to-Floor Training")&&(a.body_en=a.body_en.replaceAll("Film-to-Floor Training","Basketball IQ Workshop")),a.label_zh==="录像到实战训练"&&(a.label_zh=t.label_zh),a.title_zh==="录像到实战训练"&&(a.title_zh=t.title_zh),a.subtitle_zh==="把比赛录像转化为场上习惯"&&(a.subtitle_zh=t.subtitle_zh));const n=L.sessions.find(o=>o.id==="bb-film-floor"),i=e.sessions?.find(o=>o.id==="bb-film-floor");return n&&i&&(i.title_en==="Film-to-Floor Training"&&(i.title_en=n.title_en),i.title_zh==="录像到实战训练"&&(i.title_zh=n.title_zh)),e}function Fi(e){const t=a=>String(a||"").replaceAll("General Membership","Regular Membership").replaceAll("Training With Benefit","Membership Plus");for(const a of e.sessions||[])a.id==="general-membership"&&(a.title_en=t(a.title_en),a.title_zh=a.title_zh||a.title_en),a.id==="training-benefit"&&(a.title_en=t(a.title_en),a.title_zh=a.title_zh||a.title_en);for(const a of e.creditPackages||[])a.title=t(a.title);for(const a of e.bookings||[])for(const n of a.items||[])n.title=t(n.title);return e}function Ri(e=[]){const t=structuredClone(e),a=new Set(t.map(n=>n.id));for(const n of L.dropdownPages)a.has(n.id)||t.push(structuredClone(n));return t}function qi(e=[],t={}){const a=new Map((e||[]).map(l=>[l.id,l])),n=L.globalImages.map(l=>{const c=a.get(l.id),d=l.id==="home-hero-background"&&!c&&t.pages?.home?.image?{image:t.pages.home.image,imagePositionX:t.pages.home.imagePositionX,imagePositionY:t.pages.home.imagePositionY}:{};return Te({...l,...d,...c||{}})}),i=new Set(L.globalImages.map(l=>l.id)),o=(e||[]).filter(l=>l.id&&!i.has(l.id)).map(l=>Te(l));return[...n,...o].sort((l,c)=>Number(l.order||999)-Number(c.order||999))}function La(){return Ve.map(e=>Ba(e))}function Ba(e){const t=wi.has(e.id);return{...ft(e),public:t?!1:e.public!==!1,active:t?!1:e.active!==!1}}function ft(e={},t={}){const a=Number(e.nonMemberPrice??t.nonMemberPrice??e.price??t.price??0),n=Number(e.memberPrice??t.memberPrice??a);return{...e,price:a,nonMemberPrice:a,memberPrice:n}}function Ea(e=[]){const t=new Map((e||[]).map(o=>[o.id,o])),a=La().map(o=>{const l=t.get(o.id),c=l?ft(l,o):{},d=l?{...o,...l,...c}:o;return Ba(d)}),n=new Set(Ve.map(o=>o.id)),i=(e||[]).filter(o=>o.id&&!n.has(o.id)).map(o=>({...ft(o),public:o.public!==!1,active:o.active!==!1}));return Da([...a,...i])}function Da(e=[]){const t=e.find(a=>a.id==="main-half");return t?e.map(a=>["main-half-a","main-half-b"].includes(a.id)?{...a,price:t.price,nonMemberPrice:t.nonMemberPrice,memberPrice:t.memberPrice,useLabel_en:t.useLabel_en,useLabel_zh:t.useLabel_zh,capacity:t.capacity,minDurationMinutes:t.minDurationMinutes,image:t.image,imageKey:t.imageKey,imagePositionX:t.imagePositionX,imagePositionY:t.imagePositionY}:a):e}function Fa(e,t){for(const a of Object.keys(t||{}))t[a]&&typeof t[a]=="object"&&!Array.isArray(t[a])&&e[a]?Fa(e[a],t[a]):e[a]=t[a];return e}function N(){try{return localStorage.setItem("firstlight_state",JSON.stringify(r)),!0}catch(e){const t=e?.name==="QuotaExceededError"||e?.code===22;return E(t?"Could not save because the browser storage is full. Upload a smaller image or remove older uploaded images.":`Could not save changes: ${e?.message||"browser storage failed"}`),!1}}function W(){localStorage.setItem("firstlight_cart",JSON.stringify(M))}function ue(e={},t=C("addedToCart")){const a=ae(e)||e.title||s("cartLabel");sessionStorage.setItem("cartNotice",a),sessionStorage.setItem("cartNoticeLabel",t)}function xi(){const e=sessionStorage.getItem("cartNotice");if(!e)return"";const t=sessionStorage.getItem("cartNoticeLabel")||C("addedToCart");return sessionStorage.removeItem("cartNotice"),sessionStorage.removeItem("cartNoticeLabel"),`
    <div class="cartNotice" role="status" aria-live="polite">
      <span>${p(t)}</span>
      <strong>${p(e)}</strong>
      <button type="button" data-route="cart">${s("cartLabel")}</button>
    </div>
  `}function Oi(){clearTimeout(Xt);const e=document.querySelector(".cartNotice");e&&(Xt=setTimeout(()=>{e.classList.add("isHiding"),window.setTimeout(()=>e.remove(),260)},Ii))}function C(e){return Oe[r.language][e]||e}function s(e){const t=String(e).split(".");let a=I==="admin"?Oe.en:Oe[r.language];for(const n of t)a=a?.[n];if(a!==void 0)return a;a=Oe.en;for(const n of t)a=a?.[n];return a??e}function f(e,t){return e[`${t}_${r.language}`]||e[`${t}_en`]||e[t]||""}function U(e,t,a=""){return f(r.pages?.[e]||{},t)||a}function He(e,t){return["left","center","right","top","bottom"].includes(e)?e:t}function Te(e={}){return{...e,imagePositionX:He(e.imagePositionX,"center"),imagePositionY:He(e.imagePositionY,"center")}}function he(e,t=""){const a=(r.globalImages||[]).find(n=>n.id===e&&n.active!==!1)||(L.globalImages||[]).find(n=>n.id===e)||null;return Te(a||{id:e,image:t})}function te(e,t=""){return he(e,t).image||t}function Ui(e){return(r.globalImages||L.globalImages||[]).filter(t=>t.group===e&&t.active!==!1).map(t=>Te(t)).sort((t,a)=>Number(t.order||999)-Number(a.order||999))}function Ra(e={},t="image"){const a=He(e[`${t}PositionX`]||e.imagePositionX,"center"),n=He(e[`${t}PositionY`]||e.imagePositionY,"center");return`${a} ${n}`}function le(e={},t="image",a="",n="--tile"){const i=e?.[t]||a;return`${n}:url('${k(i)}');--image-position:${k(Ra(e,t))}`}function Me(e={},t="image"){return`--image-position:${k(Ra(e,t))}`}function dt(e="default"){return e==="machine"?he("court-machine",ke):e==="half"?he("court-half",xe):e==="full"?he("court-full",Se):he("default-court",S)}function ji(e){return p(String(e||"")).replace(/\s*[-–—]\s*/g,"&#8209;")}function ze(e){const t=String(e||"").trim(),a=t.match(/^(.*\S)\s+(U\d+(?:\s*[-–—]\s*U?\d+|\+)?)$/i);return a?`${p(a[1])}<span class="titleAgeRange">${ji(a[2])}</span>`:p(t).replace(/(U\d+)\s*[-–—]\s*(U?\d+)/gi,(n,i,o)=>`${i}&#8209;${o}`)}function ie(e){return(r.dropdownPages||[]).filter(t=>t.parentMenu===e&&t.active!==!1).sort((t,a)=>Number(t.order||999)-Number(a.order||999))}function re(e){return e.targetRoute||`dropdown:${e.id}`}function V(e){return ie(e).some(t=>re(t)===I)}function qa(e){return{basketball:s("basketball"),volleyball:s("volleyball"),conditioning:s("conditioning"),court:s("courtRental"),membership:s("membership"),merchandise:s("merchandise")}[e]||s("basketball")}function w(e){return`CA$${Number(e).toLocaleString("en-CA",{minimumFractionDigits:0})}`}function Ne(e){if(!e)return s("memberAccount.tbd");const t=new Date(e);return Number.isNaN(t.getTime())?String(e):t.toLocaleString("en-CA",{dateStyle:"medium",timeStyle:"short"})}function Zt(e){return e||s("memberAccount.notProvided")}function se(e="visitor"){return s(e==="plus"?"memberAccount.plusTitle":e==="regular"?"memberAccount.regularTitle":"memberAccount.visitorTitle")}function Hi(e="visitor"){return s(e==="plus"?"memberAccount.plusSummary":e==="regular"?"memberAccount.regularSummary":"memberAccount.visitorSummary")}function Vi(e="visitor"){return s(e==="plus"?"memberAccount.plusBenefits":e==="regular"?"memberAccount.regularBenefits":"memberAccount.visitorBenefits")}function Gi(e={}){return!["membership","open-gym","court-rental","merchandise"].includes(e.programId)}function xa(){return ge()?.membershipLevel||"visitor"}function Oa(e={}){const t=xa();return e.programId==="open-gym"&&["regular","plus"].includes(t)||t==="plus"&&Gi(e)?Number(e.memberPrice??e.regularPrice??0):Number(e.regularPrice??0)}function at(e){return r.language==="zh"&&e.dateSummary_zh?e.dateSummary_zh:e.dateSummary||e.dates}function Le(e){return r.language!=="zh"?e:String(e).replaceAll("Jan","1月").replaceAll("Feb","2月").replaceAll("Mar","3月").replaceAll("Apr","4月").replaceAll("May","5月").replaceAll("Jun","6月").replaceAll("Jul","7月").replaceAll("Aug","8月").replaceAll("Sep","9月").replaceAll("Oct","10月").replaceAll("Nov","11月").replaceAll("Dec","12月")}function X(e){return r.language!=="zh"?e:String(e).replaceAll("AM","上午").replaceAll("PM","下午").replaceAll("Member access","会员使用").replaceAll("Flexible","灵活预约")}function vt(e){return r.language!=="zh"?e:{"2 weeks":"2 周","3 weeks":"3 周","4 weeks":"4 周","Whole summer":"整个暑期","Multi-week special":"多周优惠"}[e]||e}function Wi(e){return r.language!=="zh"?e||"Waiver required":e?String(e).replace("Minimum","最低").replace("H","小时"):"需要签署免责协议"}function q(e){return r.language!=="zh"?e||"":{confirmed:"已确认",waitlisted:"候补",cancelled:"已取消",paid:"已付款","paid-demo":"已付款",locked:"已锁定",not_locked:"未锁定",customer:"客户",admin:"后台",resource:"场地",order:"订单",class:"课程",court:"场地",usage:"使用",purchase:"购买",adjustment:"调整",website:"网站"}[e]||e||""}function nt(e){return r.language!=="zh"?e||"":{"Manual Confirmed":"手动确认",Cash:"现金","E-transfer":"E-transfer","Credit Card":"信用卡","VISA / Mastercard":"VISA / Mastercard","WeChat Pay":"微信支付"}[e]||e||""}function Ua(e){return r.language!=="zh"?e:{"Missing waiver":s("alerts.missingWaiver"),"Low credits":s("alerts.lowCredits"),"Credits expiring soon":s("alerts.creditsExpiringSoon"),"Unpaid order":s("alerts.unpaidOrder"),"Missing guardian":s("alerts.missingGuardian")}[e]||e}function ae(e){return r.language==="zh"&&e.title_zh?e.title_zh:e.title}function Ji(e){const t=new Date(`${e}T12:00:00`);if(Number.isNaN(t.getTime()))return"";const a=new Date;let n=a.getUTCFullYear()-t.getUTCFullYear();const i=a.getUTCMonth()-t.getUTCMonth();return(i<0||i===0&&a.getUTCDate()<t.getUTCDate())&&(n-=1),n}function ja(e,t){const a=new Date(e);return Number.isNaN(a.getTime())?"":(a.setUTCMonth(a.getUTCMonth()+t),a.toISOString().slice(0,10))}function Ki(e){return e==="VISA / Mastercard"?{status:"confirmed",paymentStatus:"paid",lockStatus:"locked",paymentMessage:s("paymentStatuses.paymentApproved"),confirmedAt:new Date().toISOString()}:{status:"confirmed",paymentStatus:"paid",lockStatus:"locked",paymentMessage:s("paymentStatuses.onlineApproved"),confirmedAt:new Date().toISOString()}}function Lt(e){return e.status==="cancelled"?s("paymentStatuses.cancelled"):de(e)?s("paymentStatuses.paidLocked"):e.paymentStatus==="pending_manual_confirmation"?s("paymentStatuses.pendingManual"):`${q(e.paymentStatus||s("paymentStatuses.unknown"))} / ${q(e.lockStatus||s("paymentStatuses.notLocked"))}`}function Be(e){return Math.max(0,Number(e.capacity||0)-Number(e.booked||0)-Yi(e.id))}function Yi(e){return(r.enrollments||[]).filter(t=>t.courseSessionId===e&&t.status==="confirmed").reduce((t,a)=>t+Number(a.quantity||1),0)}function Bt(e,{featuredOnly:t=!1}={}){return(e||[]).filter(a=>a.active!==!1).filter(a=>!t||a.featured!==!1).sort((a,n)=>Number(a.order||999)-Number(n.order||999))}function Ha(){return Ea(r.bookingServices?.length?r.bookingServices:Ve).filter(e=>e.public!==!1&&e.active!==!1)}function ce(){return Ha().filter(e=>Ma.includes(e.id))}function Et(e="main-full"){const t=JSON.parse(sessionStorage.getItem("bookingDraft")||"{}"),a=ce(),n=Y(t.serviceId,a),i=Y(e,a)||a[0],o=(n||i)?.id||e,l=Y(o,a);return{serviceId:o,date:t.date||"2026-06-01",duration:Z(l,t.duration),quantity:l?.mode==="machine"?1:Number(t.quantity||1),machinePosition:t.machinePosition||"",selectedStartTime:t.selectedStartTime||""}}function we(e){sessionStorage.setItem("bookingDraft",JSON.stringify({...Et(),...e}))}function z(e){return Y(e,Ha())}function it(e){return e?.image?e:e?.imageKey==="machine"?dt("machine"):e?.imageKey==="half"?dt("half"):dt("full")}function Dt(e){return it(e).image}function rt(e){return Number(e?.nonMemberPrice??e?.price??0)}function Ft(e){return Number(e?.memberPrice??e?.nonMemberPrice??e?.price??0)}function Va(e){const t=Ft(e),a=rt(e);return t===a?`<span class="servicePriceRows singlePrice"><b>${w(a)}/H</b></span>`:`
    <span class="servicePriceRows">
      <b>${r.language==="zh"?"会员":"Member"} ${w(t)}/H</b>
      <b>${r.language==="zh"?"非会员":"Non-member"} ${w(a)}/H</b>
    </span>
  `}function Qi(e,t,a=1){const i=Number(t||60)/60,o=Math.round(Ft(e)*(Number(t||60)/60)*1),l=Math.round(rt(e)*i*1);return o===l?`<b>${w(l)}</b>`:`
    <span class="estimatedPriceRows">
      <b>${r.language==="zh"?"会员":"Member"} ${w(o)}</b>
      <b>${r.language==="zh"?"非会员":"Non-member"} ${w(l)}</b>
    </span>
  `}function Xi(e){const t=Ft(e),a=rt(e);return t===a?`${D(e,"en")} · ${w(a)}/H`:`${D(e,"en")} · Member ${w(t)}/H · Non-member ${w(a)}/H`}function Zi(e={},t){return Aa({records:j(),service:t,duration:e.duration,quantity:e.quantity,pricingMode:e.pricingMode,email:e.email,phone:e.phone,now:new Date().toISOString()})}function er(e="auto"){return[["auto","Auto Detect"],["member","Member"],["non_member","Non-member"]].map(([t,a])=>`<option value="${t}" ${e===t?"selected":""}>${a}</option>`).join("")}function Ga(e={},t){const a=Zi(e,t),n=a.customerType==="member"?"Member":"Non-member",i=a.pricingSource==="manual"?"Manual override":"Auto detect",o=Number(a.duration||60)/60;return`
    <div class="adminPricingPreview ${a.warning?"warning":""}" data-admin-pricing-preview>
      <div>
        <span class="adminPricingBadge">${i}</span>
        <strong>${n} price: ${w(a.hourlyRate)}/H</strong>
      </div>
      <p>${p(a.message)}</p>
      <p>${o}H × ${w(a.hourlyRate)}/H = <b>${w(a.total)}</b></p>
    </div>
  `}function Wa(e,t,a=1){return Math.round(rt(e)*(Number(t||60)/60)*1)}function Ee(e,t){return Ge(e).map(a=>`<option value="${a}" ${Number(t)===a?"selected":""}>${a/60}H</option>`).join("")}function yt(e=-1){return M.map((t,a)=>({item:t,index:a})).filter(({item:t,index:a})=>t.kind==="booking"&&a!==e).map(({item:t})=>We({id:t.cartId||t.id,source:"cart",service:z(t.serviceId),date:t.date,startTime:t.startTime,endTime:t.endTime,quantity:t.quantity,machinePosition:t.machinePosition,customer:{},paymentMethod:"Cart"}))}function tr(e,t,a=[]){return ee(e,t,[...r.bookings,...a])}function me(e){if(r.language!=="zh"||!e)return e;const t={"Small court full is already booked.":"小场全场已被预约。","Small court has an overlapping half-court or machine booking.":"小场已有重叠的半场或投篮机预约。","This small half court is already booked.":"这个小场半场已被预约。","Small court machine/half capacity is full.":"小场投篮机/半场容量已满。","No shooting machine positions remain.":"投篮机位置已满。","Another booking already uses this court resource.":"已有其他预约占用该场地资源。","Service does not exist.":"预约项目不存在。","Date and time are required.":"请选择日期和时间。","End time must be after start time.":"结束时间必须晚于开始时间。","Selected time is outside booking hours.":"所选时间不在可预约时段内。"};return e.startsWith("Minimum booking is")?"未达到最低预约时长。":t[e]||e}function Ja(e){const t=e.serviceId==="shooting-machine"?s("bookingSystem.spotsUnit"):s("bookingSystem.booking");return`${e.date} / ${e.startTime}-${e.endTime} / ${e.quantity||1} ${t}`}function ea(e){I=e,location.hash=e,Ka(),h()}window.addEventListener("hashchange",()=>{I=location.hash.replace("#","")||"home",Ka(),h()});function Ka(){window.scrollTo({top:0,left:0,behavior:"auto"})}function ar(){const e=I==="program:basketball"||I.startsWith("dropdown:")&&V("basketball")||V("basketball"),t=I==="program:volleyball"||I.startsWith("dropdown:")&&V("volleyball")||V("volleyball"),a=I==="program:conditioning-training"||I.startsWith("dropdown:")&&V("conditioning")||V("conditioning"),n=I==="program:court-rental"||I==="program:open-gym"||I==="open-court"||I.startsWith("dropdown:")&&V("court")||V("court"),i=I==="program:membership"||I.startsWith("dropdown:")&&V("membership")||V("membership"),o=I==="merchandise"||I.startsWith("dropdown:")&&V("merchandise")||V("merchandise"),l=["account","wishlist"].includes(I);return`
    <header class="topbar">
      <button class="logoButton" data-route="home"><img src="${te("nav-logo",Nt)}" alt="First Light logo" /></button>
      <nav class="nav">
        <button class="${I==="home"?"active":""}" data-route="home">${s("home")}</button>
        <div class="navDropdown">
          <button class="${e?"active":""}" type="button" data-dropdown-trigger="basketball">${s("basketball")} <span>▼</span></button>
          <div class="dropdownMenu">
            ${ie("basketball").map(c=>`<button data-route="${re(c)}">${f(c,"label")}</button>`).join("")}
          </div>
        </div>
        <div class="navDropdown">
          <button class="${t?"active":""}" type="button" data-dropdown-trigger="volleyball">${s("volleyball")} <span>▼</span></button>
          <div class="dropdownMenu">
            ${ie("volleyball").map(c=>`<button data-route="${re(c)}">${f(c,"label")}</button>`).join("")}
          </div>
        </div>
        <div class="navDropdown">
          <button class="${a?"active":""}" type="button" data-dropdown-trigger="conditioning">${r.language==="zh"?"体能":s("conditioning")} <span>▼</span></button>
          <div class="dropdownMenu">
            ${ie("conditioning").map(c=>`<button data-route="${re(c)}">${f(c,"label")}</button>`).join("")}
          </div>
        </div>
        <div class="navDropdown">
          <button class="${n?"active":""}" type="button" data-dropdown-trigger="court">${s("courtRental")} <span>▼</span></button>
          <div class="dropdownMenu">
            ${ie("court").map(c=>`<button data-route="${re(c)}">${f(c,"label")}</button>`).join("")}
          </div>
        </div>
        <div class="navDropdown">
          <button class="${i?"active":""}" type="button" data-dropdown-trigger="membership">${s("membership")} <span>▼</span></button>
          <div class="dropdownMenu">
            ${ie("membership").map(c=>`<button data-route="${re(c)}">${f(c,"label")}</button>`).join("")}
          </div>
        </div>
        <div class="navDropdown">
          <button class="${o?"active":""}" type="button" data-dropdown-trigger="merchandise">${s("merchandise")} <span>▼</span></button>
          <div class="dropdownMenu">
            ${ie("merchandise").map(c=>`<button data-route="${re(c)}">${f(c,"label")}</button>`).join("")}
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
        <button class="cartBtn" data-route="cart" title="${s("cartLabel")}" aria-label="${s("cartLabel")}">🛒 <strong>${M.length}</strong></button>
        <button class="language" data-action="toggle-language">${C("lang")}</button>
      </div>
    </header>
  `}function ta(){return`
    ${nr()}
    ${Ya({featuredOnly:!0})}
    ${sr()}
    ${Qa({featuredOnly:!0})}
    ${cr()}
    ${pr()}
  `}function nr(){const e=r.pages.home,t=he("home-hero-background",e.image||S);return`
    <section class="hero stackHero" style="${le(t,"image",e.image||S,"--hero")}">
      <div class="heroCopy">
        <p class="heroKicker">${f(e,"kicker")}</p>
        <h1>
          ${ir(e)}
          <span>${f(e,"line1")}</span>
          <span>${f(e,"line2")}</span>
        </h1>
        <p>${f(e,"subtitle")}</p>
        <button class="blueCta" data-route="program:private-training">${r.language==="zh"?"立即预约训练":"Schedule a Training Today"}</button>
      </div>
    </section>
  `}function ir(e){const t=f(e,"title");return String(t).trim().toUpperCase()!=="FIRST LIGHT"?`<span>${t}</span>`:`<span class="heroBrandLogo"><img src="${te("home-hero-logo",Na)}" alt="${k(t)}" /></span>`}function Ya({featuredOnly:e=!1}={}){const t=Bt(r.programs,{featuredOnly:e});return`
    <section class="stackSection" id="programs">
      <div class="centerHead">
        <h2>${r.language==="zh"?"训练项目":"Training Programs"}</h2>
        <p>${r.language==="zh"?"先选择项目，再进入详情查看费用、名额、时间和预约。":"Click a program to learn more before viewing prices, spots, schedules, and booking details."}</p>
      </div>
      <div class="programTileGrid">
        ${t.map(rr).join("")}
      </div>
    </section>
  `}function rr(e){return`
    <button class="programTile" data-route="${or(e)}" style="${le(e,"image",te("default-court",S),"--tile")}">
      <span>${ze(f(e,"title"))}</span>
      <small>${f(e,"subtitle")}</small>
    </button>
  `}function or(e){return{basketball:"catalog:basketball",volleyball:"catalog:volleyball","conditioning-training":"catalog:conditioning","court-rental":"catalog:court",membership:"catalog:membership","private-training":"dropdown:basketball-private-training","open-gym":"open-court"}[e.id]||`program:${e.id}`}function Qa({featuredOnly:e=!1}={}){const t=Bt(r.coaches,{featuredOnly:e});return`
    <section class="coachSection" id="coaches">
      <div class="centerHead">
        <h2>${r.language==="zh"?"认识教练":"Meet our coaches"}</h2>
        <p>${r.language==="zh"?"专业教练团队每天帮助球员积累力量、技术和自信。":"Meet the passionate leaders helping athletes stack strength, skill, and confidence every day."}</p>
      </div>
      <div class="coachPortraitGrid">
        ${t.map(a=>`
          <article class="coachPortrait">
            <button class="coachPhoto" data-route="coach:${a.id}"><img src="${a.portrait||a.image}" alt="${a.name}" style="${Me(a,a.portrait?"portrait":"image")}" /></button>
            <h3>${a.name}</h3>
            <p>${f(a,"role")}</p>
            <button class="pillButton" data-route="coach:${a.id}">${C("learn")}</button>
          </article>
        `).join("")}
      </div>
    </section>
  `}function sr(){const e=Bt(r.activities,{featuredOnly:!0});return e.length?`
    <section class="activitySection">
      <div class="centerHead">
        <h2>${r.language==="zh"?"活动更新":"Activity Updates"}</h2>
        <p>${r.language==="zh"?"新的活动、训练营和公告会从后台自动更新到这里。":"New events, camps, and announcements appear here automatically from the admin dashboard."}</p>
      </div>
      <div class="activityGrid">
        ${e.map(lr).join("")}
      </div>
    </section>
  `:""}function lr(e){return`
    <article class="activityCard">
      <img src="${e.image||te("default-court",S)}" alt="${f(e,"title")}" style="${Me(e)}" />
      <div>
        <span>${f(e,"dateLabel")}</span>
        <h3>${f(e,"title")}</h3>
        <p>${f(e,"summary")}</p>
        <button class="pillButton" data-route="${e.route||"contact"}">${f(e,"button")||C("learn")}</button>
      </div>
    </article>
  `}function cr(){return`
    <section class="instagramSection">
      <h2>${r.language==="zh"?"关注我们的 Instagram":"Follow us on Instagram"}</h2>
      <p>${r.language==="zh"?"关注 First Light，查看训练日常、活动更新和 Richmond 运动社区。":"Follow First Light for training updates, game day moments, athlete development, and a look inside our Richmond sports community."}</p>
      <div class="socialCards">
        ${ut("Instagram","@firstlightvancouver",r.social.instagram,r.language==="zh"?"打开 Instagram":"Open Instagram")}
        ${ut("Facebook","First Light Training Center",r.social.facebook,r.language==="zh"?"打开 Facebook":"Open Facebook")}
        ${ut("WeChat",r.social.wechat,"#contact",s("contactPage.scanQr"))}
      </div>
    </section>
  `}function ut(e,t,a,n){const i=e==="WeChat";return`
    <a class="socialCard" href="${a}" aria-label="${n}" ${i?'data-route="contact"':'target="_blank" rel="noreferrer"'} >
      <span>${e}</span>
      <strong>${t}</strong>
      ${i?`<img src="${r.social.wechatQr}" alt="WeChat QR" />`:dr(e)}
      <em>${n}</em>
    </a>
  `}function dr(e){if(e==="Facebook")return mr(r.social.facebook);const t=ur(r.social.instagram);return`
    <div class="socialEmbedFrame">
      <iframe
        title="${e} latest posts"
        src="${t}"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    </div>
  `}function ur(e){return`${String(e||L.social.instagram).split("?")[0].replace(/\/+$/,"")}/embed`}function mr(e){return`
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
  `}function pr(){return`
    <section class="bottomCta">
      <h2>${r.language==="zh"?"准备开始训练了吗？":"Ready to start stacking days?"}</h2>
      <p>${r.language==="zh"?"预约训练、租场、加入开放球场或联系我们了解最适合你的项目。":"Book training, rent a court, join open gym, or contact us to find the right program."}</p>
      <button class="blueCta" data-route="programs">${r.language==="zh"?"查看项目":"View Programs"}</button>
    </section>
  `}function gr(){return`${x(s("programsPage.title"),s("programsPage.subtitle"))}${Ya()}`}function br(e){const a={basketball:{menu:"basketball",programId:"basketball"},volleyball:{menu:"volleyball",programId:"volleyball"},conditioning:{menu:"conditioning",programId:"conditioning-training"},court:{menu:"court",programId:"court-rental"},membership:{menu:"membership",programId:"membership"}}[e];if(!a)return Fe();const n=r.programs.find(l=>l.id===a.programId),i=a.menu,o=ie(i);return`
    <section class="stackSection" id="programs">
      <div class="centerHead">
        <h2>${n?f(n,"title"):qa(i)}</h2>
        <p>${n?f(n,"subtitle"):r.language==="zh"?"选择项目查看详情。":"Choose an option to view details."}</p>
      </div>
      <div class="programTileGrid">
        ${o.map(hr).join("")}
      </div>
    </section>
  `}function hr(e){return`
    <button class="programTile" data-route="${re(e)}" style="${le(e,"image",te("default-court",S),"--tile")}">
      <span>${ze(f(e,"label"))}</span>
      <small>${f(e,"subtitle")}</small>
    </button>
  `}function fr(e){if(e==="open-gym")return rn();const t=r.programs.find(i=>i.id===e);if(!t)return Fe();const a=r.sessions.filter(i=>i.programId===e&&i.active),n=r.courtSlots.filter(i=>i.programId===e&&i.active!==!1);return`
    <section class="detailHero" style="${le(t,"image",te("default-court",S),"--hero")}">
      <div>
        <h1>${ze(f(t,"title"))}</h1>
        <p>${f(t,"subtitle")}</p>
      </div>
    </section>
    <section class="detailLayout">
      <aside>
        <h2>${r.language==="zh"?"项目介绍":"Program Details"}</h2>
        <p>${f(t,"detail")}</p>
        <h3>${r.language==="zh"?"适合人群":"Best For"}</h3>
        <p>${f(t,"audience")}</p>
      </aside>
      <div>
        ${e==="court-rental"?`${Za("main-full")}`:""}
        ${a.length?`${Xa(a)}<h2>${r.language==="zh"?"可预约课程":"Available Sessions"}</h2><div class="detailCards">${a.map(Rt).join("")}</div>`:""}
        ${e!=="court-rental"&&n.length?`<h2>${r.language==="zh"?"实时租场时间表":"Live Court Schedule"}</h2><div class="slotGrid">${n.map(Pr).join("")}</div>`:""}
        ${!a.length&&!n.length?vr(t):""}
      </div>
    </section>
  `}function vr(e){const t=f(e,"statusTitle"),a=f(e,"statusBody"),n=f(e,"statusButton"),i=e.statusRoute||"contact";return!t&&!a&&!n?"":`
    <section class="panel detailEmpty">
      ${t?`<h2>${p(t)}</h2>`:""}
      ${a?`<p>${p(a)}</p>`:""}
      ${n?`<button class="blueCta" data-route="${k(i)}">${p(n)}</button>`:""}
    </section>
  `}function Xa(e){const t=U("scheduleOverview","subtitle","");return`
    <section class="scheduleOverview">
      <h2>${U("scheduleOverview","title",r.language==="zh"?"时间总览":"Schedule Overview")}</h2>
      ${t?`<p>${p(t)}</p>`:""}
      <div>
        ${e.map(a=>`<article><strong>${f(a,"title")}</strong><span>${at(a)}</span><b>${X(a.time)}</b></article>`).join("")}
      </div>
    </section>
  `}function yr(e,t){return e.kind!=="booking"?!1:(e.displayServiceId||e.serviceId)===t.id?!0:t.id==="main-half"&&["main-half-a","main-half-b"].includes(e.serviceId)}function Za(e="main-full"){const t=Et(e),a=ce(),n=z(t.serviceId)||a[0];if(!n)return"";const i={...t,serviceId:n.id,duration:Z(n,t.duration)},o=yt(),l=[...r.bookings,...o],c=kt(i.duration);n.id;const d=a.map(v=>`
    <button class="bookingService ${v.id===n.id?"active":""}" type="button" data-booking-service="${v.id}" style="${le(v.image?v:it(v),"image",Dt(v),"--tile")}">
      <span>${D(v,r.language)}</span>
      ${Va(v)}
    </button>
  `).join(""),u=n.mode==="machine"?"":`
        <label>${s("bookingSystem.participants")}
          <input type="number" min="1" max="${n.capacity}" value="${i.quantity}" data-booking-draft="quantity" />
        </label>
  `,m=c.map(v=>{const _={date:i.date,startTime:v,endTime:fe(v,i.duration),quantity:i.quantity,machinePosition:i.machinePosition},g=`${v}-${_.endTime}`,T=i.selectedStartTime===v,H=n.mode==="machine"&&!i.machinePosition?{available:!1,reason:r.language==="zh"?"请先选择投篮机。":"Choose a shooting machine first."}:T?{available:!0}:ee(n,_,l);return`<button type="button" class="${["timeChip",T?"selected":"",H.available?"":"disabled"].filter(Boolean).join(" ")}" ${H.available?`data-booking-time="${v}"`:"disabled"} title="${k(T?s("bookingSystem.selected"):me(H.reason)||s("bookingSystem.available"))}">${g}</button>`}).join(""),y=n.id==="main-full"?en(i):`
      ${n.mode==="machine"?tn(i.machinePosition):""}
      <div class="bookingControls ${n.mode==="machine"?"machineControls":""}">
        <label>${s("bookingSystem.date")}<input type="date" name="date" value="${i.date}" min="2026-05-27" data-booking-draft="date" /></label>
        <label>${s("bookingSystem.duration")}
          <select name="duration" data-booking-draft="duration">
            ${Ee(n,i.duration)}
          </select>
        </label>
        ${u}
        <div class="bookingPrice"><span>${s("bookingSystem.estimated")}</span>${Qi(n,i.duration,i.quantity)}</div>
      </div>
      <div class="bookingLiveNote">${U("courtBookingSystem","liveNote",s("bookingSystem.liveNote"))}</div>
      <div class="timeGrid">${m||`<p class="empty">${s("bookingSystem.empty")}</p>`}</div>
      <div class="bookingFooter">
        <span>${U("courtBookingSystem","footer",s("bookingSystem.footer"))}</span>
        <button class="checkoutBelowTimes" type="button" data-add-booking-to-cart ${i.selectedStartTime?"":"disabled"}>${i.selectedStartTime?C("add"):r.language==="zh"?"选择时间":"Select a Time"}</button>
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
      ${y}
    </section>
  `}function en(e,t={}){const a=z("main-full");return`
    <form class="panel fullCourtRequestForm" ${t.member?"data-member-full-court-request":"data-full-court-request"}>
      <h3>${r.language==="zh"?"留下定场信息":"Request Main Court Booking"}</h3>
      <p>${r.language==="zh"?"工作人员会根据场地情况协助确认，并通过电话或邮件回复。":"Staff will review court availability and reply by phone or email to help confirm the booking."}</p>
      <div class="formGrid">
        <label>${r.language==="zh"?"姓名":"Name"} *<input required name="name" /></label>
        <label>${r.language==="zh"?"订场日期":"Booking date"} *<input required type="date" name="date" value="${e.date}" min="2026-05-27" /></label>
        <label>${r.language==="zh"?"订场时间段":"Preferred time range"} *<input required name="preferredTimeRange" placeholder="18:00-20:00" /></label>
        <label>${r.language==="zh"?"订场时长":"Duration"} *
          <select required name="duration">${Ee(a,e.duration)}</select>
        </label>
        <label>${r.language==="zh"?"邮箱":"Email"} *<input required type="email" name="email" /></label>
        <label>${r.language==="zh"?"电话":"Phone"} *<input required name="phone" /></label>
        <label>${r.language==="zh"?"人数":"Participants"}<input type="number" min="1" max="20" name="participants" value="1" /></label>
        <label class="wide">${r.language==="zh"?"备注":"Notes"}<textarea name="notes"></textarea></label>
      </div>
      <button>${r.language==="zh"?"提交定场请求":"Submit Court Request"}</button>
    </form>
  `}function tn(e="",t="data-machine-position"){const a=["machine-1","machine-2","machine-3"];return`
    <section class="machineSelector">
      <div>
        <h3>${r.language==="zh"?"选择投篮机":"Choose a Shooting Machine"}</h3>
        <p>${r.language==="zh"?"先选择一台机器，再选择下方时间。":"Select one machine, then choose a time below."}</p>
      </div>
      <div class="machineMap" style="--machine-layout:url('${Pi}')">
        ${a.map((n,i)=>`
          <button type="button" class="machineSpot machineZone${i+1} ${e===n?"selected":""}" ${t}="${n}">
            <span>${r.language==="zh"?`投篮机 ${i+1}`:`Machine ${i+1}`}</span>
          </button>
        `).join("")}
      </div>
    </section>
  `}function Rt(e){const t=Be(e),a=$r(e),n=a?Sr(e):null,i=a&&n.count>1,o=a?i?`
        <div><span>${r.language==="zh"?`${n.count} 周`:`${n.count} weeks`}</span><b>${w(n.price)}</b></div>
        <div><span>${r.language==="zh"?"时间":"Time"}</span><b>${X(e.time)}</b></div>
      `:`
        <div><span>${C("regular")}</span><b>${w(e.regularPrice)}</b></div>
        <div><span>${C("member")}</span><b>${w(e.memberPrice)}</b></div>
        <div><span>${r.language==="zh"?"时间":"Time"}</span><b>${X(e.time)}</b></div>
      `:`
      <div><span>${C("regular")}</span><b>${w(e.regularPrice)}</b></div>
      <div><span>${C("member")}</span><b>${w(e.memberPrice)}</b></div>
      <div><span>${r.language==="zh"?"时间":"Time"}</span><b>${X(e.time)}</b></div>
    `;return`
    <article class="detailCard">
      <div class="cardTop"><span>${t>0?`${t} ${C("spots")}`:C("sold")}</span><strong>${e.waiver?r.language==="zh"?"需要免责协议":"Waiver required":""}</strong></div>
      <h3>${ze(f(e,"title"))}</h3>
      <p>${f(e,"desc")}</p>
      <div class="priceRows">
        ${o}
      </div>
      ${a?kr(e,n):wr(e)}
      ${a?"":_r(e)}
      <button ${t===0?"disabled":""} ${a?`data-add-selected-weeks="${e.id}"`:`data-add-session="${e.id}"`}>${C("add")}</button>
    </article>
  `}function $r(e){return["basketball","volleyball"].includes(e?.programId)&&Array.isArray(e.datesList)&&e.datesList.length>1&&Array.isArray(e.packages)&&e.packages.some(([t])=>/\d+\s*weeks?/i.test(String(t)))}function an(e,t){if(t<=1)return Number(e.regularPrice||0);const a=e.packages?.find(([n])=>Number(String(n).match(/\d+/)?.[0]||0)===t);return Number(a?.[1]||e.regularPrice*t||0)}function qt(e){const t=e.datesList||pe(e.dates);if(!t.length)return[];let a=[];try{a=JSON.parse(sessionStorage.getItem(`selectedWeeks:${e.id}`)||"[]")}catch{a=[]}const n=t.filter(i=>a.includes(i)).slice(0,4);return n.length?n:[t[0]]}function Sr(e){const t=qt(e),a=t.length;return{selectedWeeks:t,count:a,price:a>1?an(e,a):Number(e.regularPrice||0)}}function kr(e,t){const a=e.datesList||pe(e.dates);if(!a.length&&!e.dateSummary)return"";const n=sessionStorage.getItem(`dates:${e.id}`)==="open",i=n?a:a.slice(0,4),o=new Set(t.selectedWeeks);return`
    <div class="scheduleBlock selectableSchedule">
      <div class="scheduleHead">
        <span>${r.language==="zh"?"时间表":"Schedule"}</span>
        <strong>${r.language==="zh"?`已选择 ${t.count} 周 · 最多 4 周`:`${t.count} selected · max 4 weeks`}</strong>
      </div>
      <div class="dateChips">
        ${i.map((l,c)=>{const d=o.has(l),u=!d&&t.count>=4;return`<button type="button" class="${d?"selected":""}" data-toggle-week="${e.id}:${c}" ${u?"disabled":""}>${Le(l)}</button>`}).join("")}
      </div>
      ${a.length>4?`<button class="textButton" data-toggle-dates="${e.id}">${n?r.language==="zh"?"收起日期":"Hide dates":r.language==="zh"?`查看全部 ${a.length} 个日期`:`View all ${a.length} dates`}</button>`:""}
    </div>
  `}function wr(e){const t=e.datesList||pe(e.dates);if(!t.length&&!e.dateSummary)return"";const a=sessionStorage.getItem(`dates:${e.id}`)==="open",n=a?t:t.slice(0,4);return`
    <div class="scheduleBlock">
      <div class="scheduleHead">
        <span>${r.language==="zh"?"时间表":"Schedule"}</span>
        <strong>${at(e)||(r.language==="zh"?`${t.length} 个日期`:`${t.length} date${t.length===1?"":"s"}`)}</strong>
      </div>
      <div class="dateChips">
        ${n.map(i=>`<span>${Le(i)}</span>`).join("")}
      </div>
      ${t.length>4?`<button class="textButton" data-toggle-dates="${e.id}">${a?r.language==="zh"?"收起日期":"Hide dates":r.language==="zh"?`查看全部 ${t.length} 个日期`:`View all ${t.length} dates`}</button>`:""}
    </div>
  `}function _r(e){return e.packages?.length?`
    <div class="packageTable">
      <h4>${r.language==="zh"?"课包选择":"Package Options"}</h4>
      ${e.packages.map(([t,a],n)=>`<div><span>${vt(t)}</span><b>${w(a)}</b><button type="button" data-add-package="${e.id}:${n}">${C("add")}</button></div>`).join("")}
    </div>
  `:""}function pe(e){return!e||/weekly options|monthly|appointment|flexible/i.test(e)?[]:String(e).split(",").map(t=>t.trim().replace(/^June /,"Jun ")).filter(Boolean)}function Pr(e){return`
    <article class="slot ${e.booked?"booked":""}">
      <span>${r.language==="zh"?e.title_zh:e.courtType}</span>
      <h3>${Ir(e.date)}</h3>
      <p class="slotTime">${X(e.time)}</p>
      <b>${w(e.price)}/H</b>
      <small>${r.language==="zh"?`最多 ${e.capacity} 人`:`Up to ${e.capacity} people`} · ${Wi(e.minimum)}</small>
      <button ${e.booked?"disabled":""} data-add-court="${e.id}">${e.booked?r.language==="zh"?"已被预约":"Booked":C("add")}</button>
    </article>
  `}function Ir(e){const t=new Date(`${e}T12:00:00`);return Number.isNaN(t.getTime())?e:t.toLocaleDateString(r.language==="zh"?"zh-CN":"en-CA",{weekday:"short",month:"short",day:"numeric"})}function Tr(){return`${x(s("coachesPage.title"),s("coachesPage.subtitle"))}${Qa()}`}function Cr(e){const t=(r.dropdownPages||[]).find(i=>i.id===e&&i.active!==!1);if(!t||t.targetRoute)return Fe();const a=Mr(t),n=qa(t.parentMenu);return`
    <section class="detailHero" style="${le(t,"image",te("default-court",S),"--hero")}">
      <div>
        <h1>${ze(f(t,"title"))}</h1>
        <p>${f(t,"subtitle")}</p>
      </div>
    </section>
    <section class="detailLayout">
      <aside>
        <h2>${n}</h2>
        <p>${f(t,"body")}</p>
        ${f(t,"productIntro")?`<h3>${r.language==="zh"?"产品介绍":"Product Introduction"}</h3><p>${f(t,"productIntro")}</p>`:""}
        ${t.privatePricing?`<button class="blueCta" data-route="contact">${r.language==="zh"?"咨询私教训练":"Request Private Training"}</button>`:""}
      </aside>
      <div>
        ${t.id==="basketball-film-to-floor"?Ar():""}
        ${t.privatePricing?zr():""}
        ${!t.privatePricing&&a.length?`${Xa(a)}<h2>${r.language==="zh"?"可预约课程":"Available Sessions"}</h2><div class="detailCards">${a.map(Rt).join("")}</div>`:""}
        ${!a.length&&!t.privatePricing?nn():""}
      </div>
    </section>
  `}function Ar(){const e=sessionStorage.getItem("filmReviewUploadNotice")||"",t=sessionStorage.getItem("filmReviewUploadProgress")||"",a=ye(),n=!a&&ka(),i=a||n;return`
    <section class="filmReviewPanel panel">
      <div class="filmReviewHead">
        <div>
          <div class="eyebrow">${r.language==="zh"?"一对一视频分析":"1:1 Video Review"}</div>
          <h2>${r.language==="zh"?"上传你的比赛视频":"Upload Your Game Film"}</h2>
          <p>${r.language==="zh"?"学员可直接上传打球视频，教练会根据视频内容准备一对一训练建议。":"Athletes can upload game footage here so a coach can prepare focused one-on-one training feedback."}</p>
        </div>
        <span>${r.language==="zh"?"MP4 / MOV / WEBM，最大 500MB":"MP4 / MOV / WEBM, max 500MB"}</span>
      </div>
      ${a?"":n?`<p class="adminNotice">${r.language==="zh"?"本地演示模式：视频只会保存在当前电脑的当前浏览器里，适合现场测试。":"Local demo mode: videos are saved only in this browser on this computer for testing."}</p>`:`<p class="formError">${r.language==="zh"?"此浏览器不支持本地视频保存；上线前需要配置 Supabase URL 和 Anon Key 才能真实上传。":"This browser cannot save local demo videos. Supabase URL and anon key are required before live uploads can be accepted."}</p>`}
      ${e?`<div class="adminNotice">${p(e)}</div>`:""}
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
        <button ${i?"":"disabled"}>${r.language==="zh"?"提交给教练":"Send to Coach"}</button>
      </form>
    </section>
  `}function Mr(e){return(e.sessionIds||[]).map(a=>r.sessions.find(n=>n.id===a&&n.active)).filter(Boolean)}function nn(e){return`
    <section class="panel detailEmpty">
      <h2>${r.language==="zh"?"请联系我们":"Please contact us"}</h2>
      <p>${r.language==="zh"?"这个项目的产品、价格和时间表可由后台随时更新。请联系 First Light 确认最新安排。":"Products, prices, and schedule for this catalog item can be updated from the admin dashboard at any time. Contact First Light for the latest availability."}</p>
      <button class="blueCta" data-route="contact">${r.language==="zh"?"联系咨询":"Contact Us"}</button>
    </section>
  `}function zr(){const e=[[r.language==="zh"?"一对一":"One on one",120,575,1100],[r.language==="zh"?"两人小组":"Group of two",80,388,750],[r.language==="zh"?"三人小组":"Group of three",65,318,600],[r.language==="zh"?"四人小组":"Group of four",55,270,515]];return`
    <section class="priceMatrix">
      <h2>${r.language==="zh"?"私教价格":"Private Training Pricing"}</h2>
      <div class="matrixHeader"><span>${r.language==="zh"?"项目":"Product"}</span><span>${r.language==="zh"?"单节":"Single session"}</span><span>${r.language==="zh"?"5 节课包":"Package of 5"}</span><span>${r.language==="zh"?"10 节课包":"Package of 10"}</span></div>
      ${e.map(t=>`<div><strong>${t[0]}</strong><span>${w(t[1])}</span><span>${w(t[2])}</span><span>${w(t[3])}</span></div>`).join("")}
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
  `}function Nr(e){const t=r.coaches.find(n=>n.id===e);if(!t)return Fe();const a=String(t.programs||"").split(",").map(n=>n.trim()).filter(Boolean).map(n=>r.programs.find(i=>i.id===n)).filter(Boolean);return`
    <section class="coachDetail">
      <button class="backButton" data-route="coaches">${C("back")}</button>
      <div class="coachDetailGrid">
        <img src="${t.portrait||t.image}" alt="${t.name}" style="${Me(t,t.portrait?"portrait":"image")}" />
        <div>
          <span>${f(t,"role")}</span>
          <h1>${t.name}</h1>
          <p>${f(t,"bio")}</p>
          <div class="linkedPrograms">
            ${a.map(n=>`<button class="pillButton" data-route="program:${n.id}">${f(n,"title")}</button>`).join("")}
          </div>
        </div>
      </div>
    </section>
  `}function Lr(){return`
    ${x(s("schedulePage.title"),s("schedulePage.subtitle"))}
    <section class="detailLayout">
      <aside><h2>${s("schedulePage.trainingSessions")}</h2><p>${s("schedulePage.trainingBody")}</p></aside>
      <div class="detailCards">${r.sessions.filter(e=>e.active).map(Rt).join("")}</div>
    </section>
    <section class="stackSection"><h2>${s("schedulePage.courtRental")}</h2>${Za("main-full")}</section>
  `}function Br(){return`
    ${x(s("contactPage.title"),s("contactPage.subtitle"))}
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
  `}function Er(){return`
    ${x(s("leaguePage.title"),s("leaguePage.subtitle"))}
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
  `}function Dr(){const e=f(r.pages.about,"body").split(`

`).map(a=>`<p>${a}</p>`).join(""),t=Ui("about-gallery");return`
    ${x(s("aboutPage.title"),s("aboutPage.subtitle"))}
    <section class="storyLayout">
      <div>
        <h2>${f(r.pages.about,"title")}</h2>
        ${e}
      </div>
      <div class="storyGallery">
        ${t.map(a=>`<img src="${k(a.image)}" alt="${s("aboutPage.facilityAlt")}" style="${Me(a)}" />`).join("")}
      </div>
    </section>
  `}function rn(){const e=r.programs.find(a=>a.id==="open-gym"),t=r.sessions.find(a=>a.id==="open-gym"&&a.active);return!e||!t?Fe():`
    ${x(U("openGymBooking","heroTitle",r.language==="zh"?"开放球场":"OPEN GYM"),f(e,"subtitle"))}
    <section class="openCourtPage openGymCourtPage">
      <div class="openCourtIntro">
        <div>
          <div class="eyebrow">${U("openGymBooking","eyebrow",r.language==="zh"?"Drop-in 价格 + 开放时间":"Drop-in Price + Open Times")}</div>
          <h2>${U("openGymBooking","title",r.language==="zh"?"开放球场预约":"Open Gym Booking")}</h2>
        </div>
        <p>${U("openGymBooking","body",r.language==="zh"?"先查看开放球场价格和预约入口，下方时间表会同步显示后台维护的可 drop-in 时间。":"Review open gym pricing and booking first, then see staff-managed drop-in availability below.")}</p>
      </div>
      <h2>${r.language==="zh"?"可预约课程":"Available Sessions"}</h2>
      <div class="detailCards openGymCourtCards">${Fr(t)}</div>
      ${Rr()}
    </section>
  `}function Fr(e){const t=Be(e);return`
    <article class="detailCard openGymPricingCard">
      <div class="cardTop"><span>${t>0?`${t} ${C("spots")}`:C("sold")}</span><strong>${e.waiver?r.language==="zh"?"需要免责协议":"Waiver required":""}</strong></div>
      <h3>${f(e,"title")}</h3>
      <p>${f(e,"desc")}</p>
      <div class="priceRows">
        <div><span>${C("regular")}</span><b>${w(e.regularPrice)}</b></div>
        <div><span>${C("member")}</span><b>${w(e.memberPrice)}</b></div>
      </div>
      <div class="openGymScheduleNote">
        <strong>${U("openGymBooking","scheduleTitle",r.language==="zh"?"实时开放时间":"Live Drop-in Times")}</strong>
        <p>${U("openGymBooking","scheduleBody",r.language==="zh"?"Drop-in 时间会按周更新，请先查看下方实时开放时间表。":"Drop-in times change weekly. Check the live schedule below before adding to cart.")}</p>
      </div>
      <button ${t===0?"disabled":""} data-add-session="${e.id}">${C("add")}</button>
    </article>
  `}function Rr(){const e=qr(new Date),t=xr(r.openCourtSlots||[],e);return`
    <div class="openCourtIntro openCourtScheduleIntro">
      <div>
        <div class="eyebrow">${r.language==="zh"?"蓝色 = 可 Drop-in":"Blue = Drop-in Available"}</div>
        <h2>${r.language==="zh"?"未来 7 天开放球场时间":"Next 7 Days Open Gym"}</h2>
      </div>
      <p>${r.language==="zh"?"工作人员可在后台随时新增、修改或隐藏开放球场时间段。":"Staff can add, edit, or hide open gym availability from the admin dashboard at any time."}</p>
    </div>
    <div class="openCourtSummaryStrip">
      ${e.map(a=>Ur(a,aa(t,a))).join("")}
    </div>
    <div class="openCourtBoard">
      ${e.map(a=>jr(a,aa(t,a))).join("")}
    </div>
    ${Vr(e,t)}
  `}function qr(e){const t=new Date(e.getFullYear(),e.getMonth(),e.getDate());return Array.from({length:7},(a,n)=>{const i=new Date(t);return i.setDate(t.getDate()+n),i})}function Ce(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${n}`}function xr(e,t){const a=t.map(Ce);return e.filter(n=>n.active!==!1&&a.includes(n.date)&&Or(n)).sort((n,i)=>`${n.date} ${n.startTime}`.localeCompare(`${i.date} ${i.startTime}`))}function Or(e){const t=R(e.startTime),a=R(e.endTime),n=R(Ae),i=R(tt);return a>t&&a>n&&t<i}function aa(e,t){const a=Ce(t);return e.filter(n=>n.date===a).sort((n,i)=>R(n.startTime)-R(i.startTime))}function Ur(e,t){const a=Ce(e)===Ce(new Date),n=t.length?r.language==="zh"?`${t.length} 个开放时段`:`${t.length} open slot${t.length===1?"":"s"}`:r.language==="zh"?"暂无开放":"No times";return`
    <article class="openCourtSummaryDay ${a?"today":""}">
      <strong>${xt(e)}</strong>
      <span>${n}</span>
    </article>
  `}function jr(e,t){return`
    <article class="openCourtDayCard">
      <div class="openCourtDayHead">
        <span>${xt(e)}</span>
        <strong>${t.length?r.language==="zh"?`${t.length} 个开放时段`:`${t.length} open`:r.language==="zh"?"暂无":"None"}</strong>
      </div>
      <div class="openCourtSlotList">
        ${t.length?t.map(Hr).join(""):`<p class="openCourtEmptyDay">${r.language==="zh"?"暂无开放时间":"No open court times"}</p>`}
      </div>
    </article>
  `}function Hr(e){const t=f(e,"notes");return`
    <article class="openCourtSlotCard openCourtAvailable">
      <div>
        <strong>${f(e,"title")||s("openCourt")}</strong>
        <span>${on(e)}</span>
      </div>
      <small>${r.language==="zh"?`${e.spots||0} 个 drop-in 空位`:`${e.spots||0} drop-in spots`}</small>
      ${t?`<em>${t}</em>`:""}
    </article>
  `}function Vr(e,t){const a=Wr(),n=(R(tt)-R(Ae))/30;return`
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
          ${e.map((i,o)=>`<div class="openCourtChartDay" style="grid-column:${o+2};">${xt(i)}</div>`).join("")}
          ${a.map(i=>`<div class="openCourtChartTime" style="grid-row:${na(`${String(i).padStart(2,"0")}:00`)} / span 2;">${Jr(i)}</div>`).join("")}
          ${a.slice(0,-1).flatMap(i=>e.map((o,l)=>`<div class="openCourtChartCell" style="grid-column:${l+2};grid-row:${na(`${String(i).padStart(2,"0")}:00`)} / span 2;"></div>`)).join("")}
          ${t.map(i=>Gr(i,e)).join("")}
        </div>
      </div>
    </section>
  `}function Gr(e,t){const a=t.findIndex(u=>Ce(u)===e.date),n=R(Ae),i=R(tt),o=Math.max(R(e.startTime),n),l=Math.min(R(e.endTime),i);if(a<0||l<=o)return"";const c=2+Math.round((o-n)/30),d=Math.max(2,Math.round((l-o)/30));return`
    <article class="openCourtChartBlock openCourtAvailable" style="grid-column:${a+2};grid-row:${c} / span ${d};">
      <strong>${f(e,"title")||s("openCourt")}</strong>
      <span>${on(e)}</span>
    </article>
  `}function Wr(){const e=Math.floor(R(Ae)/60),t=Math.floor(R(tt)/60);return Array.from({length:t-e+1},(a,n)=>e+n)}function na(e){return 2+Math.round((R(e)-R(Ae))/30)}function R(e){const[t,a]=String(e||"0:00").split(":").map(n=>Number(n));return(Number.isFinite(t)?t:0)*60+(Number.isFinite(a)?a:0)}function on(e){return`${ia(e.startTime)} - ${ia(e.endTime)}`}function ia(e){const t=R(e),a=Math.floor(t/60),n=t%60,i=a>=12?"PM":"AM";return`${a%12||12}:${String(n).padStart(2,"0")} ${i}`}function Jr(e){const t=e>=12?"PM":"AM";return`${e%12||12}${t.toLowerCase()}`}function xt(e){return e.toLocaleDateString(r.language==="zh"?"zh-CN":"en-CA",{weekday:"short",month:"numeric",day:"numeric"})}function Kr(){const e=ge();return e?.student?Qr(e):Yr(s("memberAccount.loginTitle"),s("memberAccount.loginSubtitle"))}function Yr(e=s("memberAccount.loginTitle"),t=s("memberAccount.loginSubtitle")){const a=sessionStorage.getItem("firstlight_member_login_error")||"";return`
    ${x(e,t)}
    <section class="memberAccount visitorAccount">
      ${sn({membershipLevel:"visitor",membership:{level:"visitor",title:se("visitor"),source:"none",expiresAt:""}})}
      <div class="memberActionLayout">
        <article class="memberPanel">
          <h3>${s("memberAccount.benefits")}</h3>
          <p>${s("memberAccount.visitorBenefits")}</p>
          <p>${s("memberAccount.sameEmailHint")}</p>
        </article>
      </div>
    </section>
    <section class="authLayout">
      <form class="panel" data-member-login>
        <h2>${s("memberAccount.memberLogin")}</h2>
        <p class="adminHelp">${s("memberAccount.demoLogin")}</p>
        <p class="adminHelp"><strong>${s("memberAccount.testAccountHint")}</strong></p>
        ${a?`<div class="formError">${p(a)}</div>`:""}
        <label>${s("memberAccount.emailAddress")}<input required name="email" type="email" autocomplete="email" /></label>
        <label>${s("memberAccount.password")}<input required name="password" type="password" autocomplete="current-password" /></label>
        <button>${s("memberAccount.logIn")}</button>
        <button class="secondaryButton" type="button" data-member-test-login>${s("memberAccount.useTestAccount")}</button>
        <div class="authLinks">
          <button type="button" data-route="contact">${s("memberAccount.needAccount")}</button>
          <button type="button" data-route="contact">${s("memberAccount.forgotPassword")}</button>
        </div>
      </form>
    </section>
  `}function j(){return{students:r.students||[],enrollments:r.enrollments||[],creditPackages:r.creditPackages||[],creditTransactions:r.creditTransactions||[],bookings:r.bookings||[],waiverSignatures:r.waiverSignatures||[],sessions:r.sessions||[],bookingServices:ce(),openCourtSlots:r.openCourtSlots||[]}}function ge(){const e=sessionStorage.getItem("firstlight_member_student_id");if(!e)return null;const t=Xe(j(),e,{now:new Date().toISOString()});return t.student?t:(sessionStorage.removeItem("firstlight_member_student_id"),null)}function Qr(e){const t=e.student,a=Ze(j(),t.id,{now:new Date().toISOString()}),n=e.membershipLevel||"visitor",i=eo(a,n);return`
    ${x(s("memberAccount.pageTitle"),s("memberAccount.pageSubtitle"))}
    <section class="memberAccount">
      <div class="memberAccountHead">
        <div>
          <div class="eyebrow">${s("memberAccount.loggedInAs")}</div>
          <h2>${p(t.fullName)}</h2>
          <p>${p(t.email)} / ${p(t.phone)} / ${s("memberAccount.age")} ${t.age??Ji(t.birthDate)}</p>
        </div>
        <button type="button" class="secondaryButton" data-member-logout>${s("memberAccount.logout")}</button>
      </div>
      ${as()}
      ${sn(e)}
      <div class="memberMetricGrid">
        <article><strong>${e.programs.length}</strong><span>${s("memberAccount.programs")}</span></article>
        <article><strong>${e.creditTotals.remaining}</strong><span>${s("memberAccount.creditsLeft")}</span></article>
        <article><strong>${e.upcomingSchedule.length}</strong><span>${s("memberAccount.scheduleItems")}</span></article>
        <article><strong>${e.orders.length}</strong><span>${s("memberAccount.orders")}</span></article>
      </div>
      <div class="memberActionLayout">
        ${no(e)}
        ${io(e,i)}
      </div>
      ${n==="visitor"?to():ro(e,i)}
      <div class="memberGrid">
        <article class="memberPanel">
          <h3>${s("memberAccount.profile")}</h3>
          ${ra([[s("memberAccount.birthDate"),t.birthDate],[s("memberAccount.address"),Zt(t.address)],[s("memberAccount.primarySport"),t.primarySport||s("memberAccount.tbd")],[s("memberAccount.experience"),t.experience||s("memberAccount.tbd")],[s("memberAccount.preferredTime"),t.preferredClassTime||s("memberAccount.tbd")]])}
        </article>
        <article class="memberPanel">
          <h3>${s("memberAccount.guardianEmergency")}</h3>
          ${ra([[s("memberAccount.guardian"),t.guardianName?`${t.guardianName} / ${t.guardianRelation} / ${t.guardianPhone}`:s("memberAccount.selfManaged")],[s("memberAccount.guardianEmail"),Zt(t.guardianEmail)],[s("memberAccount.emergency"),`${t.emergencyName||s("memberAccount.notProvided")} ${t.emergencyPhone||""}`],[s("memberAccount.medical"),t.medicalNotes||s("memberAccount.noneNoted")]])}
        </article>
        <article class="memberPanel">
          <h3>${s("memberAccount.programs")}</h3>
          ${e.programs.length?`<div class="chipList">${e.programs.map(o=>`<span>${p(o)}</span>`).join("")}</div>`:F(s("emptyStates.noPrograms"))}
        </article>
        <article class="memberPanel">
          <h3>${s("memberAccount.benefits")}</h3>
          ${ao(e)}
        </article>
        <article class="memberPanel widePanel">
          <h3>${s("memberAccount.schedule")}</h3>
          ${uo(e)}
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
              <strong>${p(o.title)} / ${p(o.programId)}</strong>
              <span>${Number(o.originalCredits||0)} ${s("memberAccount.purchased")} / ${Math.max(0,Number(o.originalCredits||0)-Number(o.balance||0))} ${s("memberAccount.used")} / ${Number(o.balance||0)} ${s("memberAccount.remaining")} / ${r.language==="zh"?"到期":"expires"} ${p(o.expiresAt||s("memberAccount.tbd"))}</span>
            </div>
          `).join(""):F(s("emptyStates.noCredits"))}
          ${e.creditTransactions.length?`<div class="miniTimeline">${e.creditTransactions.slice(-6).reverse().map(o=>`<span>${p(o.createdAt||"")}: ${p(q(o.type||o.transactionType||"adjustment"))} ${Number(o.units||0)} / ${r.language==="zh"?"余额":"balance"} ${Number(o.balanceAfter||0)}</span>`).join("")}</div>`:""}
        </article>
        <article class="memberPanel widePanel">
          <h3>${s("memberAccount.ordersPayment")}</h3>
          ${e.orders.length?e.orders.map(bo).join(""):F(s("emptyStates.noOrders"))}
        </article>
        <article class="memberPanel">
          <h3>${s("memberAccount.waivers")}</h3>
          ${e.waivers.length?e.waivers.map(o=>`
            <div class="memberLine">
              <strong>${p(o.templateVersion||(r.language==="zh"?"免责协议":"Waiver"))}</strong>
              <span>${p(o.signerName)} / ${p(o.signerRelation)} / ${Ne(o.signedAt)}</span>
            </div>
          `).join(""):F(s("emptyStates.noWaivers"))}
        </article>
        <form class="memberPanel" data-member-profile>
          <h3>${s("memberAccount.quickUpdate")}</h3>
          <label>${s("memberAccount.phone")}<input name="phone" value="${k(t.phone)}" /></label>
          <label>${s("memberAccount.address")}<input name="address" value="${k(t.address)}" /></label>
          <label>${s("memberAccount.preferredTime")}<input name="preferredClassTime" value="${k(t.preferredClassTime)}" /></label>
          <label>${s("memberAccount.emergencyPhone")}<input name="emergencyPhone" value="${k(t.emergencyPhone)}" /></label>
          <label>${s("memberAccount.medicalNotes")}<textarea name="medicalNotes">${p(t.medicalNotes)}</textarea></label>
          <button>${s("memberAccount.saveUpdates")}</button>
        </form>
      </div>
      <div class="memberQuickActions">
        <button type="button" data-route="programs">${s("memberAccount.bookMore")}</button>
        <button type="button" data-route="schedule">${s("memberAccount.viewSchedule")}</button>
        <button type="button" data-route="contact">${s("memberAccount.contact")}</button>
      </div>
    </section>
  `}function sn(e={}){const t=e.membershipLevel||e.membership?.level||"visitor",a=e.membership||{},n=a.expiresAt||"",i=a.source||"none";return`
    <article class="membershipLevelCard" data-membership-level="${k(t)}">
      <div>
        <div class="eyebrow">${r.language==="zh"?"会员级别":"Membership Level"}</div>
        <h2>${se(t)}</h2>
        <p>${Hi(t)}</p>
      </div>
      ${t!=="visitor"?`
        <div class="membershipLevelMeta">
          <span>${s("memberAccount.levelExpires")}: <b>${p(n||s("memberAccount.tbd"))}</b></span>
          <span>${s("memberAccount.levelSource")}: <b>${p(i)}</b></span>
        </div>
      `:""}
      ${Xr(t)}
    </article>
  `}function Xr(e="visitor"){return e==="plus"?"":`
    <div class="memberQuickActions compactActions">
      ${(e==="regular"?[{id:"training-benefit",label:s("memberAccount.upgradePlus")}]:[{id:"general-membership",label:s("memberAccount.buyRegular")},{id:"training-benefit",label:s("memberAccount.buyPlus")}]).map(a=>`<button type="button" data-add-session="${a.id}"><span>${p(a.label)}</span><strong>${Zr(a.id)}</strong></button>`).join("")}
    </div>
  `}function Zr(e){const t=r.sessions.find(a=>a.id===e);return t?`${w(t.regularPrice)} / ${r.language==="zh"?"月":"month"}`:""}function eo(e=[],t="visitor"){return t==="visitor"?[]:t==="regular"?e.filter(a=>a.programId==="open-gym"):e}function to(){return`
    <section class="memberPanel memberBookingPanel visitorMemberPrompt">
      <h3>${s("memberAccount.selfService")}</h3>
      <p>${s("memberAccount.visitorNoBooking")}</p>
      <p>${s("memberAccount.sameEmailHint")}</p>
    </section>
  `}function ao(e={}){const t=e.membershipLevel||"visitor",a=[`<div class="memberLine"><strong>${p(se(t))}</strong><span>${p(Vi(t))}</span></div>`];return t==="plus"&&a.push(`<div class="memberLine"><strong>${s("memberAccount.plusTrainingPrice")}</strong><span>${r.language==="zh"?"训练项目将自动使用可用的会员价。":"Training programs automatically use available member pricing."}</span></div>`),e.memberships?.length&&a.push(...e.memberships.map(n=>`
      <div class="memberLine">
        <strong>${p(ae(n))}</strong>
        <span>${p(n.meta||n.expiresAt||s("memberAccount.memberBenefit"))}</span>
      </div>
    `)),a.join("")}function ra(e){return`<dl class="memberInfo">${e.map(([t,a])=>`<div><dt>${p(t)}</dt><dd>${p(a||s("memberAccount.notProvided"))}</dd></div>`).join("")}</dl>`}function no(e){const t=[...e.alerts.map(Ua),s("memberAccount.cancelPolicy")],a=e.creditPackages.filter(n=>Number(n.balance||0)>0&&Number(n.balance||0)<=3).map(n=>`${n.title} · ${n.balance} ${s("memberAccount.remaining")}`);return`
    <article class="memberPanel memberReminderPanel">
      <h3>${s("memberAccount.reminders")}</h3>
      <div class="chipList">
        ${t.map(n=>`<span class="alertChip">${p(n)}</span>`).join("")}
        ${a.map(n=>`<span class="alertChip">${p(n)}</span>`).join("")}
      </div>
      <div class="memberQuickContact">
        <button type="button" data-route="contact">${s("memberAccount.contactFrontDesk")}</button>
        <span>WeChat: ${p(r.social.wechat)}</span>
        <span>info@firstlighttrainingcenter.ca</span>
      </div>
    </article>
  `}function io(e,t){return`
    <article class="memberPanel">
      <h3>${s("memberAccount.myProducts")}</h3>
      ${e.creditPackages.length?e.creditPackages.map(a=>`
        <div class="memberLine">
          <strong>${p(a.title)} / ${p(a.programId)}</strong>
          <span>${Number(a.originalCredits||0)} ${s("memberAccount.purchased")} / ${Math.max(0,Number(a.originalCredits||0)-Number(a.balance||0))} ${s("memberAccount.used")} / ${Number(a.balance||0)} ${s("memberAccount.remaining")} / ${r.language==="zh"?"到期":"expires"} ${p(a.expiresAt||s("memberAccount.tbd"))}</span>
        </div>
      `).join(""):F(s("emptyStates.noCredits"))}
      ${t.length?`<p class="memberHint">${s("memberAccount.usableHint")}</p>`:F(s("memberAccount.noUsableProducts"))}
    </article>
  `}function ro(e,t){const a=Ot(t);return`
    <section class="memberPanel memberBookingPanel">
      <div class="memberPanelHead">
        <div>
          <h3>${s("memberAccount.selfService")}</h3>
          <p>${s("memberAccount.selfServiceHelp")}</p>
        </div>
        ${t.length?`
          <label>${s("memberAccount.chooseProduct")}
            <select data-member-package-select>
              ${t.map(n=>`<option value="${n.id}" ${a?.id===n.id?"selected":""}>${p(n.title)} · ${n.programId} · ${n.balance} ${s("memberAccount.remaining")}</option>`).join("")}
            </select>
          </label>
        `:""}
      </div>
      ${a?oo(e.student.id,a):F(s("memberAccount.noUsableProducts"))}
    </section>
  `}function Ot(e){if(!e.length)return null;const t=sessionStorage.getItem("memberSelectedPackageId");return e.find(a=>a.id===t)||e[0]}function oo(e,t){return t.programId==="court-rental"?lo(t):t.programId==="open-gym"?co(e,t):so(e,t)}function so(e,t){const a=Mt(j(),e,t.id,{now:new Date().toISOString()});return a.length?`
    <div class="memberOptionGrid">
      ${a.map(n=>{const i=n.session?.datesList||pe(n.session?.dates);return i.length?`
            <article class="memberOptionCard">
              <strong>${p(f(n.session,"title")||n.title)}</strong>
              <span>${p(X(n.session?.time||n.time||s("memberAccount.tbd")))}</span>
              <div class="dateChips memberDateChips">
                ${i.slice(0,8).map((o,l)=>`<button type="button" data-member-reserve-class="${t.id}:${n.id}:${l}">${p(Le(o))}</button>`).join("")}
              </div>
            </article>
          `:`
          <form class="memberOptionCard" data-member-reserve-custom-class>
            <input type="hidden" name="packageId" value="${k(t.id)}" />
            <input type="hidden" name="sessionId" value="${k(n.id)}" />
            <strong>${p(f(n.session,"title")||n.title)}</strong>
            <label>${s("bookingSystem.date")}<input required type="date" name="date" min="2026-05-27" /></label>
            <label>${s("adminBookings.startTime")}<input required type="time" name="startTime" value="18:00" step="1800" /></label>
            <button>${s("memberAccount.reserveUse")}</button>
          </form>
        `}).join("")}
    </div>
  `:F(s("memberAccount.noBookableTimes"))}function lo(e){const t=Ut(),a=Mt(j(),sessionStorage.getItem("firstlight_member_student_id"),e.id,{now:new Date().toISOString()}),n=z(t.serviceId)||z(a[0]?.serviceId);if(!n)return F(s("memberAccount.noBookableTimes"));const i={...t,serviceId:n.id,duration:Z(n,t.duration)},o=r.bookings||[],l=kt(i.duration),c=n.mode==="machine"?"":`
        <label>${s("bookingSystem.participants")}
          <input type="number" min="1" max="${n.capacity}" value="${i.quantity}" data-member-booking-draft="quantity" />
        </label>
  `,d=l.map(m=>{const y={date:i.date,startTime:m,endTime:fe(m,i.duration),quantity:n.mode==="machine"?1:Math.max(1,i.quantity),machinePosition:n.mode==="machine"?i.machinePosition:""},_=n.mode==="machine"&&!i.machinePosition?{available:!1,reason:r.language==="zh"?"请先选择投篮机。":"Choose a shooting machine first."}:ee(n,y,o),g=i.selectedStartTime===m;return`<button type="button" class="${["timeChip",g?"selected":"",_.available?"":"disabled"].filter(Boolean).join(" ")}" ${_.available?`data-member-resource-time="${m}"`:"disabled"} title="${k(g?s("bookingSystem.selected"):me(_.reason)||s("bookingSystem.available"))}">${m}-${y.endTime}</button>`}).join(""),u=n.id==="main-full"?en(i,{member:!0}):`
      ${n.mode==="machine"?tn(i.machinePosition,"data-member-machine-position"):""}
      <div class="bookingControls">
        <label>${s("bookingSystem.date")}<input type="date" value="${i.date}" min="2026-05-27" data-member-booking-draft="date" /></label>
        <label>${s("bookingSystem.duration")}<select data-member-booking-draft="duration">${Ee(n,i.duration)}</select></label>
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
        ${a.map(m=>{const y=z(m.serviceId);return`
            <button class="bookingService ${y?.id===n.id?"active":""}" type="button" data-member-booking-service="${m.serviceId}" style="${le(y?.image?y:it(y),"image",Dt(y),"--tile")}">
              <span>${D(y,r.language)}</span>
              <small>${w(y?.price||0)}/H</small>
            </button>
          `}).join("")}
      </div>
      ${u}
    </div>
  `}function co(e,t){const a=Mt(j(),e,t.id,{now:new Date().toISOString()});return a.length?`
    <div class="memberOptionGrid">
      ${a.map(n=>`
        <article class="memberOptionCard">
          <strong>${p(r.language==="zh"?n.title_zh:n.title)}</strong>
          <span>${p(n.date)} / ${p(n.startTime)}-${p(n.endTime)} · ${n.remaining} ${s("bookingSystem.left")}</span>
          <button type="button" data-member-open-gym="${t.id}:${n.id}">${s("memberAccount.reserveUse")}</button>
        </article>
      `).join("")}
    </div>
  `:F(s("memberAccount.noBookableTimes"))}function Ut(){const e=JSON.parse(sessionStorage.getItem("memberBookingDraft")||"{}"),t=ce(),n=Y(e.serviceId,t)||t[0];return{serviceId:n?.id||"main-full",date:e.date||"2026-06-01",duration:Z(n,e.duration),quantity:n?.mode==="machine"?1:Number(e.quantity||1),machinePosition:e.machinePosition||"",selectedStartTime:e.selectedStartTime||""}}function _e(e){sessionStorage.setItem("memberBookingDraft",JSON.stringify({...Ut(),...e}))}function uo(e){const t=[...e.enrollments.filter(a=>a.status!=="cancelled").map(a=>({...a,kind:"class"})),...e.courtBookings.filter(a=>a.status!=="cancelled")];return t.length?t.map(a=>`
    <div class="memberLine">
      <strong>${p(ae(a))}</strong>
      <span>${p(q(a.kind))} / ${p(a.programId||(r.language==="zh"?"项目":"program"))} / ${p(q(a.status||"confirmed"))} / ${p(mo(a))}</span>
      ${a.memberUsage?po(a):""}
    </div>
  `).join(""):F(s("emptyStates.noSchedule"))}function mo(e){return e.date&&e.startTime&&e.endTime?`${e.date} ${e.startTime}-${e.endTime}`:e.startsAt||e.date||e.createdAt||s("memberAccount.tbd")}function po(e){const t=go(e);return t&&(t.getTime()-Date.now())/36e5<48?`<small>${s("memberAccount.contactToCancel")}</small>`:`<button type="button" class="secondaryButton miniButton" data-member-cancel-usage="${e.id}">${s("memberAccount.cancelAndRefund")}</button>`}function go(e){const t=e.startsAt||(e.date&&e.startTime?`${e.date}T${e.startTime}:00.000`:e.date);if(!t)return null;const a=new Date(t);return Number.isNaN(a.getTime())?null:a}function bo(e){return`
    <div class="memberLine">
      <strong>${p(e.id)} / ${w(e.total||0)}</strong>
      <span>${p(nt(e.paymentMethod||""))} / ${p(q(e.paymentStatus||""))} / ${Ne(e.createdAt)}</span>
      <small>${(e.items||[]).map(t=>p(ae(t))).join(", ")}</small>
    </div>
  `}function F(e){return`<p class="empty">${e}</p>`}function ho(){return`
    ${x(s("wishlistPage.title"),s("wishlistPage.subtitle"))}
    <section class="emptyState">
      <h2>${s("wishlistPage.emptyTitle")}</h2>
      <p>${s("wishlistPage.emptyBody")}</p>
      <button class="blueCta" data-route="programs">${s("wishlistPage.button")}</button>
    </section>
  `}function fo(){const e=(r.products||[]).filter(t=>t.active!==!1).sort((t,a)=>Number(t.order||999)-Number(a.order||999));return`
    ${x(s("merchandise"),r.language==="zh"?"First Light 服饰和装备":"First Light apparel and gear")}
    <section class="stackSection">
      <div class="sectionHead">
        <div>
          <div class="eyebrow">${r.language==="zh"?"可购买商品":"Available Products"}</div>
          <h2>${s("merchandise")}</h2>
        </div>
        <button class="blueCta" data-route="cart">${s("cartLabel")}</button>
      </div>
      <div class="productGrid">
        ${e.length?e.map(vo).join(""):nn()}
      </div>
    </section>
  `}function vo(e){return`
    <article class="productCard">
      <img src="${k(e.image||te("default-court",S))}" alt="${k(f(e,"title"))}" style="${Me(e)}" />
      <div>
        <span>${r.language==="zh"?"库存":"Stock"} ${Number(e.stock||0)}</span>
        <h3>${f(e,"title")}</h3>
        <p>${p(e.sizes||(r.language==="zh"?"尺码 / 选项请咨询前台":"Ask staff for sizes / options"))}</p>
        <b>${w(e.price||0)}</b>
        <button data-add-product="${e.id}" ${Number(e.stock||0)<=0?"disabled":""}>${C("add")}</button>
      </div>
    </article>
  `}function x(e,t){return`
    <section class="pageHero">
      <h1>${e}</h1>
      <p>${t}</p>
    </section>
  `}function yo(e){return`
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
  `}function $o(){return`
    <section class="emptyState">
      <h2>${r.language==="zh"?"购物车为空":"Your cart is empty"}</h2>
      <p>${r.language==="zh"?"先选择课程、租场时间或商品，再回来完成报名和付款。":"Choose a program, court time, or product first, then return here to finish registration and payment."}</p>
      <div class="emptyActions">
        <button class="blueCta" data-route="programs">${r.language==="zh"?"查看课程项目":"Browse Programs"}</button>
        <button class="secondaryButton" data-route="program:court-rental">${r.language==="zh"?"预约场地":"Book Court"}</button>
        <button class="secondaryButton" data-route="contact">${r.language==="zh"?"联系咨询":"Contact Us"}</button>
      </div>
    </section>
  `}function So(){const e=M.reduce((a,n)=>a+n.price,0),t=ko();return M.length===0?`
      ${x(C("checkout"),s("checkoutForm.pageSubtitle"))}
      ${t?oa(t):""}
      ${$o()}
    `:`
    ${x(C("checkout"),s("checkoutForm.pageSubtitle"))}
    ${t?oa(t):""}
    <section class="checkoutGrid">
      <div>
        <h2>${s("checkoutForm.selectedItems")}</h2>
        ${M.map((a,n)=>`
          <div class="cartItem">
            <div><strong>${ae(a)}</strong><span>${a.meta}</span><small>${a.quantity?`${s("checkoutForm.qty")} ${a.quantity}`:`${s("checkoutForm.qty")} 1`}</small></div>
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
        <h2>${C("checkout")}</h2>
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
            <div class="waiverText wide">${f(K,"title")} v${K.version}: ${s("checkoutForm.adultWaiver")}</div>
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
            <div class="waiverText wide">${f(K,"title")} v${K.version}: ${s("checkoutForm.minorWaiver")}</div>
          </div>
          ${yo(e)}
          <label class="wide">${s("checkoutForm.notes")}<textarea name="notes"></textarea></label>
          <label class="waiver wide"><input type="checkbox" name="photoConsent" /> ${s("checkoutForm.photoConsent")}</label>
          <label class="waiver wide"><input type="checkbox" name="marketingConsent" /> ${s("checkoutForm.marketingConsent")}</label>
        </div>
        <button>${s("checkoutForm.confirm")}</button>
      </form>
      <div id="emailPreview">${t?ps(t):""}</div>
    </section>
  `}function ko(){const e=sessionStorage.getItem("lastConfirmedBookingId");return e&&(r.bookings||[]).find(t=>t.id===e&&t.kind==="order")||null}function oa(e){const t=e.participantType==="minor",a=r.language==="zh"?t?"学员":"参与者":t?"Student":"Participant",n=r.language==="zh"?t?"家长/监护人":"联系人":t?"Parent/guardian":"Contact",i=(e.items||[]).map(o=>`
    <div class="confirmationItem">
      <strong>${p(ae(o))}</strong>
      <span>${p(o.meta||"")}</span>
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
        <strong>${p(e.id)}</strong>
      </div>
      <div class="confirmationGrid">
        <article>
          <span>${a}</span>
          <b>${p(e.studentName||e.customer?.name||"")}</b>
          <p>${n}: ${p(e.customer?.name||"")} / ${p(e.customer?.email||"")} / ${p(e.customer?.phone||"")}</p>
        </article>
        <article>
          <span>${r.language==="zh"?"付款":"Payment"}</span>
          <b>${p(nt(e.paymentMethod||""))}</b>
          <p>${p(Lt(e))}</p>
        </article>
        <article>
          <span>${r.language==="zh"?"免责协议":"Waiver"}</span>
          <b>${r.language==="zh"?"已签署":"Signed"}</b>
          <p>${Ne(e.waiverSignedAt)} · v${K.version}</p>
        </article>
        <article>
          <span>${r.language==="zh"?"场馆地址":"Facility Address"}</span>
          <b>First Light Training Center</b>
          <p>165-13631 Vulcan Way, Richmond, BC V6V 1K4</p>
        </article>
      </div>
      <div class="confirmationItems">
        ${i||F(r.language==="zh"?"暂无项目。":"No items.")}
      </div>
      ${e.paymentMessage?`<p class="confirmationMessage">${p(e.paymentMessage)}</p>`:""}
      <div class="confirmationActions">
        <button type="button" data-route="account">${r.language==="zh"?"进入会员账号":"Go to My Account"}</button>
        <button type="button" class="secondaryButton" data-route="programs">${r.language==="zh"?"继续预约":"Book More"}</button>
        <button type="button" class="secondaryButton" data-route="contact">${r.language==="zh"?"联系 First Light":"Contact First Light"}</button>
      </div>
    </section>
  `}function wo(){return`
    <section class="adminHero">
      <div>
        <div class="eyebrow">Admin Dashboard</div>
        <h1>Content Manager</h1>
        <p>Add, edit, hide, or copy content. Saved updates automatically expand the public pages and live schedules.</p>
        ${Po()}
      </div>
      <button class="dangerOutline" data-action="reset-data">Reset Demo Data</button>
    </section>
    <section class="adminLayout">
      <aside>
        ${_o().map(([e,t])=>`<button data-admin-tab="${e}" class="${$t()===e?"active":""}">${t}</button>`).join("")}
      </aside>
      <div class="adminPanel">${To($t())}</div>
    </section>
  `}function _o(){const e=[...kn],t=e.findIndex(([o])=>o==="bookings"),a=["students","Students"],n=["videoReviews","Basketball IQ Reviews"];t>=0?e.splice(t,0,a):e.push(a);const i=e.findIndex(([o])=>o==="bookings");return i>=0?e.splice(i,0,n):e.push(n),e}function $t(){return sessionStorage.getItem("adminTab")||"programs"}function Po(){const e=sessionStorage.getItem("adminNotice");return e?`<div class="adminNotice">${e}</div>`:""}function E(e){sessionStorage.setItem("adminNotice",e)}function Io(e){return e==="courts"?jt.courtSlots:jt[e]}function To(e){if(e==="videoReviews")return Ct(),sa();if(e==="pages")return Co();const t=Io(e);return t?qo(t):e==="social"?`
      <h2>Social Links</h2>
      <p class="adminHelp">Update Instagram, Facebook, TikTok, WeChat, and the QR code image. Instagram and Facebook render as real public preview frames when the platform allows embedding; buttons still open the real social pages if a preview is blank.</p>
      <form class="adminForm" data-admin-social>
        ${oe({name:"instagram",label:"Instagram Link"},r.social.instagram,r.social)}
        ${oe({name:"facebook",label:"Facebook Link"},r.social.facebook,r.social)}
        ${oe({name:"tiktok",label:"TikTok Link"},r.social.tiktok,r.social)}
        ${oe({name:"wechat",label:"WeChat ID"},r.social.wechat,r.social)}
        ${oe({name:"wechatQr",label:"WeChat QR Code",type:"image",usage:"Contact page and footer WeChat QR display."},r.social.wechatQr,r.social)}
        <button>Save Social Links</button>
      </form>
    `:e==="students"?Ao():e==="bookings"?Lo():`
    <h2>Email Template</h2>
    <p class="adminHelp">This demo stores one English email template. It is mirrored internally for compatibility with the current language switch.</p>
    <form class="adminForm" data-admin-email>
      ${oe({name:"en",label:"Email Copy",type:"textarea"},r.emailTemplates.en,r.emailTemplates)}
      <button>Save Email Template</button>
    </form>
  `}function sa(){const e=Tt();if(!ye())return`
      <div class="adminPanelHead">
        <div>
          <h2>Basketball IQ Reviews</h2>
          <p class="adminHelp">Local demo inbox. Submissions are stored only in this browser on this computer; real customer uploads from other devices require Supabase.</p>
        </div>
        <div class="adminInlineActions">
          <button type="button" data-action="refresh-video-reviews">${A.loading?"Loading...":"Refresh"}</button>
        </div>
      </div>
      ${A.error?`<div class="formError">${p(A.error)}</div>`:""}
      <div class="videoReviewList">
        ${(A.submissions||[]).length?A.submissions.map(la).join(""):`<p class="adminHelp">${A.loaded?"No local video submissions yet.":"Click Refresh to load local video submissions."}</p>`}
      </div>
    `;if(!Ct())return`
      <h2>Basketball IQ Reviews</h2>
      <p class="adminHelp">Staff or admin Supabase login is required before Basketball IQ Workshop submissions and private video links are shown.</p>
      <form class="adminForm adminLoginForm" data-video-review-login>
        <label>Email<input required type="email" name="email" autocomplete="email" /></label>
        <label>Password<input required type="password" name="password" autocomplete="current-password" /></label>
        <button>Log In</button>
      </form>
    `;const a=A.submissions||[];return`
    <div class="adminPanelHead">
      <div>
        <h2>Basketball IQ Reviews</h2>
        <p class="adminHelp">Logged in as ${p(e?.email||"staff")}. Review Basketball IQ Workshop uploads, open private video links, and track coach follow-up.</p>
      </div>
      <div class="adminInlineActions">
        <button type="button" data-action="refresh-video-reviews">${A.loading?"Loading...":"Refresh"}</button>
        <button type="button" class="secondaryButton" data-action="video-review-logout">Log Out</button>
      </div>
    </div>
    ${A.error?`<div class="formError">${p(A.error)}</div>`:""}
    <div class="videoReviewList">
      ${a.length?a.map(la).join(""):`<p class="adminHelp">${A.loaded?"No video submissions yet.":"Click Refresh to load video submissions."}</p>`}
    </div>
  `}function la(e){const t=["submitted","reviewing","followed_up","archived"];return`
    <article class="videoReviewRow">
      <div>
        <span class="statusBadge">${p(e.status||"submitted")}</span>
        <h3>${p(e.student_name||e.studentName||"Student")}</h3>
        <p>${p(e.email||"")} / ${p(e.phone||"")} / ${e.player_age?`${p(e.player_age)} years old`:"age TBD"}</p>
        <p><strong>Experience:</strong> ${p(e.experience||"")}</p>
        <p><strong>Goal:</strong> ${p(e.goals||"")}</p>
        ${e.notes?`<p><strong>Notes:</strong> ${p(e.notes)}</p>`:""}
        <span>${Ne(e.submitted_at||e.created_at)}</span>
      </div>
      <div>
        ${e.localVideo?`<button type="button" class="pillButton videoLinkButton" data-local-video-download="${k(e.id)}">Download Video</button>`:e.downloadUrl?`<a class="pillButton videoLinkButton" href="${k(e.downloadUrl)}" target="_blank" rel="noreferrer">Open Video</a>`:'<span class="adminHelp">Video link unavailable</span>'}
        <label>Status
          <select data-video-review-status="${k(e.id)}">
            ${t.map(a=>`<option value="${a}" ${a===e.status?"selected":""}>${q(a)}</option>`).join("")}
          </select>
        </label>
        <label>Coach notes<textarea data-video-review-notes="${k(e.id)}">${p(e.coach_notes||"")}</textarea></label>
        <button type="button" data-video-review-save="${k(e.id)}">Save Review</button>
      </div>
    </article>
  `}function Co(){const e=[{name:"title_en",label:"Title"},{name:"heroTitle_en",label:"Hero Title"},{name:"eyebrow_en",label:"Eyebrow"},{name:"kicker_en",label:"Kicker"},{name:"line1_en",label:"Hero Line 1"},{name:"line2_en",label:"Hero Line 2"},{name:"subtitle_en",label:"Subtitle",type:"textarea"},{name:"body_en",label:"Body",type:"textarea"},{name:"scheduleTitle_en",label:"Schedule Note Title"},{name:"scheduleBody_en",label:"Schedule Note Body",type:"textarea"},{name:"liveNote_en",label:"Live Note",type:"textarea"},{name:"footer_en",label:"Footer Text",type:"textarea"},{name:"image",label:"Page Image",type:"image",usage:"Page-level hero or content image where this page uses one."}],t={home:"Home Hero",about:"About Page",scheduleOverview:"Schedule Overview Section",openGymBooking:"Open Gym Booking Page",courtBookingSystem:"Court Booking System"};return`
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
          ${e.filter(o=>i[o.name]!==void 0).map(o=>oe(o,i[o.name],i)).join("")}
        </div>
        <div class="adminActions"><button>Save Page</button></div>
      </form>
    `).join("")}
  `}function Ao(){const e=r.students||[],t=j(),a=ls(),n=ai(e,t,{...a,now:new Date().toISOString()}),i=t.creditPackages,o=t.waiverSignatures,l=t.enrollments,c=cs(t);return`
    <h2>${s("adminStudents.title")}</h2>
    <p class="adminHelp">${s("adminStudents.help")}</p>
    <div class="adminExportBar">
      <button data-action="export-students">${s("adminStudents.exportStudents")}</button>
      <button data-action="export-orders">${s("adminStudents.exportOrders")}</button>
      <button data-action="export-credits">${s("adminStudents.exportCredits")}</button>
      <button data-action="export-waivers">${s("adminStudents.exportWaivers")}</button>
    </div>
    <form class="adminForm studentFilterBar" data-admin-student-filters>
      <label>${s("adminStudents.search")}<input name="query" value="${k(a.query)}" placeholder="${r.language==="zh"?"姓名 / 邮箱 / 电话":"Sam / email / phone"}" /></label>
      <label>${s("adminStudents.program")}
        <select name="programId">
          <option value="">${s("adminStudents.allPrograms")}</option>
          ${c.map(d=>`<option value="${k(d)}" ${a.programId===d?"selected":""}>${p(d)}</option>`).join("")}
        </select>
      </label>
      <label>${s("adminStudents.status")}
        <select name="status">
          ${[["",s("adminStudents.allStudents")],["lowBalance",s("adminStudents.lowBalance")],["expiring",s("adminStudents.expiring")],["member",s("adminStudents.member")],["visitor",se("visitor")],["regular",se("regular")],["plus",se("plus")],["missingWaiver",s("adminStudents.missingWaiver")],["unpaid",s("adminStudents.unpaid")]].map(([d,u])=>`<option value="${d}" ${a.status===d?"selected":""}>${u}</option>`).join("")}
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
      ${n.length?n.map(Mo).join(""):`<p>${s("adminStudents.empty")}</p>`}
    </div>
  `}function Mo(e){const t=j(),a=Xe(t,e.id,{now:new Date().toISOString()}),n=a.creditPackages,i=a.enrollments,o=a.waivers,l=Ta(e,t,{now:new Date().toISOString()}),c=se(a.membershipLevel),d=a.membership?.expiresAt||s("memberAccount.tbd"),u=e.guardianName?`${e.guardianName} / ${e.guardianRelation} / ${e.guardianPhone}`:s("memberAccount.selfManaged");return`
    <article class="studentRow">
      <div>
        <h3>${e.fullName}</h3>
        <p>${e.email} / ${e.phone} / ${s("memberAccount.age")} ${e.age??""}</p>
        <p><strong>${c}</strong> · ${s("memberAccount.levelExpires")} ${p(d)} · ${s("memberAccount.levelSource")} ${p(a.membership?.source||"none")}</p>
        <span>${e.primarySport||(r.language==="zh"?"运动项目待定":"Sport TBD")} · ${e.experience||(r.language==="zh"?"经验待定":"Experience TBD")} · ${r.language==="zh"?"偏好":"Preferred"}: ${e.preferredClassTime||s("memberAccount.tbd")}</span>
      </div>
      <div>
        <p><strong>${s("memberAccount.guardian")}:</strong> ${u}</p>
        <p><strong>${s("memberAccount.emergency")}:</strong> ${e.emergencyName||""} ${e.emergencyPhone||""}</p>
        <p><strong>${s("memberAccount.medical")}:</strong> ${e.medicalNotes||s("memberAccount.noneNoted")}</p>
      </div>
      <div>
        <b>${n.reduce((m,y)=>m+Number(y.balance||0),0)} ${r.language==="zh"?"次":"credits"}</b>
        <p>${i.length} ${r.language==="zh"?"条报名":"enrollment(s)"} · ${o.length} ${r.language==="zh"?"份免责协议":"waiver(s)"}</p>
      </div>
      <div class="studentDetails">
        <div class="chipList">${l.length?l.map(m=>`<span class="alertChip">${p(Ua(m))}</span>`).join(""):`<span>${s("alerts.allClear")}</span>`}</div>
        <details>
          <summary>${r.language==="zh"?"查看详情 / 管理":"View details / Manage"}</summary>
          <div class="studentDetailGrid">
            <section>
              <h4>${s("memberAccount.programs")}</h4>
              <div class="miniRow">
                <span>${r.language==="zh"?"会员级别":"Membership level"}</span>
                <b>${se(a.membershipLevel)} / ${p(d)}</b>
              </div>
              ${a.programs.length?`<div class="chipList">${a.programs.map(m=>`<span>${p(m)}</span>`).join("")}</div>`:F(s("emptyStates.noPrograms"))}
              <h4>${r.language==="zh"?"报名记录":"Enrollments"}</h4>
              ${i.length?i.map(m=>`
                <div class="miniRow">
                  <span>${p(m.title||m.courseSessionId)}</span>
                  <b>${p(q(m.status))}</b>
                  ${m.status!=="cancelled"?`<button type="button" class="danger miniButton" data-cancel-enrollment="${m.id}">${s("adminBookings.cancel")}</button>`:""}
                </div>
              `).join(""):F(s("emptyStates.noEnrollments"))}
            </section>
            <section>
              <h4>${s("memberAccount.courseCredits")}</h4>
              ${n.length?n.map(m=>`
                <div class="miniRow">
                  <span>${p(m.title)} / ${p(m.programId)}</span>
                  <b>${r.language==="zh"?`剩余 ${Number(m.balance||0)} 次`:`${Number(m.balance||0)} left`}</b>
                </div>
              `).join(""):F(s("emptyStates.noPackages"))}
              <form class="miniForm" data-adjust-credit>
                <input type="hidden" name="studentId" value="${k(e.id)}" />
                <label>${s("adminStudents.program")}<input required name="programId" value="${k(n[0]?.programId||a.programs[0]||"")}" /></label>
                <label>${r.language==="zh"?"调整次数":"Adjust units"}<input required type="number" name="units" value="1" /></label>
                <label>${s("adminStudents.reason")}<input name="reason" value="manual adjustment" /></label>
                <button>${r.language==="zh"?"调整课包次数":"Adjust credits"}</button>
              </form>
            </section>
            <section>
              <h4>${s("memberAccount.ordersPayment")}</h4>
              ${a.orders.length?a.orders.map(m=>`
                <div class="miniRow">
                  <span>${p(m.id)} / ${w(m.total||0)} / ${p(q(m.paymentStatus||""))}</span>
                  ${m.status==="pending_payment"?`<button type="button" class="miniButton" data-confirm-payment="${m.id}">${s("adminBookings.confirmPayment")}</button>`:""}
                </div>
              `).join(""):F(s("emptyStates.noOrders"))}
              <h4>${s("memberAccount.waivers")}</h4>
              ${o.length?o.map(m=>`<p>${p(m.templateVersion||"")} / ${p(m.signerName||"")} / ${Ne(m.signedAt)}</p>`).join(""):F(s("emptyStates.noWaiver"))}
            </section>
            <form class="miniForm" data-admin-student-notes>
              <input type="hidden" name="studentId" value="${k(e.id)}" />
              <label>${r.language==="zh"?"员工备注":"Staff notes"}<textarea name="staffNotes">${p(e.staffNotes)}</textarea></label>
              <button>Save notes</button>
            </form>
          </div>
        </details>
      </div>
    </article>
  `}function De(){let e={};try{e=JSON.parse(sessionStorage.getItem("adminScheduleBookingDraft")||"{}")}catch{e={}}const t=z(e.serviceId)||ce()[0],a=Z(t,e.duration);return{serviceId:t?.id||"main-full",date:e.date||"2026-06-01",startTime:e.startTime||"",duration:a,quantity:Math.max(1,Number(e.quantity||1)),machinePosition:e.machinePosition||"",name:e.name||e.bookedFor||"",phone:e.phone||"",email:e.email||"",pricingMode:["auto","member","non_member"].includes(e.pricingMode)?e.pricingMode:"auto",paymentMethod:e.paymentMethod||"Manual Confirmed",notes:e.notes||""}}function Ue(e){sessionStorage.setItem("adminScheduleBookingDraft",JSON.stringify({...De(),...e}))}function zo(){const e=ce(),t=De(),a=z(t.serviceId)||e[0];return a?`
    <section class="adminScheduleBooking">
      <div class="adminPanelHead">
        <div>
          <h3>Staff Schedule Booking</h3>
          <p class="adminHelp">Step 1: choose a court or machine. Step 2: fill the form below. Step 3: click a time to fill Start Time, then create the confirmed booking.</p>
        </div>
      </div>
      <div class="bookingServiceGrid adminScheduleServiceGrid">${e.map(i=>`
    <button class="bookingService ${i.id===a.id?"active":""}" type="button" data-admin-schedule-service="${i.id}" style="${le(i.image?i:it(i),"image",Dt(i),"--tile")}">
      <span>${D(i,"en")}</span>
      ${Va(i)}
    </button>
  `).join("")}</div>
    </section>
  `:""}function No(){const e=ce(),t=De(),a=z(t.serviceId)||e[0];if(!a)return"";const n={...t,serviceId:a.id,duration:Z(a,t.duration)};return`
    <section class="adminScheduleTimes">
      <h3>Available Times</h3>
      <div class="timeGrid adminScheduleTimeGrid">${kt(n.duration).map(l=>{const c={date:n.date,startTime:l,endTime:fe(l,n.duration),quantity:a.mode==="machine"?1:Math.max(1,n.quantity),machinePosition:a.mode==="machine"?n.machinePosition:""},u=a.mode==="machine"&&!n.machinePosition?{available:!1,reason:"Choose a shooting machine first."}:ee(a,c,r.bookings),m=`${l}-${c.endTime}`;return`<button type="button" class="${["timeChip",n.startTime===l?"selected":"",u.available?"":"disabled"].filter(Boolean).join(" ")}" ${u.available?`data-admin-schedule-time="${l}"`:"disabled"} title="${k(me(u.reason)||"Available")}">${m}</button>`}).join("")}</div>
    </section>
  `}function Lo(){const e=ce(),t=De(),a=z(t.serviceId)||e[0],n=a?{...t,serviceId:a.id,duration:Z(a,t.duration)}:t,i=(r.bookings||[]).filter(d=>d.kind==="full_court_request"&&d.status!=="cancelled"),o=(r.bookings||[]).filter(d=>d.status!=="cancelled"),l=(r.bookings||[]).filter(d=>d.status==="cancelled"),c=r.language==="zh"?"已取消订单":"Cancelled Bookings";return`
    <h2>Bookings</h2>
    <p class="adminHelp">Create phone or front-desk bookings here. Saving a booking immediately recalculates the public schedule.</p>
    ${i.length?`<div class="adminNotice pendingRequestNotice">${i.length} pending Main Court request${i.length===1?"":"s"} need staff follow-up.</div>`:""}
    ${zo()}
    <form class="adminForm adminBookingForm" data-admin-booking>
      <h3>Phone / Front-Desk Booking</h3>
      <label>Service
        <select name="serviceId" data-admin-booking-service data-admin-schedule-draft="serviceId">${e.map(d=>`<option value="${d.id}" data-durations="${Ge(d).join(",")}" ${d.id===n.serviceId?"selected":""}>${Xi(d)}</option>`).join("")}</select>
      </label>
      ${Bo(n.machinePosition,a?.mode==="machine")}
      <label>Date<input type="date" required name="date" value="${k(n.date)}" data-admin-schedule-draft="date" /></label>
      <label>Start Time<input type="time" required name="startTime" value="${k(n.startTime)}" step="1800" data-admin-schedule-draft="startTime" /></label>
      <label>Duration
        <select name="duration" data-admin-booking-duration data-admin-schedule-draft="duration">${Ee(a,n.duration)}</select>
      </label>
      <label>Participants<input type="number" required min="1" max="${a?.capacity||20}" name="quantity" value="${n.quantity}" data-admin-schedule-draft="quantity" /></label>
      <label>Customer Name<input name="name" value="${k(n.name)}" data-admin-schedule-draft="name" /></label>
      <label>Phone<input name="phone" value="${k(n.phone)}" data-admin-schedule-draft="phone" /></label>
      <label>Email<input type="email" name="email" value="${k(n.email)}" data-admin-schedule-draft="email" /></label>
      <label>Pricing Identity
        <select name="pricingMode" data-admin-pricing-control data-admin-schedule-draft="pricingMode">
          ${er(n.pricingMode)}
        </select>
      </label>
      ${Ga(n,a)}
      <label>Payment Method
        <select name="paymentMethod" data-admin-schedule-draft="paymentMethod">
          ${["Manual Confirmed","Cash","E-transfer","Credit Card","WeChat Pay"].map(d=>`<option value="${d}" ${d===n.paymentMethod?"selected":""}>${d}</option>`).join("")}
        </select>
      </label>
      <label class="wide">Notes<textarea name="notes" data-admin-schedule-draft="notes">${p(n.notes)}</textarea></label>
      <button>Create Confirmed Booking</button>
    </form>
    ${No()}
    <button data-action="export-bookings">Export CSV</button>
    <div class="bookingList">
      ${o.length?o.map(ca).join(""):"<p>No active bookings yet.</p>"}
    </div>
    ${l.length?`
      <details class="cancelledBookingArchive">
        <summary>${c} (${l.length})</summary>
        <div class="bookingList cancelledBookingList">
          ${l.map(ca).join("")}
        </div>
      </details>
    `:""}
  `}function Bo(e="",t=!1){return`
      <label>Shooting Machine
        <select name="machinePosition" data-admin-schedule-draft="machinePosition" ${t?"required":""}>
          <option value="">Required only for Shooting Machine</option>
          <option value="machine-1" ${e==="machine-1"?"selected":""}>Machine 1</option>
          <option value="machine-2" ${e==="machine-2"?"selected":""}>Machine 2</option>
          <option value="machine-3" ${e==="machine-3"?"selected":""}>Machine 3</option>
        </select>
      </label>
  `}function ca(e){const t=e.kind==="full_court_request",a=e.kind==="resource"||e.serviceId,n=z(e.serviceId),i=e.customer||{},o=t?"Main Court Booking Request":a?Do(e,n):`Order ${e.id}`,l=Fo(e),c=Eo(e),d=t?`${e.date} / ${e.preferredTimeRange||"time TBD"} / ${Number(e.duration||0)/60}H / ${e.quantity||1} people`:a?`${e.date} / ${e.startTime}-${e.endTime} / ${e.quantity||1}${l?` / ${l}`:""}`:(e.items||[]).map(ae).join(", "),u=t?"Pending":e.total?w(e.total):n?w(Wa(n,Ro(e),e.quantity)):"",m=e.status==="pending_payment";return`
    <article class="bookingRow ${e.status==="cancelled"?"cancelled":""} ${t?"fullCourtRequest":""}">
      <div>
        <h3>${o}</h3>
        <p>${d||"No item details"}</p>
        <span>${q(e.source||"customer")} / ${q(e.status||"confirmed")} / ${nt(e.paymentMethod||"")}</span>
        <span>Payment: ${q(e.paymentStatus||"")} / Lock: ${q(e.lockStatus||(de(e)?"locked":"not_locked"))}</span>
        ${c}
        ${e.paymentReference?`<p>Reference: ${p(e.paymentReference)}</p>`:""}
        ${i.notes?`<p>Notes: ${p(i.notes)}</p>`:""}
      </div>
      <div>
        <b>${u}</b>
        <p>${i.name||"No name"} / ${i.phone||""} / ${i.email||""}</p>
        <p>${Lt(e)}</p>
      </div>
      <div class="bookingActions">
        ${m?`<button type="button" data-confirm-payment="${e.id}">Confirm Payment</button>`:""}
        <button class="danger" type="button" ${e.status==="cancelled"?"disabled":""} data-cancel-booking="${e.id}">Cancel</button>
      </div>
    </article>
  `}function Eo(e={}){if(!e.customerType&&!e.hourlyRate&&!e.membershipLevel)return"";const t=e.customerType==="member"?"Member":"Non-member",a=e.pricingSource==="manual"?"Manual":"Auto",n=e.membershipLevel?` / ${q(e.membershipLevel)}`:"",i=e.hourlyRate?` / ${w(e.hourlyRate)}/H`:"",o=e.matchedStudentName?` / ${p(e.matchedStudentName)}`:"";return`<span>Pricing: ${a} ${t}${n}${i}${o}</span>`}function Do(e,t){return e.displayTitle_en?e.displayTitle_en:["main-half-a","main-half-b"].includes(e.serviceId)?D(z("main-half"),"en")||"Main Half Court":D(t,"en")||e.serviceLabel_en||e.serviceLabel_zh||e.serviceId}function Fo(e){return e.serviceId==="main-half-a"?"Assigned: Half A":e.serviceId==="main-half-b"?"Assigned: Half B":e.machinePosition?e.machinePosition.replace("machine-","Machine "):""}function Ro(e){const t=a=>{const[n,i="0"]=String(a||"0:00").split(":");return Number(n)*60+Number(i)};return Math.max(0,t(e.endTime)-t(e.startTime))}function qo(e){const t=e.collectionKey,n=[...t==="bookingServices"?(r[t]||[]).filter(i=>Ma.includes(i.id)):r[t]||[]].sort((i,o)=>Number(i.order||999)-Number(o.order||999));return`
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
            <h3>${ln(i)}</h3>
          </div>
          ${xo(i,e)}
        </div>
        <div class="adminFieldGrid">
          ${e.fields.map(o=>oe(o,i[o.name],i)).join("")}
        </div>
        <div class="adminActions">
          <button>Save</button>
          ${e.canCopy===!1?"":`<button type="button" class="secondaryButton" data-copy-row="${t}:${i.id}">${e.copyLabel}</button>`}
          ${e.canDelete===!1?"":`<button type="button" class="danger" data-delete-row="${t}:${i.id}">Delete</button>`}
        </div>
      </form>`).join("")}
    </div>
  `}function ln(e){return e.title_en||e.label_en||e.name||e.courtType||e.title_zh||e.id}function xo(e,t){const a=t.imageFields?.find(i=>e[i]),n=a?e[a]:"";return n?`<img class="adminThumb" src="${n}" alt="${k(ln(e))}" />`:'<div class="adminThumb placeholder">No image</div>'}function da(e,t="center"){return(e==="x"?["left","center","right"]:["top","center","bottom"]).map(n=>`<option value="${n}" ${t===n?"selected":""}>${n}</option>`).join("")}function Oo(e={},t={}){return e.usage||t.usage_en||t.usage||""}function oe(e,t,a={}){const n=e.name,i=t??"",o=e.help?`<small>${e.help}</small>`:"";if(e.type==="textarea")return`<label>${e.label}${o}<textarea name="${n}" ${e.required?"required":""}>${p(i)}</textarea></label>`;if(e.type==="boolean")return`<label>${e.label}${o}<select name="${n}"><option value="true" ${t!==!1?"selected":""}>Yes</option><option value="false" ${t===!1?"selected":""}>No</option></select></label>`;if(e.type==="select"){const d=e.options||[];return`<label>${e.label}${o}<select name="${n}" ${e.required?"required":""}>${d.map(([u,m])=>`<option value="${k(u)}" ${t===u?"selected":""}>${p(m)}</option>`).join("")}</select></label>`}if(e.type==="programSelect")return`<label>${e.label}${o}<select name="${n}">${r.programs.map(d=>`<option value="${d.id}" ${t===d.id?"selected":""}>${d.title_en||d.title_zh||d.id} (${d.id})</option>`).join("")}</select></label>`;if(e.type==="sessionMultiSelect"){const d=new Set(Array.isArray(t)?t:String(t||"").split(/[\n,]/).map(m=>m.trim()).filter(Boolean)),u=r.sessions.map(m=>{const y=`${f(m,"title")} (${m.id}) · ${m.programId} · ${w(m.regularPrice||0)} · ${at(m)||m.dates||""} ${m.time||""}`;return`<option value="${k(m.id)}" ${d.has(m.id)?"selected":""}>${p(y)}</option>`}).join("");return`
      <label>${e.label}${o}
        <select name="${n}" multiple size="8">${u}</select>
        <small>Hold Ctrl/Command to select multiple products.</small>
        <textarea name="sessionIdsManual" placeholder="Advanced: optional class IDs, one per line">${p([...d].filter(m=>!r.sessions.some(y=>y.id===m)).join(`
`))}</textarea>
      </label>
    `}if(e.type==="image"){const d=`${n}PositionX`,u=`${n}PositionY`,m=a[d]||"center",y=a[u]||"center",v=Oo(e,a);return`
      <div class="adminImageField">
        <label>${e.label}${o}${v?`<small><strong>Frontend use:</strong> ${p(v)}</small>`:""}<input name="${n}" data-image-value="${n}" value="${k(i)}" placeholder="Paste an image link or upload below" /></label>
        <div class="adminImagePreviewFrame" data-image-preview="${n}">
          ${i?`<img class="adminImagePreview" src="${k(i)}" alt="${e.label}" />`:'<div class="adminImagePreview emptyPreview">No image selected</div>'}
        </div>
        <small class="adminImageStatus" data-image-status="${n}" aria-live="polite"></small>
        <label class="uploadButton">Upload Image<input type="file" accept="image/*" data-image-upload data-image-target="${n}" /></label>
        <div class="adminImageFocus">
          <label>Horizontal Focus
            <select name="${n}PositionX">${da("x",m)}</select>
          </label>
          <label>Vertical Focus
            <select name="${n}PositionY">${da("y",y)}</select>
          </label>
        </div>
      </div>
    `}if(e.type==="list"){const d=Array.isArray(t)?t.join(`
`):i;return`<label>${e.label}${o}<textarea name="${n}" placeholder="One date per line">${p(d)}</textarea></label>`}const l=e.type==="number"?"number":e.type==="date"?"date":e.type==="time"?"time":"text",c=l==="number"?' min="0" step="1"':"";return`<label>${e.label}${o}<input type="${l}" name="${n}" value="${k(i)}" ${e.required?"required":""}${c} /></label>`}function p(e){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;")}function k(e){return p(e).replaceAll('"',"&quot;")}function Fe(){return x(s("notFound.title"),s("notFound.subtitle"))}function Uo(e={}){if(e.programId!=="membership")return"";const t=i=>(ue({title:i},s("memberAccount.membershipNotAdded")),i);if(M.find(i=>i.programId==="membership"))return t(s("memberAccount.membershipAlreadyInCart"));const n=xa();return n==="plus"?t(s("memberAccount.plusAlreadyActive")):n==="regular"&&e.id==="general-membership"?t(s("memberAccount.regularAlreadyActive")):""}function jo(e){const t=r.sessions.find(o=>o.id===e);if(!t||Be(t)<=0)return;const a=qt(t),n=a.length>1?an(t,a.length):Oa(t),i={kind:a.length===1?"session":"package",id:a.length===1?t.id:`${t.id}-selected-${a.length}`,programId:t.programId,title:a.length===1?f(t,"title"):`${f(t,"title")} · ${r.language==="zh"?`${a.length} 周`:`${a.length} weeks`}`,title_zh:a.length===1?t.title_zh:`${t.title_zh||t.title_en} · ${a.length} 周`,meta:`${a.map(Le).join(", ")} / ${X(t.time)}`,credits:a.length>1?a.length:void 0,price:n};M.push(i),ue(i),W(),h()}function Ho(e){const t=r.sessions.find(o=>o.id===e);if(!t||Be(t)<=0)return;if(Uo(t)){h();return}const n=t.programId==="membership"?ja(new Date().toISOString(),1):"",i={kind:"session",id:e,programId:t.programId,title:f(t,"title"),title_zh:t.title_zh,meta:t.programId==="membership"?r.language==="zh"?`有效至 ${n}`:`Active through ${n}`:`${r.language==="zh"?Le(at(t)):t.dates} / ${X(t.time)}`,expiresAt:n,price:Oa(t)};M.push(i),ue(i),W(),h()}function Vo(e){const[t,a]=String(e).split(":"),n=r.sessions.find(m=>m.id===t),i=n?.packages?.[Number(a)];if(!n||!i)return;const[o,l]=i,c=String(o).match(/\d+/),d=c?Number(c[0]):Math.max(1,(n.datesList||pe(n.dates)).length||1),u={kind:"package",id:`${n.id}-package-${a}`,programId:n.programId,title:`${f(n,"title")} · ${vt(o)}`,title_zh:`${n.title_zh||n.title_en} · ${vt(o)}`,meta:r.language==="zh"?`${d} 次 · 12 个月后到期`:`${d} credit${d===1?"":"s"} · expires in 12 months`,credits:d,price:l};M.push(u),ue(u),W(),h()}function Go(e){const t=r.products.find(n=>n.id===e&&n.active!==!1);if(!t||Number(t.stock||0)<=0)return;const a={kind:"product",id:e,title:f(t,"title"),title_zh:t.title_zh,meta:t.sizes||(r.language==="zh"?"周边商品":"Merchandise"),quantity:1,price:Number(t.price||0)};M.push(a),ue(a),W(),h()}function Wo(e){const t=r.courtSlots.find(n=>n.id===e);if(!t||t.booked)return;const a={kind:"court",id:e,programId:t.programId,title:r.language==="zh"?t.title_zh:t.courtType,title_zh:t.title_zh,meta:`${t.date} / ${X(t.time)}`,price:t.price};M.push(a),ue(a),W(),h()}function Jo(e){const t=Et(),a=z(t.serviceId);if(!a)return;const n=t.selectedStartTime||e;if(!n){alert(r.language==="zh"?"请先选择时间。":"Select a time first."),h();return}const i={date:t.date,startTime:n,endTime:fe(n,t.duration),quantity:a.mode==="machine"?1:Math.max(1,t.quantity),machinePosition:a.mode==="machine"?t.machinePosition:""};if(a.mode==="machine"&&!i.machinePosition){alert(r.language==="zh"?"请先选择投篮机。":"Choose a shooting machine first.");return}const o=M.findIndex(m=>yr(m,a)&&m.date===i.date&&m.startTime===i.startTime&&m.endTime===i.endTime&&(!i.machinePosition||m.machinePosition===i.machinePosition));if(o>=0){M.splice(o,1),W(),h();return}const l=tr(a,i,yt());if(!l.available){alert(me(l.reason)||s("bookingSystem.conflictFallback")),h();return}const c=wt(a,i,[...r.bookings,...yt()]),d=Wa(a,t.duration,i.quantity),u={kind:"booking",cartId:`CART-${Date.now()}`,serviceId:c.id,displayServiceId:a.id,programId:"court-rental",title:D(a,r.language),title_zh:D(a,"zh"),date:i.date,startTime:i.startTime,endTime:i.endTime,quantity:i.quantity,machinePosition:i.machinePosition,meta:`${i.date} / ${i.startTime}-${i.endTime}${i.machinePosition?` / ${i.machinePosition.replace("machine-","Machine ")}`:""}`,price:d};M.push(u),ue(u),we({selectedStartTime:""}),W(),h()}function Ko(e){const t=J(e),a=z("main-full"),n={id:`REQ-${Date.now()}`,kind:"full_court_request",status:"pending_request",source:"customer",serviceId:"main-full",serviceLabel_en:D(a,"en"),serviceLabel_zh:D(a,"zh"),date:t.date,preferredTimeRange:t.preferredTimeRange,duration:Number(t.duration||120),quantity:Number(t.participants||1),customer:{name:t.name,phone:t.phone,email:t.email,notes:t.notes},paymentMethod:"Staff follow-up",paymentStatus:"pending",lockStatus:"not_locked",createdAt:new Date().toISOString()};r.bookings.unshift(n),N();const i=cn(n);sessionStorage.setItem("fullCourtRequestNotice",r.language==="zh"?"定场请求已提交，邮件草稿已打开。":"Court request submitted. An email draft has been opened."),window.location.href=i,h()}function Yo(e){const t=ge();if(!t?.student)return;const a=Ze(j(),t.student.id,{now:new Date().toISOString()}),n=Ot(a),i=J(e),o=z("main-full"),l={id:`REQ-${Date.now()}`,kind:"full_court_request",status:"pending_request",source:"member",serviceId:"main-full",serviceLabel_en:D(o,"en"),serviceLabel_zh:D(o,"zh"),studentId:t.student.id,studentName:t.student.fullName,membershipLevel:t.membershipLevel||"visitor",creditPackageId:n?.programId==="court-rental"?n.id:"",date:i.date,preferredTimeRange:i.preferredTimeRange,duration:Number(i.duration||120),quantity:Number(i.participants||1),customer:{name:i.name||t.student.fullName,phone:i.phone||t.student.phone,email:i.email||t.student.email,notes:i.notes},paymentMethod:"Staff follow-up",paymentStatus:"pending",lockStatus:"not_locked",createdAt:new Date().toISOString()};r.bookings.unshift(l),N();const c=cn(l);sessionStorage.setItem("memberAccountNotice",r.language==="zh"?"定场请求已提交，邮件草稿已打开。工作人员确认前不会扣除会员次数。":"Court request submitted. An email draft has been opened. No member credit was deducted before staff confirmation."),window.location.href=c,h()}function cn(e){const t=e.customer||{},a=`Main Court Booking Request - ${e.date}`,n=["New Main Court booking request","",e.studentName?`Member account: ${e.studentName} (${e.studentId||""})`:"",e.membershipLevel?`Membership level: ${e.membershipLevel}`:"",e.creditPackageId?`Member court package: ${e.creditPackageId}`:"",(e.studentName||e.membershipLevel||e.creditPackageId,""),`Name: ${t.name||""}`,`Phone: ${t.phone||""}`,`Email: ${t.email||""}`,`Booking date: ${e.date||""}`,`Preferred time range: ${e.preferredTimeRange||""}`,`Duration: ${Number(e.duration||0)/60}H`,`Participants: ${e.quantity||1}`,`Notes: ${t.notes||""}`].join(`
`);return`mailto:info@firstlighttrainingcenter.ca?subject=${encodeURIComponent(a)}&body=${encodeURIComponent(n)}`}function Qo(){const e=[];for(const t of M.filter(a=>a.kind==="booking")){const a=z(t.serviceId),n={date:t.date,startTime:t.startTime,endTime:t.endTime,quantity:t.quantity,machinePosition:t.machinePosition},i=ee(a,n,[...r.bookings,...e]);if(!i.available)return{ok:!1,item:t,reason:i.reason};e.push(We({id:`BK-${Date.now()}-${e.length+1}`,source:"customer",service:a,...n,customer:{},paymentMethod:"Credit Card",machinePosition:t.machinePosition}))}return{ok:!0,bookings:e}}function ua(e){const t=e.querySelector("input[name='participantType']:checked")?.value||"adult";e.querySelectorAll("[data-checkout-section]").forEach(a=>{const n=a.dataset.checkoutSection===t;a.hidden=!n,a.querySelectorAll("input, select, textarea").forEach(i=>{i.disabled=!n})})}function Xo(e){const t=Object.fromEntries(new FormData(e).entries()),a=t.participantType==="minor"?"minor":"adult";t.photoConsent=t.photoConsent==="on",t.marketingConsent=t.marketingConsent==="on";const n=Zo(t,a),i=Kn(n,{asOf:new Date().toISOString(),participantType:a});if(!i.valid){alert(`${s("checkoutForm.validationPrefix")} ${i.errors.join("; ")}`);return}const o=Qo();if(!o.ok){alert(`${s("checkoutForm.bookingConflict")} ${o.item.title} ${Ja(o.item)} ${s("checkoutForm.noLongerAvailable")} ${o.reason||""}`),h();return}const l=Xn(r.students||[],n,{now:new Date().toISOString()});r.students=l.students,sessionStorage.setItem("firstlight_member_student_id",l.student.id);const c=a==="minor"||At(n)?t.signatureRelation||t.guardianRelation||"Guardian":t.signatureRelation||"Self",d={...t,...Qn(n,a),participantType:a},u=Ki(t.paymentMethod),m={id:`BK-${Date.now()}`,kind:"order",status:u.status,participantType:a,studentId:l.student.id,studentName:l.student.fullName,customer:d,paymentMethod:t.paymentMethod,paymentStatus:u.paymentStatus,lockStatus:u.lockStatus,paymentReference:t.paymentReference||"",paymentMessage:u.paymentMessage,paymentConfirmedAt:u.confirmedAt,language:r.language,items:M,total:M.reduce((_,g)=>_+g.price,0),emailSent:"demo-prepared",createdAt:new Date().toISOString()},y=Zn({studentId:l.student.id,orderId:m.id,template:K,signerName:t.signatureName,signerRelation:c,participantType:a,templateAudience:a,userAgent:navigator.userAgent,now:m.createdAt});if(m.waiverSignedAt=y.signedAt,m.waiverSignatureId=y.id,r.waiverSignatures=[y,...r.waiverSignatures||[]],de(m)){for(const _ of M)if(_.kind==="court"){const g=r.courtSlots.find(T=>T.id===_.id);g&&(g.booked=!0)}}const v=Pa({records:{enrollments:r.enrollments||[],creditPackages:r.creditPackages||[],creditTransactions:r.creditTransactions||[]},order:m,now:m.createdAt});if(r.enrollments=v.enrollments,r.creditPackages=v.creditPackages,r.creditTransactions=v.creditTransactions,de(m))for(const _ of o.bookings)r.bookings.unshift({..._,status:"confirmed",paymentStatus:u.paymentStatus,lockStatus:u.lockStatus,orderId:m.id,studentId:l.student.id,studentName:l.student.fullName,customer:d,participantType:a,paymentMethod:t.paymentMethod,language:r.language});r.bookings.unshift(m),M=[],sessionStorage.setItem("lastConfirmedBookingId",m.id),N(),W(),h(),setTimeout(()=>{document.querySelector("[data-confirmation-summary]")?.scrollIntoView({behavior:"smooth",block:"start"})})}function Zo(e,t="adult"){const a=t==="minor";return{fullName:e.name,birthDate:e.birthDate,phone:a?e.guardianPhone:e.phone,email:a?e.guardianEmail:e.email,participantType:t,address:e.address,primarySport:e.primarySport,experience:e.experience,preferredClassTime:e.preferredTime,notes:e.notes,source:"website checkout",signatureName:e.signatureName,guardian:a?{name:e.guardianName,relation:e.guardianRelation,phone:e.guardianPhone,email:e.guardianEmail}:{},emergency:{name:e.emergency,phone:e.emergencyPhone},medicalNotes:e.medicalNotes,photoConsent:e.photoConsent,marketingConsent:e.marketingConsent}}function es(e){const t=Object.fromEntries(new FormData(e).entries()),a=ei(r.students||[],t);if(!a){sessionStorage.setItem("firstlight_member_login_error",r.language==="zh"?"未找到账户。请使用已完成预约订单中的邮箱，或联系前台。":"Account not found. Please use the email from a completed booking or contact the front desk."),h();return}sessionStorage.setItem("firstlight_member_student_id",a.id),sessionStorage.removeItem("firstlight_member_login_error"),h()}function ts(e){const t=ge();if(!t?.student)return;const a=Object.fromEntries(new FormData(e).entries());Object.assign(t.student,{phone:a.phone,address:a.address,preferredClassTime:a.preferredClassTime,emergencyPhone:a.emergencyPhone,medicalNotes:a.medicalNotes,updatedAt:new Date().toISOString()}),N(),h()}function dn(e,t=""){r.enrollments=e.enrollments||r.enrollments,r.bookings=e.bookings||r.bookings,r.creditPackages=e.creditPackages||r.creditPackages,r.creditTransactions=e.creditTransactions||r.creditTransactions,e.openCourtSlots&&(r.openCourtSlots=e.openCourtSlots),N(),t&&sessionStorage.setItem("memberAccountNotice",t),h()}function as(){const e=sessionStorage.getItem("memberAccountNotice");return e?(sessionStorage.removeItem("memberAccountNotice"),`<div class="adminNotice">${p(e)}</div>`):""}function ns(e){const[t,a,n]=String(e).split(":"),i=r.sessions.find(d=>d.id===a),l=(i?.datesList||pe(i?.dates))?.[Number(n)];if(!i||!l)return;const c={kind:"class",id:i.id,title:f(i,"title"),title_zh:i.title_zh,programId:i.programId,date:l,time:i.time,startsAt:l};ot(t,c)}function is(e){const t=Object.fromEntries(new FormData(e).entries()),a=r.sessions.find(n=>n.id===t.sessionId);a&&ot(t.packageId,{kind:"class",id:a.id,title:f(a,"title"),title_zh:a.title_zh,programId:a.programId,date:t.date,time:t.startTime,startsAt:`${t.date}T${t.startTime}:00.000`})}function rs(e){const t=ge(),a=t?Ze(j(),t.student.id,{now:new Date().toISOString()}):[],n=Ot(a);if(!t?.student||!n)return;const i=Ut(),o=z(i.serviceId);if(!o)return;if(o.id==="main-full"){alert(r.language==="zh"?"全场需要先提交定场请求，由工作人员确认。":"Main Court Full requires a request form and staff confirmation."),h();return}const l=i.selectedStartTime||e;if(!l){alert(r.language==="zh"?"请先选择时间。":"Select a time first."),h();return}const c={date:i.date,startTime:l,endTime:fe(l,i.duration),quantity:o.mode==="machine"?1:Math.max(1,i.quantity),machinePosition:o.mode==="machine"?i.machinePosition:""};if(o.mode==="machine"&&!c.machinePosition){alert(r.language==="zh"?"请先选择投篮机。":"Choose a shooting machine first."),h();return}const d=ee(o,c,r.bookings);if(!d.available){alert(me(d.reason)||s("bookingSystem.conflictFallback")),h();return}const u=wt(o,c,r.bookings);_e({selectedStartTime:""}),ot(n.id,{kind:"resource",id:u.id,serviceId:u.id,title:D(o,r.language),title_zh:D(o,"zh"),programId:"court-rental",date:c.date,startTime:c.startTime,endTime:c.endTime,startsAt:`${c.date}T${c.startTime}:00.000`,quantity:c.quantity,machinePosition:c.machinePosition,resources:u.resources||[],service:u})}function os(e){const[t,a]=String(e).split(":"),n=(r.openCourtSlots||[]).find(i=>i.id===a);n&&ot(t,{kind:"openGym",id:n.id,title:f(n,"title"),title_zh:n.title_zh,programId:"open-gym",date:n.date,startTime:n.startTime,endTime:n.endTime,startsAt:`${n.date}T${n.startTime}:00.000`,quantity:1})}function ot(e,t){const a=ge();if(a?.student)try{const n=ni({records:j(),studentId:a.student.id,packageId:e,option:t,now:new Date().toISOString()});dn(n,s("memberAccount.reservedNotice"))}catch(n){alert(n.message||s("memberAccount.reserveFailed"))}}function ss(e){const t=ge();if(!t?.student)return;const a=ii({records:j(),studentId:t.student.id,usageId:e,now:new Date().toISOString(),cutoffHours:48});if(!a.cancelled){alert(a.reason==="Cancellation window has passed"?s("memberAccount.cancelWindowPassed"):a.reason);return}dn(a,s("memberAccount.cancelledNotice"))}function ls(){try{return JSON.parse(sessionStorage.getItem("adminStudentFilters")||"{}")}catch{return{}}}function cs(e){return[...new Set([...(e.enrollments||[]).map(t=>t.programId),...(e.creditPackages||[]).map(t=>t.programId),...(e.bookings||[]).flatMap(t=>(t.items||[]).map(a=>a.programId))].filter(Boolean))].sort()}function ds(e){const t=Object.fromEntries(new FormData(e).entries()),a=(r.students||[]).find(n=>n.id===t.studentId);a&&(a.staffNotes=t.staffNotes,a.updatedAt=new Date().toISOString(),N(),E("Student notes saved."),h())}function us(e){const t=Object.fromEntries(new FormData(e).entries()),a=Number(t.units||0);if(!t.studentId||!t.programId||a===0)return;const n=new Date().toISOString();try{if(a<0){const i=Ia({creditPackages:r.creditPackages||[],creditTransactions:r.creditTransactions||[],studentId:t.studentId,programId:t.programId,units:Math.abs(a),reason:t.reason||"manual adjustment",staffId:"admin",now:n});r.creditPackages=i.creditPackages,r.creditTransactions=i.creditTransactions}else{const i=(r.students||[]).find(c=>c.id===t.studentId),o={id:`credit-adjustment-${Date.now()}`,orderId:"manual-adjustment",studentId:t.studentId,studentName:i?.fullName||"",programId:t.programId,title:t.reason||"Manual credit adjustment",originalCredits:0,balance:a,purchasedAt:n,expiresAt:ja(n,12)},l=(r.creditPackages||[]).filter(c=>c.studentId===t.studentId&&c.programId===t.programId).reduce((c,d)=>c+Number(d.balance||0),a);r.creditPackages=[o,...r.creditPackages||[]],r.creditTransactions=[{id:`credit-adjustment-tx-${Date.now()}`,packageIds:[o.id],studentId:t.studentId,programId:t.programId,type:"adjustment",units:a,balanceAfter:l,reason:t.reason||"manual adjustment",staffId:"admin",orderId:"",createdAt:n},...r.creditTransactions||[]]}N(),E("Credit package adjustment saved and logged."),h()}catch(i){alert(i.message||(r.language==="zh"?"课包调整失败。":"Credit adjustment failed."))}}function ms(e){const t=(r.enrollments||[]).find(a=>a.id===e);t&&(t.status="cancelled",t.cancelledAt=new Date().toISOString(),N(),E("Enrollment status changed to cancelled."),h())}function ps(e){const t=e.participantType==="minor",a=r.language==="zh"?t?"学员档案":"参与者档案":t?"Student record":"Participant record",n=r.language==="zh"?t?"家长/监护人":"联系人":t?"Parent/guardian":"Contact";return`
    <article class="emailPreview">
      <div class="eyebrow">${C("confirmation")}</div>
      <h2>${r.language==="zh"?"邮件预览":"Email preview"} / ${e.id}</h2>
      <p>${r.emailTemplates[e.language]}</p>
      <p><strong>${n}: ${e.customer.name}</strong> / ${e.customer.email} / ${e.customer.phone}</p>
      <ul>${e.items.map(i=>`<li>${ae(i)} - ${i.meta} - ${w(i.price)}</li>`).join("")}</ul>
      <p>${r.language==="zh"?"付款":"Payment"}: ${nt(e.paymentMethod)} / ${Lt(e)}</p>
      <p>${e.paymentMessage||""}</p>
      <p>${r.language==="zh"?"地址":"Address"}: 165-13631 Vulcan Way, Richmond, BC V6V 1K4</p>
      <p>${r.language==="zh"?"免责协议已签署":"Waiver signed"}: ${new Date(e.waiverSignedAt).toLocaleString(r.language==="zh"?"zh-CN":void 0)} · ${f(K,"title")} v${K.version}</p>
      <p>${a}: ${e.studentName} · ${e.studentId}</p>
    </article>
  `}function gs(){return I==="home"?"":`
    <div class="pageBackWrap">
      <button class="pageBackButton" type="button" data-action="page-back">${r.language==="zh"?"← 返回":"← Back"}</button>
    </div>
  `}function h(){let e;I.startsWith("dropdown:")?e=Cr(I.split(":")[1]):I.startsWith("catalog:")?e=br(I.split(":")[1]):I.startsWith("program:")?e=fr(I.split(":")[1]):I.startsWith("coach:")?e=Nr(I.split(":")[1]):e=({home:ta,programs:gr,coaches:Tr,schedule:Lr,contact:Br,league:Er,about:Dr,"open-court":rn,account:Kr,wishlist:ho,merchandise:fo,cart:So,admin:wo}[I]||ta)(),document.querySelector("#app").innerHTML=`${ar()}${xi()}<main>${gs()}${e}</main>${bs()}`,hs(),Oi()}function bs(){return`
    <footer>
      <img src="${te("nav-logo",Nt)}" alt="First Light" />
      <span>165-13631 Vulcan Way, Richmond, BC V6V 1K4</span>
      <span>info@firstlighttrainingcenter.ca</span>
      <a href="${r.social.instagram}" target="_blank" rel="noreferrer">Instagram</a>
      <a href="${r.social.facebook}" target="_blank" rel="noreferrer">Facebook</a>
      <span>WeChat: ${r.social.wechat}</span>
      <button class="footerAdminLink" data-route="admin">${s("admin")}</button>
    </footer>
  `}function hs(){document.querySelectorAll("[data-route]").forEach(t=>t.addEventListener("click",a=>{a.preventDefault(),ea(t.dataset.route)})),document.querySelectorAll("[data-dropdown-trigger]").forEach(t=>t.addEventListener("click",a=>{a.preventDefault(),a.stopPropagation();const n=t.closest(".navDropdown")||t.closest(".actionDropdown");document.querySelectorAll(".navDropdown.open, .actionDropdown.open").forEach(o=>{o!==n&&o.classList.remove("open")}),n?.classList.toggle("open")})),document.addEventListener("click",()=>{document.querySelectorAll(".navDropdown.open").forEach(t=>t.classList.remove("open")),document.querySelectorAll(".actionDropdown.open").forEach(t=>t.classList.remove("open"))},{once:!0}),document.querySelectorAll("[data-action='toggle-language']").forEach(t=>t.addEventListener("click",()=>{r.language=r.language==="en"?"zh":"en",N(),h()})),document.querySelector("[data-action='page-back']")?.addEventListener("click",()=>{history.length>1?history.back():ea("home")}),document.querySelectorAll("[data-toggle-week]").forEach(t=>t.addEventListener("click",()=>{const[a,n]=t.dataset.toggleWeek.split(":"),i=r.sessions.find(u=>u.id===a),o=i?.datesList||pe(i?.dates),l=o?.[Number(n)];if(!i||!l)return;const c=qt(i);let d=c.includes(l)?c.filter(u=>u!==l):[...c,l];d.length||(d=[l]),d=o.filter(u=>d.includes(u)).slice(0,4),sessionStorage.setItem(`selectedWeeks:${i.id}`,JSON.stringify(d)),h()})),document.querySelectorAll("[data-add-selected-weeks]").forEach(t=>t.addEventListener("click",()=>jo(t.dataset.addSelectedWeeks))),document.querySelectorAll("[data-add-session]").forEach(t=>t.addEventListener("click",()=>Ho(t.dataset.addSession))),document.querySelectorAll("[data-add-package]").forEach(t=>t.addEventListener("click",()=>Vo(t.dataset.addPackage))),document.querySelectorAll("[data-add-court]").forEach(t=>t.addEventListener("click",()=>Wo(t.dataset.addCourt))),document.querySelectorAll("[data-add-product]").forEach(t=>t.addEventListener("click",()=>Go(t.dataset.addProduct))),document.querySelectorAll("[data-booking-service]").forEach(t=>t.addEventListener("click",()=>{we({serviceId:t.dataset.bookingService,quantity:1,machinePosition:"",selectedStartTime:""}),h()})),document.querySelectorAll("[data-booking-draft]").forEach(t=>t.addEventListener("change",()=>{we({[t.dataset.bookingDraft]:t.value,selectedStartTime:""}),h()})),document.querySelectorAll("[data-machine-position]").forEach(t=>t.addEventListener("click",()=>{we({machinePosition:t.dataset.machinePosition,selectedStartTime:""}),h()})),document.querySelectorAll("[data-booking-time]").forEach(t=>t.addEventListener("click",()=>{we({selectedStartTime:t.dataset.bookingTime}),h()})),document.querySelector("[data-add-booking-to-cart]")?.addEventListener("click",()=>Jo()),document.querySelector("[data-full-court-request]")?.addEventListener("submit",t=>{t.preventDefault(),Ko(t.currentTarget)}),document.querySelectorAll("[data-remove-cart]").forEach(t=>t.addEventListener("click",()=>{M.splice(Number(t.dataset.removeCart),1),W(),h()})),document.querySelectorAll("[data-toggle-dates]").forEach(t=>t.addEventListener("click",()=>{const a=`dates:${t.dataset.toggleDates}`;sessionStorage.setItem(a,sessionStorage.getItem(a)==="open"?"closed":"open"),h()}));const e=document.querySelector("[data-checkout]");e&&(ua(e),e.querySelectorAll("input[name='participantType']").forEach(t=>{t.addEventListener("change",()=>ua(e))}),e.addEventListener("submit",t=>{t.preventDefault(),Xo(t.currentTarget)})),document.querySelector("[data-member-login]")?.addEventListener("submit",t=>{t.preventDefault(),es(t.currentTarget)}),document.querySelector("[data-member-test-login]")?.addEventListener("click",()=>{sessionStorage.setItem("firstlight_member_student_id",B),sessionStorage.removeItem("firstlight_member_login_error"),h()}),document.querySelector("[data-member-logout]")?.addEventListener("click",()=>{sessionStorage.removeItem("firstlight_member_student_id"),h()}),document.querySelector("[data-member-profile]")?.addEventListener("submit",t=>{t.preventDefault(),ts(t.currentTarget)}),document.querySelector("[data-member-package-select]")?.addEventListener("change",t=>{sessionStorage.setItem("memberSelectedPackageId",t.currentTarget.value),h()}),document.querySelectorAll("[data-member-reserve-class]").forEach(t=>t.addEventListener("click",()=>{ns(t.dataset.memberReserveClass)})),document.querySelectorAll("[data-member-reserve-custom-class]").forEach(t=>t.addEventListener("submit",a=>{a.preventDefault(),is(a.currentTarget)})),document.querySelectorAll("[data-member-booking-service]").forEach(t=>t.addEventListener("click",()=>{_e({serviceId:t.dataset.memberBookingService,quantity:1,machinePosition:"",selectedStartTime:""}),h()})),document.querySelectorAll("[data-member-booking-draft]").forEach(t=>t.addEventListener("change",()=>{_e({[t.dataset.memberBookingDraft]:t.value,selectedStartTime:""}),h()})),document.querySelectorAll("[data-member-machine-position]").forEach(t=>t.addEventListener("click",()=>{_e({machinePosition:t.dataset.memberMachinePosition,selectedStartTime:""}),h()})),document.querySelectorAll("[data-member-resource-time]").forEach(t=>t.addEventListener("click",()=>{_e({selectedStartTime:t.dataset.memberResourceTime}),h()})),document.querySelector("[data-reserve-member-resource]")?.addEventListener("click",()=>rs()),document.querySelector("[data-member-full-court-request]")?.addEventListener("submit",t=>{t.preventDefault(),Yo(t.currentTarget)}),document.querySelectorAll("[data-member-open-gym]").forEach(t=>t.addEventListener("click",()=>{os(t.dataset.memberOpenGym)})),document.querySelectorAll("[data-member-cancel-usage]").forEach(t=>t.addEventListener("click",()=>{ss(t.dataset.memberCancelUsage)})),document.querySelector("[data-contact]")?.addEventListener("submit",t=>{t.preventDefault(),alert(r.language==="zh"?"信息已提交。":"Message submitted.")}),document.querySelector("[data-film-review-upload]")?.addEventListener("submit",t=>{t.preventDefault(),vs(t.currentTarget)}),fs()}function fs(){document.querySelectorAll("[data-admin-tab]").forEach(e=>e.addEventListener("click",()=>{sessionStorage.setItem("adminTab",e.dataset.adminTab),h()})),document.querySelectorAll("[data-admin-page]").forEach(e=>e.addEventListener("submit",t=>{t.preventDefault(),Object.assign(r.pages[e.dataset.adminPage],mt(J(t.currentTarget))),N(),E("Page content saved."),h()})),document.querySelectorAll("[data-admin-collection]").forEach(e=>e.addEventListener("submit",t=>{t.preventDefault();const a=e.dataset.adminCollection,n=r[a].find(o=>o.id===e.dataset.id),i=mt(J(t.currentTarget));Object.assign(n,i),a==="bookingServices"&&(r.bookingServices=Da(r.bookingServices)),N(),E("Content saved. Public pages have been updated."),h()})),document.querySelector("[data-admin-social]")?.addEventListener("submit",e=>{e.preventDefault(),r.social=J(e.currentTarget),N(),E("Social links saved."),h()}),document.querySelector("[data-admin-email]")?.addEventListener("submit",e=>{e.preventDefault(),r.emailTemplates=mt(J(e.currentTarget)),N(),E("Email template saved."),h()}),document.querySelector("[data-admin-booking]")?.addEventListener("submit",e=>{e.preventDefault(),zs(e.currentTarget)}),document.querySelectorAll("[data-admin-schedule-service]").forEach(e=>e.addEventListener("click",()=>{Ue({serviceId:e.dataset.adminScheduleService,quantity:1,machinePosition:"",startTime:""}),h()})),document.querySelectorAll("[data-admin-schedule-draft]").forEach(e=>{const t=()=>{const a=e.dataset.adminScheduleDraft,n={[a]:e.value};a==="serviceId"&&(n.machinePosition="",n.startTime="",n.quantity=1),Ue(n),["phone","email","pricingMode"].includes(a)&&Ms(e.closest("form")),["serviceId","date","duration","quantity","machinePosition","startTime"].includes(a)&&h()};e.addEventListener("input",t),e.addEventListener("change",t)}),document.querySelectorAll("[data-admin-schedule-time]").forEach(e=>e.addEventListener("click",()=>{Ue({startTime:e.dataset.adminScheduleTime}),h()})),document.querySelector("[data-admin-booking-service]")?.addEventListener("change",e=>{As(e.currentTarget)}),document.querySelector("[data-video-review-login]")?.addEventListener("submit",e=>{e.preventDefault(),ys(e.currentTarget)}),document.querySelector("[data-action='video-review-logout']")?.addEventListener("click",()=>{Un(),A={loading:!1,loaded:!1,error:"",submissions:[]},h()}),document.querySelector("[data-action='refresh-video-reviews']")?.addEventListener("click",()=>{St()}),document.querySelectorAll("[data-video-review-status]").forEach(e=>e.addEventListener("change",()=>{const t=e.dataset.videoReviewStatus,a=A.submissions.find(n=>n.id===t);a&&(a.status=e.value)})),document.querySelectorAll("[data-video-review-save]").forEach(e=>e.addEventListener("click",()=>{const t=e.dataset.videoReviewSave,a=document.querySelector(`[data-video-review-status='${CSS.escape(t)}']`)?.value||"submitted",n=document.querySelector(`[data-video-review-notes='${CSS.escape(t)}']`)?.value||"";$s(t,{status:a,coach_notes:n})})),document.querySelectorAll("[data-local-video-download]").forEach(e=>e.addEventListener("click",()=>{Ss(e.dataset.localVideoDownload)})),I==="admin"&&$t()==="videoReviews"&&(!ye()||Ct())&&!A.loaded&&!A.loading&&St(),document.querySelector("[data-consume-credit]")?.addEventListener("submit",e=>{e.preventDefault(),Es(e.currentTarget)}),document.querySelector("[data-admin-student-filters]")?.addEventListener("submit",e=>{e.preventDefault(),sessionStorage.setItem("adminStudentFilters",JSON.stringify(J(e.currentTarget))),h()}),document.querySelector("[data-action='clear-student-filters']")?.addEventListener("click",()=>{sessionStorage.removeItem("adminStudentFilters"),h()}),document.querySelectorAll("[data-admin-student-notes]").forEach(e=>e.addEventListener("submit",t=>{t.preventDefault(),ds(t.currentTarget)})),document.querySelectorAll("[data-adjust-credit]").forEach(e=>e.addEventListener("submit",t=>{t.preventDefault(),us(t.currentTarget)})),document.querySelectorAll("[data-cancel-enrollment]").forEach(e=>e.addEventListener("click",()=>{ms(e.dataset.cancelEnrollment)})),document.querySelectorAll("[data-cancel-booking]").forEach(e=>e.addEventListener("click",()=>{confirm("Cancel this booking? The schedule will immediately reopen available times.")&&Bs(e.dataset.cancelBooking)})),document.querySelectorAll("[data-confirm-payment]").forEach(e=>e.addEventListener("click",()=>{Ls(e.dataset.confirmPayment)})),document.querySelectorAll("[data-add-row]").forEach(e=>e.addEventListener("click",()=>{const t=e.dataset.addRow;r[t].unshift(wn(t,{existingItems:r[t],programs:r.programs,defaultImage:S})),N(),E("New item added. Fill it in and click Save."),h()})),document.querySelectorAll("[data-copy-row]").forEach(e=>e.addEventListener("click",()=>{const[t,a]=e.dataset.copyRow.split(":"),n=r[t].find(i=>i.id===a);n&&(r[t].unshift(_n(t,n,{existingItems:r[t]})),N(),E("Item copied. Edit it and click Save."),h())})),document.querySelectorAll("[data-delete-row]").forEach(e=>e.addEventListener("click",()=>{const[t,a]=e.dataset.deleteRow.split(":");confirm("Deleting is permanent. You can usually hide content by setting Show on Site to No. Delete anyway?")&&(r[t]=r[t].filter(n=>n.id!==a),N(),E("Content deleted."),h())})),document.querySelectorAll("[data-image-upload]").forEach(e=>e.addEventListener("change",()=>{ks(e)})),document.querySelector("[data-action='reset-data']")?.addEventListener("click",()=>{confirm("Reset all demo data? This clears admin changes and cart data in this browser.")&&(r=structuredClone(L),M=[],N(),W(),E("Demo data has been reset."),h())}),document.querySelector("[data-action='export-bookings']")?.addEventListener("click",xs),document.querySelector("[data-action='export-students']")?.addEventListener("click",Ds),document.querySelector("[data-action='export-orders']")?.addEventListener("click",Fs),document.querySelector("[data-action='export-credits']")?.addEventListener("click",Rs),document.querySelector("[data-action='export-waivers']")?.addEventListener("click",qs)}async function vs(e){const t=J(e),a=e.querySelector("input[type='file']")?.files?.[0],n=It(t,a);if(!n.ok){alert(Bn(n.errors,r.language).join(`
`));return}sessionStorage.setItem("filmReviewUploadNotice",r.language==="zh"?"视频正在上传，请不要关闭页面。":"Uploading video. Please keep this page open."),sessionStorage.setItem("filmReviewUploadProgress","5"),h();try{ye()?(await xn({fields:t,file:a,onProgress:i=>{sessionStorage.setItem("filmReviewUploadProgress",String(i))}}),sessionStorage.setItem("filmReviewUploadNotice",r.language==="zh"?"教练已收到你的视频，会用于一对一训练评估。":"Your video has been received. A coach will use it for one-on-one training review.")):(await En({fields:t,file:a}),sessionStorage.setItem("filmReviewUploadNotice",r.language==="zh"?"本地演示提交已保存，请在这台电脑的后台 Basketball IQ Reviews 查看。":"Local demo submission saved. Open Basketball IQ Reviews on this computer to view it.")),sessionStorage.removeItem("filmReviewUploadProgress")}catch(i){sessionStorage.setItem("filmReviewUploadNotice",i.message||(r.language==="zh"?"视频上传失败，请稍后再试。":"Video upload failed. Please try again.")),sessionStorage.removeItem("filmReviewUploadProgress")}h()}async function ys(e){const t=J(e);try{await On(t.email,t.password),E("Video review staff login confirmed."),A={loading:!1,loaded:!1,error:"",submissions:[]},h()}catch(a){alert(a.message||"Staff login failed.")}}async function St(){A={...A,loading:!0,error:""},h();try{A={loading:!1,loaded:!0,error:"",submissions:(ye()?await jn():await Dn()).submissions||[]}}catch(e){A={...A,loading:!1,loaded:!0,error:e.message||"Could not load video reviews."}}h()}async function $s(e,t){try{ye()?await Hn(e,t):await Fn(e,t),E("Video review saved."),A.loaded=!1,await St()}catch(a){alert(a.message||"Could not save video review.")}}async function Ss(e){try{const t=await Rn(e),a=URL.createObjectURL(t.blob),n=document.createElement("a");n.href=a,n.download=t.fileName,n.click(),setTimeout(()=>URL.revokeObjectURL(a),1e3)}catch(t){alert(t.message||"Could not download local video.")}}async function ks(e){const t=e.files?.[0];if(!t)return;const a=e.dataset.imageTarget,n=e.closest("form"),i=n?.querySelector(`[data-image-value='${CSS.escape(a)}']`)||n?.querySelector(`input[name='${CSS.escape(a)}']`);if(i)try{ws(t),ma(e,"Processing image...");const o=await _s(t);i.value=o,Ts(e,o),ma(e,"Image selected. Click Save to publish this update.")}catch(o){e.value="",Cs(e,o?.message||"Could not upload this image.")}}function ws(e){if(!e.type?.startsWith("image/"))throw new Error("Please choose a local image file.");if(e.size>Ti)throw new Error("This image is too large. Please choose an image under 12MB.")}async function _s(e){const t=await Os(e),a=await Ps(t);if((e.type==="image/png"||e.type==="image/gif"||e.type==="image/webp")&&t.length<=ht||t.length<=ht&&Math.max(a.naturalWidth||a.width,a.naturalHeight||a.height)<=za)return t;if(!document.createElement("canvas").getContext)throw new Error("This browser cannot resize images. Please choose a smaller image.");return Is(a)}function Ps(e){return new Promise((t,a)=>{const n=new Image;n.onload=()=>t(n),n.onerror=()=>a(new Error("This image could not be read. Please choose another local image.")),n.src=e})}function Is(e){const t=document.createElement("canvas"),a=t.getContext("2d");if(!a)throw new Error("This browser cannot resize images. Please choose a smaller image.");const n=e.naturalWidth||e.width||1,i=e.naturalHeight||e.height||1;let o=Math.min(1,za/Math.max(n,i)),l=.82;for(let c=0;c<8;c+=1){t.width=Math.max(1,Math.round(n*o)),t.height=Math.max(1,Math.round(i*o)),a.clearRect(0,0,t.width,t.height),a.drawImage(e,0,0,t.width,t.height);const d=t.toDataURL("image/jpeg",l);if(d.length<=ht)return d;l>.5?l-=.12:o*=.82}throw new Error("This image is still too large after compression. Please choose a smaller image.")}function Ts(e,t){const a=e.dataset.imageTarget,n=e.closest(".adminImageField")?.querySelector(`[data-image-preview='${CSS.escape(a)}']`);n&&(n.innerHTML=`<img class="adminImagePreview" src="${k(t)}" alt="Uploaded image preview" />`)}function ma(e,t){const a=e.dataset.imageTarget,n=e.closest(".adminImageField")?.querySelector(`[data-image-status='${CSS.escape(a)}']`);n&&(n.textContent=t,n.classList.remove("error"))}function Cs(e,t){const a=e.dataset.imageTarget,n=e.closest(".adminImageField")?.querySelector(`[data-image-status='${CSS.escape(a)}']`);n&&(n.textContent=t,n.classList.add("error"))}function J(e){const t=new FormData(e),a={};for(const n of new Set(t.keys())){const i=t.getAll(n);a[n]=i.length>1?i:i[0]}return a}function As(e){const t=e.closest("form")?.querySelector("[data-admin-booking-duration]"),a=z(e.value);!t||!a||(t.innerHTML=Ee(a,Ge(a)[0]))}function Ms(e){const t=e?.querySelector("[data-admin-pricing-preview]");if(!t)return;const a=Object.fromEntries(new FormData(e).entries()),n=z(a.serviceId);if(!n)return;const i={...De(),...a,duration:Z(n,a.duration),quantity:Number(a.quantity||1)};t.outerHTML=Ga(i,n)}function zs(e){const t=Object.fromEntries(new FormData(e).entries()),a=z(t.serviceId),n=Z(a,t.duration),i=a?.mode==="machine"?t.machinePosition:"";if(!a||!t.startTime)return;if(a?.mode==="machine"&&!i){alert("Select Machine 1, Machine 2, or Machine 3 before creating a shooting machine booking.");return}const o={date:t.date,startTime:t.startTime,endTime:fe(t.startTime,n),quantity:a?.mode==="machine"?1:Number(t.quantity||1),machinePosition:i},l=ee(a,o,r.bookings);if(!l.available){alert(me(l.reason)||(r.language==="zh"?"该预约与现有预约冲突。":"This booking conflicts with an existing booking."));return}const c=wt(a,o,r.bookings),d=Aa({records:j(),service:a,duration:n,quantity:o.quantity,pricingMode:t.pricingMode,email:t.email,phone:t.phone,now:new Date().toISOString()}),u=We({id:`BK-${Date.now()}`,source:"admin",service:c,...o,customer:{name:t.name,phone:t.phone,email:t.email,notes:t.notes},paymentMethod:t.paymentMethod});Object.assign(u,{paymentStatus:"paid",lockStatus:"locked",paymentConfirmedAt:new Date().toISOString(),customerType:d.customerType,pricingSource:d.pricingSource,pricingMode:d.pricingMode,pricingWarning:d.warning,pricingMessage:d.message,membershipLevel:d.membershipLevel,membershipTitle:d.membershipTitle,studentId:d.matchedStudentId||"",matchedStudentId:d.matchedStudentId,matchedStudentName:d.matchedStudentName,matchedStudentEmail:d.matchedStudentEmail,matchedStudentPhone:d.matchedStudentPhone,hourlyRate:d.hourlyRate,total:d.total}),a.id==="main-half"&&(u.displayServiceId="main-half",u.displayTitle_en=D(a,"en"),u.displayTitle_zh=D(a,"zh")),r.bookings.unshift(u),Ue({startTime:"",name:"",phone:"",email:"",pricingMode:"auto",notes:""}),N(),E("Booking created. The public schedule has updated automatically."),h()}function Ns(e){const t=[];for(const a of e.items||[]){if(a.kind==="session"){const n=r.sessions.find(i=>i.id===a.id);if(!n||Be(n)<Number(a.quantity||1))return{ok:!1,reason:`${a.title} no longer has enough spots.`}}if(a.kind==="court"){const n=r.courtSlots.find(i=>i.id===a.id);if(!n||n.booked)return{ok:!1,reason:`${a.title} is no longer available.`}}if(a.kind==="booking"){const n=z(a.serviceId),i={date:a.date,startTime:a.startTime,endTime:a.endTime,quantity:a.quantity,machinePosition:a.machinePosition},o=ee(n,i,[...r.bookings,...t]);if(!o.available)return{ok:!1,reason:`${ae(a)} ${Ja(a)} ${s("checkoutForm.noLongerAvailable")} ${me(o.reason)||""}`};t.push(We({id:`${e.id}-${t.length+1}`,source:"customer",service:n,...i,customer:e.customer,paymentMethod:e.paymentMethod,machinePosition:a.machinePosition,status:"confirmed",createdAt:new Date().toISOString()}))}}return{ok:!0,bookings:t}}function Ls(e){const t=r.bookings.find(o=>o.id===e);if(!t||t.status!=="pending_payment")return;const a=Ns(t);if(!a.ok){alert(`Cannot confirm payment: ${a.reason}`);return}const n=new Date().toISOString();t.status="confirmed",t.paymentStatus="paid",t.lockStatus="locked",t.paymentConfirmedAt=n,t.paymentMessage=r.language==="zh"?"工作人员已手动确认收款。":"Payment manually confirmed by staff.";for(const o of t.items||[])if(o.kind==="court"){const l=r.courtSlots.find(c=>c.id===o.id);l&&(l.booked=!0)}const i=Pa({records:{enrollments:r.enrollments||[],creditPackages:r.creditPackages||[],creditTransactions:r.creditTransactions||[]},order:t,now:n});r.enrollments=i.enrollments,r.creditPackages=i.creditPackages,r.creditTransactions=i.creditTransactions;for(const o of a.bookings||[])r.bookings.unshift({...o,orderId:t.id,studentId:t.studentId,studentName:t.studentName,paymentStatus:"paid",lockStatus:"locked",paymentConfirmedAt:n,language:t.language});N(),E("Payment confirmed. Spots and court time are locked."),h()}function Bs(e){const t=r.bookings.find(a=>a.id===e);if(!(!t||t.status==="cancelled")){if(t.status="cancelled",t.cancelledAt=new Date().toISOString(),t.kind==="order"){for(const a of r.bookings.filter(n=>n.orderId===t.id))a.status="cancelled",a.cancelledAt=t.cancelledAt;for(const a of t.items||[])if(a.kind==="court"){const n=r.courtSlots.find(i=>i.id===a.id);n&&(n.booked=!1)}for(const a of r.enrollments||[])a.orderId===t.id&&(a.status="cancelled")}N(),E("Booking cancelled. Available times have reopened on the public schedule."),h()}}function Es(e){const t=Object.fromEntries(new FormData(e).entries());try{const a=Ia({creditPackages:r.creditPackages||[],creditTransactions:r.creditTransactions||[],studentId:t.studentId,programId:t.programId,units:Number(t.units||1),reason:t.reason||"check-in",staffId:t.staffId,now:new Date().toISOString()});r.creditPackages=a.creditPackages,r.creditTransactions=a.creditTransactions,N(),E("Credit package usage saved and logged."),h()}catch(a){alert(a.message||"Credit check-in failed.")}}function mt(e){return Pn(e)}function Ds(){Re("firstlight-students.csv",ri(r.students||[]))}function Fs(){const e=(r.bookings||[]).filter(t=>t.kind==="order");Re("firstlight-orders.csv",oi(e))}function Rs(){Re("firstlight-credit-balances.csv",li(r.creditPackages||[]))}function qs(){Re("firstlight-waivers.csv",si(r.waiverSignatures||[]))}function xs(){const e=[["id","kind","status","paymentStatus","lockStatus","source","service","date","startTime","endTime","quantity","name","email","phone","items","customerType","pricingSource","membershipLevel","matchedStudentId","matchedStudentName","hourlyRate","total","language","paymentMethod","paymentReference","paymentConfirmedAt","createdAt","cancelledAt"]];for(const t of r.bookings){const a=z(t.serviceId);e.push([t.id,t.kind||"",t.status||"confirmed",t.paymentStatus||"",t.lockStatus||(de(t)?"locked":"not_locked"),t.source||"",D(a,"en")||t.serviceLabel_en||"",t.date||"",t.startTime||"",t.endTime||"",t.quantity||"",t.customer?.name||"",t.customer?.email||"",t.customer?.phone||"",(t.items||[]).map(n=>n.title).join("; "),t.customerType||"",t.pricingSource||"",t.membershipLevel||"",t.matchedStudentId||t.studentId||"",t.matchedStudentName||"",t.hourlyRate||"",t.total||"",t.language||"",t.paymentMethod||"",t.paymentReference||"",t.paymentConfirmedAt||"",t.createdAt||"",t.cancelledAt||""])}Re("firstlight-bookings.csv",e.map(t=>t.map(a=>`"${String(a||"").replaceAll('"','""')}"`).join(",")).join(`
`))}function Re(e,t){const a=new Blob([t],{type:"text/csv"}),n=document.createElement("a");n.href=URL.createObjectURL(a),n.download=e,n.click()}function Os(e){return new Promise((t,a)=>{const n=new FileReader;n.onload=()=>t(n.result),n.onerror=a,n.readAsDataURL(e)})}h();
