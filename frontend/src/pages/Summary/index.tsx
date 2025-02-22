import { Link, useParams } from 'react-router';
import { IoMdArrowBack } from 'react-icons/io';
import ExplanationText from './ExplanationText';
import AudioPlayer from './AudioPlayer';

function SummaryPage() {
	// const params = useParams();
	// const id = params.id;

	const demoText = `Lorem ipsum odor amet, consectetuer adipiscing elit. Mollis ipsum viverra vestibulum commodo metus nascetur non rutrum morbi. Ultrices turpis suspendisse magna feugiat; non sem neque. Aenean convallis vel imperdiet risus leo suscipit cursus. Urna sodales inceptos class pellentesque sodales mattis cras suscipit luctus. Aenean mus aliquet quis iaculis consequat iaculis. Felis curae diam euismod eu consequat eget? Interdum primis ultricies metus platea neque sociosqu consequat mollis venenatis. Mattis cras interdum nunc netus litora risus sociosqu. Dictum ornare adipiscing, augue volutpat gravida hendrerit.

Adipiscing pulvinar vivamus id consectetur ut bibendum est per. Magnis eget sociosqu maximus nulla nec et. Tristique eu sagittis magnis pellentesque leo amet purus porttitor. Dis iaculis orci sem vitae purus ornare praesent mauris! Feugiat integer pretium ultrices feugiat euismod dui. Rutrum viverra maximus sagittis faucibus penatibus auctor ipsum. Lobortis venenatis eget himenaeos dolor penatibus mollis turpis arcu fringilla. Non condimentum faucibus nam; ipsum viverra ut dis.

Potenti congue erat enim magna suspendisse torquent aliquam. Facilisi arcu finibus luctus est nisi gravida. Potenti gravida orci non facilisis elementum. Laoreet dictum vulputate a dis lorem ante eleifend nostra. Curae sapien himenaeos efficitur aptent; fringilla gravida. Aliquam dignissim per quisque potenti tempus tincidunt quis? Commodo luctus etiam class felis, parturient quam sodales. Pharetra morbi sociosqu magna egestas, a curabitur.

Non felis arcu pharetra libero a. Leo quisque sit nisi hac semper mollis? Ligula eleifend ex sagittis sapien sodales bibendum. Quisque nec interdum hac dolor quis. Purus praesent netus lectus massa proin porta. Sagittis suspendisse taciti pellentesque elit; arcu facilisi eros. Vivamus efficitur rutrum pretium quam class. Potenti lectus fusce mauris habitant egestas accumsan nullam. Facilisis nascetur netus elit nec tortor velit dignissim sagittis.

Sodales lectus tellus leo at curabitur luctus primis amet. Nisl cras feugiat eleifend nunc curae mus, vitae himenaeos commodo. Sed facilisi euismod vestibulum erat urna sapien nostra. Lacus aliquam ornare vel nostra donec sit? Condimentum at eros lobortis interdum ac lobortis. Vestibulum nam potenti lectus fames aptent nunc. Justo egestas habitasse eleifend platea imperdiet tellus orci. Nullam praesent sed lacinia integer aliquet finibus.

Potenti dolor accumsan mus tincidunt pretium nostra nisl a. Id cursus maximus potenti eu mus. Facilisis purus vehicula egestas molestie auctor vel. Elementum cras non et tristique facilisi maecenas bibendum. Aliquet tristique donec consequat aliquet porta nullam class. Facilisi habitant cras velit iaculis iaculis platea fermentum risus integer. Fringilla euismod mi dapibus nam nisi.

Vulputate ut ipsum facilisis sed hac vel. Lacinia dolor vitae varius dis maecenas sociosqu. Habitasse suscipit bibendum inceptos eu scelerisque tristique. Eros accumsan risus mattis metus vestibulum; congue dapibus. Aenean praesent feugiat turpis cubilia aenean quam netus. Elit bibendum morbi pharetra et habitant turpis dolor maecenas. Feugiat donec hendrerit in id urna imperdiet eleifend.

Rhoncus ultrices sagittis conubia commodo urna neque. Donec scelerisque augue faucibus orci tellus per. Tincidunt curae nisl egestas ipsum vivamus maecenas dis fusce. Non mollis nulla viverra ipsum aptent amet. Velit dapibus cubilia habitant sit varius nec ac. Velit quisque sit; metus finibus sodales class lectus interdum. Diam erat cubilia leo donec faucibus arcu porta. Morbi quisque conubia vivamus sed cras habitant.`;

	return (
		<div className="relative flex flex-col overflow-hidden w-[calc(100%-2rem)] min-h-[calc(100dvh-2rem)] bg-gray-700 rounded-xl p-4 pt-16 m-4 box-border">
			<Link className="absolute top-0 left-0 flex flex-row items-center hover:bg-gray-600 w-fit p-4"
				to={{
					pathname: '/dashboard',
				}}>
				<IoMdArrowBack className="w-8 h-8" />
				<span className="text-xl">&nbsp; Back</span>
			</Link>
			<AudioPlayer filepath='https://download.samplelib.com/mp3/sample-6s.mp3' />
			<div className="grow">
				<h1 className="text-3xl pb-4 !font-semibold">Quantum Physics Explained</h1>
				<ExplanationText text={demoText} />
			</div>
		</div>
	);
}

export default SummaryPage;