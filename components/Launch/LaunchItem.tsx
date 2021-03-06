import React, { FunctionComponent } from 'react'
import Image from 'next/image'
import { LaunchInfo } from '../../types'
import { format } from 'date-fns'
import { enUS, zhCN } from 'date-fns/locale'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface IProps {
	data: LaunchInfo,
	goDetail: () => void
}

const LaunchItem: FunctionComponent<IProps> = ({ data, goDetail }) => {
	const router = useRouter()
	const year = format(new Date(data.date_utc), 'yyyy', {locale: router.locale === 'zh-CN' ? zhCN : enUS})
	const month = format(new Date(data.date_utc), 'MMMM', {locale: router.locale === 'zh-CN' ? zhCN : enUS})
	const fullDate = format(new Date(data.date_utc), "yyyy-MM-dd HH:mm:ss 'UTC'", {locale: router.locale === 'zh-CN' ? zhCN : enUS})

	return (
		<Link href={`/launch/${data.id}`}>
			<div onClick={ () => { goDetail() } } className='cursor-pointer hover:bg-slate-400 dark:hover:bg-slate-900 hover:rounded w-full h-28 min-h-[160px] flex items-center'>
				<div className='relative w-8 flex justify-center items-center'>
					<span className={`block w-4 h-4 rounded-full ${ data.upcoming ? 'bg-blue-500' : ( data.success ? 'bg-green-500' : 'bg-red-500' )} z-10`}></span>
				</div>
				<div className='flex flex-col justify-evenly w-20 text-center'>
					<span>{ month }</span>
					<span>{ year }</span>
				</div>
				<div className="mx-4">
					{
						data.links.patch.small ? (
							<Image src={ data.links.patch.small } alt='patch' width={120} height={120}/>
							// <img src={ data.links.patch.small } alt='patch' />
						) : (
							<Image src='/images/spacex-white.png' alt='patch' width={120} height={120}/>
						)
					}
				</div>
				<div className='h-full py-8 flex flex-col px-4 justify-evenly'>
					<p className='truncate'>{ data.name }</p>
					<p className='truncate'>{ fullDate }</p>
					<p className={`uppercase ${ data.upcoming ? 'text-blue-500' : ( data.success ? 'text-green-500' : 'text-red-500' )}`}>
						{ data.success ? 'success' : (data.upcoming ? 'upcoming' : 'fail') }
					</p>
				</div>
				{/* <div className='h-full py-8 hidden md:flex flex-col justify-evenly px-4'>
					<p>Rocket: { rocketInfo?.name }</p>
					<p>Site: { launchPadInfo?.name }</p>
					<p>Flight number: { data.flight_number }</p>
				</div> */}
			</div>
		</Link>
	)
}

export default LaunchItem
