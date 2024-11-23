import React, { useEffect, useState } from 'react';
import Paginator from './Paginator';

interface Project {
	id: number;
	percentageFunded: number;
	pledgedAmount: number;
}

const Table: React.FC = () => {
	const [projects, setProjects] = useState<Project[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const projectsPerPage = 5;
	const totalPages = Math.ceil(projects.length / projectsPerPage);
	const currentProjects = projects.slice(
		currentPage * projectsPerPage - projectsPerPage,
		currentPage * projectsPerPage,
	);
	const onPageClick = (pageNo: number) => {
		setCurrentPage(pageNo);
	};
	useEffect(() => {
		const fetchProjects = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					'https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json',
				);
				const data = await response.json();
				const formattedProjects = data.map((item: any, index: number) => ({
					id: index + 1,
					percentageFunded: item['percentage.funded'],
					pledgedAmount: item['amt.pledged'],
				}));
				setProjects(formattedProjects);
			} catch (error) {
				alert(`Error fetching projects:${error}`);
			} finally {
				setLoading(false);
			}
		};

		fetchProjects();
	}, []);

	return (
		<div className="app-container">
			<h1>Projects Table</h1>
			<caption style={{display:'none'}}>Projects Table</caption>
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th scope="col">S.No.</th>
							<th scope="col">Percentage Funded</th>
							<th scope="col">Amount Pledged</th>
						</tr>
					</thead>
					<tbody>
						{loading ? (
							<tr>
								<td scope="row" colSpan={3} className="loading">
									Loading...
								</td>
							</tr>
						) : (
							currentProjects.map((project, index) => (
								<tr key={project.id} className={index % 2 == 1 ? `bg-even` : ''}>
									<td scope="row">{project.id}</td>
									<td>{project.percentageFunded}%</td>
									<td>
										{project.pledgedAmount.toLocaleString('en-US', {
											style: 'currency',
											currency: 'USD',
											maximumFractionDigits: 0,
										})}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
			<Paginator
				currentPage={currentPage}
				pagesPerView={projectsPerPage}
				onClick={onPageClick}
				totalPages={totalPages}
			/>
		</div>
	);
};

export default Table;
